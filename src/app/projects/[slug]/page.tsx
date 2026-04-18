import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Box, Cpu, HardDrive, Layers, Workflow } from "lucide-react";

import { ModelViewer } from "@/components/model-viewer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_LABELS, getAllProjects, getProjectBySlug } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | 3D Portfolio`,
    description: project.descriptionShort,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#060b12] text-zinc-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/#portfolio"
            className={buttonVariants({
              variant: "outline",
              className: "border-white/20 bg-white/[0.02]",
            })}
          >
            <ArrowLeft className="size-4" />
            Back to Portfolio
          </Link>
          <p className="text-xs text-zinc-400">Source: {project.sourcePath}</p>
        </div>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-cyan-200/15 text-cyan-100 hover:bg-cyan-200/20">
              {CATEGORY_LABELS[project.category]}
            </Badge>
            <Badge variant="outline" className="border-white/20 text-zinc-300">
              {project.year}
            </Badge>
          </div>
          <h1 className="font-heading text-3xl leading-tight font-semibold text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-zinc-300 sm:text-base">
            {project.descriptionLong}
          </p>
        </section>

        <ModelViewer modelUrl={project.modelUrl} title={project.title} />

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="border-white/10 bg-zinc-950/70">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-2 text-white">
                <Cpu className="size-4 text-cyan-200" />
                Technical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-300">
              <p className="inline-flex items-center gap-2">
                <HardDrive className="size-4 text-zinc-400" />
                Format: <span className="font-medium text-zinc-100">.glb</span>
              </p>
              <p className="inline-flex items-center gap-2">
                <Box className="size-4 text-zinc-400" />
                Polycount: <span className="font-medium text-zinc-100">{project.polycount}</span>
              </p>
              <p className="inline-flex items-center gap-2">
                <Layers className="size-4 text-zinc-400" />
                Texture: {" "}
                <span className="font-medium text-zinc-100">{project.textureResolution}</span>
              </p>
              <p className="inline-flex items-center gap-2">
                <Workflow className="size-4 text-zinc-400" />
                Pipeline: <span className="font-medium text-zinc-100">{project.pipeline}</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-zinc-950/70">
            <CardHeader>
              <CardTitle className="text-white">Software Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.softwareUsed.map((software) => (
                  <Badge key={software} variant="outline" className="border-white/20 text-zinc-300">
                    {software}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
