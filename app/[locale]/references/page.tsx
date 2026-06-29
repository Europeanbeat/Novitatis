import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Halo } from "@/components/sections/services/_halo";
import { ProjectsGallery } from "@/components/sections/projects/projects-gallery";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDict } from "@/lib/i18n/dictionaries";
import { alternatesFor } from "@/lib/i18n/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  const t = await getDict(lang, "references");
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternatesFor(lang, "/references"),
  };
}

export default async function OurProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  const t = await getDict(lang, "references");
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />

      <section className="relative z-10 max-w-[1300px] mx-auto px-6 lg:px-12 pt-32 pb-20 lg:pb-28">
        {/* Hero */}
        <ScrollReveal direction="up" duration={0.8}>
          <div className="relative isolate max-w-[60ch] mb-10 lg:mb-14">
            <Halo />
            <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
              {t.eyebrow}
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-[#334F5A] leading-[0.98]">
              {t.heading}
            </h1>
            <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed">
              {t.intro}
            </p>
          </div>
        </ScrollReveal>

        {/* Filterable gallery */}
        <ScrollReveal direction="up" duration={0.8}>
          <ProjectsGallery />
        </ScrollReveal>
      </section>

      <FooterSection />
    </main>
  );
}
