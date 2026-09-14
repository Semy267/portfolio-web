"use client";

import { useGetHomepage } from "@/services/portfolioService";
import HeroSection from "@/components/module/home/hero-section";
import SelectedProjectsSection from "@/components/module/home/selected-projects-section";
import AboutSection from "@/components/module/home/about-section";
import SkillsSection from "@/components/module/home/skills-section";
import JourneySection from "@/components/module/home/journey-section";
import ContactCtaSection from "@/components/module/home/contact-cta-section";

export default function Home() {
  const { homepageData, isLoading } = useGetHomepage();

  const profile = homepageData?.profile || null;
  const projects = homepageData?.featuredProjects || [];
  const skills = homepageData?.skills || [];
  const experiences = homepageData?.experiences || [];
  const socialLinks = homepageData?.socialLinks || [];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection profile={profile} />

      {/* 2. Selected Projects Section */}
      <SelectedProjectsSection projects={projects} isLoading={isLoading} />

      {/* 3. About Preview Section */}
      <AboutSection profile={profile} />

      {/* 4. Skills & Tech Stack Section */}
      <SkillsSection skills={skills} isLoading={isLoading} />

      {/* 5. Journey / Experience Section */}
      <JourneySection experiences={experiences} isLoading={isLoading} />

      {/* 6. Contact CTA Section */}
      <ContactCtaSection profile={profile} socialLinks={socialLinks} />
    </div>
  );
}
