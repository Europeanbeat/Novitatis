"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Route-change curtain: a plain teal sweep between pages, no logo (the logo
// moment belongs to the first-load PageCurtain). Navigation itself is instant
// client-side routing; this is pure ceremony on top: cover, 0.55s wipe,
// ~0.8s total. useLayoutEffect (not useEffect) so the cover paints before
// the new page gets a visible frame.
export function RouteCurtain() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const [shownFor, setShownFor] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (isFirst.current) {
      // Initial load is PageCurtain's job.
      isFirst.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShownFor(pathname);
  }, [pathname]);

  // Guaranteed removal. The `animationend` event this used to rely on is
  // delivered on the main thread and gets DROPPED when the destination page
  // does heavy work on mount (Spline on /brands, GSAP on /services, maps on
  // detail pages) right as the sweep ends, which left the curtain stuck. A
  // timer can't be starved that way. Animation is 0.25s delay + 0.55s = 0.8s;
  // clear at 0.9s. onAnimationEnd below still clears it earlier on light pages.
  useEffect(() => {
    if (shownFor === null) return;
    const t = setTimeout(() => setShownFor(null), 900);
    return () => clearTimeout(t);
  }, [shownFor]);

  if (shownFor === null) return null;

  return (
    <div
      key={shownFor}
      aria-hidden
      onAnimationEnd={(e) => {
        if (e.animationName === "route-curtain-up") setShownFor(null);
      }}
      className="fixed inset-0 z-[200] pointer-events-none motion-reduce:hidden"
    >
      <div className="route-curtain absolute inset-0 bg-[#334F5A] origin-top" />
    </div>
  );
}
