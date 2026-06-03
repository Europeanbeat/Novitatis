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
              From ministries to family-run guesthouses.
            </h2>
            <p className="mt-4 text-[#334F5A]/75 leading-relaxed max-w-[52ch]">
              We work at every level of the tourism economy, and translate between
              them.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/10">
          {clientTiers.map((tier, index) => (
            <ScrollReveal
              key={tier.tier}
              direction="up"
              duration={0.8}
              delay={index * 0.08}
            >
              <div className="h-full bg-white p-8 lg:p-10">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-xs text-[#AAD7E6]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                    {tier.note}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-[#334F5A] leading-tight mb-6">
                  {tier.tier}
                </h3>
                <ul className="divide-y divide-foreground/8">
                  {tier.clients.map((client) => (
                    <li key={client} className="py-3 text-[#334F5A]/80">
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
