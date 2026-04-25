"use client";

import { useEffect, useMemo, useState } from "react";

import { SectionReveal } from "@/components/section-reveal";
import { ProjectCard } from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CATEGORY_LABELS,
  PROJECT_CATEGORIES,
  type PortfolioProjectPreview,
  type ProjectCategory,
} from "@/lib/portfolio-shared";

type PortfolioSectionProps = {
  projects: PortfolioProjectPreview[];
};

type FilterValue = "all" | ProjectCategory;

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<FilterValue>("all");

  // Restore category from sessionStorage on mount
  useEffect(() => {
    const savedCategory = sessionStorage.getItem("portfolio-active-category") as FilterValue;
    if (savedCategory && (savedCategory === "all" || PROJECT_CATEGORIES.includes(savedCategory as any))) {
      setActiveCategory(savedCategory);
    }
  }, []);

  const handleCategoryChange = (value: string) => {
    const category = value as FilterValue;
    setActiveCategory(category);
    sessionStorage.setItem("portfolio-active-category", category);
  };

  const visibleProjects = useMemo(() => {
    if (activeCategory === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  const countByCategory = useMemo(() => {
    return PROJECT_CATEGORIES.reduce<Record<ProjectCategory, number>>(
      (acc, category) => {
        acc[category] = projects.filter((project) => project.category === category).length;
        return acc;
      },
      {
        props: 0,
        environment: 0,
        character: 0,
        vehicle: 0,
        other: 0,
      },
    );
  }, [projects]);

  const totalCount = projects.length;

  return (
    <section id="portfolio" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-cyan-200/80 uppercase">
            Portfolio Grid
          </p>
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            Explore 3D Assets
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
            Filter berdasarkan kategori untuk menemukan prop, environment, atau character
            yang paling relevan dengan kebutuhan project kamu.
          </p>
        </div>
        <p className="text-sm text-zinc-300">
          <span className="font-medium text-white">{visibleProjects.length}</span> terlihat dari {" "}
          <span className="font-medium text-white">{totalCount}</span> total aset
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
        <TabsList
          variant="line"
          className="h-auto w-full flex-wrap items-center justify-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2"
        >
          <TabsTrigger value="all" className="rounded-lg border border-white/10 px-3 py-1.5 text-xs">
            All ({totalCount})
          </TabsTrigger>
          {PROJECT_CATEGORIES.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs"
            >
              {CATEGORY_LABELS[category]} ({countByCategory[category]})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-4">
          {visibleProjects.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} priority={project.isFeatured} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-8 text-center text-zinc-300">
              Belum ada aset pada kategori ini.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
