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

function buildTreeData(): { lines: Pt[][]; nodes: { x: number; y: number }[] } {
  const rand = seeded(20260603);
  const ranked: { pts: Pt[]; rank: number }[] = [];

  // Flowing S-curve trunk, woven from many parallel strands (the "made of lines" trunk)
  const T: Pt[] = [
    [352, 309],
    [331, 264],
    [373, 230],
    [353, 197],
    [343, 177],
    [337, 159],
    [347, 150],
  ];
  const STRANDS = 15;
  const trunkW = 26;
  for (let s = 0; s < STRANDS; s++) {
    const o = (s / (STRANDS - 1) - 0.5) * trunkW;
    const pts: Pt[] = T.map((p, j) => [
      p[0] + o * (1 - j * 0.05) + Math.sin(j * 1.2 + s * 0.7) * 2.2,
      p[1] + Math.cos(j * 0.9 + s) * 1.1,
    ]);
    ranked.push({ pts, rank: 100 - Math.abs(o) });
  }
  // Flared roots
  for (const dir of [-1, 1]) {
    for (let r = 0; r < 3; r++) {
      ranked.push({
        pts: curvedSeg([352 + dir * 5, 305], [352 + dir * (42 + r * 22), 312 + r * 3], rand, 14),
        rank: 92,
      });
    }
  }

  // Four service limbs: each flows from the upper trunk out to its node, so every
  // service sits at the tip of its own branch (no floating labels).
  const N: Pt[] = [
    [150, 168],
    [296, 116],
    [470, 116],
    [610, 168],
  ];
  const starts: Pt[] = [
    [346, 184],
    [347, 168],
    [349, 160],
    [350, 178],
  ];
  for (let n = 0; n < 4; n++) {
    const a = starts[n];
    const b = N[n];
    const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
    ranked.push({ pts: curvedSeg(a, b, rand, dist * 0.3), rank: 75 });
    const baseAng = Math.atan2(b[1] - a[1], b[0] - a[0]);
    for (let t = 0; t < 4; t++) {
      const ang = baseAng + (rand() - 0.5) * 1.4;
      const len = 12 + rand() * 18;
      ranked.push({
        pts: curvedSeg(b, [b[0] + Math.cos(ang) * len, b[1] + Math.sin(ang) * len], rand, len * 0.5),
        rank: 64,
      });
    }
  }

  // Extra canopy branches for fullness
  const grow = (x: number, y: number, ang: number, len: number, depth: number, base: number) => {
    if (depth <= 0 || len < 6) return;
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    ranked.push({ pts: curvedSeg([x, y], [ex, ey], rand, len * 0.5), rank: base - (8 - depth) });
    const sp = 0.4 + rand() * 0.45;
    const drift = (rand() - 0.5) * 0.4;
    grow(ex, ey, ang - sp + drift, len * 0.7, depth - 1, base);
    grow(ex, ey, ang + sp + drift, len * 0.7, depth - 1, base);
  };
  grow(348, 158, -Math.PI * 0.5, 44, 6, 69); // apex
  grow(345, 180, -Math.PI * 0.82, 34, 5, 66);
  grow(351, 180, -Math.PI * 0.18, 34, 5, 66);
  grow(347, 168, -Math.PI * 0.62, 30, 4, 65);
  grow(349, 168, -Math.PI * 0.38, 30, 4, 65);

  ranked.sort((a, b) => b.rank - a.rank);
  const lines = ranked.slice(0, 72).map((l) => l.pts);
  while (lines.length < 72) lines.push(lines[lines.length - 1]);

  const nodes = N.map((p) => ({ x: p[0], y: p[1] }));
  return { lines, nodes };
}

const BG = backgroundLines().sort((a, b) => b.w - a.w);
const TREE_DATA = buildTreeData();
const TREE: Pt[][] = TREE_DATA.lines;
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
        const tr = TREE[i];
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
