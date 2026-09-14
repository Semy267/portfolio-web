import { Metadata } from "next";
import { configs } from "@/lib/config";
import HomeClient from "./home-client";
import { HomepageData } from "@/types/portfolio";

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  let title = "Personal Portfolio";
  let description =
    "Personal portfolio showcasing software engineering projects, technical skills, and journey.";

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/homepage`,
      {
        next: { revalidate: 3600 },
      },
    );
    const { data } = await res.json();
    if (data?.profile) {
      title = `${data.profile.name} | Portfolio`;
      if (data.profile.bio) {
        description = data.profile.bio;
      }
    }
  } catch (error) {
    console.error("Failed to fetch homepage data for metadata", error);
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/",
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function Home() {
  let initialData: HomepageData | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/v1/homepage`,
      {
        next: { revalidate: 3600 },
      },
    );
    const response = await res.json();
    initialData = response.data || null;
  } catch (error) {
    console.error("Failed to fetch homepage data", error);
  }

  return <HomeClient initialData={initialData} />;
}
