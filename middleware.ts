import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";

// Pick a locale for a locale-less request. Honour the browser's Accept-Language
// when it asks for Hungarian; otherwise default to English (the primary site).
function detectLocale(req: NextRequest): string {
  const header = (req.headers.get("accept-language") ?? "").toLowerCase();
  if (header.includes("hu")) return "hu";
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and any path with a file extension
  // (images, PDFs, sitemap.xml, robots.txt, etc.).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
