import { Landmark, MapPin, Store, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getServicesContent } from "@/lib/services-content";
import type { Locale } from "@/lib/i18n/config";

// Staircase of the tourism system: foundation (policy) at the base building up
// to the operators who serve the guest. Cards stay white; the accent is the
// BRAND scale — light-blue at the foundation deepening to dark teal at the top,
// carried by the number disc + a left rule so each level reads distinctly. Each
// level keeps its full client list (the previous content).
// Indexed by the clientTiers order (0 = policy foundation … 2 = operators), so
// it stays correct whatever language the tier labels are in. `on` = disc text.
const META: { icon: LucideIcon; accent: string; on: string }[] = [
  { icon: Landmark, accent: "#AAD7E6", on: "#1f3640" }, // foundation: light-blue, dark text
  { icon: MapPin, accent: "#6E9CAB", on: "#ffffff" }, // destination: mid teal
  { icon: Store, accent: "#334F5A", on: "#ffffff" }, // operators: deep teal
];

export function ClientSpectrum({ locale }: { locale: Locale }) {
  const { clientTiers, ui } = getServicesContent(locale);
  // Operators at the top, policy foundation at the bottom.
  const levels = [...clientTiers].reverse();

  return (
    <section className="relative z-10 bg-[#f9fbff] border-y border-foreground/8 py-20 lg:py-28">
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-12">
        <ScrollReveal direction="up" duration={0.8}>
          <div className="max-w-[60ch] mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[18ch]">
              {ui.clients.headingBefore}
              <span className="whitespace-nowrap">{ui.clients.headingNoWrap}</span>
              {ui.clients.headingAfter}
            </h2>
            <p className="mt-4 text-[#334F5A]/75 leading-relaxed max-w-[52ch]">
              {ui.clients.lead}
            </p>
          </div>
        </ScrollReveal>

        {/* Staircase: each level up steps in from the left, foundation widest */}
        <div className="space-y-3 lg:space-y-4">
          {levels.map((tier, i) => {
            const m = META[levels.length - 1 - i]; // original tier order
            const Icon = m.icon;
            const number = levels.length - i; // 3 (top) … 1 (foundation)
            return (
              <ScrollReveal key={tier.tier} direction="up" duration={0.7} delay={i * 0.08}>
                <div
                  className="bg-white rounded-[1.5rem] border border-foreground/10 p-5 lg:p-7 shadow-[0_14px_36px_-26px_rgba(51,79,90,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#AAD7E6] hover:shadow-[0_22px_48px_-28px_rgba(51,79,90,0.5)]"
                  style={{
                    marginLeft: `${(levels.length - 1 - i) * 1.5}rem`,
                    borderLeft: `5px solid ${m.accent}`,
                  }}
                >
                  <div className="flex items-start gap-4 lg:gap-5">
                    {/* Gold number disc (the accent) */}
                    <div
                      className="shrink-0 grid place-items-center h-11 w-11 lg:h-12 lg:w-12 rounded-full font-display text-xl lg:text-2xl"
                      style={{ background: m.accent, color: m.on }}
                    >
                      {number}
                    </div>

                    {/* Icon */}
                    <div className="shrink-0 hidden sm:grid place-items-center h-11 w-11 lg:h-12 lg:w-12 rounded-2xl bg-[#f9fbff] border border-foreground/10">
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-[#334F5A]" strokeWidth={1.6} />
                    </div>

                    {/* Content + the full client list (previous content) */}
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#334F5A]/60">
                        {tier.note}
                      </p>
                      <h3 className="font-display text-xl lg:text-2xl text-[#334F5A] leading-tight mb-3">
                        {tier.tier}
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {tier.clients.map((client) => (
                          <li
                            key={client}
                            className="rounded-full bg-[#f9fbff] border border-foreground/10 px-3.5 py-1.5 text-sm text-[#334F5A]/80"
                          >
                            {client}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
