"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { type Project } from "@/lib/projects-content";
import { getProjects, getProjectCategories } from "@/lib/projects-i18n";
import { useLocale } from "@/lib/i18n/use-locale";

// next/link with framer-motion props, so cards animate in but navigate client-side.
const MotionLink = motion.create(Link);

export function ProjectsGallery() {
  const locale = useLocale();
  const projects = getProjects(locale);
  const projectCategories = getProjectCategories(locale);
  const [active, setActive] = useState<string>("all");
  const reduce = useReducedMotion();

  const shown =
    active === "all"
      ? projects
      : projects.filter((p) => p.pillarSlug === active);

  return (
    <div>
      {/* Filter pills — active = solid teal (brand pattern) */}
      <div className="flex flex-wrap gap-2.5 mb-8 lg:mb-10">
        {projectCategories.map((c) => {
          const isActive = active === c.slug;
          return (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`font-mono text-sm px-4 py-2 rounded-full border transition-all duration-300 ${
                isActive
                  ? "bg-[#334F5A] border-[#334F5A] text-white shadow-[0_8px_24px_-10px_rgba(51,79,90,0.5)]"
                  : "bg-white border-foreground/15 text-[#334F5A]/75 hover:border-[#334F5A]/40 hover:text-[#334F5A]"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Masonry — card height follows each image, so nothing is cropped */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {shown.map((p, i) => (
          <Card key={`${active}-${p.slug}`} p={p} i={i} reduce={!!reduce} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function Card({ p, i, reduce, locale }: { p: Project; i: number; reduce: boolean; locale: string }) {
  return (
    <MotionLink
      href={`/${locale}/references/${p.slug}`}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group mb-4 block break-inside-avoid overflow-hidden rounded-2xl bg-white border border-foreground/10 shadow-[0_30px_70px_-50px_rgba(51,79,90,0.45)] transition-all duration-300 hover:border-[#AAD7E6] hover:shadow-[0_24px_60px_-36px_rgba(51,79,90,0.4)]"
    >
      {/* Visual: the project photo (natural ratio) or a branded pillar tile */}
      {p.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.cover}
          alt={p.imageAlt || p.title}
          loading="lazy"
          className="block w-full h-auto"
        />
      ) : (
        <PillarTile pillar={p.pillar} year={p.year} />
      )}

      {/* Caption on its own white panel below the image */}
      <div className="p-4 lg:p-5">
        <span className="inline-block font-mono text-[10px] font-medium uppercase tracking-wider text-[#334F5A]/85 bg-[#334F5A]/[0.08] px-2.5 py-1 rounded-full mb-3">
          {p.pillar}
        </span>
        <h3 className="font-display text-lg lg:text-xl text-[#334F5A] leading-[1.18] line-clamp-2 break-words hyphens-auto">
          {p.title}
        </h3>
        <p className="mt-2 text-sm text-[#334F5A]/70 leading-relaxed line-clamp-2">
          {p.cardSummary}
        </p>
        {(p.year || p.location) && (
          <p className="mt-2.5 font-mono text-[11px] text-[#334F5A]/65 line-clamp-1">
            {[p.year, p.location].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </MotionLink>
  );
}

// Tile for projects without a photo: a teal panel textured with the brand line
// pattern, leading with the service pillar.
function PillarTile({ pillar, year }: { pillar: string; year: string }) {
  return (
    <div className="relative aspect-[4/3] bg-gradient-to-br from-[#3b5a66] to-[#22363f] flex flex-col items-center justify-center text-center px-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/abstract-shape.svg"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.18] mix-blend-screen pointer-events-none"
      />
      <span className="relative font-display text-white/90 leading-tight [font-size:clamp(1.25rem,2.6vw,1.9rem)]">
        {pillar}
      </span>
      {year && (
        <span className="relative mt-2 font-mono text-[11px] text-[#AAD7E6] uppercase tracking-wider">
          {year}
        </span>
      )}
    </div>
  );
}
