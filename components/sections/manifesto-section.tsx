"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// SVZ-style manifesto: the paragraph sticks while words light up one by one
// with the scroll. The four service names are highlighted and link to their
// subpages. Words are real spans rendered on the server, so there is no
// layout shift and search engines read the full sentence.

type Token = { text: string; href?: string };

const tokens: Token[] = [
  { text: "We are a research-first specialist network where tourism meets innovation." },
  { text: "Consulting", href: "/services/consulting" },
  { text: "sets the course, built on field work and evidence." },
  { text: "Development", href: "/services/development" },
  { text: "turns strategy into working digital and AI tools." },
  { text: "Education", href: "/services/education" },
  { text: "embeds the capability inside your team, so it stays. And" },
  { text: "public speaking", href: "/services/public-speaking" },
  { text: "carries the ideas from Lake Balaton to ITB Berlin." },
];

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // GSAP pin instead of CSS sticky: the page wrapper's overflow-x-hidden
    // breaks position: sticky, but ScrollTrigger pinning is immune to it.
    const words = section.querySelectorAll<HTMLElement>(".mf-word");
    gsap.set(words, { opacity: 0.16 });
    const tween = gsap.to(words, {
      opacity: 1,
      stagger: 0.06,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=130%",
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 min-h-screen flex items-center">
      <div className="w-full">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <span className="mf-word font-mono text-xs text-[#334F5A]/55 uppercase tracking-wider block mb-8">
            Who we are
          </span>
          <p className="font-display text-3xl md:text-5xl lg:text-[3.4rem] text-[#334F5A] leading-[1.18]">
            {tokens.map((token, i) =>
              token.href ? (
                <a
                  key={i}
                  href={token.href}
                  className="mf-word inline-block whitespace-nowrap rounded-lg bg-[#AAD7E6]/35 px-3 pb-1 mx-1 transition-colors duration-300 hover:bg-[#AAD7E6]/70"
                >
                  {token.text}
                </a>
              ) : (
                token.text.split(" ").map((word, j) => (
                  <span key={`${i}-${j}`} className="mf-word inline-block mx-1">
                    {word}
                  </span>
                ))
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
