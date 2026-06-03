import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { practices } from "@/lib/services-content";

// Four practices, all visible at once as open cards (no hidden tabs).
// Each card is a single link target to its sub-page, so the whole card is tappable.
export function ServicesGrid() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
      <div className="px-2 lg:px-4 mb-8 lg:mb-10">
        <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight max-w-[20ch]">
          Four practices, one way of working.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
        {practices.map((p, index) => (
          <ScrollReveal key={p.slug} direction="up" duration={0.8} delay={index * 0.06}>
            <a
              href={`/services/${p.slug}`}
              className="group flex h-full flex-col rounded-[1.75rem] bg-white border border-foreground/10 shadow-[0_30px_80px_-50px_rgba(51,79,90,0.3)] p-7 lg:p-9 transition-all duration-400 hover:border-[#AAD7E6] hover:shadow-[0_20px_60px_-28px_rgba(51,79,90,0.28)]"
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-mono text-xs text-[#AAD7E6]">{p.number}</span>
                <span className="font-mono text-[11px] text-[#334F5A]/60 uppercase tracking-wider">
                  {p.tag}
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] leading-[1.05] mb-3">
                {p.title}
              </h3>
              <p className="font-mono text-sm text-[#5b94a8] mb-4">{p.lead}</p>
              <p className="text-[#334F5A]/80 leading-relaxed mb-8">{p.description}</p>

              <div className="mt-auto grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[11px] text-[#334F5A]/60 uppercase tracking-wider mb-3">
                    What&apos;s included
                  </p>
                  <ul className="space-y-2">
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
                <div>
                  <p className="font-mono text-[11px] text-[#334F5A]/60 uppercase tracking-wider mb-3">
                    Who it&apos;s for
                  </p>
                  <div className="flex flex-wrap gap-2 content-start">
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
