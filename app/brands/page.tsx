import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BrandShowcase } from "@/components/sections/brand-showcase";
import { Halo } from "@/components/sections/services/_halo";

export const metadata: Metadata = {
  title: "Our Brands",
  description:
    "Novitatis operates three focused brands, Visible Tourism, Turizmus Tudástár and AI4Tourism, each built to close tourism's digital gap at a different scale.",
};


export default function BrandsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-16">
        <ScrollReveal direction="up" duration={0.7}>
          <span className="relative isolate inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <Halo />
            <span className="w-12 h-px bg-foreground/30" />
            Brand portfolio
          </span>
        </ScrollReveal>
      </section>


      {/* ── Why Novitatis builds this way ────────────────── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ScrollReveal direction="up" duration={1}>
            <h1 className="relative text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight isolate">
              <span
                aria-hidden
                className="absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
              />
              Shared purpose,
              <br />
              separate focus.
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" duration={0.9} delay={0.1}>
            <div className="relative space-y-5 text-muted-foreground leading-relaxed isolate">
              <span
                aria-hidden
                className="absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
              />
              <p>
                A DMO&apos;s visibility problem is not the same as a hotel&apos;s
                 conversion problem, and neither is the same as an organisation that
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
          <BrandShowcase />
        </ScrollReveal>
      </section>

      <FooterSection />
    </main>
  );
}
