#!/usr/bin/env python3
"""
Build the references data + images from the Excel sheet.

Source : ../Novi honlap/public_speaking_events_lista.xlsx  (the "Events (EN)" tab)
Outputs:
  - lib/references-content.ts          (generated data, do not hand-edit)
  - public/images/references/<event>/  (copied photos referenced by the sheet)

Workflow: edit the Excel, save & close it, then run `npm run refs`.
"""
import os, re, sys, json, shutil, zipfile, unicodedata, subprocess
import xml.etree.ElementTree as ET

# Cap copied photos to a sensible web size (longest edge px) + JPEG quality.
# Uses macOS `sips`; if unavailable, files are copied untouched.
MAX_EDGE = 1600
JPEG_QUALITY = 72
HAS_SIPS = shutil.which("sips") is not None


def optimize(path):
    if not HAS_SIPS:
        return
    try:
        subprocess.run(
            ["sips", "-s", "format", "jpeg", "-s", "formatOptions", str(JPEG_QUALITY),
             "-Z", str(MAX_EDGE), path],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False,
        )
    except Exception:
        pass


HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
NOVI = os.path.normpath(os.path.join(ROOT, "..", "Novi honlap"))
XLSX = os.path.join(NOVI, "public_speaking_events_lista.xlsx")
OUT_TS = os.path.join(ROOT, "lib", "references-content.ts")
OUT_IMG = os.path.join(ROOT, "public", "images", "references")

NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
RNS = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"


def slugify(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s or "item"


def colnum(ref):
    s = re.match(r"[A-Z]+", ref).group()
    n = 0
    for c in s:
        n = n * 26 + (ord(c) - 64)
    return n


def read_en_rows(z):
    shared = []
    if "xl/sharedStrings.xml" in z.namelist():
        r = ET.fromstring(z.read("xl/sharedStrings.xml"))
        for si in r.findall(f"{NS}si"):
            shared.append("".join(t.text or "" for t in si.iter(f"{NS}t")))
    wb = ET.fromstring(z.read("xl/workbook.xml"))
    relsroot = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    rid2tgt = {rel.get("Id"): rel.get("Target") for rel in relsroot}
    name2file = {s.get("name"): rid2tgt[s.get(f"{RNS}id")] for s in wb.iter(f"{NS}sheet")}
    target = name2file.get("Events (EN)")
    if not target:
        sys.exit("Could not find the 'Events (EN)' tab in the workbook.")

    def cellval(c):
        t = c.get("t")
        if t == "inlineStr":
            isv = c.find(f"{NS}is")
            return "".join(x.text or "" for x in isv.iter(f"{NS}t")) if isv is not None else ""
        v = c.find(f"{NS}v")
        if v is None:
            return ""
        if t == "s":
            return shared[int(v.text)] if shared else ""
        return v.text or ""

    sheet = ET.fromstring(z.read(target.lstrip("/")))
    rows = []
    for row in sheet.iter(f"{NS}row"):
        cells = {}
        for c in row.findall(f"{NS}c"):
            cells[colnum(c.get("r"))] = (cellval(c) or "").strip()
        if cells:
            rows.append([cells.get(i + 1, "") for i in range(max(cells))])
    return rows


def event_type(raw):
    r = (raw or "").lower()
    if "podcast" in r or "interview" in r or "audio" in r or "hanganyag" in r:
        return "podcast", "Podcast"
    if "panel" in r or "moder" in r or "pódium" in r or "podium" in r:
        return "panel", "Panel"
    if "exhibit" in r or "kiállít" in r or "booth" in r:
        return "exhibition", "Exhibition"
    if "workshop" in r or "training" in r or "képzés" in r:
        return "workshop", "Workshop"
    if "publication" in r or "publikáció" in r or "paper" in r or "journal" in r:
        return "publication", "Publication"
    return "talk", "Talk"


def first_year(date):
    m = re.search(r"(19|20)\d{2}", date or "")
    return m.group(0) if m else ""


def date_key(date):
    # Sortable YYYY-MM-DD from the first date in the cell; year-only counts as
    # end-of-year so undated-month entries still land in the right year.
    m = re.search(r"((19|20)\d{2})(?:[-/.](\d{1,2}))?(?:[-/.](\d{1,2}))?", date or "")
    if not m:
        return "0000-00-00"
    return f"{m.group(1)}-{(m.group(3) or '12').zfill(2)}-{(m.group(4) or '31').zfill(2)}"


# Manual cover images for entries that have no event photo in the sheet (e.g.
# podcasts and publications). Keyed by slug; used only when `photos` is empty.
# Sourced from the entry's own public artwork (own SoundCloud art, the journal
# issue cover, the book cover).
# Files live in public/images/manual-covers/ (NOT wiped by the rmtree below).
COVER_OVERRIDE = {
    "smart-balaton-podcast": "/images/manual-covers/smart-balaton.jpg",
    "is-lake-balaton-still-analog-podcast": "/images/manual-covers/analog-balaton.jpg",
    "lake-balaton-gastro-tourism-online-sales-turizmus-bulletin-2025": "/images/manual-covers/turizmus-bulletin-2025.jpg",
    "digital-hospitality-balaton-website-analysis-book-chapter": "/images/manual-covers/book-chapter-2023.jpg",
    "stay-visible-in-the-age-of-ai-talk": "/images/manual-covers/stay-visible.jpg",
    "hungary-data-driven-tourism-ntak-smart-tour-cotes-darmor": "/images/manual-covers/smart-tour.jpg",
    "tiszazug-2035-cserkeszolo-tourism-strategy-talk": "/images/manual-covers/tiszazug.jpg",
    "ai-opener-visitbalaton365-ai-journey": "/images/manual-covers/ai-opener.jpg",
    "digital-presence-tourinform-offices-national-tourinform-meeting-2023": "/images/manual-covers/tourinform.jpg",
    "balaton365-season-opening-workshop-digital-visibility-2023": "/images/manual-covers/balaton365-season-opening.jpg",
}


def main():
    if not os.path.exists(XLSX):
        sys.exit(f"Excel not found: {XLSX}")
    z = zipfile.ZipFile(XLSX)
    rows = read_en_rows(z)
    # rows[0] = sheet title, rows[1] = header, rest = data
    data_rows = [r for r in rows[2:] if len(r) > 5 and r[4]]

    if os.path.isdir(OUT_IMG):
        shutil.rmtree(OUT_IMG)
    os.makedirs(OUT_IMG, exist_ok=True)

    refs = []
    missing = []
    for r in data_rows:
        def col(n):
            return r[n - 1] if len(r) >= n else ""

        status = col(3).lower()
        if status and status not in ("public", "publikus"):
            continue  # skip drafts / hidden

        title = col(5)
        slug = slugify(col(25) or title)
        rtype, tlabel = event_type(col(8))
        keywords = [k.strip() for k in re.split(r"[,;]", col(13)) if k.strip()]
        tags = keywords[:3]

        # photos: copy referenced files, rewrite to /images/references/<event>/<file>
        photo_field = col(18)
        photos = []
        for p in re.split(r"[;,\n]", photo_field):
            p = p.strip().lstrip("/")
            if not p:
                continue
            src = os.path.join(NOVI, p)
            rel = p[len("Képek/"):] if p.startswith("Képek/") else p
            parts = rel.split("/")
            folder = slugify(parts[0]) if len(parts) > 1 else "misc"
            fname = parts[-1]
            destdir = os.path.join(OUT_IMG, folder)
            dest = os.path.join(destdir, fname)
            url = f"/images/references/{folder}/{fname}"
            if os.path.exists(src):
                os.makedirs(destdir, exist_ok=True)
                shutil.copy2(src, dest)
                optimize(dest)
                photos.append(url)
            else:
                missing.append(p)

        year = first_year(col(9))
        refs.append({
            "id": col(1),
            "slug": slug,
            "title": title,
            "summary": col(6),
            "description": col(7),
            "type": rtype,
            "typeLabel": tlabel,
            "date": col(9),
            "year": year,
            "location": col(10),
            "organizer": col(11),
            "tags": tags,
            "audience": col(14),
            "language": col(15),
            "videoUrl": col(17),
            "pressUrl": col(21),
            "quote": col(22),
            "cover": photos[0] if photos else COVER_OVERRIDE.get(slug, ""),
            "photos": photos,
            "imageAlt": col(19),
            "seoTitle": col(23) or title,
            "seoDescription": col(24) or col(6),
            "featured": col(4).lower() in ("yes", "igen"),
            "order": int(col(2)) if col(2).isdigit() else 999,
        })

    refs.sort(key=lambda x: date_key(x["date"]), reverse=True)  # most recent first

    # bento sizes: big tiles only go to entries that have a cover photo
    covered_i = 0
    for ref in refs:
        if ref["cover"]:
            if covered_i % 6 == 0:
                ref["size"] = "lg"
            elif covered_i % 3 == 0:
                ref["size"] = "wide"
            else:
                ref["size"] = "sm"
            covered_i += 1
        else:
            ref["size"] = "sm"

    # category pills, only types that actually exist, in a fixed order
    order = [("talk", "Talks"), ("panel", "Panels"), ("podcast", "Podcasts"),
             ("exhibition", "Exhibitions"), ("workshop", "Workshops"),
             ("publication", "Publications")]
    present = {x["type"] for x in refs}
    cats = [{"slug": "all", "label": "All"}] + [{"slug": s, "label": l} for s, l in order if s in present]

    header = """// AUTO-GENERATED by scripts/build_references.py — do not edit by hand.
// Source: ../Novi honlap/public_speaking_events_lista.xlsx ("Events (EN)" tab).
// Regenerate with: npm run refs

export type RefType =
  | "talk" | "panel" | "podcast" | "exhibition" | "workshop" | "publication";

export type Reference = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  type: RefType;
  typeLabel: string;
  date: string;
  year: string;
  location: string;
  organizer: string;
  tags: string[];
  audience: string;
  language: string;
  videoUrl: string;
  pressUrl: string;
  quote: string;
  cover: string;
  photos: string[];
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  order: number;
  size: "lg" | "wide" | "tall" | "sm";
};

export const referenceCategories: { slug: string; label: string }[] =
"""
    ts = header + json.dumps(cats, ensure_ascii=False, indent=2) + ";\n\n"
    ts += "export const references: Reference[] = " + json.dumps(refs, ensure_ascii=False, indent=2) + ";\n"

    with open(OUT_TS, "w", encoding="utf-8") as f:
        f.write(ts)

    print(f"✓ {len(refs)} references written to lib/references-content.ts")
    print(f"✓ {sum(len(r['photos']) for r in refs)} photos copied to public/images/references/")
    print(f"  types: " + ", ".join(f"{c['label']}" for c in cats if c['slug'] != 'all'))
    if missing:
        print(f"⚠ {len(missing)} photo paths in the sheet had no matching file:")
        for m in missing[:12]:
            print("   -", m)


if __name__ == "__main__":
    main()
