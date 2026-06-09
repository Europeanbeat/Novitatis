"use client";

import { useEffect, useState, useRef } from "react";

type Brand = {
  id: string;
  name: string;
  url: string;
  description: string;
  logo?: string;
  logoClass?: string;
  icon?: string;
  iconClass?: string;
};

const brands: Brand[] = [
  { id: "visible-tourism", name: "Visible Tourism", url: "visibletourism.com", description: "Digital visibility for destinations (TDM, DMO), on a Google-based infrastructure.", logo: "/images/visibletourism_logo.svg", logoClass: "h-11" },
  { id: "turizmus-tudastar", name: "Turizmus Tudástár", url: "turizmustudastar.hu", description: "A knowledge platform and Google Business Profile mentoring for tourism SMEs.", icon: "/images/turizmus_tudastar.png", iconClass: "h-14" },
  { id: "ai4tourism", name: "AI4Tourism", url: "ai4tourism.com", description: "An AI mentoring programme: practical AI for people working in tourism.", logo: "/images/ai4tourism-logo.png", logoClass: "h-8" },
];

export function BrandsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeBrand, setActiveBrand] = useState(-1);
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
    <section id="markaink" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Brand portfolio
          </span>

          <h2 className={`relative text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] isolate transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <span
              aria-hidden
              className="absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            />
            Our brands
            <br />
            <span className="text-muted-foreground">for tourism.</span>
          </h2>

          <p className={`relative mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg isolate transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span
              aria-hidden
              className="absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            />
            Three independent brands serving different segments of tourism, from digital visibility to AI-based solutions.
          </p>
        </div>

        {/* Brand cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <a
              key={brand.name}
              href={`/brands?brand=${brand.id}`}
              className={`group relative block p-8 lg:p-12 border transition-all duration-700 cursor-pointer hover:border-foreground/30 ${
                activeBrand === index
                ? "border-foreground/30 bg-[#AAD7E6]"
                : "border-foreground/10 bg-white"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveBrand(index)}
              onMouseLeave={() => setActiveBrand(-1)}
            >
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-6">
                Independent brand
              </span>
              <div className="h-14 flex items-center gap-3 mb-4">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`${brand.logoClass ?? "h-8"} w-auto object-contain object-left`}
                  />
                ) : (
                  <>
                    {brand.icon && (
                      <img
                        src={brand.icon}
                        alt=""
                        className={`${brand.iconClass ?? "h-10"} w-auto object-contain shrink-0`}
                      />
                    )}
                    <h3 className="text-2xl lg:text-3xl font-display text-[#334F5A] whitespace-nowrap">
                      {brand.name}
                    </h3>
                  </>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {brand.description}
              </p>
              <span className="text-sm font-mono text-[#334F5A]">
                {brand.url}
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#AAD7E6] transition-transform duration-500 origin-left ${
                activeBrand === index ? "scale-x-100" : "scale-x-0"
              }`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
