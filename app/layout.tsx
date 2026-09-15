import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Client from "@/shared/layout/client";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Query from "@/components/shared/layout/query";
import {
  fetchThemeSettings,
  fetchSiteSettings,
} from "@/services/portfolioService";
import { generateDynamicThemeCss } from "@/lib/theme";
import { getMediaUrl } from "@/lib/media";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await fetchSiteSettings();
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

  const siteName =
    siteSettings?.siteName || "Personal Portfolio & Work Showcase";
  const description =
    siteSettings?.siteDescription ||
    "Personal portfolio showcasing software engineering projects, technical skills, and journey.";
  const ogImageUrl = siteSettings?.ogImageUrl
    ? getMediaUrl(siteSettings.ogImageUrl)
    : undefined;

  return {
    metadataBase: new URL(domain),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
      title: siteName,
      description,
      url: "/",
      siteName,
      locale: "en_US",
      type: "website",
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: siteName,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await fetchThemeSettings();
  const themeCss = generateDynamicThemeCss(theme);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          id="dynamic-theme"
          dangerouslySetInnerHTML={{ __html: themeCss || "" }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} font-[family-name:var(--font-space-grotesk)] antialiased min-h-screen flex flex-col`}
      >
        <Query>
          <Client>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </Client>
        </Query>
      </body>
    </html>
  );
}
