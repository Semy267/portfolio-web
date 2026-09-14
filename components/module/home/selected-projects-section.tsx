"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, FolderGit2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types/portfolio";
import { getMediaUrl } from "@/lib/media";

interface SelectedProjectsSectionProps {
  projects: Project[];
  isLoading?: boolean;
}

export default function SelectedProjectsSection({
  projects,
  isLoading,
}: SelectedProjectsSectionProps) {
  return (
    <section className="py-20 border-b-2 border-border bg-card/40">
      <div className="container space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-block px-2.5 py-1 bg-accent text-accent-foreground border-2 border-border shadow-hard text-xs font-mono font-bold uppercase mb-3">
              Selected Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
              Featured Projects
            </h2>
          </div>
          <Link href="/projects">
            <Button variant="outline" className="gap-2">
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
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
        ) : projects.length === 0 ? (
          <div className="p-12 border-2 border-border bg-card text-center space-y-3">
            <p className="font-mono text-sm text-muted-foreground uppercase">
              No featured projects yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="flex flex-col justify-between group hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg transition-transform duration-150"
              >
                <div>
                  {/* Thumbnail / Header block */}
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
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant="lime">{project.category}</Badge>
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
                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((item) => (
                        <span
                          key={item.technologyId}
                          className="px-2 py-0.5 text-xs font-mono font-bold uppercase bg-background border border-border"
                        >
                          {item.technology?.name}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <CardFooter className="p-0 flex items-center justify-between border-t-2 border-border pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
