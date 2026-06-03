import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { challenges } from "@/lib/services-content";

// ref.digital-style capability framing: name a real challenge, reframe it,
// then point to what answers it. Airy, problem-first, no superlatives.
export function Challenges() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
      <ScrollReveal direction="up" duration={0.8}>
        <div className="max-w-[60ch] mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05]">
            The problems we are built to solve.
          </h2>
          <p className="mt-5 text-lg text-[#334F5A]/80 leading-relaxed">
            Most of our work begins in the same place: a goal the sector agrees
            on, and no clear path to it. These are the challenges we take on.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-16 lg:space-y-20">
        {challenges.map((c, index) => (
          <ScrollReveal key={c.title} direction="up" duration={0.8}>
            <article className="border-t border-foreground/10 pt-10 lg:pt-12">
              <div className="flex items-baseline gap-4 mb-6 lg:mb-8">
                <span className="font-mono text-sm text-[#AAD7E6] shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl lg:text-4xl text-[#334F5A] leading-[1.1] max-w-[24ch]">
                  {c.title}
                </h3>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                <p className="lg:col-span-7 text-lg text-[#334F5A]/80 leading-relaxed max-w-[62ch]">
                  {c.body}
                </p>
                <div className="lg:col-span-4 lg:col-start-9">
                  <p className="font-mono text-[11px] text-[#334F5A]/60 uppercase tracking-wider mb-4">
                    What answers it
                  </p>
                  <ul className="space-y-2.5">
                    {c.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2.5 text-sm text-[#334F5A]/85 leading-snug"
                      >
                        <span className="text-[#AAD7E6] mt-0.5 shrink-0">&mdash;</span>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
