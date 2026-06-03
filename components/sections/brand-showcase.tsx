"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";

// Leaflet requires browser — load with no SSR
const DestinationMap = dynamic(
  () => import("@/components/sections/destination-map").then((m) => ({ default: m.DestinationMap })),
  { ssr: false, loading: () => (
    <div className="rounded-2xl border border-foreground/10 bg-[#f0f2ee] flex items-center justify-center" style={{ height: "200px" }}>
      <div className="w-7 h-7 border-2 border-[#334F5A]/30 border-t-[#334F5A] rounded-full animate-spin" />
    </div>
  )}
);

type BrandId = "visible-tourism" | "turizmus-tudastar" | "ai4tourism";

const brands = [
  {
    id: "visible-tourism" as BrandId,
    index: "01",
    name: "Visible Tourism",
    logo: "/images/visibletourism_logo.svg",
    logoClass: "h-16",
    url: "visibletourism.com",
    tagline: "Google infrastructure for destinations",
    audience: "TDM · DMO · Tourism businesses",
  },
  {
    id: "turizmus-tudastar" as BrandId,
    index: "02",
    name: "Turizmus Tudástár",
    logo: null,
    icon: "/images/turizmus_tudastar.png",
    iconClass: "h-20",
    url: "turizmustudastar.hu",
    tagline: "Knowledge platform & GBP mentoring",
    audience: "Tourism SMEs",
  },
  {
    id: "ai4tourism" as BrandId,
    index: "03",
    name: "AI4Tourism",
    logo: "/images/ai4tourism-logo.png",
    logoClass: "h-10",
    url: "ai4tourism.com",
    tagline: "AI Mentoring Program",
    audience: "Tourism players",
  },
];

/* ── Visible Tourism ─────────────────────────────── */

const dmoDeliverables = [
  { label: "Route & trail mapping", desc: "Every path and attraction mapped and verified inside Google Maps." },
  { label: "Data corrections", desc: "Business names, addresses, categories and hours corrected at scale." },
  { label: "360° content", desc: "Street View and virtual tours published for destinations and venues." },
  { label: "Structured listings", desc: "Google Business Profiles built and optimised for every key attraction." },
  { label: "AI search presence", desc: "Structured data ensuring the destination appears in AI-powered travel discovery." },
];

const valueCards = [
  {
    title: "Scores by category",
    desc: "Transparent scoring across basic info, photos, reviews and map presence.",
    accent: "border-t-2 border-t-emerald-500",
  },
  {
    title: "Detailed error list",
    desc: "A full list with screenshots of every issue found (e.g. price level, 360° photo, name consistency).",
    accent: "border-t-2 border-t-amber-500",
  },
  {
    title: "Improvement suggestions",
    desc: "Clear action steps: photo refresh, posts, Q&A, attribute completion, competitor comparison.",
    accent: "border-t-2 border-t-teal-500",
  },
];

const scoreItems = [
  { color: "#3b82f6", label: "Basic information", score: "22/35" },
  { color: "#ef4444", label: "Photos & media", score: "18/35" },
  { color: "#f59e0b", label: "Reviews & reputation", score: "13/15" },
  { color: "#10b981", label: "Map presence", score: "7/10" },
];

const fixList = [
  "Unify NAP data across all platforms",
  "Immediately add price level, phone number and website link",
  "Upload a 360° virtual tour",
  "Introduce a review response process (respond within 24 hours)",
  "Complete all attributes in full",
  "Regularly refresh photo and video content",
];

const pdfItems: [string, string][] = [
  ["Scores", " broken down by category (info, photos, reviews, map)"],
  ["Error list", " with screenshots of every issue"],
  ["Strengths & weaknesses", " summary"],
  ["Price & competitor comparison", " in the region"],
  ["Improvement recommendations", " for profile optimisation"],
  ["Additional insights", " to help gain a competitive edge"],
];

function VisibleTourismPanel() {
  const [tab, setTab] = useState<"dmo" | "kkv">("kkv");

  return (
    <div>
      {/* Tabs — businesses first */}
      <div className="flex gap-2 mb-8">
        {(["kkv", "dmo"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
              tab === t
                ? "bg-[#334F5A] text-white"
                : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"
            }`}
          >
            {t === "kkv" ? "For businesses" : "For destinations"}
          </button>
        ))}
      </div>

      {/* DMO tab */}
      {tab === "dmo" && (
        <div>
          <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] mb-4 leading-tight">
            <b>What&apos;s not on Google Maps doesn&apos;t exist.</b>
          </h3>
          <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed ">
            Google Maps is the primary navigation tool for travellers. Our team
            works directly on Google Maps to improve the accuracy and quality of
            your destination&apos;s data: adding missing points of interest,
            streets, trails, viewpoints and 360° Street View imagery. Most
            destinations have visibility gaps that affect how travellers discover
            and plan their trips before arrival, as well as how they navigate
            once in the area.
          </p>

          <div className="relative mb-6">
            <img
              src="/images/abstract-shape.svg"
              className="absolute bottom-0 left-0 right-0 w-full opacity-40 pointer-events-none [mask-image:linear-gradient(to_top,black_0%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_85%)]"
              alt=""
            />
            <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dmoDeliverables.map((item) => (
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
          <DestinationMap />
          <div className="relative mt-6 pt-6 border-t border-foreground/8 flex items-center justify-between overflow-hidden">
            <img
              src="/images/abstract-shape.svg"
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
              Visit Visible Tourism
              <span className="text-[#AAD7E6] group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      )}

      {/* Business / KKV tab */}
      {tab === "kkv" && (
        <div>
          <p className="text-sm font-mono text-[#AAD7E6] mb-2">Business level · GBP audit & mentoring</p>
          <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] mb-4 leading-tight">
            <b> Google profile audit<br />for tourism businesses.</b> 
          </h3>
          <p className="text-muted-foreground max-w-2xl mb-6 leading-relaxed">
            60% of travel searches end without a click. The decision is made
            directly on Google, before a visitor ever reaches your website or booking
            page. Hotels, restaurants and attractions that hand over that moment to
            incomplete profiles lose guests to better-optimised competitors. We audit
            the profile, deliver a full report and walk through every fix on Zoom.
          </p>

          {/* 3 value cards */}
          <div className="relative mb-6">
            <img
              src="/images/abstract-shape.svg"
              className="absolute bottom-0 left-0 right-0 w-full opacity-40 pointer-events-none [mask-image:linear-gradient(to_top,black_0%,transparent_85%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_85%)]"
              alt=""
            />
            <div className="relative grid md:grid-cols-3 gap-4">
              {valueCards.map((card) => (
                <div
                  key={card.title}
                  className={`p-5 rounded-xl border border-foreground bg-white ${card.accent}`}
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
                  Audit report: sample extract
                </p>
                <h4 className="font-bold text-[#2b5fb6] text-base lg:text-lg leading-tight">
                  Google Business Profile audit: Sample Boutique Hotel &amp; Restaurant
                </h4>
                <div className="mt-2 space-y-0.5 font-mono text-xs text-slate-500">
                  <div>Address: Tokaj-Hegyalja region · Place ID: test_8f3a21e9</div>
                  <div>AI model: Gemini · Coverage radius: 50 km</div>
                </div>
              </div>
              <div className="shrink-0 bg-white border-2 border-slate-800 rounded-xl px-4 py-3 text-center">
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                  Overall score
                </p>
                <p className="font-bold text-2xl text-slate-800">63%</p>
              </div>
            </div>

            {/* Scores + fixes */}
            <div className="grid lg:grid-cols-2 gap-4 p-5">
              {/* Donut chart */}
              <div className="bg-white rounded-xl border border-slate-100 p-5">
                <p className="font-semibold text-slate-800 text-sm pb-3 mb-4 border-b border-slate-100">
                  Scores by category
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
                    {scoreItems.map((item) => (
                      <li key={item.label} className="flex items-center gap-2 text-sm">
                        <span
                          className="w-3 h-3 rounded-sm shrink-0"
                          style={{ background: item.color }}
                        />
                        <span className="flex-1 text-slate-700 truncate">{item.label}</span>
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
                  Quick fix priority list
                </p>
                <ol className="space-y-2.5">
                  {fixList.map((fix, i) => (
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
                  Screenshot sample (Google Maps view)
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://d1yei2z3i6k35z.cloudfront.net/13808286/69c40e69eface4.85610943_Screenshot2026-03-25at17.32.51.png"
                alt="Google Maps screenshot, audit sample"
                className="w-full object-cover max-h-64"
              />
            </div>

            {/* PDF checklist */}
            <div className="mx-5 mb-5 bg-white rounded-xl border border-slate-100 p-5">
              <h5 className="font-semibold text-slate-800 mb-4">What&apos;s in the PDF report?</h5>
              <div className="grid sm:grid-cols-2 gap-2">
                {pdfItems.map(([bold, rest], i) => (
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
                We send the report, then{" "}
                <strong className="text-slate-700">walk through it together on Zoom</strong>{" "}
                so every action step is clear.
              </p>
            </div>
          </div>

          <div className="relative mt-6 pt-6 border-t border-foreground/8 flex items-center justify-between overflow-hidden">
            <img
              src="/images/abstract-shape.svg"
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
              Visit Visible Tourism
              <span className="text-[#AAD7E6] group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Turizmus Tudástár ───────────────────────────── */

const ttCourse = [
  "Complete profile setup & verification",
  "Photo strategy & media management",
  "Review response system",
  "Local SEO & competitor analysis",
  "Posts, Q&A and attribute optimisation",
];

const ttMentoring = [
  "Full GBP audit with scoring",
  "Detailed error report with screenshots",
  "Strengths & weaknesses summary",
  "Priority fix list",
  "Zoom session to walk through findings",
];

function TurizmusTudastar() {
  return (
    <div>
      <p className="text-sm font-mono text-[#AAD7E6] mb-2">Business level · Hungary</p>
      <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] mb-4 leading-tight">
        <b>Knowledge & mentoring<br />for tourism SMEs.</b>
      </h3>
      <p className="text-muted-foreground max-w-2xl mb-8 leading-relaxed">
        Hotels, restaurants and attractions lose direct bookings to platforms
        because they don&apos;t know how to manage their Google presence.
        Turizmus Tudástár fixes that: a structured course and
        one-on-one personal mentoring.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 rounded-xl border border-foreground/10 bg-[#f9fbff]">
          <p className="font-mono text-xs text-[#AAD7E6] mb-3">01 / Online course</p>
          <h4 className="font-display text-[#334F5A] text-lg mb-4 leading-tight">
           <b> Google Business Profile: from zero to optimised</b>
          </h4>
          <ul className="space-y-2.5">
            {ttCourse.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <span className="text-[#AAD7E6] shrink-0 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-xl border border-foreground/10 bg-[#f9fbff]">
          <p className="font-mono text-xs text-[#AAD7E6] mb-3">02 / 1-on-1 mentoring</p>
          <h4 className="font-display text-[#334F5A] text-lg mb-4 leading-tight">
            <b> Personal profile audit & Zoom review</b>
          </h4>
          <ul className="space-y-2.5">
            {ttMentoring.map((item) => (
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
          Visit Turizmus Tudástár
          <span className="text-[#AAD7E6] group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </div>
  );
}

/* ── AI4Tourism ─────────────────────────────────── */

const aiPillars = [
  {
    num: "01",
    title: "Tool discovery",
    items: ["Map your business needs", "Match to the right AI tools", "Cut through market noise"],
  },
  {
    num: "02",
    title: "Education",
    items: ["Understand what each tool does", "Hands-on guidance for your team", "Build confident daily use"],
  },
  {
    num: "03",
    title: "Marketplace",
    items: ["Vetted technology providers", "Direct connections to builders", "Tools made for tourism"],
  },
];

function AI4TourismPanel() {
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
            Sector level · AI for tourism businesses
          </p>

          <h3 className="text-3xl lg:text-4xl font-display text-white mb-4 leading-tight">
            The right AI tool
            <br />
            for the right problem.
          </h3>

          <p className="text-white/55 leading-relaxed mb-6 max-w-md text-sm">
            Hundreds of AI tools exist. Most tourism businesses don&apos;t know
            which ones actually solve their problems. AI4Tourism is the bridge
            between technology providers and tourism businesses: mapping your
            needs, finding the right tool and connecting you directly with the
            people who build it.
          </p>

          {/* Three pillars */}
          <div className="space-y-2 mb-6">
            {aiPillars.map((pillar) => (
              <div
                key={pillar.num}
                className="flex items-start gap-4 p-3.5 rounded-xl bg-white/[0.06] border border-white/10"
              >
                <span className="font-mono text-xs text-[#AAD7E6]/50 mt-0.5 shrink-0 w-5">
                  {pillar.num}
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
            Visit ai4tourism.com
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

export function BrandShowcase() {
  const [activeBrand, setActiveBrand] = useState<BrandId | null>(null);

  const toggle = (id: BrandId) => {
    setActiveBrand((prev) => (prev === id ? null : id));
  };

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
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-8">
        Visit the brands
      </span>

      {/* Brand selector cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {brands.map((brand, index) => {
          const isActive = activeBrand === brand.id;
          return (
            <button
              key={brand.id}
              onClick={() => toggle(brand.id)}
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
                  {brand.audience}
                </span>
              </div>

              <div className="h-16 flex items-center gap-3 mb-5">
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
                        className={`${brand.iconClass ?? "h-10"} w-auto object-contain shrink-0 -ml-2`}
                      />
                    )}
                    <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] whitespace-nowrap">
                      {brand.name}
                    </h3>
                  </>
                )}
              </div>
              <p className="text-sm font-mono text-muted-foreground mb-8 flex-1">
                {brand.tagline}
              </p>

              <span className={`inline-flex items-center justify-between gap-2 text-sm font-mono transition-colors duration-300 ${isActive ? "text-[#334F5A]" : "text-[#334F5A]"}`}>
                {isActive ? "Close" : brand.url}
                <span
                  className={`text-[#AAD7E6] transition-transform duration-300 ${
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
            {activeBrand === "visible-tourism" && <VisibleTourismPanel />}
            {activeBrand === "turizmus-tudastar" && <TurizmusTudastar />}
            {activeBrand === "ai4tourism" && <AI4TourismPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
