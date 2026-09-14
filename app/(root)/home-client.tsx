"use client";

import { useGetHomepage } from "@/services/portfolioService";
import HeroSection from "@/components/module/home/hero-section";
import SelectedProjectsSection from "@/components/module/home/selected-projects-section";
import AboutSection from "@/components/module/home/about-section";
import SkillsSection from "@/components/module/home/skills-section";
import JourneySection from "@/components/module/home/journey-section";
import ContactCtaSection from "@/components/module/home/contact-cta-section";
import { HomepageData } from "@/types/portfolio";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface HomeClientProps {
  initialData: HomepageData | null;
}

export default function HomeClient({ initialData }: HomeClientProps) {
  const queryClient = useQueryClient();

  // Hydrate React Query cache with initialData from Server Component
  useEffect(() => {
    if (initialData) {
      queryClient.setQueryData(["public", "homepage"], { data: initialData });
    }
  }, [initialData, queryClient]);

  const { homepageData, isLoading } = useGetHomepage();

  // Use the fetched data or fallback to initialData during hydration
  const data = homepageData || initialData;

  const profile = data?.profile || null;
  const projects = data?.featuredProjects || [];
  const skills = data?.skills || [];
  const experiences = data?.experiences || [];
  const socialLinks = data?.socialLinks || [];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection profile={profile} />

      {/* 2. Selected Projects Section */}
      <SelectedProjectsSection
        projects={projects}
        isLoading={!data && isLoading}
      />

      {/* 3. About Preview Section */}
      <AboutSection profile={profile} />

      {/* 4. Skills & Tech Stack Section */}
      <SkillsSection skills={skills} isLoading={!data && isLoading} />

      {/* 5. Journey / Experience Section */}
      <JourneySection
        experiences={experiences}
        isLoading={!data && isLoading}
      />

      {/* 6. Contact CTA Section */}
      <ContactCtaSection profile={profile} socialLinks={socialLinks} />
    </div>
  );
}
