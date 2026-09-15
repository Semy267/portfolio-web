"use client";

import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { useGetProfile } from "@/services/portfolioService";

export default function Navbar() {
  const { profile } = useGetProfile();

  const initial = profile?.name ? profile.name.charAt(0).toUpperCase() : "P";
  const brandName = profile?.name || "Portfolio";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border px-4 py-3">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 bg-foreground text-background flex items-center justify-center border-2 border-border shadow-hard">
                <span className="font-bold text-sm font-mono text-background">
                  {initial}
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground font-[family-name:var(--font-space-grotesk)] uppercase">
                {brandName}
                <span className="text-primary">.dev</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/projects"
                className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
