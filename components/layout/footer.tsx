"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Services: [
    { name: "Consulting", href: "/services/consulting" },
    { name: "Development", href: "/services/development" },
    { name: "Education", href: "/services/education" },
    { name: "Public Speaking", href: "/services/public-speaking" },
  ],
  "Our Brands": [
    { name: "Visible Tourism", href: "https://visibletourism.com" },
    { name: "Turizmus Tudástár", href: "https://turizmustudastar.hu" },
    { name: "AI4Tourism", href: "https://ai4tourism.com" },
  ],
  Company: [
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
    { name: "References", href: "/references" },
  ],
};

export function FooterSection() {
  return (
    <footer
      className="relative bg-[#334F5A] overflow-hidden"
      style={{
        backgroundImage: "url('/images/novitatis_background.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Soft wash so text never depends on what part of the image it lands on */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#334F5A]/60 via-[#334F5A]/30 to-[#22363f]/80 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-8">
        {/* Statement: one big serif invitation, the email is the headline */}
        <div className="mb-14 lg:mb-20">
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#AAD7E6] mb-6">
            <span className="w-8 h-px bg-[#AAD7E6]/50" />
            Start a conversation
          </span>
          <a
            href="mailto:info@novitatis.hu"
            className="group block font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] break-words transition-colors duration-300 hover:text-[#AAD7E6]"
          >
            info@novitatis.hu
            <span className="inline-block ml-3 text-[#AAD7E6] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2 group-hover:-translate-y-1">
              &rarr;
            </span>
          </a>
        </div>

        {/* Brand + link columns */}
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 pt-12 border-t border-white/15">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-5">
              <img
                src="/images/novi_logo_white.png"
                alt="Novitatis"
                loading="lazy"
                decoding="async"
                height={40}
                width={150}
              />
            </Link>
            <p className="text-white/75 leading-relaxed max-w-xs text-sm">
              Innovation in tourism. Consulting, development, education and
              public speaking for the digital future.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#AAD7E6] mb-6">
                  {title}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) =>
                    link.href.startsWith("/") ? (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm font-medium text-white/85 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ) : (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group text-sm font-medium text-white/85 hover:text-white transition-colors inline-flex items-center gap-1"
                        >
                          {link.name}
                          <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 lg:mt-20 py-5 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs text-white/60">
          <p>&copy; 2026 Novitatis. All rights reserved.</p>
          <p>Innovation in tourism</p>
        </div>
      </div>
    </footer>
  );
}
