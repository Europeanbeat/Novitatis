"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { practices, type Practice } from "@/lib/services-content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Editorial showcase. Each practice is a card with a treated photograph and
// the copy beside it. Content animates in ONCE when the card enters the
// viewport and then stays readable; nothing is tied to scroll position. The
// second scene runs dark for tonal rhythm, photo sides alternate.

export function ServicesShowcase() {
  const stackRef = useRef<HTMLDivElement>(null);

  // Stacking cards: each card pins below the nav while the next one slides up
  // and covers it; the covered card recedes slightly. Desktop only, and each
  // pin releases exactly when its successor has covered it, so the jump back
  // to natural position is never visible.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const TOP = 96;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(stack.children);
      // Equal heights, or a shorter card sliding over a taller one leaves the
      // taller card's bottom sticking out beneath the stack.
      const max = Math.max(...cards.map((c) => c.offsetHeight));
      cards.forEach((c) => {
        c.style.height = `${max}px`;
      });
      ScrollTrigger.refresh();
      const triggers: ScrollTrigger[] = [];
      const tweens: gsap.core.Tween[] = [];
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const next = cards[i + 1];
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: `top ${TOP}`,
            // hold a little past full coverage so the released card's jump
            // back to natural position happens entirely above the viewport
            end: () => "+=" + (next.offsetTop - card.offsetTop + TOP),
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          }),
        );
        // While the next card approaches, the pinned one recedes
        tweens.push(
          gsap.to(card, {
            scale: 0.95,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: `top ${TOP}`,
              scrub: true,
            },
          }),
        );
        // ...and fades out just before full coverage, so its tail is never
        // seen trailing through the gap above the stack after release
        tweens.push(
          gsap.to(card, {
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: `top ${TOP + 180}`,
              end: `top ${TOP}`,
              scrub: true,
            },
          }),
        );
      });
      return () => {
        triggers.forEach((t) => t.kill());
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
        cards.forEach((c) => {
          c.style.height = "";
        });
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="relative z-10">
      {/* Section opener */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 lg:pt-14 pb-8 lg:pb-10">
        <span className="font-mono text-xs text-[#334F5A]/55 uppercase tracking-wider block mb-5">
          What we offer
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#334F5A] leading-[1.02] max-w-[16ch]">
          Four services.
          <br />
          <span className="text-[#334F5A]/45">In depth.</span>
        </h2>
      </div>

      <div
        ref={stackRef}
        className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-8 lg:space-y-12 pb-8 lg:pb-12"
      >
        {practices.map((p, i) => (
          <PracticeMoment
            key={p.slug}
            practice={p}
            reversed={i % 2 === 1}
            dark={i === 1}
            zIndex={i + 1}
          />
        ))}
      </div>
    </section>
  );
}

function PracticeMoment({
  practice,
  reversed,
  dark,
  zIndex,
}: {
  practice: Practice;
  reversed: boolean;
  dark: boolean;
  zIndex: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const photo = card.querySelector<HTMLElement>(".pm-photo");
    const photoImg = card.querySelector<HTMLElement>(".pm-photo img");
    const items = card.querySelectorAll<HTMLElement>(".pm-item");
    // chars for the reveal, words so the browser wraps whole words and never
    // breaks "digitalisation" across lines
    const titleSplit = titleRef.current
      ? new SplitText(titleRef.current, { type: "chars,words" })
      : null;

    if (titleSplit) gsap.set(titleSplit.chars, { yPercent: 110, opacity: 0 });
    gsap.set(items, { y: 28, opacity: 0 });
    if (photo) gsap.set(photo, { clipPath: "inset(100% 0% 0% 0%)" });
    if (photoImg) gsap.set(photoImg, { scale: 1.15 });

    // Play once when the card enters; never reverse, never scrub.
    const tl = gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 72%", once: true },
      defaults: { ease: "power3.out" },
    });

    if (photo) tl.to(photo, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0);
    if (photoImg) tl.to(photoImg, { scale: 1, duration: 1.4, ease: "power2.out" }, 0);
    if (titleSplit) {
      tl.to(
        titleSplit.chars,
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.014 },
        0.15,
      );
    }
    tl.to(items, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.35);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      titleSplit?.revert();
    };
  }, []);

  const ink = dark ? "text-white" : "text-[#334F5A]";
  const inkSoft = dark ? "text-white/70" : "text-[#334F5A]/75";

  return (
    <article
      ref={cardRef}
      style={{ zIndex }}
      className={`relative overflow-hidden rounded-[2rem] border shadow-[0_30px_80px_-50px_rgba(51,79,90,0.3)] ${
        dark ? "bg-[#334F5A] border-white/10" : "bg-white border-foreground/10"
      }`}
    >
      <div className="grid lg:grid-cols-12 gap-0 items-stretch">
        {/* PHOTO COLUMN */}
        <div
          className={`pm-photo relative lg:col-span-5 min-h-[300px] lg:min-h-[560px] overflow-hidden ${
            reversed ? "lg:order-2" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={practice.photo.src}
            alt={practice.photo.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover grayscale-[30%] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[1.04]"
          />
          {/* Brand wash so every photo reads as one family */}
          <div className="absolute inset-0 bg-[#334F5A]/25 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#334F5A]/55 via-transparent to-transparent pointer-events-none" />

          {/* Flagship metric chip over the photo */}
          <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-[#334F5A]/80 backdrop-blur-md p-4 lg:p-5">
            <span className="font-mono text-[10px] text-[#AAD7E6]/90 uppercase tracking-wider">
              Flagship: {practice.flagship.label}
            </span>
            <p className="mt-1.5 font-display text-3xl lg:text-4xl text-white leading-none">
              {practice.flagship.metric}
            </p>
          </div>
        </div>

        {/* COPY COLUMN */}
        <div
          className={`lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center ${
            reversed ? "lg:order-1" : ""
          }`}
        >
          <div className="pm-item flex items-baseline gap-3 mb-5">
            <span className="font-mono text-xs text-[#AAD7E6]">{practice.number}</span>
            <span
              className={`font-mono text-[11px] uppercase tracking-wider ${
                dark ? "text-white/55" : "text-[#334F5A]/55"
              }`}
            >
              {practice.tag}
            </span>
          </div>

          <h3
            ref={titleRef}
            className={`font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight overflow-hidden ${ink}`}
          >
            {practice.title}
          </h3>

          <p
            className={`pm-item mt-5 font-display italic text-xl lg:text-2xl leading-[1.15] max-w-[30ch] ${
              dark ? "text-[#AAD7E6]" : "text-[#334F5A]/65"
            }`}
          >
            {practice.lead}
          </p>

          <p className={`pm-item mt-6 text-base lg:text-lg leading-relaxed max-w-[58ch] ${inkSoft}`}>
            {practice.description}
          </p>

          <p className={`pm-item mt-4 text-sm leading-snug max-w-[58ch] ${inkSoft}`}>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#AAD7E6] mr-2">
              Proof
            </span>
            {practice.flagship.outcome}
          </p>

          <div className="pm-item mt-8 max-w-[58ch]">
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {practice.deliverables.map((d) => (
                <li
                  key={d}
                  className={`flex items-start gap-2.5 text-sm font-medium leading-snug ${
                    dark ? "text-white/85" : "text-[#334F5A]"
                  }`}
                >
                  <span className="text-[#AAD7E6] mt-0.5 shrink-0">&mdash;</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="pm-item mt-9">
            <a
              href={`/services/${practice.slug}`}
              className={`group inline-flex items-center gap-3 rounded-full border pl-6 pr-2 py-2 font-mono text-sm transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                dark
                  ? "border-white/25 text-white hover:border-[#AAD7E6] hover:bg-[#AAD7E6] hover:text-[#334F5A]"
                  : "border-[#334F5A]/20 bg-white text-[#334F5A] hover:border-[#334F5A] hover:bg-[#334F5A] hover:text-white hover:shadow-[0_12px_32px_-12px_rgba(51,79,90,0.45)]"
              }`}
            >
              <span>Read more about {practice.title.toLowerCase()}</span>
              <span
                className={`relative h-8 w-8 overflow-hidden rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,1.51,0.36,0.97)] group-hover:scale-110 ${
                  dark
                    ? "bg-white/10 text-[#AAD7E6] group-hover:bg-[#334F5A] group-hover:text-white"
                    : "bg-[#AAD7E6]/20 text-[#AAD7E6] group-hover:bg-[#AAD7E6] group-hover:text-[#334F5A]"
                }`}
              >
                <span className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-full">
                  &rarr;
                </span>
                <span className="absolute inset-0 grid place-items-center -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0">
                  &rarr;
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
