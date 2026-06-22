#!/usr/bin/env python3
"""
Build the Our Projects (case studies) data from the Excel sheet + polished copy.

Sources:
  - ../Novi honlap/Referenciak_korabbi_projektek_lista (1).xlsx  ("References_Projects (EN)" tab)
  - polished card/overview copy (QA-passed) merged in by ID
Output:
  - lib/projects-content.ts   (generated data, do not hand-edit)

Executive-summary PDFs live in public/documents/project-summaries/ and are
mapped to projects by ID below. Project cover images are expected at
public/images/projects/<slug>/cover.<ext> when available; until then the card
falls back to a branded placeholder.

Regenerate with: npm run projects
"""
import os, re, json, unicodedata
import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
NOVI = os.path.normpath(os.path.join(ROOT, "..", "Novi honlap"))
XLSX = os.path.join(NOVI, "Referenciak_korabbi_projektek_lista (1).xlsx")
POLISHED = "/tmp/projects-polished.json"
OUT_TS = os.path.join(ROOT, "lib", "projects-content.ts")
PDF_DIR_REL = "/documents/project-summaries"
IMG_DIR_ABS = os.path.join(ROOT, "public", "images", "projects")

# Executive-summary PDFs by project ID (filenames live in public/documents/project-summaries/).
PDF_MAP = {
    "1":  [("vezetoi-osszefoglalo_digitalis-turizmus-kutatas.pdf", "Open the full summary (PDF)")],
    "2":  [("vezetoi-osszefoglalo_bor-gasztro-balaton.pdf", "Lake Balaton summary (PDF)"),
           ("vezetoi-osszefoglalo_gasztroturizmus-tokaj.pdf", "Tokaj summary (PDF)")],
    "4":  [("vezetoi-osszefoglalo_vendeglatohely-kategorizalas.pdf", "Open the full summary (PDF)")],
    "8":  [("vezetoi-osszefoglalo_ifjusagpasztoracio-modszertani-gyujtemeny.pdf", "Methodology handbook (PDF)"),
           ("vezetoi-osszefoglalo_ifjusagpasztoracio-zarojelentes.pdf", "Final report (PDF)")],
    "18": [("vezetoi-osszefoglalo_balaton-kereslet-kinalat-kerekparos.pdf", "Open the full summary (PDF)")],
    "22": [("vezetoi-osszefoglalo_rendezvenyek-gyula-bekescsaba.pdf", "Gyula-Bekescsaba summary (PDF)"),
           ("vezetoi-osszefoglalo_rendezvenyek-szeged.pdf", "Szeged summary (PDF)")],
    "23": [("vezetoi-osszefoglalo_helyi-termekek-matra-bukk.pdf", "Open the full summary (PDF)")],
}

PILLARS = {
    "Consulting & strategy":          "consulting",
    "Education & mentoring":          "education",
    "Development & digitalisation":   "development",
}

IMG_EXTS = (".webp", ".jpg", ".jpeg", ".png", ".avif")


def clean(s):
    if s is None:
        return ""
    s = str(s).strip()
    # the spec sometimes wraps quotables in smart quotes; keep them, just normalise dashes
    return s.replace("—", ", ").replace(" – ", " - ")


def header_index(ws):
    rows = list(ws.iter_rows(values_only=True))
    hdr = rows[1]
    idx = {}
    for i, c in enumerate(hdr):
        if c:
            idx[str(c).strip()] = i
    return idx, rows[2:]


def split_list(s):
    if not s:
        return []
    parts = re.split(r"[;,\n]+", s)
    return [p.strip() for p in parts if p.strip()]


def find_cover(slug):
    d = os.path.join(IMG_DIR_ABS, slug)
    if not os.path.isdir(d):
        return ""
    for name in sorted(os.listdir(d)):
        if name.lower().startswith("cover") and name.lower().endswith(IMG_EXTS):
            return f"/images/projects/{slug}/{name}"
    # otherwise first image in the folder
    for name in sorted(os.listdir(d)):
        if name.lower().endswith(IMG_EXTS):
            return f"/images/projects/{slug}/{name}"
    return ""


def main():
    wb = openpyxl.load_workbook(XLSX, data_only=True)
    ws = wb["References_Projects (EN)"]
    idx, data_rows = header_index(ws)

    polished = {p["id"]: p for p in json.load(open(POLISHED, encoding="utf-8"))}

    def col(row, name):
        i = idx.get(name)
        return clean(row[i]) if i is not None and i < len(row) else ""

    projects = []
    for row in data_rows:
        pid = col(row, "ID")
        if not pid or not col(row, "Title"):
            continue
        status = col(row, "Status (public/draft/hidden)").lower()
        if status and status != "public":
            continue
        pol = polished.get(pid, {})

        title = pol.get("title") or col(row, "Title")
        card = pol.get("cardSummary") or col(row, "Short summary (1-2 sentences)")
        overview = pol.get("overview") or col(row, "Short summary (1-2 sentences)")
        location = pol.get("location", "")
        year = pol.get("year") or col(row, "Year")
        pillar = pol.get("pillar") or col(row, "Service (4 core pillars)")
        slug = pol.get("slug") or col(row, "URL slug")

        # BLOCKING QA fix: restore Hungarian diacritics on Cserkeszolo (#14)
        if pid == "14":
            for k, v in (("title", title), ("card", card), ("overview", overview), ("location", location)):
                pass
            title = title.replace("Cserkeszolo", "Cserkeszőlő")
            card = card.replace("Cserkeszolo", "Cserkeszőlő")
            overview = overview.replace("Cserkeszolo", "Cserkeszőlő")
            location = location.replace("Cserkeszolo", "Cserkeszőlő")

        pillar = pillar.replace("&amp;", "&").strip()
        pillar_slug = PILLARS.get(pillar, "consulting")

        pdfs = [{"label": lbl, "href": f"{PDF_DIR_REL}/{fn}"} for fn, lbl in PDF_MAP.get(pid, [])]

        projects.append({
            "id": pid,
            "slug": slug,
            "title": title,
            "cardSummary": card,
            "overview": overview,
            "detail": col(row, "Detailed description"),
            "pillar": pillar,
            "pillarSlug": pillar_slug,
            "field": col(row, "Industry / field"),
            "year": year,
            "location": location,
            "scope": col(row, "Scope"),
            "results": col(row, "Output / results"),
            "methods": col(row, "Methods / tools"),
            "tags": split_list(col(row, "Keywords")),
            "quote": col(row, "Quotable sentence / Q&A").strip().strip("“”\""),
            "pdfs": pdfs,
            "cover": find_cover(slug),
            "imageAlt": title,
            "seoTitle": col(row, "SEO meta title") or title,
            "seoDescription": col(row, "SEO meta description") or card,
            "featured": col(row, "Featured? (yes/no)").lower().startswith("y"),
            "order": float(col(row, "Display order") or 999),
        })

    projects.sort(key=lambda p: p["order"])

    # category facets present in the data, in canonical order
    order = ["Consulting & strategy", "Education & mentoring", "Development & digitalisation"]
    present = [p for p in order if any(x["pillar"] == p for x in projects)]
    cats = [{"slug": "all", "label": "All"}] + [
        {"slug": PILLARS[p], "label": p} for p in present
    ]

    ts = []
    ts.append("// AUTO-GENERATED by scripts/build_projects.py - do not edit by hand.")
    ts.append("// Source: ../Novi honlap/Referenciak_korabbi_projektek_lista (1).xlsx + QA-polished copy.")
    ts.append("// Regenerate with: npm run projects")
    ts.append("")
    ts.append("export type ProjectPillarSlug = \"consulting\" | \"education\" | \"development\";")
    ts.append("")
    ts.append("export type ProjectPdf = { label: string; href: string };")
    ts.append("")
    ts.append("export type Project = {")
    for f, t in [
        ("id", "string"), ("slug", "string"), ("title", "string"),
        ("cardSummary", "string"), ("overview", "string"), ("detail", "string"),
        ("pillar", "string"), ("pillarSlug", "ProjectPillarSlug"), ("field", "string"),
        ("year", "string"), ("location", "string"), ("scope", "string"),
        ("results", "string"), ("methods", "string"), ("tags", "string[]"),
        ("quote", "string"), ("pdfs", "ProjectPdf[]"), ("cover", "string"),
        ("imageAlt", "string"), ("seoTitle", "string"), ("seoDescription", "string"),
        ("featured", "boolean"), ("order", "number"),
    ]:
        ts.append(f"  {f}: {t};")
    ts.append("};")
    ts.append("")
    ts.append("export const projectCategories: { slug: string; label: string }[] =")
    ts.append(json.dumps(cats, ensure_ascii=False, indent=2) + ";")
    ts.append("")
    ts.append("export const projects: Project[] =")
    ts.append(json.dumps(projects, ensure_ascii=False, indent=2) + ";")
    ts.append("")

    with open(OUT_TS, "w", encoding="utf-8") as f:
        f.write("\n".join(ts))

    print(f"Wrote {OUT_TS}")
    print(f"  projects: {len(projects)} | with PDF: {sum(1 for p in projects if p['pdfs'])} | with cover: {sum(1 for p in projects if p['cover'])}")
    print(f"  categories: {[c['label'] for c in cats]}")


if __name__ == "__main__":
    main()
