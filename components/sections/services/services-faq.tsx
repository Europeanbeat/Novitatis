"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Halo } from "@/components/sections/services/_halo";
import { servicesFaq } from "@/lib/faq-content";
import { FaqJsonLd } from "@/components/sections/faq/faq-schema";

// Visible FAQ accordion. One item open at a time; the answer animates open with
// a height + fade transition. The JSON-LD schema renders alongside so Google
// and AI engines read the same content the visitor sees.
export function ServicesFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
      <FaqJsonLd />

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <ScrollReveal direction="up" duration={0.8}>
            <div className="lg:sticky lg:top-32">
              <span className="font-mono text-xs text-[#334F5A]/55 uppercase tracking-wider block mb-4">
                FAQ
              </span>
              <h2 className="relative isolate text-3xl lg:text-5xl font-display text-[#334F5A] leading-[1.05]">
                <Halo />
                Questions we hear most.
              </h2>
              <p className="relative isolate mt-5 text-[#334F5A]/75 leading-relaxed max-w-[36ch]">
                <Halo />
                If yours is not here, send it through the contact page and we
                will answer directly.
              </p>
              <Link
                href="/contact-us"
                className="group mt-8 inline-flex items-center gap-3 font-mono text-sm text-[#334F5A]"
              >
                <span className="relative h-9 w-9 overflow-hidden rounded-full border border-[#334F5A]/20 text-[#AAD7E6] transition-all duration-500 ease-[cubic-bezier(0.32,1.51,0.36,0.97)] group-hover:scale-110 group-hover:bg-[#334F5A] group-hover:border-[#334F5A]">
                  <span className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-full">
                    &rarr;
                  </span>
                  <span className="absolute inset-0 grid place-items-center -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0">
                    &rarr;
                  </span>
                </span>
                <span className="link-sweep">Ask us anything</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:col-span-8">
          <div className="rounded-[1.75rem] bg-white border border-foreground/10 shadow-[0_30px_80px_-50px_rgba(51,79,90,0.3)] px-6 lg:px-10">
            {servicesFaq.map((item, i) => {
              const isOpen = open === i;
              return (
                <ScrollReveal key={item.q} direction="up" duration={0.7} delay={i * 0.04}>
                  <div className={i > 0 ? "border-t border-foreground/10" : ""}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-6 lg:py-7 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={`font-mono text-xs shrink-0 transition-colors duration-300 ${
                            isOpen ? "text-[#AAD7E6]" : "text-[#334F5A]/35 group-hover:text-[#AAD7E6]"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-xl lg:text-2xl text-[#334F5A] leading-tight">
                          {item.q}
                        </span>
                      </span>
                      <span
                        className={`relative h-9 w-9 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "border-[#AAD7E6] bg-[#AAD7E6]/15 rotate-45"
                            : "border-[#334F5A]/15 group-hover:border-[#AAD7E6] group-hover:bg-[#AAD7E6]/10"
                        }`}
                      >
                        <span className="absolute h-[1.5px] w-3.5 bg-[#334F5A]" />
                        <span className="absolute h-3.5 w-[1.5px] bg-[#334F5A]" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-7 pr-12 pl-0 lg:pl-8 text-[#334F5A]/75 leading-relaxed max-w-[62ch]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
