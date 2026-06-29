"use client";

import { useEffect, useState, useRef } from "react";
import { LocaleLink } from "@/components/i18n/locale-link";

type Brand = {
  id: string;
  name: string;
  url: string;
  logo?: string;
  logoClass?: string;
  icon?: string;
  iconClass?: string;
};

type BrandsCopy = {
  eyebrow: string;
  headingLead: string;
  headingAccent: string;
  intro: string;
  items: { audience: string; description: string }[];
};

// Structural brand data (logos, urls). The audience tag and description copy
// come from the dictionary, by index.
const brands: Brand[] = [
  { id: "visible-tourism", name: "Visible Tourism", url: "visibletourism.com", logo: "/images/visibletourism_logo.svg", logoClass: "h-10" },
  { id: "turizmus-tudastar", name: "Turizmus Tudástár", url: "turizmustudastar.hu", icon: "/images/turizmus_tudastar.png", iconClass: "h-11" },
  { id: "ai4tourism", name: "AI4Tourism", url: "ai4tourism.com", logo: "/images/ai4tourism-logo.png", logoClass: "h-6" },
];

export function BrandsSection({ t }: { t: BrandsCopy }) {
  const [isVisible, setIsVisible] = useState(false);
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
          <span className={`relative isolate inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span
              aria-hidden
              className="absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            />
            <span className="w-12 h-px bg-foreground/20" />
            {t.eyebrow}
          </span>

          <h2 className={`relative text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] isolate transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <span
              aria-hidden
              className="absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            />
            {t.headingLead}
            <br />
            <span className="text-muted-foreground">{t.headingAccent}</span>
          </h2>

          <p className={`relative mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg isolate transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span
              aria-hidden
              className="absolute -inset-x-8 -inset-y-6 -z-10 backdrop-blur-sm bg-background/60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            />
            {t.intro}
          </p>
        </div>

        {/* Brand cards — same design as the /brands page selector cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <LocaleLink
              key={brand.name}
              href={`/brands?brand=${brand.id}`}
              className={`group relative flex flex-col text-left p-8 lg:p-10 rounded-2xl border border-foreground/10 bg-white overflow-hidden transition-all duration-400 hover:border-foreground/30 hover:shadow-[0_8px_40px_-12px_rgba(51,79,90,0.12)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-xs text-[#AAD7E6]">
                  {String(index + 1).padStart(2, "0")} / 03
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground">
                  {t.items[index].audience}
                </span>
              </div>

              <div className="h-16 flex items-center gap-1.5 mb-5">
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

              <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                {t.items[index].description}
              </p>

              <span className="inline-flex items-center justify-between gap-2 text-sm font-mono text-[#334F5A]">
                {brand.url}
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#AAD7E6] text-[#334F5A] transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AAD7E6] transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
            </LocaleLink>
          ))}
        </div>
      </div>
    </section>
  );
}
