import { Metadata } from "next";
import { Project } from "@/types/portfolio";
import { getMediaUrl } from "@/lib/media";
import ProjectDetailClient from "./project-detail-client";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let title = "Project Detail | Portfolio";
  let description = "Detailed view of the selected project.";
  let imageUrl = "";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/projects/${slug}`,
      {
        next: { revalidate: 3600 },
      },
    );
    const { data } = await res.json();
    if (data) {
      const project: Project = data;
      title = `${project.title} | Portfolio`;
      description = project.shortDescription || description;
      if (project.thumbnail?.url) {
        imageUrl = getMediaUrl(project.thumbnail.url);
      }
    }
  } catch (error) {
    console.error("Failed to fetch project for metadata", error);
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let initialData: Project | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/projects/${slug}`,
      {
        next: { revalidate: 3600 },
      },
    );
    const response = await res.json();
    initialData = response.data || null;
  } catch (error) {
    console.error("Failed to fetch project data", error);
  }

  return <ProjectDetailClient slug={slug} initialData={initialData} />;
}
