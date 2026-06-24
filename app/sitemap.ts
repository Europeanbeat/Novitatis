import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects-content";
import { references } from "@/lib/references-content";

const BASE = "https://www.novitatis.hu";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about-us",
    "/services",
    "/services/consulting",
    "/services/development",
    "/services/education",
    "/services/public-speaking",
    "/brands",
    "/references",
    "/appearances",
    "/contact-us",
  ];

  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  // Dynamic project + event detail pages (deduped; both live under /references/<slug>)
  const slugs = Array.from(
    new Set([...projects, ...references].map((x) => x.slug)),
  );
  const detailUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/references/${slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticUrls, ...detailUrls];
}
