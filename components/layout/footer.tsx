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
    { name: "Publications", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Imprint", href: "#" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
];

export function FooterSection() {
  return (
    <footer style={{ 
    backgroundImage: "url('/images/novitatis_background.webp')",
    backgroundSize: "100% auto",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
     }}>
      {/* Footer content — compact */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-6 lg:py-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 lg:gap-6">
            {/* Brand Column */}
            <div className="col-span-2">
               <Link href="/" className="flex items-center gap-2 group">
            <img src="/images/novi_logo_white.png" alt="" loading="lazy" decoding="async" height={40} width={150} />
          </Link>

              <p className="text-white/80 leading-relaxed mb-8 max-w-xs text-sm">
                Innovation in tourism. Consulting, development, education and public speaking for the digital future.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-white/85 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) =>
                    link.href.startsWith("/") ? (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm font-medium text-white/85 hover:text-white transition-colors inline-flex items-center gap-2"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ) : (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-sm font-medium text-white/85 hover:text-white transition-colors inline-flex items-center gap-2"
                        >
                          {link.name}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - compact */}
        <div className="py-4 border-t border-[#FFFFFF]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <p className="text-sm">
            &copy; 2025 Novitatis. Minden jog fenntartva.
          </p>

          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFFFFF]" />
              info@novitatis.hu
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
