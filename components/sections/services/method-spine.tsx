"use client";

import { useState } from "react";
import { processSteps } from "@/lib/services-content";

export function MethodSpine() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
      <div className="bg-white rounded-[2rem] border border-foreground/10 shadow-[0_30px_80px_-50px_rgba(51,79,90,0.3)] p-8 lg:p-14">
        <div className="mb-12 lg:mb-16 max-w-[60ch]">
          <h2 className="text-3xl lg:text-5xl font-display text-[#334F5A] leading-tight">
            How a project runs.
          </h2>
          {/* CONFIRM with Bence: real starting point of a project. */}
          <p className="mt-5 text-[#334F5A]/80 leading-relaxed">
            Where a project starts depends on what you already have. From there, most
            move through the same stages, from agreeing the real question to a
            measured result.
          </p>
        </div>

        {/* Desktop: horizontal spine */}
        <div className="hidden md:block">
          <div className="relative grid grid-cols-5">
            <div className="absolute left-0 right-0 top-[18px] h-px bg-foreground/15" />
            <div
              className="absolute left-0 top-[18px] h-px bg-[#AAD7E6] transition-all duration-500"
              style={{ width: `${((active + 0.5) / processSteps.length) * 100}%` }}
            />
            {processSteps.map((s, i) => (
              <button
                key={s.number}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative text-left pr-4"
              >
                <span
                  className={`relative z-10 grid place-items-center w-9 h-9 rounded-full font-mono text-xs transition-all duration-300 ${
                    i <= active
                      ? "bg-[#AAD7E6] text-[#334F5A]"
                      : "bg-white border border-foreground/20 text-[#334F5A]/40"
                  }`}
                >
                  {s.number}
                </span>
                <p
                  className={`mt-5 font-display text-xl transition-colors duration-300 ${
                    i === active ? "text-[#334F5A]" : "text-[#334F5A]/45"
                  }`}
                >
                  {s.title}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-8 max-w-[46ch]">
            <p key={active} className="text-[#334F5A]/80 leading-relaxed method-fade">
              {processSteps[active].blurb}
            </p>
          </div>
        </div>

        {/* Mobile: vertical list */}
        <ol className="md:hidden space-y-4">
          {processSteps.map((s) => (
            <li key={s.number} className="flex items-start gap-4">
              <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-[#AAD7E6]/20 font-mono text-xs text-[#334F5A]">
                {s.number}
              </span>
              <div>
                <p className="font-display text-lg text-[#334F5A] leading-tight mb-1">
                  {s.title}
                </p>
                <p className="text-sm text-[#334F5A]/80 leading-relaxed">{s.blurb}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style jsx>{`
        .method-fade {
          animation: methodFade 0.4s ease-out both;
        }
        @keyframes methodFade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .method-fade {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
