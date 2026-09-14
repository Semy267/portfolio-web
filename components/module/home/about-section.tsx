"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Mail, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Profile, Skill } from "@/types/portfolio";

interface AboutSectionProps {
  profile: Profile | null;
  skills?: Skill[];
}

export default function AboutSection({
  profile,
  skills = [],
}: AboutSectionProps) {
  if (!profile?.bio && !profile?.headline) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="py-20 border-b-2 border-border bg-background"
    >
      <div className="container space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-block px-2.5 py-1 bg-accent-yellow text-foreground border-2 border-border shadow-hard text-xs font-mono font-bold uppercase">
            About
          </div>
          {profile?.headline && (
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-foreground">
              {profile.headline}
            </h2>
          )}
          {profile?.bio && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Dynamic Meta Cards from database */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile?.name && (
            <div className="border-2 border-border bg-card p-6 shadow-hard space-y-2">
              <div className="w-9 h-9 border-2 border-border bg-secondary flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs font-mono font-bold uppercase text-muted-foreground">
                Name
              </p>
              <p className="text-base font-bold uppercase text-foreground">
                {profile.name}
              </p>
            </div>
          )}

          {profile?.location && (
            <div className="border-2 border-border bg-card p-6 shadow-hard space-y-2">
              <div className="w-9 h-9 border-2 border-border bg-secondary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs font-mono font-bold uppercase text-muted-foreground">
                Location
              </p>
              <p className="text-base font-bold uppercase text-foreground">
                {profile.location}
              </p>
            </div>
          )}

          {profile?.email && (
            <div className="border-2 border-border bg-card p-6 shadow-hard space-y-2">
              <div className="w-9 h-9 border-2 border-border bg-secondary flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs font-mono font-bold uppercase text-muted-foreground">
                Contact
              </p>
              <p className="text-base font-bold text-foreground font-mono truncate">
                {profile.email}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Link href="/about">
            <Button className="gap-2">
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Get in Touch</Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
