"use client";

import { useCallback, useEffect, useState } from "react";

// Click-to-enlarge gallery for reference and project photos (UX review: the
// photos couldn't be opened). An optional `cover` renders as a large clickable
// hero; `photos` render as a thumbnail grid. Both open a full-screen overlay
// spanning [cover, ...photos]; Esc / arrows / click close and navigate.
export function PhotoLightbox({
  cover,
  photos,
  alt,
}: {
  cover?: string;
  photos: string[];
  alt: string;
}) {
  const all = cover ? [cover, ...photos] : photos;
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + all.length) % all.length)),
    [all.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % all.length)),
    [all.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  return (
    <>
      {cover && (
        <button
          type="button"
          onClick={() => setIndex(0)}
          aria-label="Enlarge photo"
          className="group relative mt-10 block w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_-50px_rgba(51,79,90,0.5)] cursor-zoom-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover}
            alt={alt}
            className="w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-[#334F5A]/0 transition-colors duration-300 group-hover:bg-[#334F5A]/10" />
          <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#334F5A] text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            ⤢
          </span>
        </button>
      )}

      {photos.length > 0 && (
        <div className={`${cover ? "mt-4" : "mt-12"} grid grid-cols-2 md:grid-cols-3 gap-3`}>
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(cover ? i + 1 : i)}
              aria-label="Open photo"
              className="group relative block overflow-hidden rounded-xl cursor-zoom-in"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-44 object-cover transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-[#334F5A]/0 transition-colors duration-300 group-hover:bg-[#334F5A]/15" />
            </button>
          ))}
        </div>
      )}

      {index !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#16252b]/90 backdrop-blur-sm p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-lg transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          {all.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white text-2xl transition-colors hover:bg-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white text-2xl transition-colors hover:bg-white/20"
              >
                ›
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={all[index]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
