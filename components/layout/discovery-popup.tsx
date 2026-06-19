"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Soft conversion popup, SVZ-style but politer: slides up from the bottom
// right after the visitor has scrolled a real distance, shows once per
// session, and never comes back once dismissed.
const KEY = "novi-popup-shown";

export function DiscoveryPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const onScroll = () => {
      if (window.scrollY > 2200) {
        sessionStorage.setItem(KEY, "1");
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="fixed bottom-5 right-5 z-[120] w-[340px] max-w-[calc(100vw-2.5rem)] rounded-2xl bg-white border border-foreground/10 shadow-[0_32px_80px_-24px_rgba(51,79,90,0.45)] p-6"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/15 bg-white text-[#334F5A]/70 shadow-sm transition-colors hover:bg-[#334F5A] hover:text-white hover:border-[#334F5A]"
          >
            <span className="relative block h-3.5 w-3.5">
              <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>

          <span className="font-mono text-[10px] text-[#AAD7E6] uppercase tracking-wider">
            Free first conversation
          </span>
          <p className="mt-2 font-display text-2xl text-[#334F5A] leading-tight">
            Working on something for your destination?
          </p>
          <p className="mt-2 text-sm text-[#334F5A]/70 leading-relaxed">
            Send a short note and we will tell you whether and how we can help.
            No deck, no pitch.
          </p>
          <Link
            href="/contact-us"
            className="group mt-5 inline-flex items-center gap-3 rounded-full bg-[#334F5A] pl-5 pr-2 py-2 font-mono text-sm text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:shadow-[0_12px_32px_-12px_rgba(51,79,90,0.6)]"
          >
            Get in touch
            <span className="relative h-7 w-7 overflow-hidden rounded-full bg-[#AAD7E6] text-[#334F5A] transition-transform duration-500 ease-[cubic-bezier(0.32,1.51,0.36,0.97)] group-hover:scale-110">
              <span className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-full">
                &rarr;
              </span>
              <span className="absolute inset-0 grid place-items-center -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0">
                &rarr;
              </span>
            </span>
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
