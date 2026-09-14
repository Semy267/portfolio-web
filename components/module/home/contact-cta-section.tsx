"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Profile, SocialLink } from "@/types/portfolio";

interface ContactCtaSectionProps {
  profile: Profile | null;
  socialLinks: SocialLink[];
}

export default function ContactCtaSection({
  profile,
  socialLinks,
}: ContactCtaSectionProps) {
  const email = profile?.email;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-accent-yellow/15 border-b-2 border-border"
    >
      <div className="container">
        <div className="border-4 border-border bg-card p-8 md:p-14 shadow-hard-xl space-y-8 text-center max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 bg-accent-coral text-white border-2 border-border shadow-hard text-xs font-mono font-bold uppercase">
            Let&apos;s Connect
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-foreground">
              Let&apos;s Build Something Great.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have a project in mind, an engineering challenge to solve, or
              looking to collaborate? My inbox is always open.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {email && (
              <a href={`mailto:${email}`}>
                <Button size="lg" className="gap-2 text-sm sm:text-base">
                  <Mail className="w-5 h-5" />
                  <span>Email Me Directly</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            )}
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="text-sm sm:text-base"
              >
                Contact Page
              </Button>
            </Link>
          </div>

          {socialLinks.length > 0 && (
            <div className="pt-6 border-t-2 border-border flex flex-wrap items-center justify-center gap-6">
              <span className="text-xs font-mono font-bold uppercase text-muted-foreground">
                Follow / Connect:
              </span>
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono font-bold uppercase text-foreground hover:text-primary underline decoration-2 underline-offset-4 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
