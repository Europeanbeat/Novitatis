import { LocaleLink } from "@/components/i18n/locale-link";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { PageBackground } from "@/components/layout/page-background";
import { FooterSection } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Halo } from "@/components/sections/services/_halo";
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
  const t = await getDict(lang, "about");
  return { title: t.meta.title, description: t.meta.description, alternates: alternatesFor(lang, "/about-us") };
}

// Photos and image positioning are presentation-only, paired by index with the
// translated team members from the dictionary.
const teamPhotos = [
  { photo: "/images/adam_schmutz_card.jpg", pos: "object-[25%_1%]" },
  { photo: "/images/bence.webp", pos: "object-[25%_1%]" },
  { photo: "/images/vivi.jpeg", pos: "object-[20%_50%]" },
  { photo: "/images/eszter.jpeg", pos: "" },
];

export default async function AboutUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  const t = await getDict(lang, "about");

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <PageBackground />

      {/* Hero */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-12 lg:pb-16">
        <ScrollReveal direction="up" duration={0.7}>
          <span className="relative isolate inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <Halo className="-inset-x-6 -inset-y-4" />
            <span className="w-12 h-px bg-foreground/30" />
            {t.hero.eyebrow}
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" duration={1} delay={0.05}>
          <h1 className="relative isolate text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.97] text-[#334F5A] max-w-[18ch]">
            <Halo className="-inset-x-12 -inset-y-10" />
            {t.hero.heading}
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" duration={0.9} delay={0.12}>
          <p className="relative isolate mt-7 text-xl text-muted-foreground leading-relaxed max-w-[56ch]">
            <Halo />
            {t.hero.intro}
          </p>
        </ScrollReveal>
      </section>

      {/* What sets us apart — promoted above the story (UX review: one of the
          strongest messages, so lead with it). */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <div className="relative isolate px-2 lg:px-4 mb-8">
          <Halo className="-inset-x-6 -inset-y-4" />
          <span className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-4">
            {t.whatSetsApart.eyebrow}
          </span>
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight max-w-[20ch]">
            {t.whatSetsApart.heading}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
          {t.whatSetsApart.values.map((value, index) => (
            <ScrollReveal key={value.title} direction="up" duration={0.8} delay={index * 0.08}>
              <div className="h-full bg-white p-8 lg:p-10">
                <span className="font-mono text-xs text-[#AAD7E6] block mb-6">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl lg:text-2xl text-[#334F5A] leading-tight mb-4">
                  {value.title}
                </h3>
                <p className="text-sm text-[#334F5A]/65 leading-relaxed">{value.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Our story */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <div className="bg-white rounded-[2rem] border border-foreground/10 shadow-[0_30px_80px_-50px_rgba(51,79,90,0.3)] p-8 lg:p-14">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-4">
                {t.story.eyebrow}
              </span>
              <h2 className="text-3xl lg:text-4xl font-display text-[#334F5A] leading-tight">
                {t.story.heading}
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-5 text-[#334F5A]/70 leading-relaxed lg:text-lg">
              {t.story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 lg:mt-16 pt-10 border-t border-foreground/10 flex flex-wrap gap-10 lg:gap-16">
            {t.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5 max-w-[24ch]">
                <span className="text-2xl lg:text-3xl font-display text-[#334F5A] leading-tight break-words hyphens-auto">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="relative isolate px-2 lg:px-4 mb-10 lg:mb-12">
          <Halo className="-inset-x-6 -inset-y-4" />
          <span className="font-mono text-xs text-[#334F5A]/65 uppercase tracking-wider block mb-4">
            {t.team.eyebrow}
          </span>
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight max-w-[20ch]">
            {t.team.heading}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {t.team.members.map((member, index) => (
            <ScrollReveal key={member.name} direction="up" duration={0.85} delay={index * 0.07} scale={0.98}>
              <article className="group h-full flex flex-col bg-white rounded-[1.5rem] border border-foreground/10 overflow-hidden transition-all duration-400 hover:border-[#AAD7E6] hover:shadow-[0_20px_60px_-24px_rgba(51,79,90,0.25)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f9fbff]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={teamPhotos[index]?.photo}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className={`object-cover ${teamPhotos[index]?.pos ?? ""} w-full h-full`}
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-display text-xl text-[#334F5A] leading-tight">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[11px] font-medium text-[#334F5A]/85 mt-1.5 mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-[#334F5A]/65 leading-relaxed">{member.bio}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <ScrollReveal direction="up" duration={0.9} scale={0.98}>
          <div className="relative overflow-hidden rounded-3xl bg-[#334F5A] px-8 lg:px-16 py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <h2 className="text-4xl lg:text-6xl font-display text-white leading-[1.02]">
                {t.cta.headingLead}
                <br />
                <span className="text-white/55">{t.cta.headingBrand}</span>
              </h2>
              <div className="lg:pl-8">
                <p className="text-white/65 leading-relaxed mb-8 max-w-[46ch]">
                  {t.cta.body}
                </p>
                <LocaleLink
                  href="/contact-us"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#AAD7E6] text-[#334F5A] font-mono text-sm px-6 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  {t.cta.button}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </LocaleLink>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FooterSection />
    </main>
  );
}
