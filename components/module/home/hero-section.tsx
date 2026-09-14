"use client";

import Link from "next/link";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Profile } from "@/types/portfolio";

interface HeroSectionProps {
  profile: Profile | null;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const name = profile?.name;
  const headline = profile?.headline;
  const bio = profile?.bio;
  const currentYear = new Date().getFullYear();
  const terminalUser = name ? name.toLowerCase().replace(/\s+/g, "") : "user";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-16 md:py-24 border-b-2 border-border bg-background"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col items-start gap-6">
            {/* Greeting Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-yellow text-foreground border-2 border-border shadow-hard text-xs font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for new opportunities</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-none text-foreground">
                {name ? (
                  <>
                    Hello, I&apos;m{" "}
                    <span className="text-primary underline decoration-4 underline-offset-8">
                      {name}
                    </span>
                    .
                  </>
                ) : (
                  <span>Hello &amp; Welcome.</span>
                )}
              </h1>
              {headline && (
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-foreground/90 font-[family-name:var(--font-space-grotesk)]">
                  {headline}
                </h2>
              )}
            </div>

            {/* Description */}
            {bio && (
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {bio}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/projects">
                <Button size="lg" className="gap-2">
                  <span>Explore Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  About Me
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="yellow" size="lg">
                  Let&apos;s Talk
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Neo-Brutalist Frame */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs aspect-square border-4 border-border bg-secondary shadow-hard-xl p-6 flex flex-col justify-between relative">
              <div className="flex items-center justify-between border-b-2 border-border pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive border border-border" />
                  <div className="w-3 h-3 bg-accent-yellow border border-border" />
                  <div className="w-3 h-3 bg-accent border border-border" />
                </div>
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  TERMINAL
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs my-auto">
                <p className="text-primary font-bold flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{terminalUser}@portfolio:~$</span>
                </p>
                <p className="text-foreground font-semibold">whoami</p>
                <p className="text-muted-foreground line-clamp-3">
                  {headline || bio || "Portfolio & Digital Space"}
                </p>
              </div>

              <div className="border-t-2 border-border pt-3 flex items-center justify-between text-xs font-mono font-bold">
                <span>STATUS: ACTIVE</span>
                <span className="text-accent-coral font-bold">
                  {currentYear}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
