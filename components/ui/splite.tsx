"use client";

import dynamic from "next/dynamic";
import type { Application } from "@splinetool/runtime";

// Lazy-load Spline with no SSR — WebGL requires a browser environment
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  ),
});

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** Call app.stop() immediately on load — kills intro timeline animations
   *  (camera zoom, etc.) while keeping mouse-event interactions alive. */
  stopOnLoad?: boolean;
  onLoad?: (app: Application) => void;
}

export function SplineScene({
  scene,
  className,
  stopOnLoad = false,
  onLoad,
}: SplineSceneProps) {
  const handleLoad = (app: Application) => {
    if (stopOnLoad) app.stop();
    onLoad?.(app);
  };

  return (
    <Spline
      scene={scene}
      className={className}
      onLoad={handleLoad}
    />
  );
}
