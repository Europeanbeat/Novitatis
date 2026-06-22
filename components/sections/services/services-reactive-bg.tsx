"use client";

import Link from "next/link";
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

type Leaf = {
  x: number; y: number; rot: number; rx: number; ry: number;
  color: string; dx: number; dy: number; phase: number;
};

function buildTreeData(): {
  structural: Pt[][];
  foliage: { pts: Pt[]; root: Pt; o: number }[];
  leaves: Leaf[];
  nodes: { x: number; y: number }[];
} {
  const rand = seeded(20260603);
  const ranked: { pts: Pt[]; rank: number }[] = [];

  // Recursive fractal (Coding Train / Marllon-Freitas): each branch splits into two
  // at +/- an angle, shorter each time, every child starting at its parent's tip, so
  // the whole tree is ONE connected system. Thickness comes from drawing low-depth
  // segments with several woven strands and high-depth ones with a single line.
  const baseP: Pt = [349, 303];
  const ROT = 0.72;
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
  branch(baseP[0], baseP[1], -Math.PI / 2, 54, 0);
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
      if (s.depth === 0) {
        // Trunk: flared wide where it meets the ground (s.a), then a uniform
        // narrow shaft up to the fork (s.b) instead of converging to a point.
        const a: Pt = [s.a[0] + px * o * 1.9, s.a[1] + py * o * 1.9];
        const b: Pt = [s.b[0] + px * o * 0.7, s.b[1] + py * o * 0.7];
        out.push(curvedSeg(a, b, rand, L * 0.12));
      } else {
        out.push(curvedSeg([s.a[0] + px * o, s.a[1] + py * o], s.b, rand, L * 0.16));
      }
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

  // Service nodes: fixed symmetric positions around the tree, equal distance
  // from centre for both pairs, identical heights for upper/lower pairs.
  // Forces clean layout instead of picking "nearest fractal tip" which drifts.
  const nodes: { x: number; y: number }[] = [
    { x: 240, y: 240 }, // Consulting (lower-left)
    { x: 240, y: 140 }, // Development (upper-left)
    { x: 456, y: 140 }, // Education (upper-right)
    { x: 456, y: 240 }, // Public speaking (lower-right)
  ];

  // Leaves: small clusters at the canopy tips. They scale in as the canopy
  // forms, and on the way back fall (drift down + spin) and fade with the lines.
  // Include inner branches (depth >= 3) so the canopy interior gets leaves too.
  const leafCands = fseg.filter((s) => s.depth >= 3).map((s) => s.b);
  let cx = 0;
  let cy = 0;
  for (const c of leafCands) {
    cx += c[0];
    cy += c[1];
  }
  cx /= Math.max(1, leafCands.length);
  cy /= Math.max(1, leafCands.length);
  const pickLeafColor = () => {
    const r = rand();
    if (r < 0.16) return "#AAD7E6"; // blue accent (brand)
    if (r < 0.46) return "#c9b06a"; // warm gold
    return "#8fae9b"; // muted teal-green
  };
  // Dense, bushy canopy: cycle the candidates, scatter jittered leaves, and pull
  // a portion of them toward the canopy centre so the middle fills out.
  const LEAF_COUNT = 1600;
  const leaves: Leaf[] = [];
  for (let i = 0; leaves.length < LEAF_COUNT && leafCands.length; i++) {
    const b = leafCands[i % leafCands.length];
    let lx = b[0] + (rand() - 0.5) * 18;
    let ly = b[1] + (rand() - 0.5) * 18;
    const pull = rand() * rand() * 0.7; // skewed small; a tail pulls inward
    lx += (cx - lx) * pull;
    ly += (cy - ly) * pull;
    leaves.push({
      x: lx,
      y: ly,
      rot: rand() * 360,
      rx: 2.2 + rand() * 2.0,
      ry: 1.1 + rand() * 0.9,
      color: pickLeafColor(),
      dx: (rand() - 0.5) * 30,
      dy: 24 + rand() * 72,
      phase: rand() * Math.PI * 2,
    });
  }

  return { structural, foliage, leaves, nodes };
}

const BG = backgroundLines().sort((a, b) => b.w - a.w);
const TREE_DATA = buildTreeData();
const STRUCT: Pt[][] = TREE_DATA.structural;
const FOL = TREE_DATA.foliage;
const LEAVES = TREE_DATA.leaves;
const NODES = TREE_DATA.nodes;
const ROOT: Pt = [349, 303];

// Trunk/branch colouring: each line fades from the resting grey to its own brown
// shade as the tree forms (darker for the wide trunk lines, lighter for thin ones).
const hexRgb = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const FROM_RGB = hexRgb("#334F5A");
const BROWNS = ["#3a2418", "#4a2f1e", "#5a3c28", "#6b4a32", "#7d5a3e", "#8a6646"];
const _brnd = seeded(99172);
const LINE_TO: [number, number, number][] = BG.map((_, i) => {
  const t = i / BG.length; // 0 = widest (trunk) → 1 = thinnest (branch)
  const idx = Math.max(
    0,
    Math.min(BROWNS.length - 1, Math.floor(t * BROWNS.length + (_brnd() - 0.5) * 1.6)),
  );
  return hexRgb(BROWNS[idx]);
});

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const ease = (t: number) => {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
};

export function ServicesReactiveBg() {
  const reduce = useReducedMotion();
  const anchorRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const folRefs = useRef<(SVGPathElement | null)[]>([]);
  const leafRefs = useRef<(SVGEllipseElement | null)[]>([]);
  const groundRef = useRef<SVGGElement | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
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
    let lastGrowK = -1;
    const f = (p: Pt) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
    const loop = () => {
      const p = scrollYProgress.get();
      // Heading sticks while the tree gathers, then fades out before the next section.
      if (headingRef.current) {
        headingRef.current.style.opacity = String(clamp(Math.min(p / 0.05, (0.72 - p) / 0.12, 1), 0, 1));
      }
      // Gather, brief hold, dissolve. Fully dissolved by ~p = 0.74, just as the
      // showcase scrolls in (~p = 0.75 with the 300vh anchor), so there is no
      // dead scroll between the tree and the next section.
      const k = clamp(Math.min(p / 0.34, (0.74 - p) / 0.18, 1), 0, 1);
      const ek = ease(k);
      // After the tree dissolves, calm the whole fixed layer down so the showcase
      // cards that follow sit on a quiet background instead of full-strength lines.
      if (layerRef.current) {
        layerRef.current.style.opacity = (1 - 0.72 * ease(clamp((p - 0.74) / 0.16, 0, 1))).toFixed(3);
      }
      const amp = (1 - ek) * 4;
      const t = performance.now() / 1000;
      // Ground fades in/out with the tree.
      if (groundRef.current) {
        groundRef.current.style.opacity = String(ease(clamp((k - 0.15) / 0.45, 0, 1)));
      }
      for (let i = 0; i < BG.length; i++) {
        const el = pathRefs.current[i];
        if (!el) continue;
        const ki = ease(clamp((k - (i / BG.length) * 0.32) / 0.68, 0, 1));
        const og = BG[i].pts;
        const tr = STRUCT[i];
        // Idle sway once formed: thin outer branches drift gently in the breeze,
        // the trunk stays planted. Weighted toward each line's far end so branches
        // bend from their base instead of floating whole.
        const sway = ek * (i / BG.length) * 1.1;
        const P: Pt[] = [];
        for (let j = 0; j < 7; j++) {
          const ph = i * 0.5 + j;
          const ox = Math.sin(t * 0.4 + ph) * amp;
          const oy = Math.cos(t * 0.33 + ph * 1.3) * amp;
          const sw = sway * (j / 6);
          const tx = tr[j][0] + Math.sin(t * 0.5 + ph) * sw;
          const ty = tr[j][1] + Math.cos(t * 0.42 + ph * 1.2) * sw * 0.6;
          const sx = og[j][0] + ox;
          const sy = og[j][1] + oy;
          P.push([sx + (tx - sx) * ki, sy + (ty - sy) * ki]);
        }
        el.setAttribute(
          "d",
          `M${f(P[0])} C ${f(P[1])} ${f(P[2])} ${f(P[3])} C ${f(P[4])} ${f(P[5])} ${f(P[6])}`,
        );
        // Colour fades grey -> brown with this line's morph progress.
        const to = LINE_TO[i];
        el.setAttribute(
          "stroke",
          `rgb(${Math.round(FROM_RGB[0] + (to[0] - FROM_RGB[0]) * ki)},${Math.round(
            FROM_RGB[1] + (to[1] - FROM_RGB[1]) * ki,
          )},${Math.round(FROM_RGB[2] + (to[2] - FROM_RGB[2]) * ki)})`,
        );
      }
      // Foliage grows out of the branch tips as the tree forms, collapses back at rest
      const growK = ease(clamp((k - 0.3) / 0.62, 0, 1));
      const dG = Math.abs(growK - lastGrowK);
      lastGrowK = growK;
      // Only touch foliage + leaves while the canopy is actually changing (i.e.
      // while scrolling). At rest the dense canopy costs nothing per frame.
      // Keyed on the delta alone so a fast jump past the tree still writes the
      // final growK = 0 state; otherwise the leaves freeze mid-air.
      if (dG > 1e-6) {
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
        // Leaves: grow at the tips as the canopy forms; on the way back they
        // fall (drift down + spin) and fade, so they leave with the lines.
        // Every leaf, every frame (60fps) — smoothest fall. Count is kept at a
        // level this can afford; raise LEAF_COUNT only as far as it stays smooth.
        for (let i = 0; i < LEAVES.length; i++) {
          const el = leafRefs.current[i];
          if (!el) continue;
          const lf = LEAVES[i];
          const g = ease(clamp((growK - (i / LEAVES.length) * 0.12) / 0.88, 0, 1));
          const fall = 1 - g;
          const x = lf.x + lf.dx * fall;
          const y = lf.y + lf.dy * fall * fall;
          const sc = ease(g);
          el.setAttribute(
            "transform",
            `translate(${x} ${y}) rotate(${lf.rot + fall * 120}) scale(${sc})`,
          );
          el.setAttribute("fill-opacity", (g * 0.9).toFixed(2));
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
      <div
        ref={layerRef}
        className="fixed inset-0 z-0 hidden md:block pointer-events-none overflow-hidden"
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-full text-[#334F5A]"
          fill="none"
        >
          {/* Ground hidden — green removed by request. Keeping the ref for the
              loop's groundRef.opacity write so it doesn't crash. */}
          <g ref={groundRef} style={{ opacity: 0, display: "none" }} />
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
          {FOL.map((fl, i) => {
            // Rounded for SSR: full-precision floats differ by 1 ULP between
            // Node and the browser and trip React's hydration check.
            const r = `${fl.root[0].toFixed(2)} ${fl.root[1].toFixed(2)}`;
            return (
            <path
              key={`f${i}`}
              ref={(el) => {
                folRefs.current[i] = el;
              }}
              d={`M${r} C ${r} ${r} ${r} C ${r} ${r} ${r}`}
              stroke="#6b4a32"
              strokeWidth={0.7}
              strokeOpacity={0}
              strokeLinecap="round"
            />
            );
          })}
          {/* Leaves at the canopy tips — grow in, then fall away on scroll-back */}
          {LEAVES.map((lf, i) => (
            <ellipse
              key={`l${i}`}
              ref={(el) => {
                leafRefs.current[i] = el;
              }}
              cx={0}
              cy={0}
              rx={Number(lf.rx.toFixed(2))}
              ry={Number(lf.ry.toFixed(2))}
              fill={lf.color}
              fillOpacity={0}
              transform={`translate(${lf.x.toFixed(2)} ${lf.y.toFixed(2)}) scale(0)`}
            />
          ))}
          {/* Green root node: appears first, then the service nodes radiate out */}
          <g
            style={{
              opacity: formed ? 1 : 0,
              transform: formed ? "scale(1)" : "scale(0.4)",
              transformBox: "fill-box",
              transformOrigin: "center",
              transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <circle cx={ROOT[0]} cy={ROOT[1]} r={16} fill="#3FB27A" opacity={0.22} />
            <circle cx={ROOT[0]} cy={ROOT[1]} r={5} fill="#3FB27A" />
          </g>
          {/* Service nodes: staggered pop with a soft overshoot when forming,
              instant retreat together when the tree dissolves */}
          {NODES.map((n, i) => (
            <g
              key={i}
              style={{
                opacity: formed ? 1 : 0,
                transform: formed ? "scale(1)" : "scale(0.3)",
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                transitionDelay: formed ? `${0.12 + i * 0.1}s` : "0s",
              }}
            >
              <circle cx={n.x} cy={n.y} r={9} fill="#AAD7E6" opacity={0.22} />
              <circle cx={n.x} cy={n.y} r={3.5} fill="#AAD7E6" />
            </g>
          ))}
        </svg>

        {/* Pinned heading: sticks while the tree gathers, fades as you leave */}
        <div
          ref={headingRef}
          className="absolute left-1/2 -translate-x-1/2 top-[12%] w-[44ch] max-w-[88vw] text-center"
          style={{ opacity: 0 }}
        >
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05]">
            Four services. Four ways in.
          </h2>
          <p className="mt-4 text-lg text-[#334F5A]/80 leading-relaxed mx-auto max-w-[46ch]">
            Consulting, development, education and public speaking. Take any one on
            its own; what they share is a research-led way of working.
          </p>
        </div>

        {/* HTML labels, positioned over the SVG via the letterbox transform */}
        {tf && (
          <div className="absolute inset-0">
            <span
              className="absolute -translate-x-1/2 translate-y-3 rounded-full bg-[#334F5A] px-5 py-2 font-mono text-[11px] text-white whitespace-nowrap"
              style={{
                left: tf.ox + ROOT[0] * tf.s,
                top: tf.oy + ROOT[1] * tf.s,
                opacity: formed ? 1 : 0,
                transform: formed ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                transitionDelay: formed ? "0.08s" : "0s",
              }}
            >
              Research-led method
            </span>
            {NODES.map((n, i) => {
              const p = practices[i];
              const isLeft = n.x < 348;
              return (
                <Link
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className={`group absolute w-[300px] ${isLeft ? "text-right" : "text-left"}`}
                  style={{
                    left: tf.ox + n.x * tf.s + (isLeft ? -56 : 56),
                    top: tf.oy + n.y * tf.s,
                    transform: isLeft ? "translate(-100%, -50%)" : "translate(0, -50%)",
                    pointerEvents: formed ? "auto" : "none",
                  }}
                >
                  {/* Inner wrapper carries the reveal: each label slides outward
                      from its node, one after the other, after the nodes pop */}
                  <div
                    style={{
                      opacity: formed ? 1 : 0,
                      transform: formed
                        ? "translateX(0)"
                        : `translateX(${isLeft ? 16 : -16}px)`,
                      transition: "opacity 0.55s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                      transitionDelay: formed ? `${0.22 + i * 0.1}s` : "0s",
                    }}
                  >
                    <div className={`flex items-baseline gap-2 mb-1 ${isLeft ? "justify-end" : ""}`}>
                      <span className="font-mono text-xs text-[#AAD7E6]">{p.number}</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#334F5A]/75">
                        {p.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl lg:text-4xl text-[#334F5A] leading-[1.05] transition-colors group-hover:text-[#5b94a8]">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Scroll cue: tells visitors the section keeps going while the tree
            forms, so they don't think the page has ended (UX review). Fades out
            once the tree is formed and the service labels are in. */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#334F5A]/70"
          style={{
            opacity: formed ? 0 : 1,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-wider">Keep scrolling</span>
          <svg className="h-4 w-4 animate-bounce" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </div>

      {/* In-flow anchor: drives the scroll. Desktop is empty space (the fixed tree +
          heading pin over it); mobile shows the heading + static list. */}
      <div ref={anchorRef} className="relative z-10">
        <div className="md:hidden max-w-[1400px] mx-auto px-6 pt-20">
          <TreeHeading />
          <StaticList />
        </div>
        <div className="hidden md:block h-[260vh]" aria-hidden />
      </div>
    </>
  );
}

function TreeHeading() {
  return (
    <div className="max-w-[60ch]">
      <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05]">
        Four services. Four ways in.
      </h2>
      <p className="mt-5 text-lg text-[#334F5A]/80 leading-relaxed">
        Consulting, development, education and public speaking. Take any one on its
        own; what they share is a research-led way of working.
      </p>
    </div>
  );
}

function StaticList() {
  return (
    <div className="relative pl-6 border-l border-foreground/20 space-y-9 mt-8">
      {practices.map((p) => (
        <Link key={p.slug} href={`/services/${p.slug}`} className="block relative">
          <span className="absolute -left-[1.7rem] top-1.5 w-2.5 h-2.5 rounded-full bg-[#AAD7E6]" />
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-mono text-[11px] text-[#AAD7E6]">{p.number}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#334F5A]/70">
              {p.tag}
            </span>
          </div>
          <h3 className="font-display text-2xl text-[#334F5A] leading-tight">{p.title}</h3>
          <p className="text-sm text-[#334F5A]/75 leading-snug mt-1">{p.lead}</p>
        </Link>
      ))}
    </div>
  );
}
