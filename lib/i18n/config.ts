// Single source of truth for the site's languages.
// English is primary; Hungarian is the second locale.
export const locales = ["en", "hu"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Shown in the navbar language switcher.
export const localeNames: Record<Locale, string> = {
  en: "EN",
  hu: "HU",
};

export const localeLongNames: Record<Locale, string> = {
  en: "English",
  hu: "Magyar",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
