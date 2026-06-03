import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { OurApproach } from "@/components/sections/services/our-approach";
import { ServicesReactiveBg } from "@/components/sections/services/services-reactive-bg";
import { Challenges } from "@/components/sections/services/challenges";
import { MethodSpine } from "@/components/sections/services/method-spine";
import { ClientSpectrum } from "@/components/sections/services/client-spectrum";
import { ClosingStatement } from "@/components/sections/services/closing-statement";
import { ServicesCta } from "@/components/sections/services/services-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A specialist network for the tourism sector. Consulting and strategy, development and digitalisation, education and mentoring, and public speaking, run on one research-first method.",
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />

      {/* 1 — Hero */}
      <ServicesHero />

      {/* 2 — Our approach: the framework / operating model */}
      <OurApproach />

      {/* 3 — Reactive background that gathers the lines into the services tree */}
      <ServicesReactiveBg />

      {/* 4 — The problems we solve (ref.digital-style challenge framing) */}
      <Challenges />

      {/* 5 — How an engagement runs: the method */}
      <MethodSpine />

      {/* 5 — Who we work with */}
      <ClientSpectrum />

      {/* 6 — Closing statement + single-intent CTA */}
      <ClosingStatement />
      <ServicesCta />

      <FooterSection />
    </main>
  );
}
