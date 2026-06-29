import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { BrandsSection } from "@/components/sections/brands-section";
import { SelectedWork } from "@/components/sections/selected-work";
import { AudienceSection } from "@/components/sections/audience-section";
import { PartnersMarquee } from "@/components/sections/services/partners-marquee";
import { CtaSection } from "@/components/sections/cta-section";
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
  const t = await getDict(lang, "home");
  return { title: t.meta.title, description: t.meta.description, alternates: alternatesFor(lang, "") };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  const t = await getDict(lang, "home");

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground animated />
      <HeroSection t={t.hero} />
      <FeaturesSection t={t.features} />
      <HowItWorksSection t={t.howItWorks} />
      <BrandsSection t={t.brands} />
      <SelectedWork t={t.selectedWork} locale={lang} />
      <AudienceSection t={t.audience} />
      <PartnersMarquee locale={lang} />
      <CtaSection t={t.cta} />
      <FooterSection />
    </main>
  );
}
