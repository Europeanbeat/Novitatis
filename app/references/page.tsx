import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Halo } from "@/components/sections/services/_halo";
import { ReferencesGallery } from "@/components/sections/references/references-gallery";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Our work across strategy, development, talks, workshops and publications. Filter the record behind our method.",
};

export default function ReferencesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />

      <section className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pb-28">
        {/* Hero */}
        <ScrollReveal direction="up" duration={0.8}>
          <div className="relative isolate max-w-[58ch] mb-10 lg:mb-14">
            <Halo />
            <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
              Our Projects
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-[#334F5A] leading-[0.98]">
              The work behind the words.
            </h1>
            <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed">
              A record of our work, from strategy and development to talks, workshops
              and publications. Filter to the kind you need.
            </p>
          </div>
        </ScrollReveal>

        {/* Filterable masonry gallery */}
        <ScrollReveal direction="up" duration={0.8}>
          <ReferencesGallery />
        </ScrollReveal>
      </section>

      <FooterSection />
    </main>
  );
}
