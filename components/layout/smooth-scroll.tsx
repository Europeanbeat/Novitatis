"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Site-wide inertial smooth scrolling. Lenis drives window scroll, so
// framer-motion's useScroll and GSAP's ScrollTrigger keep working unchanged.
// Skipped entirely for users who prefer reduced motion.
// wheelMultiplier stays at 1 so scroll distance matches the user's hand;
// anything below 1 reads as lag, not smoothness.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
