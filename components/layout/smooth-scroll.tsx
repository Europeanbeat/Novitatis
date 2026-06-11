"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Site-wide inertial smooth scrolling (same settings as svz.io). Lenis drives
// window scroll, so framer-motion's useScroll and GSAP's ScrollTrigger keep
// working unchanged. Skipped entirely for users who prefer reduced motion.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.8,
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
