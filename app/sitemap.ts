import { configs } from "@/lib/config";
import { MetadataRoute } from "next";
import { Project } from "@/types/portfolio";

export const revalidate = 3600;

const BASE = configs.DOMAIN || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let projectUrls: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/projects?limit=100`,
      {
        next: { revalidate: 3600 },
      },
    );
    const { data } = await res.json();

    if (data?.items) {
      projectUrls = data.items.map((project: Project) => ({
        url: `${BASE}/projects/${project.slug}`,
        lastModified: new Date(
          project.updatedAt || project.createdAt,
        ).toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch projects for sitemap", error);
  }

  return [
    {
      url: `${BASE}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
