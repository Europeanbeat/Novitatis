import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { LocaleLink } from "@/components/i18n/locale-link";
import { RelatedProjects } from "@/components/sections/services/related-projects";
import { getServicesContent } from "@/lib/services-content";
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
  return { title: t.meta.consulting.title, description: t.meta.consulting.description, alternates: alternatesFor(lang, "/services/consulting") };
}

const halo =
  "absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]";

export default async function ConsultingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  const t = await getDict(lang, "services");
  const practice = getServicesContent(lang).practices.find((p) => p.slug === "consulting")!;
  const c = t.consulting;

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />

      {/* 1 — HERO: real positioning from the booklet, analytical register */}
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
            {c.eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.04] max-w-[18ch]">
            {c.heroTitle}
          </h1>
          <p className="mt-7 text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed max-w-[64ch]">
            {c.heroLead1}
          </p>
          <p className="mt-5 text-lg text-[#334F5A]/80 leading-relaxed max-w-[64ch]">
            {c.heroLead2}
          </p>
        </div>
      </section>

      {/* 2 — WHAT WE DO: the services we provide */}
      <section
        id="services"
        className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      >
        <h2 className="relative isolate w-fit font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-10 lg:mb-12">
          <span aria-hidden className={halo} />
          {t.common.whatWeDo}
        </h2>
        <div className="grid gap-4">
          {c.services.map((s, i) => (
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

      {/* 3 — HOW WE WORK */}
      <section
        id="how"
        className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16 scroll-mt-28"
      >
        <div className="rounded-[2rem] bg-[#334F5A] text-white p-8 lg:p-14">
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#AAD7E6] block mb-5">
            {c.howWeWork.label}
          </h2>
          <p className="font-display text-2xl lg:text-3xl leading-snug max-w-[44ch] mb-10">
            {c.howWeWork.lead}
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {c.howWeWork.method.map((m) => (
              <div key={m.step}>
                <span className="font-mono text-xs text-[#AAD7E6] block mb-3">{m.step}</span>
                <p className="font-display text-xl mb-2">{m.title}</p>
                <p className="text-white/70 text-sm leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — WHO WE WORK WITH */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-12 lg:py-16">
        <h2 className="relative isolate w-fit font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-4">
          <span aria-hidden className={halo} />
          {t.common.whoWeWorkWith}
        </h2>
        <ul className="flex flex-wrap gap-2.5">
          {practice.serves.map((s) => (
            <li
              key={s}
              className="rounded-full bg-white border border-foreground/10 px-4 py-1.5 text-sm text-[#334F5A]/80"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — OUR PROJECTS: the detail and the proof live here */}
      <div className="relative z-10 pt-12 lg:pt-20">
        <RelatedProjects practiceSlug="consulting" locale={lang} />
      </div>

      {/* 6 — CTA */}
      <section className="relative z-10 max-w-[1100px] mx-auto px-6 py-16 lg:py-24">
        <div className="relative isolate">
          <span aria-hidden className={halo} />
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[20ch]">
            {c.cta.heading}
          </h2>
          <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed max-w-[56ch]">
            {c.cta.body}
          </p>
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
