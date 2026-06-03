import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { engagements } from "@/lib/services-content";
import { Halo } from "@/components/sections/services/_halo";

// Selected engagements in case-study form: the brief, what we delivered, and
// the outcome, each anchored by a hard metric.
export function SelectedEngagements() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
      <div className="relative isolate inline-block mb-12 lg:mb-16">
        <Halo />
        <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight max-w-[16ch]">
          Selected engagements.
        </h2>
      </div>

      <div className="space-y-5">
        {engagements.map((e, index) => (
          <ScrollReveal key={e.title} direction="up" duration={0.8} delay={index * 0.07}>
            <article className="group relative rounded-2xl border border-foreground/10 bg-white p-8 lg:p-10 transition-all duration-400 hover:border-[#AAD7E6] hover:shadow-[0_16px_50px_-20px_rgba(51,79,90,0.22)]">
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
                {/* Left: title + metric */}
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground">
                      {e.sector}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{e.year}</span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-[#334F5A] leading-tight mb-4">
                    {e.title}
                  </h3>
                  <p className="font-display text-xl text-[#AAD7E6]">{e.metric}</p>
                </div>

                {/* Right: challenge / delivered / outcome */}
                <div className="lg:col-span-8 grid sm:grid-cols-3 gap-6">
                  {[
                    ["Challenge", e.challenge],
                    ["Delivered", e.delivered],
                    ["Outcome", e.outcome],
                  ].map(([label, body]) => (
                    <div key={label}>
                      <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-2">
                        {label}
                      </p>
                      <p className="text-sm text-[#334F5A]/80 leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
