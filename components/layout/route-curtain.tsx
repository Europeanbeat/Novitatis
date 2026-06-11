"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

// Route-change curtain: the teal panel with the white logo that plays between
// pages. Navigation itself is instant client-side routing; this is pure
// ceremony layered on top, so it is deliberately tighter than the first-load
// curtain (PageCurtain): cover, logo blink, wipe, ~0.9s total.
// useLayoutEffect (not useEffect) so the cover paints before the new page
// gets a visible frame.
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
      <img
        src="/images/novi_logo_white_large.png"
        alt=""
        width={1600}
        height={369}
        className="route-curtain-logo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1280px,80vw)] h-auto"
      />
    </div>
  );
}
