import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { primeVideos } from "@/data/prime-videos";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/films`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/studio`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/process`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/collaborate`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const filmRoutes: MetadataRoute.Sitemap = primeVideos.map((video) => ({
    url: `${site.url}/films/${video.slug}`,
    changeFrequency: "monthly",
    priority: video.featured ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...filmRoutes];
}
