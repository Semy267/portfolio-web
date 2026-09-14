"use client";

import {
  Mail,
  MapPin,
  ExternalLink,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useGetProfile, useGetSocialLinks } from "@/services/portfolioService";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const { profile } = useGetProfile();
  const { socialLinks } = useGetSocialLinks();

  const email = profile?.email;

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
          <div className="inline-block px-2.5 py-1 bg-accent-coral text-white border-2 border-border shadow-hard text-xs font-mono font-bold uppercase">
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            Contact &amp; Inquiries
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Interested in collaboration, contract work, or discussing software
            engineering? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Contact Card */}
          <div className="md:col-span-7 border-4 border-border bg-card p-8 md:p-10 shadow-hard-xl space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold uppercase text-foreground">
                Drop Me An Email
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The fastest way to reach me is directly via email. I generally
                respond within 24–48 business hours.
              </p>
            </div>

            {email ? (
              <>
                <div className="p-4 border-2 border-border bg-secondary font-mono text-sm space-y-2">
                  <p className="text-xs uppercase text-muted-foreground font-bold">
                    Email Address
                  </p>
                  <p className="text-foreground font-bold text-base select-all break-all">
                    {email}
                  </p>
                </div>

                <a href={`mailto:${email}`} className="block">
                  <Button size="lg" className="w-full gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Open in Mail Client</span>
                    <Send className="w-4 h-4" />
                  </Button>
                </a>
              </>
            ) : (
              <div className="p-6 border-2 border-border bg-secondary font-mono text-xs text-muted-foreground uppercase text-center">
                Contact email address is not configured yet.
              </div>
            )}
          </div>

          {/* Social Profiles & Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="border-2 border-border bg-card p-6 shadow-hard space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Digital Presence
              </h3>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border-2 border-border bg-secondary hover:bg-secondary/70 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard transition-all font-mono text-xs font-bold uppercase"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>

            {profile?.location && (
              <div className="border-2 border-border bg-card p-6 shadow-hard space-y-2">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Location
                </h3>
                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{profile.location}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
