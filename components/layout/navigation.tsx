"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { LocaleLink } from "@/components/i18n/locale-link";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import { useChrome } from "@/lib/i18n/chrome";

export function Navigation() {
  const t = useChrome().nav;
  const navLinks = [
    { name: t.services,     href: "/services"     },
    { name: t.brands,       href: "/brands"       },
    { name: t.about,        href: "/about-us"     },
    { name: t.projects,     href: "/references"   },
    { name: t.appearances,  href: "/appearances"  },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? "top-4 left-4 right-4" 
          : "top-0 left-0 right-0"
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo — recoloured to brand teal via CSS mask over the wordmark PNG,
              so it stops grabbing the eye as strong black (UX review). */}
          <LocaleLink href="/" aria-label={t.homeAria} className="flex items-center gap-2 group">
            <span
              aria-hidden
              className="block h-9 w-[150px] bg-[#334F5A] transition-colors duration-500 group-hover:bg-[#334F5A]/80"
              style={{
                WebkitMaskImage: "url(/images/novi_logo.png)",
                maskImage: "url(/images/novi_logo.png)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          </LocaleLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <LocaleLink
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-300 relative group ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-[#334F5A]/70 hover:text-[#334F5A]"}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-foreground" : "bg-[#334F5A]"}`} />
              </LocaleLink>
            ))}
          </div>

          {/* Desktop CTA + language switch */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <Button
              size="sm"
              asChild
              className={`rounded-full transition-all duration-500 ${isScrolled ? "bg-foreground hover:bg-foreground/90 text-background px-4 h-8 text-xs" : "bg-[#334F5A] hover:bg-[#334F5A]/90 text-white px-6"}`}
            >
              <LocaleLink href="/contact-us">{t.getInTouch}</LocaleLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`}
            aria-label={t.toggleMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

      </nav>
      
      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <LocaleLink
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </LocaleLink>
            ))}
          </div>
          
          {/* Bottom CTAs */}
          <div className={`flex flex-col gap-5 pt-8 border-t border-foreground/10 transition-all duration-500 ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <div className="flex justify-center">
              <LanguageToggle size="lg" />
            </div>
            <div className="flex gap-4">
              <Button
                asChild
                variant="outline"
                className="flex-1 rounded-full h-14 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LocaleLink href="/about-us">{t.about}</LocaleLink>
              </Button>
              <Button
                asChild
                className="flex-1 bg-foreground text-background rounded-full h-14 text-base"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LocaleLink href="/contact-us">{t.contact}</LocaleLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// so i have top nav licks  that naviagets to cetain section of the page 
