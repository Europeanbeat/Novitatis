import "server-only";
import type { Locale } from "./config";

// Per-page server-only dictionaries. One JSON file per page per locale lets
// translation work happen in parallel without write conflicts. Global chrome
// (navbar/footer) is NOT here — it lives in lib/i18n/chrome.ts (client-safe).
//
// Usage in a server page:
//   const t = await getDict(locale, "contact");
// Any key missing from the Hungarian file should fall back to English at the
// call site (e.g. `t.title ?? en.title`); agents keep hu mirrored with en.
const loaders = {
  home: {
    en: () => import("@/dictionaries/en/home.json").then((m) => m.default),
    hu: () => import("@/dictionaries/hu/home.json").then((m) => m.default),
  },
  services: {
    en: () => import("@/dictionaries/en/services.json").then((m) => m.default),
    hu: () => import("@/dictionaries/hu/services.json").then((m) => m.default),
  },
  about: {
    en: () => import("@/dictionaries/en/about.json").then((m) => m.default),
    hu: () => import("@/dictionaries/hu/about.json").then((m) => m.default),
  },
  brands: {
    en: () => import("@/dictionaries/en/brands.json").then((m) => m.default),
    hu: () => import("@/dictionaries/hu/brands.json").then((m) => m.default),
  },
  appearances: {
    en: () => import("@/dictionaries/en/appearances.json").then((m) => m.default),
    hu: () => import("@/dictionaries/hu/appearances.json").then((m) => m.default),
  },
  contact: {
    en: () => import("@/dictionaries/en/contact.json").then((m) => m.default),
    hu: () => import("@/dictionaries/hu/contact.json").then((m) => m.default),
  },
  references: {
    en: () => import("@/dictionaries/en/references.json").then((m) => m.default),
    hu: () => import("@/dictionaries/hu/references.json").then((m) => m.default),
  },
} as const;

export type PageKey = keyof typeof loaders;

export async function getDict<K extends PageKey>(locale: Locale, page: K) {
  const ns = loaders[page];
  return (ns[locale] ?? ns.en)() as ReturnType<(typeof loaders)[K]["en"]>;
}
