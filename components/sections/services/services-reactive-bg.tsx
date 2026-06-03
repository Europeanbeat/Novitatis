"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useReducedMotion } from "framer-motion";
import { PageBackground } from "@/components/layout/page-background";
import { practices } from "@/lib/services-content";

// The page background IS the tree. The same 72 lines float at rest and, as the
// anchor scrolls through the services zone, their control points interpolate
// into a tree and hold (the fixed layer makes it levitate), then relax again.

type Pt = [number, number];
type Line = { pts: Pt[]; w: number; o: number };

const VB_W = 696;
const VB_H = 316;

// ---- Exact background lines (same math as page-background.tsx) ----
function backgroundLines(): Line[] {
  const lines: Line[] = [];
  for (const position of [1, -1]) {
    for (let i = 0; i < 36; i++) {
      const ax = -(380 - i * 5 * position);
      const ay = -(189 + i * 6);
      const bx = -(312 - i * 5 * position);
      const by = 216 - i * 6;
      const ex = 152 - i * 5 * position;
      const ey = 343 - i * 6;
      const fx = 616 - i * 5 * position;
      const fy = 470 - i * 6;
      const gx = 684 - i * 5 * position;
      const gy = 875 - i * 6;
      lines.push({
        pts: [
          [ax, ay],
          [ax, ay],
          [bx, by],
          [ex, ey],
          [fx, fy],
          [gx, gy],
          [gx, gy],
        ],
        w: 0.5 + i * 0.03,
        o: Math.min(0.5, 0.14 + i * 0.025),
      });
    }
  }
  return lines;
}

// ---- Tree target: flowing bonsai-style trunk + branches, all made of lines ----
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A curved (flowing) segment from a to b, as M + two cubics (7 points).
function curvedSeg(a: Pt, b: Pt, rand: () => number, curve: number): Pt[] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L = Math.hypot(dx, dy) || 1;
  const px = -dy / L;
  const py = dx / L;
  const w = (rand() - 0.5) * curve;
  const w2 = (rand() - 0.5) * curve * 0.55;
  const mx = a[0] + dx * 0.5 + px * w;
  const my = a[1] + dy * 0.5 + py * w;
  return [
    a,
    [a[0] + dx * 0.2 + px * w2, a[1] + dy * 0.2 + py * w2],
    [mx - dx * 0.2, my - dy * 0.2],
    [mx, my],
    [mx + dx * 0.2, my + dy * 0.2],
    [b[0] - dx * 0.2 + px * w2, b[1] - dy * 0.2 + py * w2],
    b,
  ];
}

function buildTreeData(): {
  structural: Pt[][];
  foliage: { pts: Pt[]; root: Pt; o: number }[];
  nodes: { x: number; y: number }[];
} {
  const rand = seeded(20260603);
  const ranked: { pts: Pt[]; rank: number }[] = [];

  // Recursive fractal (Coding Train / Marllon-Freitas): each branch splits into two
  // at +/- an angle, shorter each time, every child starting at its parent's tip, so
  // the whole tree is ONE connected system. Thickness comes from drawing low-depth
  // segments with several woven strands and high-depth ones with a single line.
  const baseP: Pt = [349, 303];
  const ROT = 0.66;
  const LF = 0.72;
  const MAXD = 9;
  const fseg: { a: Pt; b: Pt; depth: number }[] = [];
  const branch = (x: number, y: number, ang: number, len: number, depth: number) => {
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    fseg.push({ a: [x, y], b: [ex, ey], depth });
    if (len < 4 || depth >= MAXD) return;
    const jl = () => LF * (0.86 + rand() * 0.28);
    const ja = () => (rand() - 0.5) * 0.3;
    branch(ex, ey, ang - ROT + ja(), len * jl(), depth + 1);
    branch(ex, ey, ang + ROT + ja(), len * jl(), depth + 1);
  };
  branch(baseP[0], baseP[1], -Math.PI / 2, 56, 0);
  fseg.sort((a, b) => a.depth - b.depth || a.b[0] - b.b[0]);

  const strandsFor = (d: number) => (d === 0 ? 7 : d === 1 ? 4 : d === 2 ? 3 : d === 3 ? 2 : 1);
  const segPaths = (s: { a: Pt; b: Pt; depth: number }): Pt[][] => {
    const dx = s.b[0] - s.a[0];
    const dy = s.b[1] - s.a[1];
    const L = Math.hypot(dx, dy) || 1;
    const px = -dy / L;
    const py = dx / L;
    const n = strandsFor(s.depth);
    const width = 6 * (n / 7);
    const out: Pt[][] = [];
    for (let k = 0; k < n; k++) {
      const o = n > 1 ? (k / (n - 1) - 0.5) * width : 0;
      out.push(curvedSeg([s.a[0] + px * o, s.a[1] + py * o], s.b, rand, L * 0.16));
    }
    return out;
  };

  // Structural: fill up to 72 from the lowest-depth segments (trunk + main branches).
  let cursor = 0;
  for (const s of fseg) {
    if (ranked.length >= 72) break;
    for (const p of segPaths(s)) {
      if (ranked.length >= 72) break;
      ranked.push({ pts: p, rank: 80 - s.depth * 4 });
    }
    cursor++;
  }

  ranked.sort((a, b) => b.rank - a.rank);
  const structural = ranked.slice(0, 72).map((l) => l.pts);
  while (structural.length < 72) structural.push(structural[structural.length - 1]);

  // Foliage: the remaining deeper segments, single strands that grow out of their
  // parent's tip (collapse to s.a) and vanish at rest.
  const foliage: { pts: Pt[]; root: Pt; o: number }[] = [];
  for (let i = cursor; i < fseg.length && foliage.length < 150; i++) {
    const s = fseg[i];
    const L = Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]);
    foliage.push({ pts: curvedSeg(s.a, s.b, rand, L * 0.2), root: s.a, o: 0.16 + rand() * 0.2 });
  }

  // Service nodes: four well-spread fractal tips.
  const cand = fseg.filter((s) => s.depth >= 4 && s.depth <= 6).map((s) => s.b);
  cand.sort((a, b) => a[0] - b[0]);
  const pick = (f: number) =>
    cand[Math.min(cand.length - 1, Math.max(0, Math.round(f * (cand.length - 1))))];
  const N: Pt[] = [pick(0.06), pick(0.37), pick(0.63), pick(0.94)];
  const nodes = N.map((p) => ({ x: p[0], y: p[1] }));
  return { structural, foliage, nodes };
}

const BG = backgroundLines().sort((a, b) => b.w - a.w);
const TREE_DATA = buildTreeData();
const STRUCT: Pt[][] = TREE_DATA.structural;
const FOL = TREE_DATA.foliage;
const NODES = TREE_DATA.nodes;
const ROOT: Pt = [349, 303];

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const ease = (t: number) => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};

export function ServicesReactiveBg() {
  const reduce = useReducedMotion();
  const anchorRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const folRefs = useRef<(SVGPathElement | null)[]>([]);
  const [formed, setFormed] = useState(false);
  const [tf, setTf] = useState<{ s: number; ox: number; oy: number } | null>(null);

  const { scrollYProgress } = useScroll({
    target: anchorRef,
    offset: ["start end", "end start"],
  });

  // Letterbox transform so HTML labels line up with the meet-fitted SVG.
  useEffect(() => {
    const calc = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const s = Math.min(W / VB_W, H / VB_H);
      setTf({ s, ox: (W - VB_W * s) / 2, oy: (H - VB_H * s) / 2 });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    let formedNow = false;
    const f = (p: Pt) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
    const loop = () => {
      const p = scrollYProgress.get();
      const k = clamp(Math.min(p / 0.34, (1 - p) / 0.34, 1), 0, 1);
      const ek = ease(k);
      const amp = (1 - ek) * 4;
      const t = performance.now() / 1000;
      for (let i = 0; i < BG.length; i++) {
        const el = pathRefs.current[i];
        if (!el) continue;
        const ki = ease(clamp((k - (i / BG.length) * 0.32) / 0.68, 0, 1));
        const og = BG[i].pts;
        const tr = STRUCT[i];
        const P: Pt[] = [];
        for (let j = 0; j < 7; j++) {
          const ph = i * 0.5 + j;
          const ox = Math.sin(t * 0.4 + ph) * amp;
          const oy = Math.cos(t * 0.33 + ph * 1.3) * amp;
          const sx = og[j][0] + ox;
          const sy = og[j][1] + oy;
          P.push([sx + (tr[j][0] - sx) * ki, sy + (tr[j][1] - sy) * ki]);
        }
        el.setAttribute(
          "d",
          `M${f(P[0])} C ${f(P[1])} ${f(P[2])} ${f(P[3])} C ${f(P[4])} ${f(P[5])} ${f(P[6])}`,
        );
      }
      // Foliage grows out of the branch tips as the tree forms, collapses back at rest
      const growK = ease(clamp((k - 0.3) / 0.62, 0, 1));
      if (growK > 0.005) {
        for (let i = 0; i < FOL.length; i++) {
          const el = folRefs.current[i];
          if (!el) continue;
          const fl = FOL[i];
          const P: Pt[] = [];
          for (let j = 0; j < 7; j++) {
            P.push([
              fl.root[0] + (fl.pts[j][0] - fl.root[0]) * growK,
              fl.root[1] + (fl.pts[j][1] - fl.root[1]) * growK,
            ]);
          }
          el.setAttribute(
            "d",
            `M${f(P[0])} C ${f(P[1])} ${f(P[2])} ${f(P[3])} C ${f(P[4])} ${f(P[5])} ${f(P[6])}`,
          );
          el.setAttribute("stroke-opacity", (fl.o * growK).toFixed(3));
        }
      }
      const fm = k > 0.86;
      if (fm !== formedNow) {
        formedNow = fm;
        setFormed(fm);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, scrollYProgress]);

  // Reduced motion: keep the normal floating background + a static list.
  if (reduce) {
    return (
      <>
        <PageBackground />
        <div ref={anchorRef} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
          <TreeHeading />
          <StaticList />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile: ordinary floating background + static list (no fixed morph) */}
      <div className="md:hidden">
        <PageBackground />
      </div>

      {/* Desktop: the fixed, reactive background that forms the tree */}
      <div className="fixed inset-0 z-0 hidden md:block pointer-events-none overflow-hidden">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-full text-[#334F5A]"
          fill="none"
        >
          {BG.map((line, i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={`M${line.pts[0][0]} ${line.pts[0][1]} C ${line.pts[1][0]} ${line.pts[1][1]} ${line.pts[2][0]} ${line.pts[2][1]} ${line.pts[3][0]} ${line.pts[3][1]} C ${line.pts[4][0]} ${line.pts[4][1]} ${line.pts[5][0]} ${line.pts[5][1]} ${line.pts[6][0]} ${line.pts[6][1]}`}
              stroke="currentColor"
              strokeWidth={line.w}
              strokeOpacity={line.o}
              strokeLinecap="round"
            />
          ))}
          {/* Foliage twigs that grow out of the branch tips on scroll */}
          {FOL.map((fl, i) => (
            <path
              key={`f${i}`}
              ref={(el) => {
                folRefs.current[i] = el;
              }}
              d={`M${fl.root[0]} ${fl.root[1]} C ${fl.root[0]} ${fl.root[1]} ${fl.root[0]} ${fl.root[1]} ${fl.root[0]} ${fl.root[1]} C ${fl.root[0]} ${fl.root[1]} ${fl.root[0]} ${fl.root[1]} ${fl.root[0]} ${fl.root[1]}`}
              stroke="currentColor"
              strokeWidth={0.7}
              strokeOpacity={0}
              strokeLinecap="round"
            />
          ))}
          {/* Green root node */}
          <g style={{ opacity: formed ? 1 : 0, transition: "opacity 0.5s ease" }}>
            <circle cx={ROOT[0]} cy={ROOT[1]} r={16} fill="#3FB27A" opacity={0.22} />
            <circle cx={ROOT[0]} cy={ROOT[1]} r={5} fill="#3FB27A" />
          </g>
          {/* Service nodes */}
          {NODES.map((n, i) => (
            <g key={i} style={{ opacity: formed ? 1 : 0, transition: "opacity 0.5s ease" }}>
              <circle cx={n.x} cy={n.y} r={9} fill="#AAD7E6" opacity={0.22} />
              <circle cx={n.x} cy={n.y} r={3.5} fill="#AAD7E6" />
            </g>
          ))}
        </svg>

        {/* HTML labels, positioned over the SVG via the letterbox transform */}
        {tf && (
          <div className="absolute inset-0">
            <span
              className="absolute -translate-x-1/2 translate-y-3 rounded-full bg-[#334F5A] px-5 py-2 font-mono text-[11px] text-white whitespace-nowrap"
              style={{
                left: tf.ox + ROOT[0] * tf.s,
                top: tf.oy + ROOT[1] * tf.s,
                opacity: formed ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              Research-first method
            </span>
            {NODES.map((n, i) => {
              const p = practices[i];
              return (
                <a
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className="group absolute w-[180px] -translate-x-1/2 -translate-y-full text-center"
                  style={{
                    left: tf.ox + n.x * tf.s,
                    top: tf.oy + (n.y - 12) * tf.s,
                    opacity: formed ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    pointerEvents: formed ? "auto" : "none",
                  }}
                >
                  <div className="flex items-baseline justify-center gap-2 mb-0.5">
                    <span className="font-mono text-[11px] text-[#AAD7E6]">{p.number}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#334F5A]/55">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-lg xl:text-xl text-[#334F5A] leading-tight transition-colors group-hover:text-[#5b94a8]">
                    {p.title}
                  </h3>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* In-flow anchor: drives the scroll, holds the heading, and on mobile the list */}
      <div ref={anchorRef} className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 lg:pt-28">
          <TreeHeading />
        </div>
        <div className="hidden md:block h-[200vh]" aria-hidden />
        <div className="md:hidden max-w-[1400px] mx-auto px-6 pb-4">
          <StaticList />
        </div>
      </div>
    </>
  );
}

function TreeHeading() {
  return (
    <div className="max-w-[60ch]">
      <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05]">
        One method. Four branches.
      </h2>
      <p className="mt-5 text-lg text-[#334F5A]/80 leading-relaxed">
        Scroll, and the background gathers into one tree. Every practice grows
        from the same research-first root.
      </p>
    </div>
  );
}

function StaticList() {
  return (
    <div className="relative pl-6 border-l border-foreground/20 space-y-9 mt-8">
      {practices.map((p) => (
        <a key={p.slug} href={`/services/${p.slug}`} className="block relative">
          <span className="absolute -left-[1.7rem] top-1.5 w-2.5 h-2.5 rounded-full bg-[#AAD7E6]" />
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-mono text-[11px] text-[#AAD7E6]">{p.number}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#334F5A]/55">
              {p.tag}
            </span>
          </div>
          <h3 className="font-display text-2xl text-[#334F5A] leading-tight">{p.title}</h3>
          <p className="text-sm text-[#334F5A]/75 leading-snug mt-1">{p.lead}</p>
        </a>
      ))}
    </div>
  );
}
