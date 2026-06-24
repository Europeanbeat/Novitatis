"use client";

import { useEffect, useState, useRef } from "react";
import LightRays from "@/components/ui/light-rays";


const tiers = [
  {
    note: "Policy and system level",
    tier: "Public & national",
    clients: ["Ministries", "National tourism organisations", "Regional development agencies"],
  },
  {
    note: "Place level",
    tier: "Destination management",
    clients: ["DMO organisations", "TDM organisations", "Municipalities"],
  },
  {
    note: "Operator level",
    tier: "Businesses & providers",
    clients: ["Tourism SMEs", "Accommodation", "Restaurants & hospitality"],
  },
];

export function AudienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="kiknek-dolgozunk" ref={sectionRef} className="relative py-12 lg:py-20 px-4 lg:px-8">
      {/* Floating dark "stage card" with rounded corners */}
      <div className="relative overflow-hidden bg-[#334F5A] rounded-3xl">

      {/* Stage light beam — shines down from top onto the title */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#AAD7E6"
          lightSpread={0.35}
          rayLength={2.5}
          fadeDistance={1.2}
          pulsating
          raysSpeed={0.1}
          mouseInfluence={0}
          distortion={0.02}
          noiseAmount={0}
          saturation={1.2}
          className="absolute inset-0"
        />
        {/* Gradient fade at the bottom so beam blends out */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #334F5A 6%, transparent 50%)",
          }}
        />
      </div>

      {/* Header — sits on top of the light beam */}
      <div className="relative z-10 pt-12 lg:pt-16 pb-6 text-center">
        <span className={`inline-flex items-center gap-4 text-sm font-mono text-white/50 mb-5 transition-all duration-700 justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span className="w-12 h-px bg-white/20" />
          Who we work with
          <span className="w-12 h-px bg-white/20" />
        </span>

        <h2
          className={`text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[0.95] text-white transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            textShadow: "0 0 40px rgba(170, 215, 230, 0.4), 0 0 80px rgba(170, 215, 230, 0.2)",
          }}
        >
          Every level
          <br />
          <span className="text-white/60">of tourism.</span>
        </h2>

        <p className={`mt-4 text-base lg:text-lg text-white/70 leading-relaxed max-w-xl mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          From national tourism organisations to individual restaurants — Novitatis works across the full ecosystem, at every scale.
        </p>
      </div>

      {/* Integration grid */}
      <div className="relative z-10 mt-4 lg:mt-6 max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-3 lg:gap-4 mb-10">
          {tiers.map((tier, index) => (
            <div
              key={tier.tier}
              className={`group relative overflow-hidden flex flex-col min-h-[230px] p-6 lg:p-7 rounded-xl border transition-all duration-500 cursor-default ${
                hoveredIndex === index
                  ? "border-white/30 bg-white/[0.06]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${index * 60 + 300}ms`,
              }}
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setMousePos(null);
              }}
            >
              {/* Cursor-following halo */}
              {hoveredIndex === index && mousePos && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: `radial-gradient(260px circle at ${mousePos.x}px ${mousePos.y}px, rgba(170,215,230,0.18) 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* Tier header: index number + level note */}
              <div className="relative z-10 flex items-baseline gap-3 mb-4">
                <span className="font-mono text-xs text-[#AAD7E6]/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                  {tier.note}
                </span>
              </div>

              {/* Tier name */}
              <h3 className="relative z-10 font-display text-2xl lg:text-3xl text-white leading-tight mb-5">
                {tier.tier}
              </h3>

              {/* Who, listed */}
              <ul className="relative z-10 mt-auto divide-y divide-white/10">
                {tier.clients.map((client) => (
                  <li key={client} className="py-2.5 text-sm text-white/75">
                    {client}
                  </li>
                ))}
              </ul>

              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 overflow-hidden rounded-b-xl">
                <div className={`h-full bg-[#AAD7E6] transition-all duration-500 ${
                  hoveredIndex === index ? "w-full" : "w-0"
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats row */}
        <div className={`flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10 transition-all duration-1000 delay-500 pb-12 lg:pb-16 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <a href="/contact-us" className="group inline-flex items-center gap-2 text-sm font-mono text-white/60 hover:text-white transition-colors">
            Let&apos;s talk about your project
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>

      </div>
      {/* /Floating stage card */}
    </section>
  );
}
