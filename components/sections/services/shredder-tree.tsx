"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useReducedMotion } from "framer-motion";
import { practices } from "@/lib/services-content";
import { PageBackground } from "@/components/layout/page-background";

// The /services tree, but the structural transition resolves into the realistic
// photo (services-tree.png): our line-like strips gather and bring the tree
// together, leaves grow on the canopy, and the heading + four service labels pin
// over it. Scrolling back shreds it apart into lines and the leaves fall away.

const IMG = "/images/services-tree.png";
const IMG_AR = 853 / 1200;
const N = 72; // strips, same count as our background lines
const LEAF_N = 700;

// Where the four service labels sit, as fractions of the assembled image box.
const NODE_POS = [
  { key: 0, fx: 0.1, fy: 0.54, left: true }, // Consulting (lower-left)
  { key: 1, fx: 0.22, fy: 0.24, left: true }, // Development (upper-left)
  { key: 2, fx: 0.78, fy: 0.24, left: false }, // Education (upper-right)
  { key: 3, fx: 0.9, fy: 0.54, left: false }, // Public speaking (lower-right)
];

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const ease = (t: number) => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LEAVES = (() => {
  const r = seeded(99);
  return Array.from({ length: LEAF_N }, () => {
    let fx = 0.06 + r() * 0.88;
    const fy = 0.02 + r() * r() * 0.6;
    fx += (0.5 - fx) * (r() * r() * 0.4);
    const cr = r();
    const color = cr < 0.16 ? "#AAD7E6" : cr < 0.46 ? "#c9b06a" : "#8fae9b";
    return {
      fx,
      fy,
      rot: r() * 360,
      rxF: 0.004 + r() * 0.004,
      ryF: 0.002 + r() * 0.002,
      color,
      dfx: (r() - 0.5) * 0.14,
      dfy: 0.06 + r() * 0.22,
    };
  });
})();

type Layout = {
  left: number;
  top: number;
  w: number;
  h: number;
  stripW: number;
  scatter: { dx: number; dy: number; rot: number }[];
};

export function ShredderTree() {
  const reduce = useReducedMotion();
  const anchorRef = useRef<HTMLDivElement>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leafRefs = useRef<(SVGEllipseElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<Layout | null>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [formed, setFormed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: anchorRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(760, vw * 0.54); // centrepiece — larger
      const h = w * IMG_AR;
      const left = (vw - w) / 2;
      const top = (vh - h) / 2 + vh * 0.07;
      const stripW = w / N;
      const rand = seeded(7);
      const scatter = Array.from({ length: N }, () => ({
        dx: (rand() - 0.5) * vw * 0.95,
        dy: (rand() - 0.5) * vh * 0.85,
        rot: -42 + (rand() - 0.5) * 26,
      }));
      const L: Layout = { left, top, w, h, stripW, scatter };
      layoutRef.current = L;
      setLayout(L);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let formedNow = false;
    const loop = () => {
      const L = layoutRef.current;
      if (L) {
        const p = scrollYProgress.get();
        const k = clamp(Math.min(p / 0.375, (0.68 - p) / 0.2, 1), 0, 1);
        const ek = ease(k);
        if (headingRef.current) {
          headingRef.current.style.opacity = String(clamp(Math.min(p / 0.05, (0.68 - p) / 0.12, 1), 0, 1));
        }
        // Standard background lines show at rest (aligned with the site), fade as
        // the photo assembles.
        if (bgRef.current) bgRef.current.style.opacity = String(1 - ek);
        for (let i = 0; i < N; i++) {
          const el = stripRefs.current[i];
          if (!el) continue;
          const s = L.scatter[i];
          const tx = s.dx * (1 - ek);
          const ty = s.dy * (1 - ek);
          const rot = s.rot * (1 - ek);
          const sc = 0.05 + 0.95 * ek;
          el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scaleX(${sc})`;
          el.style.opacity = String(clamp((ek - 0.04) * 1.12, 0, 1)); // invisible at rest

        }
        const growK = ease(clamp((k - 0.45) / 0.5, 0, 1));
        for (let i = 0; i < LEAF_N; i++) {
          const el = leafRefs.current[i];
          if (!el) continue;
          const lf = LEAVES[i];
          const g = ease(clamp((growK - (i / LEAF_N) * 0.12) / 0.88, 0, 1));
          const fall = 1 - g;
          const x = L.left + (lf.fx + lf.dfx * fall) * L.w;
          const y = L.top + (lf.fy + lf.dfy * fall * fall) * L.h;
          el.setAttribute("transform", `translate(${x} ${y}) rotate(${lf.rot + fall * 120}) scale(${g})`);
          el.setAttribute("fill-opacity", (g * 0.92).toFixed(2));
        }
        const fm = k > 0.82;
        if (fm !== formedNow) {
          formedNow = fm;
          setFormed(fm);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, scrollYProgress]);

  return (
    <>
      {/* Standard site background lines — shown at rest, faded as the photo forms */}
      <div ref={bgRef}>
        <PageBackground />
      </div>

      <div className="fixed inset-0 z-0 hidden md:block overflow-hidden pointer-events-none">
        {/* Photo strips */}
        {layout &&
          Array.from({ length: N }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                stripRefs.current[i] = el;
              }}
              className="absolute will-change-transform"
              style={{
                left: layout.left + i * layout.stripW,
                top: layout.top,
                width: layout.stripW + 0.6,
                height: layout.h,
                backgroundImage: `url(${IMG})`,
                backgroundSize: `${layout.w}px ${layout.h}px`,
                backgroundPosition: `${-i * layout.stripW}px 0`,
                backgroundRepeat: "no-repeat",
                transformOrigin: "center center",
                opacity: 0,
              }}
            />
          ))}

        {/* Leaves over the canopy */}
        {layout && (
          <svg className="absolute inset-0 w-full h-full" fill="none">
            {LEAVES.map((lf, i) => (
              <ellipse
                key={i}
                ref={(el) => {
                  leafRefs.current[i] = el;
                }}
                cx={0}
                cy={0}
                rx={lf.rxF * layout.w}
                ry={lf.ryF * layout.w}
                fill={lf.color}
                fillOpacity={0}
                transform={`translate(${layout.left + lf.fx * layout.w} ${layout.top + lf.fy * layout.h}) scale(0)`}
              />
            ))}
          </svg>
        )}

        {/* Pinned heading */}
        <div
          ref={headingRef}
          className="absolute left-1/2 -translate-x-1/2 top-[12%] w-[44ch] max-w-[88vw] text-center"
          style={{ opacity: 0 }}
        >
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05]">
            Four services. One method.
          </h2>
          <p className="mt-4 text-lg text-[#334F5A]/80 leading-relaxed mx-auto max-w-[44ch]">
            Consulting, development, education and public speaking, our four main
            services, all run on the same research-first method.
          </p>
        </div>

        {/* Service labels + base button */}
        {layout && (
          <>
            {NODE_POS.map((np) => {
              const pr = practices[np.key];
              return (
                <a
                  key={pr.slug}
                  href={`/services/${pr.slug}`}
                  className={`group absolute w-[280px] ${np.left ? "text-right" : "text-left"}`}
                  style={{
                    left: layout.left + np.fx * layout.w + (np.left ? -40 : 40),
                    top: layout.top + np.fy * layout.h,
                    transform: np.left ? "translate(-100%, -50%)" : "translate(0, -50%)",
                    opacity: formed ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    pointerEvents: formed ? "auto" : "none",
                  }}
                >
                  <div className={`flex items-baseline gap-2 mb-1 ${np.left ? "justify-end" : ""}`}>
                    <span className="font-mono text-xs text-[#AAD7E6]">{pr.number}</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#334F5A]/55">
                      {pr.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-[#334F5A] leading-[1.05] transition-colors group-hover:text-[#5b94a8]">
                    {pr.title}
                  </h3>
                </a>
              );
            })}
            <span
              className="absolute -translate-x-1/2 rounded-full bg-[#334F5A] px-5 py-2 font-mono text-[11px] text-white whitespace-nowrap"
              style={{
                left: layout.left + layout.w * 0.5,
                top: layout.top + layout.h - 6,
                opacity: formed ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              Research-first method
            </span>
          </>
        )}
      </div>

      <div ref={anchorRef} className="relative z-10">
        <div className="hidden md:block h-[250vh]" aria-hidden />
      </div>
    </>
  );
}
