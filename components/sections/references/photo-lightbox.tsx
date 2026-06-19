"use client";

import { useCallback, useEffect, useState } from "react";

// Click-to-enlarge gallery for reference photos (UX review: the photos couldn't
// be opened). Thumbnails open a full-screen overlay; Esc / arrows / click close
// and navigate.
export function PhotoLightbox({ photos, alt }: { photos: string[]; alt: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
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
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label="Open photo"
            className="group relative block overflow-hidden rounded-xl"
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

          {photos.length > 1 && (
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
            src={photos[index]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
