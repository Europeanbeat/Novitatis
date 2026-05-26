"use client";

import { useEffect, useState, useRef } from "react";

const brands = [
  { name: "Visible Tourism", url: "visibletourism.com", description: "Digitális láthatóság desztinációknak (TDM, DMO). Google-alapú infrastruktúra." },
  { name: "Turizmus Tudástár", url: "turizmustudastar.hu", description: "Tudásplatform és GBP mentoring turisztikai KKV-knak. Mentorprogram." },
  { name: "AI4Tourism", url: "ai4tourism.com", description: "AI Mentoring Program – gyakorlati MI turisztikai szereplőknek." },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeBrand, setActiveBrand] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBrand((prev) => (prev + 1) % brands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="markaink" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Brand portfólió
          </span>

          <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            Márkáink
            <br />
            <span className="text-muted-foreground">a turizmusért.</span>
          </h2>

          <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            Három önálló márkánk a turizmus különböző szegmenseit szolgálja – a digitális láthatóságtól az AI-alapú megoldásokig.
          </p>
        </div>

        {/* Brand cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={`group relative p-8 lg:p-12 border transition-all duration-700 cursor-default hover:border-foreground/30 ${
                activeBrand === index
                  ? "border-foreground/30 bg-foreground/[0.04]"
                  : "border-foreground/10 bg-foreground/[0.02]"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveBrand(index)}
            >
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-6">
                Önálló márka
              </span>
              <h3 className="text-2xl lg:text-3xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
                {brand.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {brand.description}
              </p>
              <span className="text-sm font-mono text-[#AAD7E6]">
                {brand.url}
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#AAD7E6] transition-transform duration-500 origin-left ${
                activeBrand === index ? "scale-x-100" : "scale-x-0"
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
