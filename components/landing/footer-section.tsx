"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const footerLinks = {
  Szolgáltatások: [
    { name: "Tanácsadás", href: "#szolgaltatasok" },
    { name: "Fejlesztés", href: "#szolgaltatasok" },
    { name: "Edukáció", href: "#szolgaltatasok" },
    { name: "Public Speaking", href: "#szolgaltatasok" },
  ],
  Márkáink: [
    { name: "Visible Tourism", href: "https://visibletourism.com" },
    { name: "Turizmus Tudástár", href: "https://turizmustudastar.hu" },
    { name: "AI4Tourism", href: "https://ai4tourism.com" },
  ],
  Cég: [
    { name: "Rólunk", href: "#" },
    { name: "Kapcsolat", href: "#kapcsolat" },
    { name: "Publikációk", href: "#" },
  ],
  Jogi: [
    { name: "Adatvédelem", href: "#" },
    { name: "ÁSZF", href: "#" },
    { name: "Impresszum", href: "#" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
];

function AnimatedWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(100, 200, 150, 0.3)";
      ctx.lineWidth = 1;

      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.01 + time + wave * 0.5) * 30 +
            Math.sin(x * 0.02 + time * 1.5 + wave) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.02;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export function FooterSection() {
  return (
    <footer className="relative bg-white">
      {/* Panoramic banner image */}
      <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
          alt="Bioluminescent landscape"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient fade to white at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        {/* Subtle dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40" />
      </div>

      {/* Footer content — white background, dark text */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display text-[#334F5A]">Novitatis</span>
              </a>

              <p className="text-[#334F5A]/50 leading-relaxed mb-8 max-w-xs text-sm">
                Innováció a turizmusban. Tanácsadás, fejlesztés, edukáció és public speaking a digitális jövőért.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-[#334F5A]/40 hover:text-[#334F5A] transition-colors flex items-center gap-1 group"
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
                <h3 className="text-sm font-medium text-[#334F5A] mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-[#334F5A]/40 hover:text-[#334F5A] transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-[#334F5A] text-white rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-[#334F5A]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#334F5A]/30">
            &copy; 2025 Novitatis. Minden jog fenntartva.
          </p>

          <div className="flex items-center gap-4 text-sm text-[#334F5A]/30">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#AAD7E6]" />
              info@novitatis.hu
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
