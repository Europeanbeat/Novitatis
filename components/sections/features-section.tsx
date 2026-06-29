"use client";

import { useEffect, useRef, useState } from "react";
import { Halo } from "@/components/sections/services/_halo";

type FeaturesCopy = {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  attribution: string;
  items: { title: string; quote: string }[];
};

// Sequence numbers are static; the titles and quotes come from the dictionary.
const numbers = ["01", "02", "03", "04"];

export function FeaturesSection({ t }: { t: FeaturesCopy }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // The principles, in Adam's voice (UX review: present these as quotes, not as
  // filler stat numbers).
  const features = t.items.map((item, i) => ({
    number: numbers[i],
    title: item.title,
    quote: item.quote,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-12 lg:mb-16">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="relative isolate lg:col-span-7">
              <Halo />
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                {t.eyebrow}
              </span>
              <h2
                className={`text-6xl md:text-7xl lg:text-8xl font-display tracking-tight leading-[0.9] transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                {t.headingLead} <span className="text-muted-foreground">{t.headingAccent}</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4" />
          </div>
        </div>

        {/* Quote cards */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Large quote card with Adam's portrait */}
          <div
            className={`lg:col-span-12 relative bg-white border border-foreground/10 min-h-[440px] overflow-hidden flex transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative flex-1 p-8 lg:p-12 flex flex-col justify-center">
              <span className="font-mono text-sm text-muted-foreground">
                {features[0].number}
              </span>
              <h3 className="text-2xl lg:text-3xl font-display mt-3 mb-6 text-[#334F5A]">
                {features[0].title}
              </h3>
              <blockquote className="max-w-xl">
                <p className="text-2xl lg:text-3xl font-display leading-snug text-[#334F5A]">
                  &ldquo;{features[0].quote}&rdquo;
                </p>
              </blockquote>
              <div className="mt-8 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
                <span className="w-8 h-px bg-foreground/30" />
                {t.attribution}
              </div>
            </div>

            {/* Adam's portrait */}
            <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden">
              <img
                src="/images/adam_schmutz.jpg"
                alt="Adam Schmutz"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ transform: "scaleX(-1)" }}
              />
              {/* Fade left edge into white */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
            </div>
          </div>

          {/* Three quote cards */}
          {features.slice(1).map((feature, i) => (
            <div
              key={feature.number}
              className={`lg:col-span-4 relative bg-white border border-foreground/10 p-8 lg:p-10 flex flex-col transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: isVisible ? `${150 + i * 100}ms` : "0ms" }}
            >
              <span className="font-mono text-sm text-muted-foreground">
                {feature.number}
              </span>
              <h3 className="text-2xl font-display mt-3 mb-3 text-[#334F5A]">
                {feature.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {feature.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
