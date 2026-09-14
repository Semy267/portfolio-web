import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Client from "@/shared/layout/client";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Query from "@/components/shared/layout/query";
import { AuthProvider } from "@/components/shared/auth/auth-context";

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

export const metadata: Metadata = {
  title: "Personal Portfolio & Work Showcase",
  description:
    "Personal portfolio showcasing software engineering projects, technical skills, and journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} font-[family-name:var(--font-space-grotesk)] antialiased min-h-screen flex flex-col`}
      >
        <Query>
          <AuthProvider>
            <Client>
              <Navbar />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
            </Client>
          </AuthProvider>
        </Query>
      </body>
    </html>
  );
}
