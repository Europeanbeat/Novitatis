"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LightRays from "@/components/ui/light-rays";
import { LocaleLink } from "@/components/i18n/locale-link";

type AudienceCopy = {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  intro: string;
  cta: string;
  /** Optional spine label naming the through-line. Falls back if absent. */
  rail?: string;
  tiers: { note: string; tier: string; clients: string[] }[];
};

export function AudienceSection({ t }: { t: AudienceCopy }) {
  const tiers = t.tiers;
  const reduce = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const rail = t.rail ?? "One method, end to end";

  return (
    <section
      id="kiknek-dolgozunk"
      ref={sectionRef}
      className="relative py-12 lg:py-20 px-4 lg:px-8"
    >
      {/* Floating dark "stage card" */}
      <div className="relative overflow-hidden bg-[#334F5A] rounded-3xl">
        {/* Stage light beam from the top (brand moment, kept) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#AAD7E6"
            lightSpread={0.35}
            rayLength={2.5}
            fadeDistance={1.2}
            pulsating={!reduce}
            raysSpeed={reduce ? 0 : 0.1}
            mouseInfluence={0}
            distortion={0.02}
            noiseAmount={0}
            saturation={1.2}
            className="absolute inset-0"
          />
          {/* Gradient fade so the beam resolves into the card */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #334F5A 5%, transparent 48%)",
            }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 pt-12 lg:pt-16 pb-2 text-center px-6">
          <span
            className={`inline-flex items-center gap-4 text-sm font-mono text-white/55 mb-5 justify-center transition-opacity duration-700 motion-reduce:transition-none ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-12 h-px bg-white/20" aria-hidden="true" />
            {t.eyebrow}
            <span className="w-12 h-px bg-white/20" aria-hidden="true" />
          </span>

          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight leading-[0.98] text-white text-balance transition-all duration-1000 motion-reduce:transition-none ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              textShadow:
                "0 0 40px rgba(170,215,230,0.35), 0 0 80px rgba(170,215,230,0.18)",
            }}
          >
            {t.headingLead}{" "}
            <span className="text-white/60">{t.headingAccent}</span>
          </h2>

          <p
            className={`mt-5 text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto text-balance transition-all duration-1000 delay-100 motion-reduce:transition-none ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t.intro}
          </p>
        </div>

        {/* ---- THE SPINE ---- */}
        <div className="relative z-10 mt-10 lg:mt-14 max-w-[1280px] mx-auto px-6 lg:px-10 pb-12 lg:pb-16">
          {/* Spine origin label: where the beam resolves into the line */}
          <div
            className={`flex items-center justify-center gap-3 mb-8 lg:mb-10 transition-all duration-1000 delay-200 motion-reduce:transition-none ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#AAD7E6] shadow-[0_0_12px_2px_rgba(170,215,230,0.6)]"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#AAD7E6]">
              {rail}
            </span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#AAD7E6] shadow-[0_0_12px_2px_rgba(170,215,230,0.6)]"
            />
          </div>

          {/* Connected stations on a lit spine. */}
          <ol className="relative grid md:grid-cols-3 gap-4 lg:gap-5 list-none">
            {/* The connecting line (decorative). Mobile = vertical left rail; desktop = horizontal mid-line. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {/* vertical (mobile) */}
              <div className="md:hidden absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-[#AAD7E6]/0 via-[#AAD7E6]/35 to-[#AAD7E6]/0">
                {!reduce && (
                  <motion.span
                    className="absolute -left-px h-16 w-[3px] rounded-full bg-gradient-to-b from-transparent via-[#AAD7E6] to-transparent blur-[1px]"
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "100%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </div>
              {/* horizontal (desktop) */}
              <div className="hidden md:block absolute top-[34px] left-10 right-10 h-px bg-gradient-to-r from-[#AAD7E6]/0 via-[#AAD7E6]/35 to-[#AAD7E6]/0">
                {!reduce && (
                  <motion.span
                    className="absolute -top-px h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#AAD7E6] to-transparent blur-[1px]"
                    initial={{ left: "0%" }}
                    animate={{ left: ["0%", "100%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </div>
            </div>

            {tiers.map((tier, index) => {
              const isActive = active === index;
              return (
                <li
                  key={tier.tier}
                  className={`group relative flex flex-col rounded-2xl border p-6 lg:p-7 transition-all duration-500 motion-reduce:transition-none ${
                    isActive
                      ? "border-[#AAD7E6]/60 bg-white/[0.07]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 70 + 300}ms` }}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(index)}
                  onBlur={() => setActive(null)}
                >
                  {/* Node on the spine: number badge sits on the line */}
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-all duration-500 motion-reduce:transition-none ${
                        isActive
                          ? "border-[#AAD7E6] bg-[#334F5A] text-[#AAD7E6] shadow-[0_0_16px_2px_rgba(170,215,230,0.45)]"
                          : "border-[#AAD7E6]/40 bg-[#334F5A] text-[#AAD7E6]/90"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                      {tier.note}
                    </span>
                  </div>

                  {/* Level name (HU long compounds wrap / hyphenate) */}
                  <h3 className="font-display text-2xl lg:text-3xl text-white leading-tight mb-5 [hyphens:auto] break-words">
                    {tier.tier}
                  </h3>

                  {/* Client types */}
                  <ul className="mt-auto divide-y divide-white/10">
                    {tier.clients.map((client) => (
                      <li key={client} className="py-2.5 text-sm text-white/85">
                        {client}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>

          {/* CTA */}
          <div
            className={`mt-10 lg:mt-12 pt-6 border-t border-white/10 transition-all duration-1000 delay-500 motion-reduce:transition-none ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <LocaleLink
              href="/contact-us"
              className="group inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-mono text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AAD7E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#334F5A]"
            >
              {t.cta}
              <span
                aria-hidden="true"
                className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none"
              >
                &rarr;
              </span>
            </LocaleLink>
          </div>
        </div>
      </div>
      {/* /Floating stage card */}
    </section>
  );
}
