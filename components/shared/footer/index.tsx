"use client";

import Link from "next/link";
import { useGetSocialLinks, useGetProfile } from "@/services/portfolioService";

export default function Footer() {
  const { profile } = useGetProfile();
  const { socialLinks } = useGetSocialLinks();

  return (
    <footer className="border-t-2 border-border bg-card mt-24 py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          {profile?.name && (
            <p className="text-lg font-bold uppercase tracking-tight">
              {profile.name}
            </p>
          )}
          {profile?.headline && (
            <p className="text-sm text-muted-foreground font-mono">
              {profile.headline}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
            >
              Email
            </a>
          )}
        </div>

        <p className="text-xs text-muted-foreground font-mono">
          &copy; {new Date().getFullYear()} {profile?.name || "Portfolio"}. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
