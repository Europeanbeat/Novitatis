"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "./config";

// Reads the active locale from the first path segment (/en/... or /hu/...).
// Lets client chrome (navbar, footer, galleries) stay locale-aware without
// threading a prop through every component.
export function useLocale(): Locale {
  const pathname = usePathname() ?? "/";
  const seg = pathname.split("/")[1] ?? "";
  return isLocale(seg) ? seg : defaultLocale;
}

// Prefix an app-internal path ("/services") with the active locale ("/en/services").
// External URLs, hashes and mailto: links are returned unchanged.
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  return `/${locale}${href === "/" ? "" : href}`;
}
