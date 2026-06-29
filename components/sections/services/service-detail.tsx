import { LocaleLink } from "@/components/i18n/locale-link";
import { Users, Wine, BarChart3, Scale, Bike, FileText, type LucideIcon } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { Halo } from "@/components/sections/services/_halo";
import { RelatedProjects } from "@/components/sections/services/related-projects";
import { getServicesContent } from "@/lib/services-content";
import type { Locale } from "@/lib/i18n/config";

// Per-service prose that isn't in the structured data: the opening problem beat,
// real proof points (from the Message House, .agents/messaging.md), and a
// contextual CTA. Structured fields (serves, deliverables, photo) come from
// `practices` in lib/services-content.ts.
type ProofPoint = { label: string; detail: string };
type ResearchItem = {
  icon: LucideIcon;
  tags: string[];
  year: string;
  title: string;
  excerpt: string;
  href?: string; // /references/<slug> only where a live detail page exists
};
type Extra = {
  problem: string;
  approach: string;
  proofPoints: ProofPoint[];
  research?: ResearchItem[];
  ctaHeading: string;
  ctaLine: string;
};

const extrasEn: Record<string, Extra> = {
  consulting: {
    problem:
      "Tourism development too often runs on intuition and borrowed templates. A strategy that cannot be defended in front of a board, a ministry or a funder, or that ignores how a destination actually works, reads well and then stalls on the first practical obstacle.",
    approach:
      "We start from the evidence: how a place actually works, how its providers perform, and how the people who live with tourism every day experience it, alongside the market, digital and regulatory context the decision depends on. The result is a direction you can stand behind, with the funding or grant case to support it.",
    proofPoints: [
      {
        label: "Written into national law",
        detail:
          "Our hospitality categorisation methodology was adopted directly into Hungarian national law as Government Decree 634/2020 (XII. 22.).",
      },
      {
        label: "Decision-ready feasibility",
        detail:
          "Our Lake Balaton Bike Route feasibility study and cost-benefit analysis gave a region-wide cycling investment a credible go or no-go basis.",
      },
      {
        label: "Investment supported",
        detail:
          "Our attraction-development concept underpinned a HUF 1.45bn project that opened in 2022.",
      },
    ],
    research: [
      {
        icon: Users,
        tags: ["Research & analysis", "Resident sentiment"],
        year: "2018",
        title: "Community state assessment and development strategy",
        excerpt:
          "How do the people who live with tourism actually feel about it? We surveyed community sentiment and turned it into a development strategy the destination could act on.",
      },
      {
        icon: Wine,
        tags: ["Research & analysis", "Strategy"],
        year: "2020",
        title: "Wine and gastro tourism: provider research and development plan",
        excerpt:
          "Field surveys of providers across Balaton, Tokaj and Sopron-Fertő, scored on a custom rating system, feeding grant-intervention proposals and the destination brand strategy.",
      },
      {
        icon: BarChart3,
        tags: ["Research & analysis", "Digital"],
        year: "2022",
        title: "Digital tourism research: providers online",
        excerpt:
          "A custom scoring system applied to 1,300 tourism providers to map the full online visitor journey, the first study of its kind in Hungary.",
        href: "/references/digital-hospitality-balaton-website-analysis-book-chapter",
      },
      {
        icon: Scale,
        tags: ["Research & analysis", "Policy"],
        year: "2020",
        title: "Hospitality categorisation methodology for legislation",
        excerpt:
          "A categorisation methodology and professional guidance prepared for legislative use, adopted into Hungarian national law as Government Decree 634/2020.",
      },
      {
        icon: Bike,
        tags: ["Feasibility", "Cost-benefit"],
        year: "2018",
        title: "Lake Balaton Bike Route feasibility study",
        excerpt:
          "A regional feasibility study with cost-benefit analysis that gave a major cycling investment a defensible basis; the graphic summary was picked up across the press.",
      },
      {
        icon: FileText,
        tags: ["Peer-reviewed", "Publication"],
        year: "2025",
        title: "Waiting for a click: why Balaton businesses don't sell online",
        excerpt:
          "A peer-reviewed study of 73 Lake Balaton gastro-tourism businesses: 92% have an advanced digital presence, yet only 5.5% sell online.",
        href: "/references/lake-balaton-gastro-tourism-online-sales-turizmus-bulletin-2025",
      },
    ],
    ctaHeading: "Planning a strategy, study or funding case?",
    ctaLine:
      "Tell us the decision you are facing. We will tell you what the evidence says and how we would approach it.",
  },
  development: {
    problem:
      "Tourism's digital transition is data-driven, green and practical. It happens in working systems, not one big leap. The hard part is knowing what is working, what is not, and where the real opportunities are.",
    approach:
      "We start from what your organisation actually needs, then build: digital strategy and benchmarking, websites and digital products, and practical AI that saves time rather than adding noise. No two builds are the same, so we design each to fit how you operate and deliver it through our own brands, Visible Tourism and AI4Tourism.",
    proofPoints: [
      {
        label: "Research at scale",
        detail:
          "We built a custom scoring system to map the full online visitor journey across tourism providers, the first study of its kind in Hungary.",
      },
      {
        label: "AI adoption with a real DMO",
        detail:
          "We led practical AI adoption and training with the VisitBalaton365 DMO team in 2025, turning AI from a buzzword into daily working practice.",
      },
      {
        label: "Our own brands, shipping",
        detail:
          "We run live products of our own: Visible Tourism, AI4Tourism (exhibited at ITB Berlin) and Turizmus Tudástár.",
      },
    ],
    ctaHeading: "Have a system, website or tool to build?",
    ctaLine:
      "From a pilot to a full digital workflow, tell us what you are trying to deliver and we will scope the build.",
  },
  education: {
    problem:
      "The EU Pact for Skills makes upskilling the sector for the green and digital transition a shared priority, and the gap shows on the ground every day. The most common failure, though, is that the capability leaves with the consultant: slides are forgotten, the engagement ends, and nothing changes on Monday.",
    approach:
      "We partner with organisations and teams to build that capability in-house, tailored to your region's needs and budget. Bring your hardest challenge and leave with a plan your team can run themselves. We deliver it three ways under Turizmus Tudástár: workshops, courses and one-to-one mentoring.",
    proofPoints: [
      {
        label: "A national programme, still running",
        detail:
          "We built a national training programme from the ground up, with full curriculum and entry and exit requirements, launched in April 2022 and running ever since.",
      },
      {
        label: "Workshops that leave a handbook",
        detail:
          "Our workshops ship with practical handbooks, from the online-presence session at Dobosi in 2024 to the product-development workshop in Keszthely in 2025.",
      },
      {
        label: "Capability taken to the world stage",
        detail:
          "We have carried our training and practice onto international stages including ITB Berlin, Tourism Summit and the AI Opener Bootcamp at the University of Edinburgh.",
      },
    ],
    ctaHeading: "Want to build capability in your team?",
    ctaLine:
      "From a national programme to one-to-one Google and AI mentoring, tell us who needs to learn what.",
  },
};

// Hungarian copy for the services that render through this component (development).
// Consulting and education have their own bilingual pages, so only development is
// needed here; missing keys fall back to English.
const extrasHu: Record<string, Extra> = {
  development: {
    problem:
      "A turizmus digitális átállása adatvezérelt, fenntartható és gyakorlatias. Működő rendszerekben valósul meg, nem egyetlen nagy ugrással. A nehézséget annak felismerése jelenti, mi működik, mi nem, és hol vannak a valódi lehetőségek.",
    approach:
      "Abból indulunk ki, amire a szervezetének valóban szüksége van, majd építünk: digitális stratégia és benchmarking, weboldalak és digitális termékek, valamint olyan gyakorlati AI, amely időt takarít meg, nem pedig zajt kelt. Nincs két egyforma fejlesztés, ezért mindegyiket az Ön működéséhez igazítjuk, és saját márkáinkon, a Visible Tourismon és az AI4Tourismon keresztül valósítjuk meg.",
    proofPoints: [
      {
        label: "Kutatás méretarányosan",
        detail:
          "Saját pontozórendszert építettünk a teljes online vendégút feltérképezésére, turisztikai szolgáltatók széles körében, ez volt az első ilyen kutatás Magyarországon.",
      },
      {
        label: "AI-bevezetés valódi DMO-val",
        detail:
          "2025-ben gyakorlati AI-bevezetést és -képzést valósítottunk meg a VisitBalaton365 DMO csapatával, így az AI a hívószóból napi munkagyakorlattá vált.",
      },
      {
        label: "Saját, élő márkáink",
        detail:
          "Saját, élő termékeket működtetünk: Visible Tourism, AI4Tourism (az ITB Berlinen bemutatva) és Turizmus Tudástár.",
      },
    ],
    ctaHeading: "Van rendszer, weboldal vagy eszköz, amit meg kell építeni?",
    ctaLine:
      "A pilottól a teljes digitális munkafolyamatig: mondja el, mit szeretne megvalósítani, és felmérjük a fejlesztést.",
  },
};

// Section labels and link text, by locale.
const ui = {
  en: {
    allServices: "All services",
    whatsIncluded: "What's included",
    proof: "Proof",
    whereHeld: "Where this has held up.",
    whoWeWork: "Who we work with",
    letsWork: "Let's work together",
    seeProjects: "See Our Projects",
  },
  hu: {
    allServices: "Összes szolgáltatás",
    whatsIncluded: "Mit tartalmaz",
    proof: "Bizonyíték",
    whereHeld: "Ahol ez bevált.",
    whoWeWork: "Akikkel dolgozunk",
    letsWork: "Dolgozzunk együtt",
    seeProjects: "Projektjeink megtekintése",
  },
} as const;

export function ServiceDetail({ slug, locale }: { slug: string; locale: Locale }) {
  const practice = getServicesContent(locale).practices.find((p) => p.slug === slug)!;
  const extra = (locale === "hu" ? extrasHu[slug] : undefined) ?? extrasEn[slug];
  const u = ui[locale] ?? ui.en;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />

      {/* 1 — HERO */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 pt-28 pb-14 lg:pt-32 lg:pb-16">
        <LocaleLink
          href="/services"
          className="font-mono text-sm text-[#334F5A]/70 inline-flex items-center gap-2 mb-10 hover:text-[#334F5A] transition-colors"
        >
          <span className="text-[#AAD7E6]">&larr;</span> {u.allServices}
        </LocaleLink>

        <div className="relative isolate">
          <Halo className="-inset-x-10 -inset-y-8" />
          <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
            {practice.tag}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.02] max-w-[16ch]">
            {practice.title}
          </h1>
          <p className="mt-7 font-display italic text-xl lg:text-2xl text-[#334F5A]/65 max-w-[34ch]">
            {practice.lead}
          </p>
        </div>

        <p className="mt-7 text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[62ch]">
          {practice.description}
        </p>
      </section>

      {/* 2 — THE PROBLEM / APPROACH (soft blur backing so the text never sits
          directly on the moving background lines) */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <div className="relative isolate max-w-[68ch]">
          <span
            aria-hidden
            className="absolute -inset-5 lg:-inset-7 -z-10 rounded-[2rem] bg-background/55 backdrop-blur-sm"
          />
          <div className="space-y-6 text-lg text-[#334F5A]/80 leading-relaxed">
            <p>{extra.problem}</p>
            <p>{extra.approach}</p>
          </div>
        </div>
      </section>

      {/* 3 — WHAT'S INCLUDED */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <h2 className="relative isolate font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider mb-10 w-fit">
          <Halo />
          {u.whatsIncluded}
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {practice.deliverables.map((d) => (
            <div
              key={d}
              className="rounded-2xl bg-white border border-foreground/10 p-6 lg:p-7 flex items-start gap-3"
            >
              <span className="text-[#AAD7E6] mt-1 shrink-0">—</span>
              <p className="text-[15px] text-[#334F5A]/85 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3.5 — RESEARCH & ANALYSIS (consulting only). Layout mirrors Destination
          Think: a big title, an accent feature card on the left framing the
          resident-sentiment angle, and a stacked list of our research on the right. */}
      {extra.research && (
        <section className="relative z-10 max-w-[1200px] mx-auto px-6 py-14 lg:py-20">
          <h2 className="relative isolate w-fit text-4xl md:text-6xl lg:text-[5rem] font-display text-[#334F5A] leading-[0.98] mb-10 lg:mb-14">
            <Halo />
            Research &amp; analysis.
          </h2>

          <div className="grid lg:grid-cols-[0.9fr_1.35fr] gap-8 lg:gap-12 items-start">
            {/* Left: feature / framing card */}
            <div className="rounded-3xl bg-[#334F5A] p-8 lg:p-10 text-white lg:sticky lg:top-28">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#AAD7E6] block mb-4">
                Resident sentiment &amp; policy insight
              </span>
              <p className="font-display text-2xl lg:text-3xl leading-snug mb-5">
                How do residents feel about tourism?
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Destinations that want long-term success need to understand
                tourism&apos;s impact on quality of life at home. We study resident
                sentiment, provider performance and the policy context, then turn
                the evidence into decisions leaders can defend.
              </p>
              <LocaleLink
                href="/contact-us"
                className="group inline-flex items-center gap-3 rounded-full bg-[#AAD7E6] text-[#334F5A] font-mono text-sm px-6 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Let&apos;s work together
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </LocaleLink>
            </div>

            {/* Right: stacked research list */}
            <div className="relative isolate divide-y divide-foreground/10">
              <Halo className="-inset-x-4 -inset-y-4" />
              {extra.research.map((r) => {
                const Icon = r.icon;
                const inner = (
                  <div className="group flex gap-4 lg:gap-5 py-6 first:pt-0 last:pb-0">
                    {/* Thumbnail tile */}
                    <div
                      className="shrink-0 h-20 w-20 lg:h-24 lg:w-24 rounded-2xl grid place-items-center"
                      style={{ background: "linear-gradient(135deg,#F4E4B4,#DFB552)" }}
                    >
                      <Icon className="h-7 w-7 lg:h-8 lg:w-8" strokeWidth={1.5} style={{ color: "#3a2e12" }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {r.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] font-medium uppercase tracking-wider text-[#334F5A]/85 bg-[#334F5A]/[0.08] px-2 py-0.5 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                        <span className="font-mono text-[11px] text-[#334F5A]/55">{r.year}</span>
                      </div>
                      <h3 className="font-display text-lg lg:text-xl text-[#334F5A] leading-snug transition-colors group-hover:text-[#5b94a8]">
                        {r.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#334F5A]/70 leading-relaxed">
                        {r.excerpt}
                      </p>
                      {r.href && (
                        <span className="mt-2.5 inline-flex items-center gap-2 font-mono text-xs text-[#334F5A]">
                          Read the study
                          <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1">
                            &rarr;
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                );
                return r.href ? (
                  <LocaleLink key={r.title} href={r.href} className="block">
                    {inner}
                  </LocaleLink>
                ) : (
                  <div key={r.title}>{inner}</div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4 — PROOF POINTS + WHO WE WORK WITH */}
      <section className="relative z-10 bg-[#f9fbff] border-y border-foreground/8 py-16 lg:py-24 mt-6">
        <div className="max-w-[1100px] mx-auto px-6">
          <span className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-3">
            {u.proof}
          </span>
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch] mb-10">
            {u.whereHeld}
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
            {extra.proofPoints.map((pp) => (
              <div key={pp.label} className="bg-white p-7 lg:p-8 h-full">
                <p className="font-display text-xl text-[#334F5A] leading-tight mb-3">
                  {pp.label}
                </p>
                <p className="text-[15px] text-[#334F5A]/75 leading-relaxed">
                  {pp.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Who we work with */}
          <div className="mt-12">
            <span className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-4">
              {u.whoWeWork}
            </span>
            <ul className="flex flex-wrap gap-2.5">
              {practice.serves.map((s) => (
                <li
                  key={s}
                  className="rounded-full bg-white border border-foreground/10 px-4 py-1.5 text-sm text-[#334F5A]/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5 — PROOF: case studies from the projects library */}
      <div className="relative z-10 pt-16 lg:pt-24">
        <RelatedProjects practiceSlug={slug} locale={locale} />
      </div>

      {/* 6 — CONTEXTUAL CTA */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 pb-20 lg:pb-28">
        <div className="relative isolate">
          <Halo className="-inset-x-10 -inset-y-8" />
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch]">
            {extra.ctaHeading}
          </h2>
          <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed max-w-[56ch]">
            {extra.ctaLine}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <LocaleLink
              href="/contact-us"
              className="inline-flex items-center gap-3 rounded-full bg-[#334F5A] text-white font-mono text-sm px-7 py-3.5 group"
            >
              <span>{u.letsWork}</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </LocaleLink>
            <LocaleLink
              href="/references"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]/80 hover:text-[#334F5A] transition-colors px-2"
            >
              <span>{u.seeProjects}</span>
              <span className="text-[#AAD7E6]">&rarr;</span>
            </LocaleLink>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
