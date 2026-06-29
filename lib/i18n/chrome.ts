"use client";

import { useLocale } from "./use-locale";
import type { Locale } from "./config";

// UI strings for the global chrome (navbar + footer). These render inside client
// components on every page, so they live in this small client-safe module rather
// than the server-only JSON dictionaries (which hold heavier page-body copy).
export const chrome = {
  en: {
    nav: {
      services: "Services",
      brands: "Our Brands",
      about: "About Us",
      projects: "Our Projects",
      appearances: "Appearances",
      getInTouch: "Get in touch",
      contact: "Contact",
      homeAria: "Novitatis home",
      toggleMenu: "Toggle menu",
    },
    footer: {
      tagline:
        "Innovation in tourism. Consulting, development, education and public speaking for the digital future.",
      groups: { services: "Services", brands: "Our Brands", company: "Company" },
      links: {
        consulting: "Consulting",
        development: "Development",
        education: "Education",
        publicSpeaking: "Public Speaking",
        about: "About Us",
        contact: "Contact",
        projects: "Our Projects",
        appearances: "Appearances",
      },
      rights: "© 2026 Novitatis. All rights reserved.",
      strapline: "Innovation in tourism",
    },
  },
  hu: {
    nav: {
      services: "Szolgáltatások",
      brands: "Márkáink",
      about: "Rólunk",
      projects: "Projektjeink",
      appearances: "Megjelenések",
      getInTouch: "Kapcsolatfelvétel",
      contact: "Kapcsolat",
      homeAria: "Novitatis főoldal",
      toggleMenu: "Menü",
    },
    footer: {
      tagline:
        "Innováció a turizmusban. Tanácsadás, fejlesztés, oktatás és előadások a turizmus digitális jövőjéért.",
      groups: { services: "Szolgáltatások", brands: "Márkáink", company: "Vállalat" },
      links: {
        consulting: "Tanácsadás",
        development: "Fejlesztés",
        education: "Oktatás",
        publicSpeaking: "Előadások",
        about: "Rólunk",
        contact: "Kapcsolat",
        projects: "Projektjeink",
        appearances: "Megjelenések",
      },
      rights: "© 2026 Novitatis. Minden jog fenntartva.",
      strapline: "Innováció a turizmusban",
    },
  },
} satisfies Record<Locale, unknown>;

export function useChrome() {
  return chrome[useLocale()];
}
