"use client";

import { useEffect, useRef, useState } from "react";
import { Halo } from "@/components/sections/services/_halo";

// Counts a stat up from zero when it scrolls into view. Handles values like
// "10+", "100%", "3": the numeric part animates, the suffix stays.
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

const features = [
  {
    number: "01",
    title: "Strategic mindset",
    description: "We don't just deliver a service, we think alongside you. Every project is planned and executed around long-term goals, not short-term outputs.",
    stats: { value: "10+", label: "years of industry experience" },
  },
  {
    number: "02",
    title: "Technology & innovation",
    description: "We apply AI, digitisation and the latest technology to help clients gain a real competitive edge in tourism, not as a trend, but as a practical tool.",
    stats: { value: "3", label: "own technology brands" },
  },
  {
    number: "03",
    title: "Knowledge sharing",
    description: "We share what we know through workshops, mentoring programmes and talks, because lasting development is built on continuous learning.",
    stats: { value: "20+", label: "talks, panels & workshops" },
  },
  {
    number: "04",
    title: "Tourism specialists",
    description: "We work only in tourism and hospitality. We know the challenges, the players and the opportunities.",
    stats: { value: "60+", label: "projects across tourism" },
  },
];




export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Full width with diagonal layout */}
        <div className="relative mb-12 lg:mb-16">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="relative isolate lg:col-span-7">
              <Halo />
              <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="w-12 h-px bg-foreground/30" />
                Why us?
              </span>
              <h2
                className={`text-6xl md:text-7xl lg:text-8xl font-display tracking-tight leading-[0.9] transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Why <span className="text-muted-foreground">Novitatis?</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pb-4">
             
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Large feature card */}
          <div 
            className={`lg:col-span-12 relative bg-white border border-foreground/10 min-h-[500px] overflow-hidden group transition-all duration-700 flex ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            onMouseEnter={() => setActiveFeature(0)}
          >
            {/* Left: text content */}
            <div className="relative flex-1 p-8 lg:p-12 bg-white">
              <div className="relative z-10">
                <span className="font-mono text-sm text-muted-foreground">{features[0].number}</span>
                <h3 className="text-3xl lg:text-4xl font-display mt-4 mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {features[0].title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mb-8">
                  {features[0].description}
                </p>
                <div>
                  <span className="text-5xl lg:text-6xl font-display">
                    <CountUp value={features[0].stats.value} />
                  </span>
                  <span className="block text-sm text-muted-foreground font-mono mt-2">{features[0].stats.label}</span>
                </div>
              </div>
            </div>

            {/* Right: mirrored image, full height */}
            <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden">
              <img
                src="/images/adam_schmutz.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ transform: "scaleX(-1)" }}
              />
              {/* Fade left edge into white */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
            </div>
          </div>

          {/* Three stat cards for the remaining features */}
          {features.slice(1).map((feature, i) => (
            <div
              key={feature.number}
              className={`lg:col-span-4 relative bg-white border border-foreground/10 p-8 lg:p-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: isVisible ? `${150 + i * 100}ms` : "0ms" }}
            >
              <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
              <h3 className="text-2xl font-display mt-3 mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                {feature.description}
              </p>
              <div>
                <span className="text-4xl lg:text-5xl font-display text-[#334F5A]">
                  <CountUp value={feature.stats.value} />
                </span>
                <span className="block text-xs text-muted-foreground font-mono mt-2">
                  {feature.stats.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
