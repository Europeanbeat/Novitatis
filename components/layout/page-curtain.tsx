"use client";

import { useEffect, useState } from "react";

// Page-load curtain: a dark teal panel covers the viewport with the white
// Novitatis logo centred, holds for a beat, then wipes upward once the page
// is ready. Pure CSS animations (see globals.css .page-curtain/.curtain-logo),
// so they run even before React hydrates; the component only removes the node
// afterwards. The logo fades out before the wipe starts so it is never
// squashed by the panel's scaleY transform.
export function PageCurtain() {
  const [done, setDone] = useState(false);

  // Guaranteed removal, same reason as RouteCurtain: don't let a dropped
  // animationend event leave the cover stuck. Logo (1.6s) + wipe (0.8s) = 2.4s.
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2800);
    return () => clearTimeout(t);
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      onAnimationEnd={(e) => {
        if (e.animationName === "curtain-up") setDone(true);
      }}
      className="fixed inset-0 z-[200] pointer-events-none motion-reduce:hidden"
    >
      <div className="page-curtain absolute inset-0 bg-[#334F5A] origin-top" />
      <img
        src="/images/novi_logo_white_large.png"
        alt=""
        width={1600}
        height={369}
        className="curtain-logo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1440px,80vw)] h-auto"
      />
    </div>
  );
}
