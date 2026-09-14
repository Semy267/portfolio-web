import { MetadataRoute } from "next";
import { configs } from "@/lib/config";

const BASE = configs.DOMAIN || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/preview/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
