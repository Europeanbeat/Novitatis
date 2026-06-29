"use client";

import { useEffect, useState } from "react";
import { LocaleLink } from "@/components/i18n/locale-link";

type HeroCopy = {
  eyebrow: string;
  heading: string;
  intro: string;
  quickLinks: {
    whatWeDo: string;
    ourBrands: string;
    ourProjects: string;
  };
};

export function HeroSection({ t }: { t: HeroCopy }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden bg-white">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-80"
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/60" />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-[#334F5A]/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-[#334F5A]/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="lg:max-w-[60%]">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-[#334F5A]/60">
            <span className="w-8 h-px bg-[#334F5A]/30" />
            {t.eyebrow}
          </span>
        </div>

        {/* Main headline — the hook (UX review: must say what we do, not a slogan) */}
        <h1
          className={`mb-6 text-left text-[clamp(1.875rem,4vw,4rem)] font-display leading-[1.02] tracking-tight text-[#334F5A] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {t.heading}
        </h1>

        {/* Explainer — what we do and who for, in the first lines (UX review) */}
        <p
          className={`max-w-[48ch] text-lg lg:text-xl text-[#334F5A]/80 leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t.intro}
        </p>
        </div>
      </div>

      {/* Quick links — clickable nav into the page (UX review: no filler numbers) */}
      <div
        className={`absolute bottom-12 left-0 right-0 px-6 lg:px-12 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center gap-x-8 gap-y-3">
          {[
            { label: t.quickLinks.whatWeDo, href: "#szolgaltatasok" },
            { label: t.quickLinks.ourBrands, href: "#markaink" },
            { label: t.quickLinks.ourProjects, href: "/references" },
          ].map((link) => {
            const cls =
              "group inline-flex items-center gap-2 font-mono text-sm text-[#334F5A]";
            const inner = (
              <>
                <span className="transition-colors group-hover:text-[#334F5A]/70">{link.label}</span>
                <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </>
            );
            // In-page anchors stay raw; route links go through LocaleLink so they
            // keep the active language (e.g. /hu/references, not /references).
            return link.href.startsWith("#") ? (
              <a key={link.label} href={link.href} className={cls}>
                {inner}
              </a>
            ) : (
              <LocaleLink key={link.label} href={link.href} className={cls}>
                {inner}
              </LocaleLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
