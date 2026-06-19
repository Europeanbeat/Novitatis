import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Appearances",
  description:
    "Where Novitatis shows up in public, across stages, panels, podcasts and the press.",
};

// Scaffold. New section, content to be provided. Built on the standard page
// chrome so dropping in the real content later is straightforward.
export default function AppearancesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />

      <section className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pb-28">
        {/* Hero */}
        <ScrollReveal direction="up" duration={0.8}>
          <div className="max-w-[60ch] mb-12 lg:mb-16">
            <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
              Appearances
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-[#334F5A] leading-[0.98]">
              Where we show up.
            </h1>
            <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed">
              Stages, panels, podcasts and the press. This section is being put
              together, the content is on its way.
            </p>
          </div>
        </ScrollReveal>

        {/* Placeholder state until the content is in */}
        <ScrollReveal direction="up" duration={0.8} delay={0.1}>
          <div className="rounded-3xl border border-foreground/10 bg-white p-10 lg:p-16 text-center">
            <p className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider mb-4">
              In preparation
            </p>
            <h2 className="font-display text-2xl lg:text-3xl text-[#334F5A] leading-tight max-w-[28ch] mx-auto">
              We are putting this section together.
            </h2>
            <p className="mt-5 text-[#334F5A]/70 leading-relaxed max-w-[52ch] mx-auto">
              In the meantime, see the full record of our work, or tell us what you
              are working on.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/references"
                className="inline-flex items-center gap-2 rounded-full bg-[#334F5A] text-white font-mono text-sm px-6 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                See Our Projects
                <span className="text-[#AAD7E6]">&rarr;</span>
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]/80 hover:text-[#334F5A] transition-colors px-2"
              >
                Get in touch
                <span className="text-[#AAD7E6]">&rarr;</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FooterSection />
    </main>
  );
}
