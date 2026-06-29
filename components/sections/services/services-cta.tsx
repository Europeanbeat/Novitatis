import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { LocaleLink } from "@/components/i18n/locale-link";
import { getServicesContent } from "@/lib/services-content";
import type { Locale } from "@/lib/i18n/config";

// Single-intent contact CTA. This is the only "get in touch" call on the page.
export function ServicesCta({ locale }: { locale: Locale }) {
  const { ui } = getServicesContent(locale);
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <ScrollReveal direction="up" duration={0.9} scale={0.98}>
        <div className="relative overflow-hidden rounded-3xl bg-[#334F5A] px-8 lg:px-16 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <h2 className="text-4xl lg:text-6xl font-display text-white leading-[1.02]">
              {ui.cta.titleLead}
              <br />
              <span className="text-white/55">{ui.cta.titleAccent}</span>
            </h2>
            <div className="lg:pl-8">
              <p className="text-white/65 leading-relaxed mb-8 max-w-[46ch]">
                {ui.cta.body}
              </p>
              <LocaleLink
                href="/contact-us"
                className="group inline-flex items-center gap-3 rounded-full bg-[#AAD7E6] text-[#334F5A] font-mono text-sm px-6 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {ui.cta.button}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </LocaleLink>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
