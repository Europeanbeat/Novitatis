"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Four services. NOT a 1-2-3-4 sequence (UX review) and each card links
// through to its own sub-page.
const steps = [
  {
    title: "Consulting",
    subtitle: "& strategy",
    slug: "consulting",
    description: "We analyse the market, build destination strategy, and support the digital transition. From SMEs to municipalities.",
  },
  {
    title: "Development",
    subtitle: "& digitalisation",
    slug: "development",
    description: "Custom web solutions, AI-based tools and digitalisation projects, from idea to delivery.",
  },
  {
    title: "Education",
    subtitle: "& mentoring",
    slug: "education",
    description: "Workshops, mentoring programmes and training for tourism professionals, on Google, AI and Smart Destination topics.",
  },
  {
    title: "Public Speaking",
    subtitle: "& shaping the field",
    slug: "public-speaking",
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
          <div className="pb-0 lg:pb-32">
            <div className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-[#334F5A]/40 mb-8">
                <span className="w-12 h-px bg-[#334F5A]/20" />
                Our services
              </span>
            </div>

            <h2 className={`relative text-5xl md:text-6xl lg:text-[88px] font-display tracking-tight leading-[0.9] transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}>
              <span className="block">Strategy</span>
              <span className="block text-[#334F5A]/30">Technology</span>
              <span className="block text-[#AAD7E6]">Knowledge</span>
            </h2>
          </div>

          {/* Image cerisier — se colle en bas sur les blocs */}
          <div className={`relative h-[280px] lg:h-[520px] overflow-hidden transition-all duration-700 delay-200 ${
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

        {/* Four service cards — each links to its sub-page; no sequence implied */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <Link
              key={step.slug}
              href={`/services/${step.slug}`}
              className={`group relative flex flex-col text-left p-8 lg:p-10 border bg-white border-[#334F5A]/20 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-[#AAD7E6] hover:-translate-y-1.5 hover:shadow-[0_24px_56px_-28px_rgba(51,79,90,0.4)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
            >
              <h3 className="text-3xl lg:text-4xl font-display mb-1">
                {step.title}
              </h3>
              <span className="text-xl text-[#334F5A]/45 font-display block mb-6">
                {step.subtitle}
              </span>

              <p className="text-[#334F5A]/70 leading-relaxed mb-8">
                {step.description}
              </p>

              <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#334F5A]">
                Explore
                <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
              </span>

              {/* hover accent underline */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#AAD7E6] transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
