"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { practices, type Practice } from "@/lib/services-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Editorial "showcase" — each practice gets its own ScrollTrigger-pinned scene.
// Pin the moment, then scroll-scrub the title reveal, lead fade, body, list and
// flagship callout in. Feels premium because the scroll IS the animation.

export function ServicesShowcase() {
  return (
    <section className="relative z-10">
      {/* Section opener */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-12 lg:pb-16">
        <span className="font-mono text-xs text-[#334F5A]/55 uppercase tracking-wider block mb-5">
          What we offer
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.02] max-w-[16ch]">
          Four services.
          <br />
          <span className="text-[#334F5A]/45">In depth.</span>
        </h2>
      </div>

      {/* Pinned, scroll-scrubbed moments */}
      <div>
        {practices.map((p, i) => (
          <PracticeMoment key={p.slug} practice={p} reversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function PracticeMoment({
  practice,
  reversed,
}: {
  practice: Practice;
  reversed: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const flagshipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const section = sectionRef.current;
      if (!section) return;

      // Split the title into characters and the lead into words for the
      // ref.digital-style staggered reveal.
      const titleSplit = titleRef.current
        ? new SplitText(titleRef.current, { type: "chars,words", charsClass: "split-char" })
        : null;
      const leadSplit = leadRef.current
        ? new SplitText(leadRef.current, { type: "words", wordsClass: "split-word" })
        : null;

      // Set starting states
      if (titleSplit) gsap.set(titleSplit.chars, { yPercent: 110, opacity: 0 });
      if (leadSplit) gsap.set(leadSplit.words, { yPercent: 100, opacity: 0 });
      gsap.set(bodyRef.current, { y: 40, opacity: 0 });
      const listItems = listRef.current?.querySelectorAll<HTMLLIElement>("li") ?? [];
      gsap.set(listItems, { y: 24, opacity: 0 });
      gsap.set(ctaRef.current, { y: 24, opacity: 0 });
      gsap.set(watermarkRef.current, { scale: 0.65, opacity: 0 });
      gsap.set(flagshipRef.current, { y: 60, opacity: 0, scale: 0.96 });

      // One timeline that's scrubbed against the scroll progress.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=85%",
          pin: true,
          pinSpacing: true,
          scrub: 0.3,
          anticipatePin: 1,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(watermarkRef.current, { scale: 1, opacity: 1, duration: 0.8 }, 0);

      if (titleSplit) {
        tl.to(
          titleSplit.chars,
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.018, ease: "power3.out" },
          0.05,
        );
      }

      if (leadSplit) {
        tl.to(
          leadSplit.words,
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.04 },
          0.35,
        );
      }

      tl.to(bodyRef.current, { y: 0, opacity: 1, duration: 0.8 }, 0.55)
        .to(listItems, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 }, 0.7)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.5 }, 1)
        .to(
          flagshipRef.current,
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
          0.4,
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        titleSplit?.revert();
        leadSplit?.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <article
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-24 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* COPY COLUMN */}
          <div
            className={`lg:col-span-7 ${
              reversed ? "lg:col-start-6 lg:order-2" : ""
            }`}
          >
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-xs text-[#AAD7E6]">
                {practice.number}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#334F5A]/55">
                {practice.tag}
              </span>
            </div>

            {/* Massive title */}
            <h3
              ref={titleRef}
              className="font-display text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] text-[#334F5A] tracking-tight"
            >
              {practice.title}
            </h3>

            {/* Italic display lead */}
            <p
              ref={leadRef}
              className="mt-7 font-display italic text-xl md:text-2xl lg:text-3xl text-[#334F5A]/65 leading-[1.15] max-w-[26ch]"
            >
              {practice.lead}
            </p>

            {/* Body */}
            <p
              ref={bodyRef}
              className="mt-9 text-base lg:text-lg text-[#334F5A]/75 leading-relaxed max-w-[58ch]"
            >
              {practice.description}
            </p>

            {/* Deliverables */}
            <div ref={listRef} className="mt-10 max-w-[58ch]">
              <p className="font-mono text-[10px] text-[#334F5A]/50 uppercase tracking-wider mb-4">
                Included
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {practice.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2.5 text-sm text-[#334F5A] font-medium leading-snug"
                  >
                    <span className="text-[#AAD7E6] mt-0.5 shrink-0">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <a
              ref={ctaRef}
              href={`/services/${practice.slug}`}
              className="mt-12 inline-flex items-center gap-3 font-mono text-sm text-[#334F5A] group"
            >
              <span>Explore {practice.title.toLowerCase()}</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </a>
          </div>

          {/* SIDE: giant number watermark + flagship card */}
          <div
            className={`lg:col-span-5 ${
              reversed ? "lg:col-start-1 lg:row-start-1 lg:order-1" : "lg:col-start-9"
            }`}
          >
            {/* Watermark number */}
            <span
              ref={watermarkRef}
              aria-hidden
              className={`block font-display text-[#334F5A]/[0.07] leading-none select-none origin-center ${
                reversed ? "text-right" : "text-left"
              } text-[14rem] sm:text-[18rem] lg:text-[16rem] xl:text-[20rem] tracking-tighter`}
            >
              {practice.number}
            </span>

            {/* Flagship metric callout */}
            <div
              ref={flagshipRef}
              className="relative -mt-12 lg:-mt-20 rounded-2xl bg-[#334F5A] overflow-hidden p-7 lg:p-9"
            >
              <div className="absolute -top-16 -right-12 w-64 h-64 rounded-full bg-[#AAD7E6]/15 blur-[80px] pointer-events-none" />
              <div className="relative">
                <span className="font-mono text-[10px] text-[#AAD7E6]/80 uppercase tracking-wider">
                  Flagship engagement
                </span>
                <p className="mt-5 font-display text-5xl lg:text-6xl text-white leading-none">
                  {practice.flagship.metric}
                </p>
                <p className="mt-3 font-mono text-xs text-[#AAD7E6]">
                  {practice.flagship.label}
                </p>
                <p className="mt-5 text-sm text-white/70 leading-relaxed">
                  {practice.flagship.outcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
