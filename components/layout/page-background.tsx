"use client";

import { motion } from "framer-motion";

// Brand line pattern. Static by default: the lines are a texture, not a show.
// Pass `animated` only where the motion IS the feature (homepage hero); the
// services page tree has its own animated copy. Everywhere else the lines
// hold still so the content is the only thing that moves.
function FloatingPaths({ position, animated }: { position: number; animated: boolean }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-[#334F5A]"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) =>
          animated ? (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.1 + path.id * 0.03}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={{
                pathLength: 1,
                opacity: [0.3, 0.6, 0.3],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ) : (
            <path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={(0.1 + path.id * 0.03) * 0.45}
            />
          ),
        )}
      </svg>
    </div>
  );
}

export function PageBackground({ animated = false }: { animated?: boolean }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <FloatingPaths position={1} animated={animated} />
      <FloatingPaths position={-1} animated={animated} />
    </div>
  );
}
