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
import { getDict } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  const t = await getDict(lang, "services");
  return { title: t.meta.overview.title, description: t.meta.overview.description, alternates: alternatesFor(lang, "/services") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />

      {/* 1 — Hero */}
      <ServicesHero locale={lang} />

      {/* 2 — Our approach: the framework / operating model */}
      <OurApproach locale={lang} />

      {/* 3 — The 72 background lines morph into the tree skeleton */}
      <ServicesReactiveBg />

      {/* 4 — Editorial showcase of the four main services */}
      <ServicesShowcase />

      {/* 5 — How an engagement runs: the method */}
      <MethodSpine />

      {/* 6 — Who we work with */}
      <ClientSpectrum locale={lang} />

      {/* 7 — Partner logos */}
      <PartnersMarquee locale={lang} />

      {/* 8 — FAQ */}
      <ServicesFaq />

      {/* 9 — Single-intent CTA */}
      <ServicesCta locale={lang} />

      <FooterSection />
    </main>
  );
}
