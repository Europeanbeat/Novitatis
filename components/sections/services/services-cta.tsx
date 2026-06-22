import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Single-intent contact CTA. This is the only "get in touch" call on the page.
export function ServicesCta() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <ScrollReveal direction="up" duration={0.9} scale={0.98}>
        <div className="relative overflow-hidden rounded-3xl bg-[#334F5A] px-8 lg:px-16 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <h2 className="text-4xl lg:text-6xl font-display text-white leading-[1.02]">
              Let&apos;s work
              <br />
              <span className="text-white/55">together.</span>
            </h2>
            <div className="lg:pl-8">
              <p className="text-white/65 leading-relaxed mb-8 max-w-[46ch]">
                A strategy, a study, a programme, or an early-stage idea. Send us a
                short note and we will tell you whether and how we can help.
              </p>
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-3 rounded-full bg-[#AAD7E6] text-[#334F5A] font-mono text-sm px-6 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get in touch
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
