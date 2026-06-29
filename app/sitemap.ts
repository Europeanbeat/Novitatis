import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects-content";
import { references } from "@/lib/references-content";
import { locales } from "@/lib/i18n/config";

const BASE = "https://www.novitatis.hu";

// Build the hreflang alternates block for a locale-independent path ("/services").
function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${BASE}/${l}${path}`;
  languages["x-default"] = `${BASE}/en${path}`;
  return { languages };
}

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

  const slugs = Array.from(
    new Set([...projects, ...references].map((x) => x.slug)),
  );
  const detailRoutes = slugs.map((slug) => `/references/${slug}`);

  // Emit one entry per (locale, path), each carrying the full hreflang set.
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticRoutes) {
    for (const l of locales) {
      entries.push({
        url: `${BASE}/${l}${path}`,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: alternates(path),
      });
    }
  }

  for (const path of detailRoutes) {
    for (const l of locales) {
      entries.push({
        url: `${BASE}/${l}${path}`,
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
