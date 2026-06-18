"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  start?: string;
  scale?: number;
}

export function ScrollReveal({
  children,
  direction = "up",
  duration = 0.9,
  delay = 0,
  distance = 40,
  className = "",
  start = "top 88%",
  scale = 1,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  // Motion diet: whatever the call site asks for, reveals stay short, small
  // and nearly unstaggered. One clamp here calms every reveal on the site.
  duration = Math.min(duration, 0.55);
  distance = Math.min(distance, 14);
  delay = Math.min(delay, 0.1);
  scale = Math.max(scale, 0.99);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getInitialState = (): gsap.TweenVars => {
      const base: gsap.TweenVars = {
        opacity: 0,
        scale: scale < 1 ? scale : 1,
      };
      switch (direction) {
        case "up":    return { ...base, y: distance };
        case "down":  return { ...base, y: -distance };
        case "left":  return { ...base, x: distance };
        case "right": return { ...base, x: -distance };
      }
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(element, getInitialState(), {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, [direction, duration, delay, distance, start, scale]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
