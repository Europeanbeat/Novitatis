import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { practices } from "@/lib/services-content";
import { Halo } from "@/components/sections/services/_halo";

// Four main services, using the same layout as the Challenges section (number +
// title, body on the left, a side list on the right), but as white cards. Each
// card links to its sub-page.
export function ServicesGrid() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
      <ScrollReveal direction="up" duration={0.8}>
        <div className="relative isolate max-w-[60ch] mb-12 lg:mb-16">
          <Halo />
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05]">
            Our four main services.
          </h2>
          <p className="mt-5 text-lg text-[#334F5A]/80 leading-relaxed">
            One connected chain, not a menu. The research and strategy come first,
            then we build it, embed it, and take the ideas to the stage. Each with
            the real work behind it.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-6 lg:space-y-8">
        {practices.map((p) => (
          <ScrollReveal key={p.slug} direction="up" duration={0.8}>
            <a
              href={`/services/${p.slug}`}
              className="group block rounded-[1.75rem] bg-white border border-foreground/10 shadow-[0_30px_80px_-50px_rgba(51,79,90,0.3)] p-8 lg:p-12 transition-all duration-400 hover:border-[#AAD7E6] hover:shadow-[0_20px_60px_-28px_rgba(51,79,90,0.28)]"
            >
              <div className="flex items-baseline gap-4 mb-6 lg:mb-8">
                <span className="font-mono text-sm text-[#AAD7E6] shrink-0">{p.number}</span>
                <h3 className="font-display text-2xl lg:text-4xl text-[#334F5A] leading-[1.1]">
                  {p.title}
                </h3>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-7">
                  <p className="text-lg text-[#334F5A]/80 leading-relaxed max-w-[62ch] mb-4">
                    {p.description}
                  </p>
                  <p className="mb-6 text-sm text-[#334F5A]/70 leading-snug max-w-[62ch]">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#AAD7E6] mr-2">
                      Proof
                    </span>
                    {p.flagship.outcome}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.serves.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-[#334F5A]/[0.06] text-[#334F5A]/75"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-4 lg:col-start-9">
                  <p className="font-mono text-[11px] text-[#334F5A]/60 uppercase tracking-wider mb-4">
                    What&apos;s included
                  </p>
                  <ul className="space-y-2.5">
                    {p.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 text-sm text-[#334F5A]/85 leading-snug"
                      >
                        <span className="text-[#AAD7E6] mt-0.5 shrink-0">&mdash;</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <span className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]">
                Explore {p.title.toLowerCase()}
                <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </span>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
