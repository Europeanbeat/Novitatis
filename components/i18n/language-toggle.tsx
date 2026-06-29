"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  locales,
  defaultLocale,
  isLocale,
  localeNames,
  localeLongNames,
} from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/use-locale";

// EN / HU switcher. Swaps only the locale segment of the current path, so the
// visitor stays on the same page in the other language.
//
// Self-contained: the control carries its OWN subtle on-brand track (tint +
// hairline + backdrop-blur, the site's "halo" move), so it reads as one
// interactive control and stays legible over the transparent animated hero AND
// inside the white scrolled pill WITHOUT a dark/light prop. Active locale = a
// solid teal chip (matching the primary CTA), never an opacity bump. Both codes
// stay full-strength teal so the inactive option clears AA contrast.
//
// size="lg" is used in the mobile menu so each cell is a >=44px touch target.
export function LanguageToggle({ size = "sm" }: { size?: "sm" | "lg" }) {
  const pathname = usePathname() ?? "/";
  const active = useLocale();

  // Strip the current locale segment to get the locale-independent path.
  const segments = pathname.split("/");
  const rest = isLocale(segments[1] ?? "") ? segments.slice(2) : segments.slice(1);
  const basePath = "/" + rest.join("/");
  const hrefFor = (loc: string) => `/${loc}${basePath === "/" ? "" : basePath}`;

  const cell =
    size === "lg"
      ? "min-h-11 min-w-[2.75rem] px-5 text-sm" // mobile: >=44px touch target
      : "h-8 px-3 text-xs"; // desktop: comfortable for pointer

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-0.5 rounded-full border border-[#334F5A]/15 bg-[#f9fbff]/85 p-0.5 font-mono backdrop-blur-sm shadow-[0_1px_2px_rgba(51,79,90,0.06)]"
    >
      {locales.map((loc) => {
        const isActive =
          loc === active || (active === defaultLocale && loc === defaultLocale);
        return (
          <Link
            key={loc}
            href={hrefFor(loc)}
            aria-current={isActive ? "page" : undefined}
            aria-label={localeLongNames[loc]}
            className={[
              "inline-flex items-center justify-center rounded-full tracking-wider tabular-nums transition-colors",
              "outline-none focus-visible:ring-2 focus-visible:ring-[#AAD7E6] focus-visible:ring-offset-1 focus-visible:ring-offset-[#f9fbff]",
              cell,
              isActive
                ? "bg-[#334F5A] text-white font-medium shadow-[0_2px_12px_-4px_rgba(170,215,230,0.6)] hover:bg-[#334F5A]/90"
                : "text-[#334F5A] hover:bg-[#AAD7E6]/25",
            ].join(" ")}
          >
            {localeNames[loc]}
          </Link>
        );
      })}
    </div>
  );
}
