import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { ServicesHero } from "@/components/sections/services/services-hero";
import { OurApproach } from "@/components/sections/services/our-approach";
import { ServicesReactiveBg } from "@/components/sections/services/services-reactive-bg";
import { ServicesShowcase } from "@/components/sections/services/services-showcase";
import { MethodSpine } from "@/components/sections/services/method-spine";
import { ClientSpectrum } from "@/components/sections/services/client-spectrum";
import { PartnersMarquee } from "@/components/sections/services/partners-marquee";
import { ServicesFaq } from "@/components/sections/services/services-faq";
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

      {/* 3 — The 72 background lines morph into the tree skeleton */}
      <ServicesReactiveBg />

      {/* 4 — Editorial showcase of the four main services */}
      <ServicesShowcase />

      {/* 5 — How an engagement runs: the method */}
      <MethodSpine />

      {/* 6 — Who we work with */}
      <ClientSpectrum />

      {/* 7 — Partner logos */}
      <PartnersMarquee />

      {/* 8 — FAQ */}
      <ServicesFaq />

      {/* 9 — Single-intent CTA */}
      <ServicesCta />

      <FooterSection />
    </main>
  );
}
