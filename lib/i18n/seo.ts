import { locales, type Locale } from "./config";

const BASE = "https://www.novitatis.hu";

// path is the locale-INDEPENDENT path: "" for home, "/services", "/services/consulting", etc.
export function alternatesFor(locale: Locale, path: string) {
  const p = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${BASE}/${l}${p}`;
  languages["x-default"] = `${BASE}/en${p}`;
  return { canonical: `${BASE}/${locale}${p}`, languages };
}
