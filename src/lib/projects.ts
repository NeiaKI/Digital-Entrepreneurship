import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

import {
  CATEGORY_LABELS,
  PROJECT_CATEGORIES,
  type PortfolioProject,
  type PortfolioProjectPreview,
  type ProjectCategory,
} from "@/lib/portfolio-shared";

export { CATEGORY_LABELS, PROJECT_CATEGORIES };
export type { PortfolioProject, PortfolioProjectPreview, ProjectCategory };

export const CREATOR_PROFILE = {
  name: "Neki",
  roleTitle: "3D Environment & Creature Artist",
  bioShort:
    "Membangun aset 3D stylized-realistic untuk game, cinematic, dan visual storytelling.",
  bioLong:
    "Fokus pada pipeline production-ready dari blockout hingga final polish. Portfolio ini menampilkan eksplorasi creature, environment, serta props dengan pendekatan optimasi untuk realtime.",
  location: "Jakarta, GMT+7",
  skills: [
    "Hard-surface modeling",
    "Creature sculpting",
    "PBR texturing",
    "Realtime optimization",
    "Look development",
  ],
  softwareList: [
    "Blender",
    "Substance Painter",
    "ZBrush",
    "Marmoset Toolbag",
    "Unreal Engine",
  ],
  socialLinks: [
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "ArtStation", url: "https://artstation.com" },
    { label: "Behance", url: "https://behance.net" },
    { label: "Instagram", url: "https://instagram.com" },
  ],
} as const;

const ASSET_ROOT = path.join(process.cwd(), "..", "3D-ASSET");

function toModelUrl(relativePath: string): string {
  const encodedPath = relativePath
    .split(path.sep)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/models/${encodedPath}`;
}

function sanitizeName(fileName: string): string {
  return fileName
    .replace(/\.glb$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(input: string): string {
  return input
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function inferCategory(relativePath: string): ProjectCategory {
  const normalized = relativePath.toLowerCase();

  if (normalized.startsWith(`animal${path.sep}sea`)) {
    return "character";
  }

  if (normalized.startsWith(`building${path.sep}`)) {
    return "environment";
  }

  if (
    normalized.startsWith(`equipment${path.sep}`) ||
    normalized.startsWith(`item${path.sep}`)
  ) {
    return "props";
  }

  if (
    normalized.includes("vehicle") ||
    normalized.includes("car") ||
    normalized.includes("ship")
  ) {
    return "vehicle";
  }

  return "other";
}

function inferSoftware(category: ProjectCategory): string[] {
  const base = ["Blender", "Substance Painter"];

  if (category === "character") {
    return [...base, "ZBrush"];
  }

  if (category === "environment") {
    return [...base, "Unreal Engine"];
  }

  return [...base, "Marmoset Toolbag"];
}

function inferPipeline(category: ProjectCategory): string {
  if (category === "character") {
    return "Sculpt -> retopo -> bake normal map -> PBR texturing -> realtime preview";
  }

  if (category === "environment") {
    return "Modular blockout -> detail pass -> material pass -> lighting polish";
  }

  return "Modeling -> UV unwrap -> texture bake -> material setup -> final render";
}

function inferDescriptions(title: string, category: ProjectCategory): {
  short: string;
  long: string;
} {
  const label = CATEGORY_LABELS[category];
  const short = `${label} asset untuk eksplorasi style, material, dan presentasi realtime.`;
  const long = `${title} adalah project ${label.toLowerCase()} yang dikembangkan untuk portfolio personal. Fokus utama ada pada readability bentuk, kualitas material PBR, dan kesiapan aset untuk workflow game atau realtime rendering.`;

  return { short, long };
}

function inferPolycount(sizeMb: number): string {
  const estimatedTriangles = Math.max(8, Math.round(sizeMb * 6));
  return `~${estimatedTriangles}k triangles (estimated)`;
}

function inferTextureResolution(sizeMb: number): string {
  if (sizeMb >= 40) {
    return "4K PBR set";
  }

  if (sizeMb >= 18) {
    return "2K-4K PBR set";
  }

  return "2K PBR set";
}

async function collectGlbFiles(
  currentDir: string,
  rootDir: string,
): Promise<string[]> {
  const entries = await fs.readdir(currentDir, { withFileTypes: true });

  const nestedResults = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        return collectGlbFiles(fullPath, rootDir);
      }

      if (entry.isFile() && entry.name.toLowerCase().endsWith(".glb")) {
        return [path.relative(rootDir, fullPath)];
      }

      return [];
    }),
  );

  return nestedResults.flat();
}

export const getAllProjects = cache(async (): Promise<PortfolioProject[]> => {
  const glbRelativePaths = await collectGlbFiles(ASSET_ROOT, ASSET_ROOT);

  const projects = await Promise.all(
    glbRelativePaths.map(async (relativePath, index) => {
      const absolutePath = path.join(ASSET_ROOT, relativePath);
      const stats = await fs.stat(absolutePath);
      const fileSizeMb = Number((stats.size / (1024 * 1024)).toFixed(1));

      const cleanName = sanitizeName(path.basename(relativePath));
      const title = titleCase(cleanName);
      const category = inferCategory(relativePath);
      const { short, long } = inferDescriptions(title, category);
      const slug = `${slugify(title)}-${index + 1}`;

      const project: PortfolioProject = {
        id: `project-${index + 1}`,
        slug,
        title,
        category,
        year: 2026,
        descriptionShort: short,
        descriptionLong: long,
        modelUrl: toModelUrl(relativePath),
        sourcePath: relativePath,
        softwareUsed: inferSoftware(category),
        polycount: inferPolycount(fileSizeMb),
        textureResolution: inferTextureResolution(fileSizeMb),
        pipeline: inferPipeline(category),
        sizeMb: fileSizeMb,
        isFeatured: false,
      };

      return project;
    }),
  );

  const sorted = projects.sort((a, b) => {
    if (a.category !== b.category) {
      return PROJECT_CATEGORIES.indexOf(a.category) - PROJECT_CATEGORIES.indexOf(b.category);
    }
    return a.title.localeCompare(b.title);
  });

  const featuredPool = [...sorted]
    .sort((a, b) => b.sizeMb - a.sizeMb)
    .slice(0, 6)
    .map((project) => project.id);

  return sorted.map((project) => ({
    ...project,
    isFeatured: featuredPool.includes(project.id),
  }));
});

export async function getProjectBySlug(
  slug: string,
): Promise<PortfolioProject | undefined> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.isFeatured).slice(0, 6);
}

export function toProjectPreview(project: PortfolioProject): PortfolioProjectPreview {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.category,
    year: project.year,
    descriptionShort: project.descriptionShort,
    modelUrl: project.modelUrl,
    sizeMb: project.sizeMb,
    isFeatured: project.isFeatured,
  };
}
