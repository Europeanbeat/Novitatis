"use client";

import { ArrowUpRight } from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useChrome } from "@/lib/i18n/chrome";

export function FooterSection() {
  const t = useChrome().footer;

  const footerLinks = [
    {
      title: t.groups.services,
      links: [
        { name: t.links.consulting, href: "/services/consulting" },
        { name: t.links.development, href: "/services/development" },
        { name: t.links.education, href: "/services/education" },
        { name: t.links.publicSpeaking, href: "/services/public-speaking" },
      ],
    },
    {
      title: t.groups.brands,
      links: [
        { name: "Visible Tourism", href: "https://visibletourism.com" },
        { name: "Turizmus Tudástár", href: "https://turizmustudastar.hu" },
        { name: "AI4Tourism", href: "https://ai4tourism.com" },
      ],
    },
    {
      title: t.groups.company,
      links: [
        { name: t.links.about, href: "/about-us" },
        { name: t.links.contact, href: "/contact-us" },
        { name: t.links.projects, href: "/references" },
        { name: t.links.appearances, href: "/appearances" },
      ],
    },
  ];

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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-14 lg:pt-16 pb-8">
        {/* Brand + link columns */}
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14">
          <div className="md:col-span-5">
            <LocaleLink href="/" className="inline-block mb-5">
              <img
                src="/images/novi_logo_white.png"
                alt="Novitatis"
                loading="lazy"
                decoding="async"
                height={40}
                width={150}
              />
            </LocaleLink>
            <p className="text-white/75 leading-relaxed max-w-xs text-sm mb-5">
              {t.tagline}
            </p>
            <a
              href="mailto:info@novitatis.hu"
              className="font-mono text-sm text-[#AAD7E6] hover:text-white transition-colors"
            >
              info@novitatis.hu
            </a>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#AAD7E6] mb-6">
                  {title}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) =>
                    link.href.startsWith("/") ? (
                      <li key={link.name}>
                        <LocaleLink
                          href={link.href}
                          className="text-sm font-medium text-white/85 hover:text-white transition-colors"
                        >
                          {link.name}
                        </LocaleLink>
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
        <div className="mt-12 lg:mt-14 py-5 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs text-white/60">
          <p>{t.rights}</p>
          <p>{t.strapline}</p>
        </div>
      </div>
    </footer>
  );
}
