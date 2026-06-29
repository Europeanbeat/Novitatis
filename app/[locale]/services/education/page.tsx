import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { LocaleLink } from "@/components/i18n/locale-link";
import { RelatedProjects } from "@/components/sections/services/related-projects";
import { BrandCards } from "@/components/sections/services/brand-cards";
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
  return { title: t.meta.education.title, description: t.meta.education.description, alternates: alternatesFor(lang, "/services/education") };
}

const halo =
  "absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]";

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  const t = await getDict(lang, "services");
  const e = t.education;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />

      {/* 1 — HERO */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 pt-28 pb-8 lg:pt-32 lg:pb-10">
        <LocaleLink
          href="/services"
          className="font-mono text-sm text-[#334F5A]/70 inline-flex items-center gap-2 mb-10 hover:text-[#334F5A] transition-colors"
        >
          <span className="text-[#AAD7E6]">&larr;</span> {t.common.allServices}
        </LocaleLink>

        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
            {e.eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.04] max-w-[20ch]">
            {e.heroTitle}
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[64ch]">
            {e.heroLead}
          </p>
        </div>

        <div className="relative isolate w-fit mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-[#334F5A]/70">
          <span aria-hidden className={halo} />
          <a href="#what" className="hover:text-[#334F5A] transition-colors">
            {e.navWhatWeDo}
          </a>
          <span className="text-[#AAD7E6]">·</span>
          <a href="#brands" className="hover:text-[#334F5A] transition-colors">
            {e.navOurBrands}
          </a>
        </div>
      </section>

      {/* 2 — WHAT WE DO */}
      <section
        id="what"
        className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      >
        <h2 className="relative isolate w-fit font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-10 lg:mb-12">
          <span aria-hidden className={halo} />
          {t.common.whatWeDo}
        </h2>
        <div className="grid gap-4">
          {e.services.map((s, i) => (
            <div
              key={s.title}
              className="grid md:grid-cols-12 gap-y-4 gap-x-8 lg:gap-x-12 rounded-2xl bg-white border border-foreground/10 p-6 lg:p-8"
            >
              <div className="md:col-span-5 flex items-start gap-5">
                <span className="font-mono text-sm text-[#AAD7E6] pt-1.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl lg:text-[2.5rem] leading-[1.05] text-[#334F5A] break-words hyphens-auto">
                  {s.title}
                </h3>
              </div>
              <div className="md:col-span-7 md:pt-1.5">
                <p className="text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[56ch]">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — OUR BRANDS */}
      <section
        id="brands"
        className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      >
        <span className="relative isolate w-fit font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-8">
          <span aria-hidden className={halo} />
          {e.ourBrands}
        </span>
        <BrandCards locale={lang} />
      </section>

      {/* 4 — OUR PROJECTS: the specific trainings live here */}
      <div className="relative z-10 pt-12 lg:pt-20">
        <RelatedProjects practiceSlug="education" locale={lang} />
      </div>

      {/* 5 — CTA */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-16 lg:py-24">
        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch]">
            {e.cta.heading}
          </h2>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <LocaleLink
              href="/contact-us"
              className="inline-flex items-center gap-3 rounded-full bg-[#334F5A] text-white font-mono text-sm px-7 py-3.5 group"
            >
              <span>{t.common.letsWorkTogether}</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </LocaleLink>
            <LocaleLink
              href="/references"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]/80 hover:text-[#334F5A] transition-colors px-2"
            >
              <span>{t.common.seeOurProjects}</span>
              <span className="text-[#AAD7E6]">&rarr;</span>
            </LocaleLink>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
