import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { clientTiers } from "@/lib/services-content";

// Who we work with: three grouped tiers from policy level down to operators.
// Solid tinted section, so it sits cleanly over the page lines.
export function ClientSpectrum() {
  return (
    <section className="relative z-10 bg-[#f9fbff] border-y border-foreground/8 py-20 lg:py-28">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <ScrollReveal direction="up" duration={0.8}>
          <div className="max-w-[60ch] mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[18ch]">
              From ministries to{" "}
              <span className="whitespace-nowrap">family-run</span> guesthouses.
            </h2>
            <p className="mt-4 text-[#334F5A]/75 leading-relaxed max-w-[52ch]">
              We work at every level of the tourism economy, in Hungary and
              internationally, and translate between them.
            </p>
          </div>
        </ScrollReveal>

        {/* Stacked top-to-bottom so the visual reads as levels of the tourism
            system (policy → destination → operator), not equal columns. */}
        <div className="space-y-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
          {clientTiers.map((tier, index) => (
            <ScrollReveal
              key={tier.tier}
              direction="up"
              duration={0.8}
              delay={index * 0.08}
            >
              <div className="bg-white p-7 lg:p-9 grid md:grid-cols-[minmax(0,18rem)_1fr] gap-5 lg:gap-12 items-start">
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-xs text-[#AAD7E6]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[11px] text-[#334F5A]/60 uppercase tracking-wider">
                      {tier.note}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-[#334F5A] leading-tight">
                    {tier.tier}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2.5 md:pt-1.5">
                  {tier.clients.map((client) => (
                    <li
                      key={client}
                      className="rounded-full bg-[#f9fbff] border border-foreground/10 px-4 py-1.5 text-sm text-[#334F5A]/80"
                    >
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
