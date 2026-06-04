import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { PageBackground } from "@/components/layout/page-background";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Halo } from "@/components/sections/services/_halo";
import { referenceGroups } from "@/lib/references-content";

export const metadata: Metadata = {
  title: "References",
  description:
    "Selected work and references across consulting, development, education and public speaking, the record behind our four services.",
};

export default function ReferencesPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PageBackground />
      <Navigation />

      {/* Hero with a contents index */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 pb-10 lg:pb-14">
        <ScrollReveal direction="up" duration={0.8}>
          <div className="relative isolate">
            <Halo />
            <span className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider block mb-5">
              References / Selected work
            </span>
            <h1 className="text-5xl md:text-7xl font-display text-[#334F5A] leading-[0.98] max-w-[14ch]">
              The work behind the words.
            </h1>
            <p className="mt-6 text-lg text-[#334F5A]/80 leading-relaxed max-w-[58ch]">
              A record of selected work, grouped by service. Each entry is a real
              piece of the job, the methodology, study, programme or talk that the
              sector acted on.
            </p>
          </div>
        </ScrollReveal>

        {/* Contents — anchor links to each section, magazine style */}
        <ScrollReveal direction="up" duration={0.8}>
          <nav className="relative mt-10 lg:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-foreground/10">
            {referenceGroups.map((group, gi) => (
              <a
                key={group.slug}
                href={`#${group.slug}`}
                className="group flex items-start gap-3 py-5 pr-4 border-b border-foreground/10 sm:border-b-0 sm:border-r last:border-r-0 transition-colors hover:bg-white/50"
              >
                <span className="font-mono text-sm text-[#AAD7E6] pt-0.5">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm text-[#334F5A]/75 leading-snug group-hover:text-[#334F5A] transition-colors">
                  {group.title}
                </span>
              </a>
            ))}
          </nav>
        </ScrollReveal>
      </section>

      {/* One editorial section per service */}
      {referenceGroups.map((group, gi) => {
        const [featured, ...rest] = group.items;
        return (
          <section
            key={group.slug}
            id={group.slug}
            className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 py-14 lg:py-20 scroll-mt-28"
          >
            {/* Giant ghost section number */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 right-4 lg:right-8 font-display text-[7rem] lg:text-[11rem] leading-none text-[#334F5A]/[0.045] select-none"
            >
              {String(gi + 1).padStart(2, "0")}
            </span>

            {/* Section header */}
            <ScrollReveal direction="up" duration={0.7}>
              <div className="relative isolate max-w-[52ch] mb-8 lg:mb-10">
                <Halo />
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8 bg-[#AAD7E6]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#334F5A]/55">
                    {group.tag}
                  </span>
                </div>
                <h2 className="font-display text-3xl lg:text-5xl text-[#334F5A] leading-[1.05]">
                  {group.title}
                </h2>
                <p className="mt-3 text-base text-[#334F5A]/75 leading-relaxed">
                  {group.blurb}
                </p>
                <a
                  href={`/services/${group.slug}`}
                  className="group mt-4 inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]"
                >
                  View the service
                  <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                    &rarr;
                  </span>
                </a>
              </div>
            </ScrollReveal>

            {/* Featured reference — bold split card with a dark teal rail */}
            {featured && (
              <ScrollReveal direction="up" duration={0.75}>
                <FeaturedCard item={featured} index={gi} />
              </ScrollReveal>
            )}

            {/* Remaining references — archive rows */}
            {rest.length > 0 && (
              <ul className="mt-4 border-t border-foreground/10">
                {rest.map((item) => {
                  const Row = item.href ? "a" : "div";
                  return (
                    <ScrollReveal key={item.title} direction="up" duration={0.6}>
                      <li className="border-b border-foreground/10">
                        <Row
                          {...(item.href ? { href: item.href } : {})}
                          className={`group grid md:grid-cols-12 gap-4 lg:gap-6 items-baseline py-6 px-2 lg:px-4 rounded-xl transition-colors ${
                            item.href ? "hover:bg-white/60" : ""
                          }`}
                        >
                          <span className="md:col-span-2 font-mono text-xs text-[#334F5A]/55">
                            {item.meta}
                          </span>
                          <div className="md:col-span-7">
                            <h3 className="font-display text-xl lg:text-2xl text-[#334F5A] leading-[1.15] mb-1.5">
                              {item.title}
                            </h3>
                            <p className="text-[15px] text-[#334F5A]/75 leading-relaxed">
                              {item.summary}
                            </p>
                          </div>
                          <div className="md:col-span-3 flex flex-wrap gap-2 md:justify-end">
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#334F5A]/[0.06] text-[#334F5A]/75 h-fit"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </Row>
                      </li>
                    </ScrollReveal>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}

      <div className="pb-20 lg:pb-28" />
      <FooterSection />
    </main>
  );
}

// Bold featured card: a dark teal rail (number + tags) beside the white body.
function FeaturedCard({ item, index }: { item: Reference; index: number }) {
  const Card = item.href ? "a" : "div";
  return (
    <Card
      {...(item.href ? { href: item.href } : {})}
      className={`group grid md:grid-cols-5 overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-white shadow-[0_40px_100px_-60px_rgba(51,79,90,0.4)] transition-all duration-300 ${
        item.href ? "hover:border-[#AAD7E6] hover:shadow-[0_30px_80px_-40px_rgba(51,79,90,0.35)]" : ""
      }`}
    >
      {/* Dark teal rail */}
      <div className="md:col-span-2 relative overflow-hidden bg-[#334F5A] p-8 lg:p-10 flex flex-col justify-between min-h-[220px]">
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -right-4 font-display text-[9rem] leading-none text-white/[0.06] select-none"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/10 text-white/85"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="relative font-mono text-xs text-[#AAD7E6] uppercase tracking-wider">
          {item.meta}
        </span>
      </div>

      {/* White body */}
      <div className="md:col-span-3 p-8 lg:p-10 flex flex-col">
        <h3 className="font-display text-2xl lg:text-3xl text-[#334F5A] leading-[1.12] mb-4">
          {item.title}
        </h3>
        <p className="text-base lg:text-lg text-[#334F5A]/80 leading-relaxed">
          {item.summary}
        </p>
        {item.href && (
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]">
            Read the reference
            <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </span>
        )}
      </div>
    </Card>
  );
}

// Local type mirror so this file stays self-contained for the helper above.
type Reference = (typeof referenceGroups)[number]["items"][number];
