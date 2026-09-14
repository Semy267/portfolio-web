"use client";

import { CheckCircle2, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Skill } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: Skill[];
  isLoading?: boolean;
}

export default function SkillsSection({
  skills,
  isLoading,
}: SkillsSectionProps) {
  // Group skills by category
  const categories = Array.from(
    new Set(skills.map((s) => s.category || "GENERAL")),
  );

  return (
    <section className="py-20 border-b-2 border-border bg-card/50">
      <div className="container space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-block px-2.5 py-1 bg-accent text-accent-foreground border-2 border-border shadow-hard text-xs font-mono font-bold uppercase">
            Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            Skills &amp; Tech Stack
          </h2>
          <p className="text-base text-muted-foreground">
            Technologies and core competencies honed through real-world software
            engineering.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <Skeleton
                key={n}
                className="h-44 border-2 border-border shadow-hard"
              />
            ))}
          </div>
        ) : skills.length === 0 ? (
          <div className="p-8 border-2 border-border bg-card text-center font-mono text-sm text-muted-foreground uppercase">
            No skills found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const categorySkills = skills.filter(
                (s) => (s.category || "GENERAL") === category,
              );
              return (
                <div
                  key={category}
                  className="border-2 border-border bg-card shadow-hard p-6 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-border pb-3">
                      <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-primary">
                        {category}
                      </h3>
                      <span className="text-xs font-mono font-bold text-muted-foreground">
                        {categorySkills.length} SKILLS
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide bg-secondary text-secondary-foreground border-2 border-border shadow-hard"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          <span>{skill.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
