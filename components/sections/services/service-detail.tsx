import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { Halo } from "@/components/sections/services/_halo";
import { RelatedProjects } from "@/components/sections/services/related-projects";
import { practices } from "@/lib/services-content";

// Per-service prose that isn't in the structured data: the opening problem beat,
// real proof points (from the Message House, .agents/messaging.md), and a
// contextual CTA. Structured fields (serves, deliverables, photo) come from
// `practices` in lib/services-content.ts.
type ProofPoint = { label: string; detail: string };
type Extra = {
  problem: string;
  approach: string;
  proofPoints: ProofPoint[];
  ctaHeading: string;
  ctaLine: string;
};

const extras: Record<string, Extra> = {
  consulting: {
    problem:
      "Tourism development too often runs on intuition and borrowed templates. A strategy that cannot be defended in front of a board, a ministry or a funder, or that ignores how a destination actually works, reads well and then stalls on the first practical obstacle.",
    approach:
      "We start from the evidence: field research, market and digital-presence analysis, and the regulatory context the decision depends on. The result is a direction you can stand behind, with the funding or grant case to support it.",
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
    ctaHeading: "Planning a strategy, study or funding case?",
    ctaLine:
      "Tell us the decision you are facing. We will tell you what the evidence says and how we would approach it.",
  },
  development: {
    problem:
      "A validated idea is worth nothing until it runs. Most tourism organisations do not need more software, they need systems that fit how they actually operate, and AI adoption that saves time rather than adding noise.",
    approach:
      "We build from the strategy, not around a product: digital process design, pilot projects and practical AI, delivered where it fits through our own brands, Visible Tourism and ai4tourism. Each build is measured against the goal it was meant to serve.",
    proofPoints: [
      {
        label: "Research at scale",
        detail:
          "We scored 1,300 tourism providers on a custom system mapping the full online visitor journey, the first study of its kind in Hungary.",
      },
      {
        label: "AI adoption with a real DMO",
        detail:
          "We led practical AI adoption and training with the VisitBalaton365 DMO team in 2025, turning AI from a buzzword into daily working practice.",
      },
      {
        label: "Our own brands, shipping",
        detail:
          "We run live products of our own: Visible Tourism, ai4tourism (exhibited at ITB Berlin) and Turizmus Tudástár.",
      },
    ],
    ctaHeading: "Have a system or tool you need built?",
    ctaLine:
      "From a pilot to a full digital workflow, tell us what you are trying to deliver and we will scope the build.",
  },
  education: {
    problem:
      "The most common failure in tourism consulting is that the capability leaves with the consultant. Slides are forgotten, the engagement ends, and nothing changes on Monday.",
    approach:
      "We design education that holds: national curricula, hands-on workshops with handbooks and one-to-one mentoring under Turizmus Tudástár, so your team can run the work themselves once we step back.",
    proofPoints: [
      {
        label: "A national programme, still running",
        detail:
          "We built a national training programme from the ground up, with full curriculum and entry and exit requirements, launched in April 2022 and running ever since.",
      },
      {
        label: "Workshops that leave a handbook",
        detail:
          "Our hands-on workshops ship with practical handbooks, from the online-presence session at Dobosi in 2024 to the product-development workshop in Keszthely in 2025.",
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

export function ServiceDetail({ slug }: { slug: string }) {
  const practice = practices.find((p) => p.slug === slug)!;
  const extra = extras[slug];

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />

      {/* 1 — HERO */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 pt-28 pb-14 lg:pt-32 lg:pb-16">
        <Link
          href="/services"
          className="font-mono text-sm text-[#334F5A]/70 inline-flex items-center gap-2 mb-10 hover:text-[#334F5A] transition-colors"
        >
          <span className="text-[#AAD7E6]">&larr;</span> All services
        </Link>

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
        <h2 className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider mb-10">
          What&apos;s included
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

      {/* 4 — PROOF POINTS + WHO WE WORK WITH */}
      <section className="relative z-10 bg-[#f9fbff] border-y border-foreground/8 py-16 lg:py-24 mt-6">
        <div className="max-w-[1100px] mx-auto px-6">
          <span className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-3">
            Proof
          </span>
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch] mb-10">
            Where this has held up.
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
              Who we work with
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
        <RelatedProjects practiceSlug={slug} />
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
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 rounded-full bg-[#334F5A] text-white font-mono text-sm px-7 py-3.5 group"
            >
              <span>Get in touch</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
            <Link
              href="/references"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]/80 hover:text-[#334F5A] transition-colors px-2"
            >
              <span>See Our Projects</span>
              <span className="text-[#AAD7E6]">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
