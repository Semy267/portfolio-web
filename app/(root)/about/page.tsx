"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useGetProfile, useGetSkills } from "@/services/portfolioService";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const { profile, isLoading } = useGetProfile();
  const { skills } = useGetSkills();

  const initial = profile?.name ? profile.name.charAt(0).toUpperCase() : "P";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="container max-w-4xl space-y-12">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-block px-2.5 py-1 bg-accent-yellow text-foreground border-2 border-border shadow-hard text-xs font-mono font-bold uppercase">
            About
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            {profile?.headline ? profile.headline : "About Me"}
          </h1>
          {profile?.bio && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="border-4 border-border bg-card p-8 md:p-12 shadow-hard-xl space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b-2 border-border pb-8">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-secondary border-3 border-border shadow-hard flex items-center justify-center font-mono font-extrabold text-2xl text-primary">
                  {initial}
                </div>
                <div className="space-y-1">
                  {profile.name && (
                    <h2 className="text-2xl font-bold uppercase text-foreground">
                      {profile.name}
                    </h2>
                  )}
                  {profile.headline && (
                    <p className="text-sm font-mono font-semibold text-primary">
                      {profile.headline}
                    </p>
                  )}
                  {profile.location && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{profile.location}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent text-accent-foreground border-2 border-border shadow-hard text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Profile</span>
              </div>
            </div>

            {profile.email && (
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm font-mono">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-bold text-foreground">
                    {profile.email}
                  </span>
                </div>
                <Link href="/contact">
                  <Button size="sm" className="gap-2">
                    <span>Send Inquiries</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Skills if available */}
        {skills && skills.length > 0 && (
          <div className="border-2 border-border bg-card p-8 shadow-hard space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tight text-foreground border-b-2 border-border pb-3">
              Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="border-2 border-border bg-secondary p-4 flex items-center justify-between shadow-hard"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold uppercase tracking-wide">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                    {skill.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
