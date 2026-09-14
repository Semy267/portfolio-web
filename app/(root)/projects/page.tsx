"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  FolderGit2,
  Search,
  Filter,
} from "lucide-react";
import { useGetProjects } from "@/services/portfolioService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CImage from "@/components/shared/custome/c-image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getMediaUrl } from "@/lib/media";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const { projects, isLoading } = useGetProjects({
    search: search || undefined,
  });

  // Extract unique categories from loaded projects
  const categories = useMemo(() => {
    const cats = new Set<string>(["ALL"]);
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedCategory !== "ALL" && p.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [projects, selectedCategory]);

  return (
    <div className="py-16">
      <div className="container space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-block px-2.5 py-1 bg-primary text-primary-foreground border-2 border-border shadow-hard text-xs font-mono font-bold uppercase">
            Portfolio
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            All Projects
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            A comprehensive showcase of applications, experiments, systems, and
            open-source contributions.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-2 border-border bg-card p-4 shadow-hard">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-muted-foreground mr-2 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-border transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-hard"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="pl-9 h-10 border-2 border-border text-xs font-mono"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-80 border-2 border-border bg-card p-6 flex flex-col justify-between shadow-hard"
              >
                <Skeleton className="h-36 w-full border-2 border-border mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-16 border-2 border-border bg-card text-center space-y-4">
            <p className="font-mono text-sm font-bold uppercase text-muted-foreground">
              No published projects found matching your criteria.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setSelectedCategory("ALL");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="flex flex-col justify-between group hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg transition-transform duration-150"
              >
                <div>
                  <div className="h-44 bg-secondary border-b-2 border-border flex items-center justify-center relative overflow-hidden">
                    {project.thumbnail?.url ? (
                      <CImage
                        src={getMediaUrl(project.thumbnail.url)}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <FolderGit2 className="w-12 h-12 text-muted-foreground/60 group-hover:scale-110 transition-transform" />
                    )}
                    <div className="absolute top-3 left-3 z-10 flex gap-1.5">
                      <Badge variant="lime">{project.category}</Badge>
                      {project.featured && (
                        <Badge variant="yellow">Featured</Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 z-10 font-mono text-xs font-bold text-foreground bg-background/90 px-1.5 py-0.5 border border-border">
                      {project.year}
                    </div>
                  </div>

                  <CardHeader className="space-y-2 p-6">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {project.shortDescription}
                    </CardDescription>
                  </CardHeader>
                </div>

                <div className="p-6 pt-0 space-y-6">
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((item) => (
                        <span
                          key={item.technologyId}
                          className="px-2 py-0.5 text-xs font-mono font-bold uppercase bg-background border border-border"
                        >
                          {item.technology?.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <CardFooter className="p-0 flex items-center justify-between border-t-2 border-border pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono font-bold uppercase text-muted-foreground hover:text-foreground"
                          title="Source Code"
                        >
                          GitHub
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground p-1"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
