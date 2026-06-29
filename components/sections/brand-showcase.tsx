"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { Halo } from "@/components/sections/services/_halo";
import type { MapCopy } from "@/components/sections/destination-map";

// Leaflet requires browser — load with no SSR
const DestinationMap = dynamic(
  () => import("@/components/sections/destination-map").then((m) => ({ default: m.DestinationMap })),
  { ssr: false, loading: () => (
    <div className="rounded-2xl border border-foreground/10 bg-[#f0f2ee] flex items-center justify-center" style={{ height: "200px" }}>
      <div className="w-7 h-7 border-2 border-[#334F5A]/30 border-t-[#334F5A] rounded-full animate-spin" />
    </div>
  )}
);

// Display copy comes from dictionaries/{locale}/brands.json (the "brands" namespace).
// Brand names and URLs stay untranslated; everything user-visible is threaded via `t`.
type BrandsCopy = {
  showcase: {
    eyebrow: string;
    viewing: string;
    brands: { tagline: string; audience: string }[];
  };
  visibleTourism: {
    tabBusinesses: string;
    tabDestinations: string;
    visit: string;
    destinations: {
      heading: string;
      intro: string;
      deliverables: { label: string; desc: string }[];
    };
    map: MapCopy;
    business: {
      eyebrow: string;
      headingLine1: string;
      headingLine2: string;
      intro: string;
      valueCards: { title: string; desc: string }[];
      audit: {
        label: string;
        title: string;
        metaLine1: string;
        metaLine2: string;
        overallScore: string;
        scoresTitle: string;
        scoreLabels: string[];
        fixTitle: string;
        fixList: string[];
        screenshotTitle: string;
        screenshotAlt: string;
        pdfTitle: string;
        pdfItems: string[][];
        noteBefore: string;
        noteStrong: string;
        noteAfter: string;
      };
    };
  };
  turizmusTudastar: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    intro: string;
    courseLabel: string;
    courseTitle: string;
    course: string[];
    mentoringLabel: string;
    mentoringTitle: string;
    mentoring: string[];
    visit: string;
  };
  ai4tourism: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    intro: string;
    pillars: { title: string; items: string[] }[];
    visit: string;
  };
};

type BrandId = "visible-tourism" | "turizmus-tudastar" | "ai4tourism";

const brands = [
  {
    id: "visible-tourism" as BrandId,
    index: "01",
    name: "Visible Tourism",
    logo: "/images/visibletourism_logo.svg",
    logoClass: "h-16",
    url: "visibletourism.com",
  },
  {
    id: "turizmus-tudastar" as BrandId,
    index: "02",
    name: "Turizmus Tudástár",
    logo: null,
    icon: "/images/turizmus_tudastar.png",
    iconClass: "h-25",
    url: "turizmustudastar.hu",
  },
  {
    id: "ai4tourism" as BrandId,
    index: "03",
    name: "AI4Tourism",
    logo: "/images/ai4tourism-logo.png",
    logoClass: "h-8",
    url: "ai4tourism.com",
  },
];

/* ── Visible Tourism ─────────────────────────────── */

const valueAccents = [
  "border-t-2 border-t-emerald-500",
  "border-t-2 border-t-amber-500",
  "border-t-2 border-t-teal-500",
];

const scoreItems = [
  { color: "#3b82f6", score: "22/35" },
  { color: "#ef4444", score: "18/35" },
  { color: "#f59e0b", score: "13/15" },
  { color: "#10b981", score: "7/10" },
];

function VisibleTourismPanel({ t }: { t: BrandsCopy["visibleTourism"] }) {
  const [tab, setTab] = useState<"dmo" | "kkv">("kkv");
  const audit = t.business.audit;

  return (
    <div>
      {/* Tabs — businesses first */}
      <div className="flex gap-2 mb-8">
        {(["kkv", "dmo"] as const).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setTab(tabKey)}
            className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              tab === tabKey
                ? "bg-[#334F5A] text-white"
                : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"
            }`}
          >
            {tabKey === "kkv" ? t.tabBusinesses : t.tabDestinations}
          </button>
        ))}
      </div>

      {/* DMO tab */}
      {tab === "dmo" && (
        <div>
          <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] mb-4 leading-tight">
            <b>{t.destinations.heading}</b>
          </h3>
          <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed ">
            {t.destinations.intro}
          </p>

          <div className="relative mb-6">
            <img
              src="/images/abstract-shape.svg"
              loading="lazy"
              decoding="async"
              className="absolute bottom-0 left-0 right-0 w-full opacity-40 pointer-events-none [mask-image:linear-gradient(to_top,black_0%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_85%)]"
              alt=""
            />
            <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.destinations.deliverables.map((item) => (
                <div key={item.label} className="p-5 rounded-xl border border-foreground/10 bg-[#f9fbff]">
                  <div className="flex items-start gap-3">
                    <span className="text-[#AAD7E6] mt-0.5 shrink-0">—</span>
                    <div>
                      <p className="font-display text-[#334F5A] mb-1"><b>{item.label}</b></p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive destination map */}
          <DestinationMap t={t.map} />
          <div className="relative mt-6 pt-6 border-t border-foreground/8 flex items-center justify-between overflow-hidden">
            <img
              src="/images/abstract-shape.svg"
              loading="lazy"
              decoding="async"
              className="absolute bottom-0 left-0 right-0 w-full opacity-40 pointer-events-none [mask-image:linear-gradient(to_top,black_0%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_85%)]"
              alt=""
            />
            <p className="relative font-mono text-xs text-muted-foreground">visibletourism.com</p>
            <a
              href="https://visibletourism.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 text-sm font-mono text-[#334F5A] group"
            >
              {t.visit}
              <span className="text-[#AAD7E6] group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      )}

      {/* Business / KKV tab */}
      {tab === "kkv" && (
        <div>
          <p className="text-sm font-mono text-[#AAD7E6] mb-2">{t.business.eyebrow}</p>
          <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] mb-4 leading-tight">
            <b> {t.business.headingLine1}<br />{t.business.headingLine2}</b>
          </h3>
          <p className="text-muted-foreground max-w-2xl mb-6 leading-relaxed">
            {t.business.intro}
          </p>

          {/* 3 value cards */}
          <div className="relative mb-6">
            <img
              src="/images/abstract-shape.svg"
              loading="lazy"
              decoding="async"
              className="absolute bottom-0 left-0 right-0 w-full opacity-40 pointer-events-none [mask-image:linear-gradient(to_top,black_0%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_85%)]"
              alt=""
            />
            <div className="relative grid md:grid-cols-3 gap-4">
              {t.business.valueCards.map((card, i) => (
                <div
                  key={card.title}
                  className={`p-5 rounded-xl border border-foreground bg-white ${valueAccents[i]}`}
                >
                  <h4 className="font-display text-[#334F5A] mb-2"><b>{card.title}</b></h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit demo */}
          <div className="rounded-2xl border border-foreground/10 bg-[#f9fbff] overflow-hidden mb-6">

            {/* Header */}
            <div className="p-5 bg-white border-b border-slate-100 flex flex-wrap items-start gap-4 border-l-4 border-l-blue-500">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-blue-500 mb-1 uppercase tracking-wider">
                  {audit.label}
                </p>
                <h4 className="font-bold text-[#2b5fb6] text-base lg:text-lg leading-tight">
                  {audit.title}
                </h4>
                <div className="mt-2 space-y-0.5 font-mono text-xs text-slate-500">
                  <div>{audit.metaLine1}</div>
                  <div>{audit.metaLine2}</div>
                </div>
              </div>
              <div className="shrink-0 bg-white border-2 border-slate-800 rounded-xl px-4 py-3 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                  {audit.overallScore}
                </p>
                <p className="font-bold text-2xl text-slate-800">63%</p>
              </div>
            </div>

            {/* Scores + fixes */}
            <div className="grid lg:grid-cols-2 gap-4 p-5">
              {/* Donut chart */}
              <div className="bg-white rounded-xl border border-slate-100 p-5">
                <p className="font-semibold text-slate-800 text-sm pb-3 mb-4 border-b border-slate-100">
                  {audit.scoresTitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div
                    className="relative w-36 h-36 rounded-full shrink-0"
                    style={{
                      background:
                        "conic-gradient(#3b82f6 0% 36%, #ef4444 36% 65%, #f59e0b 65% 87%, #10b981 87% 100%)",
                    }}
                  >
                    <div className="absolute inset-[22px] rounded-full bg-white flex items-center justify-center font-bold text-xl text-slate-800">
                      63%
                    </div>
                  </div>
                  <ul className="space-y-2.5 flex-1 min-w-0">
                    {scoreItems.map((item, i) => (
                      <li key={audit.scoreLabels[i]} className="flex items-center gap-2 text-sm">
                        <span
                          className="w-3 h-3 rounded-sm shrink-0"
                          style={{ background: item.color }}
                        />
                        <span className="flex-1 text-slate-700 truncate">{audit.scoreLabels[i]}</span>
                        <span className="font-bold text-xs px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 shrink-0">
                          {item.score}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fix list */}
              <div className="bg-white rounded-xl border border-slate-100 p-5">
                <p className="font-semibold text-slate-800 text-sm pb-3 mb-4 border-b border-slate-100">
                  {audit.fixTitle}
                </p>
                <ol className="space-y-2.5">
                  {audit.fixList.map((fix, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="font-bold text-slate-400 text-xs mt-0.5 shrink-0 w-4">
                        {i + 1}.
                      </span>
                      {fix}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Map screenshot */}
            <div className="mx-5 rounded-xl border border-slate-100 overflow-hidden mb-5">
              <div className="px-4 py-3 bg-white border-b border-slate-100">
                <p className="font-semibold text-slate-800 text-sm">
                  {audit.screenshotTitle}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://d1yei2z3i6k35z.cloudfront.net/13808286/69c40e69eface4.85610943_Screenshot2026-03-25at17.32.51.png"
                alt={audit.screenshotAlt}
                loading="lazy"
                decoding="async"
                className="w-full object-cover max-h-64"
              />
            </div>

            {/* PDF checklist */}
            <div className="mx-5 mb-5 bg-white rounded-xl border border-slate-100 p-5">
              <h5 className="font-semibold text-slate-800 mb-4">{audit.pdfTitle}</h5>
              <div className="grid sm:grid-cols-2 gap-2">
                {audit.pdfItems.map(([bold, rest], i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2.5"
                  >
                    <svg
                      className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-slate-700">
                      <strong>{bold}</strong>
                      {rest}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500">
                {audit.noteBefore}
                <strong className="text-slate-700">{audit.noteStrong}</strong>
                {audit.noteAfter}
              </p>
            </div>
          </div>

          <div className="relative mt-6 pt-6 border-t border-foreground/8 flex items-center justify-between overflow-hidden">
            <img
              src="/images/abstract-shape.svg"
              loading="lazy"
              decoding="async"
              className="absolute bottom-0 left-0 right-0 w-full opacity-40 pointer-events-none [mask-image:linear-gradient(to_top,black_0%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_85%)]"
              alt=""
            />
            <p className="font-mono text-xs text-muted-foreground">visibletourism.com</p>
            <a
              href="https://visibletourism.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-[#334F5A] group"
            >
              {t.visit}
              <span className="text-[#AAD7E6] group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Turizmus Tudástár ───────────────────────────── */

function TurizmusTudastar({ t }: { t: BrandsCopy["turizmusTudastar"] }) {
  return (
    <div>
      <p className="text-sm font-mono text-[#AAD7E6] mb-2">{t.eyebrow}</p>
      <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] mb-4 leading-tight">
        <b>{t.headingLine1}<br />{t.headingLine2}</b>
      </h3>
      <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed">
        {t.intro}
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 rounded-xl border border-foreground/10 bg-[#f9fbff]">
          <p className="font-mono text-xs text-[#AAD7E6] mb-3">{t.courseLabel}</p>
          <h4 className="font-display text-[#334F5A] text-lg mb-4 leading-tight">
           <b> {t.courseTitle}</b>
          </h4>
          <ul className="space-y-2.5">
            {t.course.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="text-[#AAD7E6] shrink-0 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-xl border border-foreground/10 bg-[#f9fbff]">
          <p className="font-mono text-xs text-[#AAD7E6] mb-3">{t.mentoringLabel}</p>
          <h4 className="font-display text-[#334F5A] text-lg mb-4 leading-tight">
            <b> {t.mentoringTitle}</b>
          </h4>
          <ul className="space-y-2.5">
            {t.mentoring.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="text-[#AAD7E6] shrink-0 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-6 border-t border-foreground/8 flex items-center justify-between">
        <p className="font-mono text-xs text-muted-foreground">turizmustudastar.hu</p>
        <a
          href="https://turizmustudastar.hu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-[#334F5A] group"
        >
          {t.visit}
          <span className="text-[#AAD7E6] group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
}

/* ── AI4Tourism ─────────────────────────────────── */

const aiPillarNums = ["01", "02", "03"];

function AI4TourismPanel({ t }: { t: BrandsCopy["ai4tourism"] }) {
  return (
    /* Dark card with spotlight — fixed height so Spline canvas can't inflate it */
    <div className="relative rounded-2xl bg-[#334F5A] overflow-hidden h-[660px]">
      {/* Spotlight sweep */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#AAD7E6"
      />

      {/* Two-column layout — fills the fixed-height card */}
      <div className="relative z-10 flex flex-col lg:flex-row h-full">

        {/* ── Left: content ───────────────────────── */}
        <div className="lg:w-[52%] p-8 lg:p-14 flex flex-col justify-center shrink-0">
          <p className="font-mono text-xs text-[#AAD7E6]/60 mb-4 uppercase tracking-wider">
            {t.eyebrow}
          </p>

          <h3 className="text-3xl lg:text-4xl font-display text-white mb-4 leading-tight">
            {t.headingLine1}
            <br />
            {t.headingLine2}
          </h3>

          <p className="text-white/55 leading-relaxed mb-6 max-w-md text-sm">
            {t.intro}
          </p>

          {/* Three pillars */}
          <div className="space-y-2 mb-6">
            {t.pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="flex items-start gap-4 p-3.5 rounded-xl bg-white/[0.06] border border-white/10"
              >
                <span className="font-mono text-xs text-[#AAD7E6]/50 mt-0.5 shrink-0 w-5">
                  {aiPillarNums[i]}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-white text-sm mb-0.5">{pillar.title}</p>
                  <p className="text-xs text-white/35 leading-relaxed truncate">
                    {pillar.items.join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://ai4tourism.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-[#AAD7E6] hover:text-white transition-colors group w-fit"
          >
            {t.visit}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* ── Right: Spline scene ──────────────────── */}
        {/* overflow-hidden clips the canvas strictly to this box */}
        <div className="flex-1 relative overflow-hidden">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────── */

export function BrandShowcase({ t }: { t: BrandsCopy }) {
  // ONE brand is always open (UX review). Default is Visible Tourism, unless the
  // visitor arrived from a homepage brand card (/brands?brand=<id>), handled in
  // the effect below. Selecting another brand switches; it never collapses to none.
  const [activeBrand, setActiveBrand] = useState<BrandId>("visible-tourism");

  const select = (id: BrandId) => setActiveBrand(id);

  // If arriving from a homepage brand card (/brands?brand=<id>), open that brand.
  useEffect(() => {
    const sel = new URLSearchParams(window.location.search).get("brand");
    if (sel && brands.some((b) => b.id === sel)) {
      setActiveBrand(sel as BrandId);
      setTimeout(() => {
        document.getElementById("brand-showcase")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }, []);

  return (
    <div id="brand-showcase" className="scroll-mt-28">
      <span className="relative isolate font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-8 w-fit">
        <Halo />
        {t.showcase.eyebrow}
      </span>

      {/* Brand selector cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {brands.map((brand, index) => {
          const isActive = activeBrand === brand.id;
          return (
            <button
              key={brand.id}
              onClick={() => select(brand.id)}
              className={`group relative flex flex-col text-left p-8 lg:p-10 rounded-2xl border bg-white transition-all duration-400 overflow-hidden ${
                isActive
                  ? "border-[#AAD7E6] ring-2 ring-[#AAD7E6]/50 shadow-[0_4px_24px_-8px_rgba(170,215,230,0.4)]"
                  : "border-foreground/10 hover:border-foreground/30 hover:shadow-[0_8px_40px_-12px_rgba(51,79,90,0.12)]"
              }`}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-xs text-[#AAD7E6]">
                  {String(index + 1).padStart(2, "0")} / 03
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground">
                  {t.showcase.brands[index].audience}
                </span>
              </div>

              <div className="h-16 flex items-center gap-0 mb-5">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`${brand.logoClass ?? "h-8"} w-auto object-contain object-left`}
                  />
                ) : (
                  <>
                    {brand.icon && (
                      <img
                        src={brand.icon}
                        alt=""
                        className={`${brand.iconClass ?? "h-10"} w-auto object-contain shrink-0 -ml-2 -mr-3`}
                      />
                    )}
                    <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] whitespace-nowrap">
                      {brand.name}
                    </h3>
                  </>
                )}
              </div>
              <p className="text-sm font-mono text-muted-foreground mb-8 flex-1">
                {t.showcase.brands[index].tagline}
              </p>

              <span className="inline-flex items-center justify-between gap-2 text-sm font-mono text-[#334F5A]">
                {isActive ? t.showcase.viewing : brand.url}
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#AAD7E6] text-[#334F5A] transition-transform duration-300 ${
                    isActive ? "rotate-180" : "group-hover:translate-x-1"
                  }`}
                >
                  {isActive ? "↑" : "→"}
                </span>
              </span>

              {/* Active bottom bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#AAD7E6] transition-transform duration-500 origin-left ${
                  isActive ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Expanding panel */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          activeBrand ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-4 rounded-2xl border border-foreground/10 bg-white p-8 lg:p-10">
            {activeBrand === "visible-tourism" && <VisibleTourismPanel t={t.visibleTourism} />}
            {activeBrand === "turizmus-tudastar" && <TurizmusTudastar t={t.turizmusTudastar} />}
            {activeBrand === "ai4tourism" && <AI4TourismPanel t={t.ai4tourism} />}
          </div>
        </div>
      </div>
    </div>
  );
}
