export const PROJECT_CATEGORIES = [
  "props",
  "environment",
  "character",
  "vehicle",
  "other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number;
  descriptionShort: string;
  descriptionLong: string;
  modelUrl: string;
  sourcePath: string;
  blendFileUrl?: string;
  softwareUsed: string[];
  polycount: string;
  textureResolution: string;
  pipeline: string;
  sizeMb: number;
  isFeatured: boolean;
};

export type PortfolioProjectPreview = Pick<
  PortfolioProject,
  | "id"
  | "slug"
  | "title"
  | "category"
  | "year"
  | "descriptionShort"
  | "modelUrl"
  | "sizeMb"
  | "isFeatured"
>;

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  props: "Props",
  environment: "Environment",
  character: "Character",
  vehicle: "Vehicle",
  other: "Other",
};
