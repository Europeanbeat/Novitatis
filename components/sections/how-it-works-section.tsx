"use client";

import { useEffect, useRef, useState } from "react";
import { practices } from "@/lib/services-content";

const steps = [
  {
    number: "01",
    title: "Consulting",
    subtitle: "& strategy",
    description: "We analyse the market, build destination strategy, and support the digital transition. From SMEs to municipalities.",
  },
  {
    number: "02",
    title: "Development",
    subtitle: "& digitalisation",
    description: "Custom web solutions, AI-based tools and digitalisation projects, from idea to delivery.",
  },
  {
    number: "03",
    title: "Education",
    subtitle: "& mentoring",
    description: "Workshops, mentoring programmes and training for tourism professionals, on Google, AI and Smart Destination topics.",
  },
  {
    number: "04",
    title: "Public Speaking",
    subtitle: "& shaping the field",
    description: "Conferences, professional events and talks, shaping the conversation about the digital future of tourism.",
  },
];

export function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      id="szolgaltatasok"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f5f9fa] text-[#334F5A] overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#AAD7E6]/[0.15] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — titre + image cerisier */}
        <div className="relative mb-0 lg:mb-0 grid lg:grid-cols-2 gap-4 lg:gap-12 items-end">
          {/* Titre colonne gauche */}
          <div className="pb-10 lg:pb-24">
            <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-[#334F5A]/40 mb-8">
                <span className="w-12 h-px bg-[#334F5A]/20" />
                Our services
              </span>
            </div>

            <h2 className={`relative text-6xl md:text-7xl lg:text-[125px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}>
              <span className="block">Strategy</span>
              <span className="block text-[#334F5A]/45">Technology</span>
              <span className="block text-[#AAD7E6]">Knowledge</span>
            </h2>
          </div>

          {/* Image cerisier — se colle en bas sur les blocs */}
          <div className={`relative h-[320px] lg:h-[640px] overflow-hidden transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <img
              src="/images/Pillars.png"
              alt="pillars"
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-full h-full object-contain object-right-bottom"
            />
            {/* Fade sur le bord gauche */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5f9fa] from-30% via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Photo cards, one per service, linking to the subpages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {steps.map((step, index) => {
            const practice = practices[index];
            return (
              <a
                key={step.number}
                href={`/services/${practice.slug}`}
                className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-foreground/10 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-[#AAD7E6] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-28px_rgba(51,79,90,0.4)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 90}ms` : "0ms" }}
              >
                {/* Treated photo */}
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={practice.photo.src}
                    alt={practice.photo.alt}
                    className="absolute inset-0 h-full w-full object-cover grayscale-[30%] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-[#334F5A]/25 mix-blend-multiply pointer-events-none" />
                  <span className="absolute top-3 left-3 font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-sm text-[#334F5A]">
                    {step.number}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6 lg:p-7">
                  <h3 className="text-2xl lg:text-[1.7rem] font-display leading-tight">
                    {step.title}
                  </h3>
                  <span className="text-lg text-[#334F5A]/40 font-display block mb-4">
                    {step.subtitle}
                  </span>
                  <p className="text-sm text-[#334F5A]/65 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs text-[#334F5A]">
                    <span className="link-sweep">Read more</span>
                    <span className="text-[#AAD7E6] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1.5">
                      &rarr;
                    </span>
                  </span>
                </div>

                {/* Accent line that sweeps in on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#AAD7E6] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
