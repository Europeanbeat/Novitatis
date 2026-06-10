"use client";

import { useState } from "react";

// Page-load curtain: a dark teal panel covers the viewport and wipes upward
// once the page is ready, so content is revealed composed instead of popping
// in. Pure CSS animation (see globals.css .page-curtain), so it runs even
// before React hydrates; the component only removes the node afterwards.
export function PageCurtain() {
  const [done, setDone] = useState(false);
  if (done) return null;

  return (
    <div
      aria-hidden
      onAnimationEnd={() => setDone(true)}
      className="page-curtain fixed inset-0 z-[200] bg-[#334F5A] origin-top pointer-events-none motion-reduce:hidden"
    />
  );
}
