import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: "2026-11-10",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/cv`,
      lastModified: "2026-11-10",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
