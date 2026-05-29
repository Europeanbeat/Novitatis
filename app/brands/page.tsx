import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { PageBackground } from "@/components/layout/page-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Novitatis operates three focused brands — Visible Tourism, Turizmus Tudástár, and AI4Tourism — each built to close tourism's digital gap at a different scale.",
};

const layers = [
  {
    number: "01",
    level: "Destination level",
    problem: "Destinations are invisible before the first click.",
    body: "Over 60% of travel searches end without a click. If a destination isn't present in Google Maps, Street View, and AI search results, it loses visitors before any campaign even starts. Visible Tourism builds that infrastructure — mapped routes, corrected data, 360° content, structured listings.",
    brand: "Visible Tourism",
    url: "visibletourism.com",
    for: "DMOs · TDMs · Regional boards",
  },
  {
    number: "02",
    level: "Business level",
    problem: "Businesses lose direct bookings to platforms.",
    body: "Hotels, restaurants, and attractions hand over guests — and commission — to booking platforms because their own Google presence is incomplete. An optimised, well-managed Google Business Profile changes that. Turizmus Tudástár gives tourism SMEs exactly that knowledge, through a structured course and one-on-one mentoring.",
    brand: "Turizmus Tudástár",
    url: "turizmustudastar.hu",
    for: "Hotels · Restaurants · Attractions · SMEs",
  },
  {
    number: "03",
    level: "Sector level",
    problem: "AI is already deciding what travellers discover.",
    body: "Search engines, booking assistants, and recommendation tools are all shifting toward AI. Tourism players who don't understand and use these tools fall behind the ones who do. AI4Tourism makes that transition practical — from first experiments to confident daily use, for businesses and organisations alike.",
    brand: "AI4Tourism",
    url: "ai4tourism.com",
    for: "All tourism players",
  },
];

const brandLinks = [
  {
    name: "Visible Tourism",
    url: "visibletourism.com",
    tagline: "Google infrastructure for destinations",
    audience: "TDM · DMO",
  },
  {
    name: "Turizmus Tudástár",
    url: "turizmustudastar.hu",
    tagline: "Knowledge platform & GBP mentoring",
    audience: "Tourism SMEs",
  },
  {
    name: "AI4Tourism",
    url: "ai4tourism.com",
    tagline: "AI Mentoring Program",
    audience: "Tourism players",
  },
];

export default function BrandsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PageBackground />
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-16">
        <ScrollReveal direction="up" duration={0.7}>
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-12 h-px bg-foreground/30" />
            Brand portfolio
          </span>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" duration={1} delay={0.05}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] mb-8">
                Three brands,
                <br />
                <span className="text-muted-foreground">one problem to solve.</span>
              </h1>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5 lg:pb-3">
            <ScrollReveal direction="up" duration={0.9} delay={0.15}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Tourism&apos;s digital gap isn&apos;t one problem — it shows up differently
                at destination, business, and sector level. Novitatis built a focused brand
                for each.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Dark statement section ───────────────────────── */}
      <section className="relative z-10 bg-[#334F5A] px-6 lg:px-12 py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto">

          {/* Intro line */}
          <ScrollReveal direction="up" duration={0.7}>
            <div className="flex items-center gap-4 mb-16">
              <span className="w-12 h-px bg-white/30" />
              <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                The gap they close
              </span>
            </div>
          </ScrollReveal>

          {/* Three layers */}
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-0 lg:divide-x divide-white/10">
            {layers.map((layer, index) => (
              <ScrollReveal key={layer.number} direction="up" duration={0.9} delay={index * 0.1}>
              <div className="lg:px-10 first:lg:pl-0 last:lg:pr-0">
                {/* Number + level */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-mono text-xs text-[#AAD7E6]/70">
                    {layer.number}
                  </span>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                    {layer.level}
                  </span>
                </div>

                {/* Problem — the hook */}
                <h2 className="text-2xl lg:text-3xl font-display text-white leading-tight mb-5">
                  {layer.problem}
                </h2>

                {/* Solution body */}
                <p className="text-sm text-white/55 leading-relaxed mb-8">
                  {layer.body}
                </p>

                {/* Brand footer */}
                <div className="border-t border-white/10 pt-6 space-y-2">
                  <div className="font-display text-lg text-white/90">{layer.brand}</div>
                  <div className="font-mono text-[10px] text-white/35 uppercase tracking-wider">
                    {layer.for}
                  </div>
                  <a
                    href={`https://${layer.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#AAD7E6] hover:text-white transition-colors mt-1"
                  >
                    {layer.url}
                    <span>→</span>
                  </a>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Novitatis builds this way ────────────────── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ScrollReveal direction="up" duration={1}>
            <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight">
              Shared purpose,
              <br />
              separate focus.
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" duration={0.9} delay={0.1}>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                A DMO&apos;s visibility problem is not the same as a hotel&apos;s
                conversion problem — and neither is the same as an organisation that
                doesn&apos;t know where AI fits into its workflow. One service trying to
                serve all three would serve none of them well.
              </p>
              <p>
                So Novitatis operates as a network of focused brands. Each one is built
                for a specific audience, uses methods suited to that scale, and delivers
                results that can be measured at that level. The strategy behind them is
                shared. The execution is precise.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Visit the brands ─────────────────────────────── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        <ScrollReveal direction="up" duration={0.7}>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-8">
            Visit the brands
          </span>
        </ScrollReveal>
        <div className="grid lg:grid-cols-3 gap-6">
          {brandLinks.map((brand, index) => (
            <ScrollReveal key={brand.name} direction="up" duration={0.85} delay={index * 0.1} scale={0.97}>
              <a
                href={`https://${brand.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col h-full p-8 lg:p-10 rounded-2xl border border-foreground/10 bg-white transition-all duration-500 hover:border-foreground/30 hover:shadow-[0_8px_40px_-12px_rgba(51,79,90,0.18)] hover:-translate-y-1 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-xs text-[#AAD7E6]">
                    {String(index + 1).padStart(2, "0")} / 03
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground">
                    {brand.audience}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] mb-2 group-hover:translate-x-1 transition-transform duration-500">
                  {brand.name}
                </h3>
                <p className="text-sm font-mono text-muted-foreground mb-8 flex-1">
                  {brand.tagline}
                </p>

                <span className="inline-flex items-center justify-between gap-2 text-sm font-mono text-[#334F5A]">
                  {brand.url}
                  <span className="text-[#AAD7E6] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#AAD7E6] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
