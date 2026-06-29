import {
  references as referencesEn,
  referenceCategories as referenceCategoriesEn,
  type Reference,
} from "./references-content";
import huData from "./references-content.hu.json";
import type { Locale } from "./i18n/config";

// Hungarian translations of the 22 appearance/event records, keyed by slug
// (generated into references-content.hu.json). Merge HU text over the English
// data at read time; keep structural fields (slug, id, type, date, urls) in
// English so routing and the type filters keep working.
const HU = huData as Record<string, Partial<Reference>>;

const TYPE_LABELS_HU: Record<string, string> = {
  all: "Összes",
  talk: "Előadás",
  panel: "Panel",
  podcast: "Podcast",
  exhibition: "Kiállítás",
  workshop: "Workshop",
  publication: "Publikáció",
};

export function getReferences(locale: Locale): Reference[] {
  if (locale !== "hu") return referencesEn;
  return referencesEn.map((r) => {
    const t = HU[r.slug];
    if (!t) return r;
    return {
      ...r,
      ...t,
      slug: r.slug,
      id: r.id,
      type: r.type,
    } as Reference;
  });
}

export function getReferenceCategories(locale: Locale) {
  if (locale !== "hu") return referenceCategoriesEn;
  return referenceCategoriesEn.map((c) => ({
    ...c,
    label: TYPE_LABELS_HU[c.slug] ?? c.label,
  }));
}
