"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kapcsolat" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden ">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`
            }}
          />
          
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24 md:bg-white/80">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
              {/* Left content */}
              <div className="flex-1">
                <h2 className="text-6xl md:text-7xl lg:text-[72px] font-display tracking-tight mb-8 leading-[0.95]">
                  Beszéljünk a
                  <br />
                  következő lépésről.
                </h2>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                  Legyen szó stratégiáról, fejlesztésről vagy képzésről – vegye fel velünk a kapcsolatot, és találjuk meg együtt a megoldást.
                </p>

                <p className="text-sm text-muted-foreground font-mono">
                  info@novitatis.hu
                </p>
              </div>

              {/* Right: contact form */}
              <div className="w-full lg:w-[480px] shrink-0">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-mono text-muted-foreground">
                      Név
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Az Ön neve"
                      className="h-12 px-4 rounded-lg border border-foreground/15 bg-white/80 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-mono text-muted-foreground">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="pelda@email.hu"
                      className="h-12 px-4 rounded-lg border border-foreground/15 bg-white/80 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-mono text-muted-foreground">
                      Üzenet
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Miben segíthetünk?"
                      className="px-4 py-3 rounded-lg border border-foreground/15 bg-white/80 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group mt-2 disabled:opacity-60"
                  >
                    {status === "sending" ? "Küldés..." : "Üzenet küldése"}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>

                  {/* Status messages */}
                  {status === "success" && (
                    <p className="text-sm text-[#334F5A] font-mono">
                      Köszönjük! Hamarosan jelentkezünk.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-600 font-mono">
                      Hiba történt. Kérjük, próbálja újra, vagy írjon az info@novitatis.hu címre.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}


