"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { useGetProjectDetail } from "@/services/portfolioService";
import CImage from "@/components/shared/custome/c-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getMediaUrl } from "@/lib/media";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { project, isLoading, error } = useGetProjectDetail(slug);

  if (isLoading) {
    return (
      <div className="py-20 container max-w-4xl space-y-8">
        <Skeleton className="h-8 w-32 border-2 border-border" />
        <Skeleton className="h-16 w-3/4 border-2 border-border" />
        <Skeleton className="h-64 w-full border-2 border-border" />
        <Skeleton className="h-40 w-full border-2 border-border" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="py-24 container max-w-2xl text-center space-y-6">
        <div className="border-4 border-border bg-card p-12 shadow-hard-lg space-y-4">
          <h1 className="text-3xl font-extrabold uppercase text-foreground">
            Project Not Found
          </h1>
          <p className="text-muted-foreground text-sm font-mono">
            The project with slug &quot;{slug}&quot; could not be found or has
            not been published yet.
          </p>
          <Link href="/projects">
            <Button variant="default" className="gap-2 mt-4">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container max-w-4xl space-y-12">
        {/* Navigation */}
        <div>
          <Link href="/projects">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>All Projects</span>
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        {project.thumbnail?.url && (
          <div className="relative aspect-video w-full border-4 border-border overflow-hidden shadow-hard-xl bg-muted">
            <CImage
              src={getMediaUrl(project.thumbnail.url)}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Header Block */}
        <div className="border-4 border-border bg-card p-8 md:p-12 shadow-hard-xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="lime">{project.category}</Badge>
            <Badge variant="secondary" className="gap-1 font-mono">
              <Calendar className="w-3 h-3" />
              <span>{project.year}</span>
            </Badge>
            {project.featured && (
              <Badge variant="yellow">Featured Project</Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {project.shortDescription}
          </p>

          {/* External Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-border">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Technologies Grid */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="border-2 border-border bg-card p-6 shadow-hard space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              <span>Technologies &amp; Architecture</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((item) => (
                <div
                  key={item.technologyId}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground border-2 border-border shadow-hard text-xs font-mono font-bold uppercase flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>{item.technology?.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Section */}
        {project.content ? (
          <div className="border-2 border-border bg-card p-8 md:p-12 shadow-hard space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-tight border-b-2 border-border pb-3">
              Project Overview &amp; Details
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground text-base leading-relaxed whitespace-pre-line font-[family-name:var(--font-space-grotesk)]">
              {project.content}
            </div>
          </div>
        ) : (
          <div className="border-2 border-border bg-card p-8 text-center text-muted-foreground font-mono text-sm">
            No detailed writeup provided for this project yet.
          </div>
        )}
      </div>
    </div>
  );
}
