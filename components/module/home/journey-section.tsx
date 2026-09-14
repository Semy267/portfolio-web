"use client";

import { Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Experience } from "@/types/portfolio";

interface JourneySectionProps {
  experiences: Experience[];
  isLoading?: boolean;
}

export default function JourneySection({
  experiences,
  isLoading,
}: JourneySectionProps) {
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "Present";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="py-20 border-b-2 border-border bg-background"
    >
      <div className="container space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-block px-2.5 py-1 bg-accent-yellow text-foreground border-2 border-border shadow-hard text-xs font-mono font-bold uppercase">
            Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            Experience &amp; Journey
          </h2>
          <p className="text-base text-muted-foreground">
            Milestones and professional track record in software development.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2].map((n) => (
              <Skeleton
                key={n}
                className="h-32 border-2 border-border shadow-hard"
              />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="p-8 border-2 border-border bg-card text-center font-mono text-sm text-muted-foreground uppercase">
            No experiences listed yet.
          </div>
        ) : (
          <div className="relative border-l-4 border-border ml-3 md:ml-6 space-y-10 pl-6 md:pl-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Marker Dot */}
                <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 border-2 border-border bg-primary shadow-hard flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-foreground" />
                </div>

                <div className="border-2 border-border bg-card p-6 shadow-hard space-y-3 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg transition-transform">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-border pb-3">
                    <div>
                      <h3 className="text-xl font-bold uppercase text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-mono font-semibold text-primary">
                        {exp.organization}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase px-2.5 py-1 bg-secondary border border-border self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
