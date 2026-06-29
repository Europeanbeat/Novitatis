import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { PhotoLightbox } from "@/components/sections/references/photo-lightbox";
import { ProjectDetail } from "@/components/sections/projects/project-detail";
import { references } from "@/lib/references-content";
import { projects } from "@/lib/projects-content";
import { getProjects } from "@/lib/projects-i18n";
import { getReferences } from "@/lib/references-i18n";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  const slugs = [...projects, ...references].map((x) => x.slug);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  const BASE = "https://www.novitatis.hu";
  const alternates = {
    canonical: `${BASE}/${lang}/references/${slug}`,
    languages: {
      en: `${BASE}/en/references/${slug}`,
      hu: `${BASE}/hu/references/${slug}`,
      "x-default": `${BASE}/en/references/${slug}`,
    },
  };
  const proj = getProjects(lang).find((x) => x.slug === slug);
  if (proj) {
    return {
      title: proj.seoTitle,
      description: proj.seoDescription,
      alternates,
      openGraph: {
        title: proj.seoTitle,
        description: proj.seoDescription,
        images: proj.cover ? [proj.cover] : undefined,
      },
    };
  }
  const r = getReferences(lang).find((x) => x.slug === slug);
  if (!r) return {};
  return {
    title: r.seoTitle,
    description: r.seoDescription,
    alternates,
    openGraph: {
      title: r.seoTitle,
      description: r.seoDescription,
      images: r.cover ? [r.cover] : undefined,
    },
  };
}

const SITE = "https://www.novitatis.hu";

// Build an absolute URL for a possibly-relative asset path ("/images/..").
function absUrl(path: string): string {
  if (!path) return path;
  return path.startsWith("http") ? path : `${SITE}${path}`;
}

// Turn a YouTube/Spotify link into an embeddable URL, or null if it isn't one.
function embedUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  if (url.includes("open.spotify.com/embed")) return url;
  return null;
}

export default async function ReferencePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";

  // Projects (case studies) and events share this route; resolve projects first.
  const proj = getProjects(lang).find((x) => x.slug === slug);
  if (proj) {
    const projUrl = `${SITE}/${lang}/references/${slug}`;
    const projectJsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CreativeWork",
          name: proj.title,
          description: proj.seoDescription,
          inLanguage: lang,
          url: projUrl,
          author: { "@id": "https://www.novitatis.hu/#organisation" },
          publisher: { "@id": "https://www.novitatis.hu/#organisation" },
          ...(proj.cover ? { image: absUrl(proj.cover) } : {}),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: lang === "hu" ? "Főoldal" : "Home",
              item: `${SITE}/${lang}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: lang === "hu" ? "Projektjeink" : "Our Projects",
              item: `${SITE}/${lang}/references`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: proj.title,
              item: projUrl,
            },
          ],
        },
      ],
    };
    return (
      <main className="relative min-h-screen bg-white overflow-x-hidden">
        <Navigation />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        />
        <ProjectDetail project={proj} locale={lang} />
        <FooterSection />
      </main>
    );
  }

  const r = getReferences(lang).find((x) => x.slug === slug);
  if (!r) notFound();

  const ui =
    lang === "hu"
      ? { back: "Összes megjelenés", coverage: "Tudósítás elolvasása" }
      : { back: "All appearances", coverage: "Read the coverage" };

  const embed = embedUrl(r.videoUrl);
  const isSpotify = embed?.includes("spotify");
  const paragraphs = r.description.split(/\n+/).filter(Boolean);

  const eventUrl = `${SITE}/${lang}/references/${slug}`;
  // Only emit startDate when the date clearly begins with an ISO date
  // (single dates and ranges like "2026-03-03 – 2026-03-05"); year-only values are skipped.
  const isoMatch = r.date?.match(/^(\d{4}-\d{2}-\d{2})/);
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: r.title,
        description: r.seoDescription,
        inLanguage: lang,
        url: eventUrl,
        organizer: { "@id": "https://www.novitatis.hu/#organisation" },
        performer: { "@id": "https://www.novitatis.hu/#adam-schmutz" },
        ...(isoMatch ? { startDate: isoMatch[1] } : {}),
        ...(r.cover ? { image: absUrl(r.cover) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "hu" ? "Főoldal" : "Home",
            item: `${SITE}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: lang === "hu" ? "Megjelenések" : "Appearances",
            item: `${SITE}/${lang}/appearances`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: r.title,
            item: eventUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <article className="relative z-10 max-w-[920px] mx-auto px-6 lg:px-10 pt-28 pb-24">
        <Link
          href={`/${lang}/appearances`}
          className="font-mono text-sm text-[#334F5A]/70 inline-flex items-center gap-2 mb-10"
        >
          <span className="text-[#AAD7E6]">&larr;</span> {ui.back}
        </Link>

        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white bg-[#334F5A] px-3 py-1 rounded-full">
            {r.typeLabel}
          </span>
          <span className="font-mono text-sm text-[#334F5A]/60">
            {r.date}
            {r.location ? ` · ${r.location}` : ""}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[24ch]">
          {r.title}
        </h1>
        <p className="mt-5 text-lg text-[#334F5A]/80 leading-relaxed max-w-[62ch]">
          {r.summary}
        </p>

        {r.organizer && (
          <p className="mt-4 font-mono text-sm text-[#334F5A]/60">
            {r.organizer}
          </p>
        )}

        {/* Video / podcast embed */}
        {embed && (
          <div
            className={`mt-10 overflow-hidden rounded-2xl shadow-[0_30px_80px_-50px_rgba(51,79,90,0.5)] ${
              isSpotify ? "" : "aspect-video"
            }`}
          >
            <iframe
              src={embed}
              title={r.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full"
              style={isSpotify ? { height: 232 } : { height: "100%" }}
            />
          </div>
        )}

        {/* Cover photo when there's no video */}
        {!embed && r.cover && (
          <div className="mt-10 overflow-hidden rounded-2xl shadow-[0_30px_80px_-50px_rgba(51,79,90,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.cover}
              alt={r.imageAlt || r.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Body */}
        {paragraphs.length > 0 && (
          <div className="mt-10 space-y-5 text-[#334F5A]/85 leading-relaxed text-[17px] max-w-[64ch]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {/* Quote */}
        {r.quote && (
          <blockquote className="mt-10 border-l-2 border-[#AAD7E6] pl-6 font-display text-2xl lg:text-3xl text-[#334F5A] leading-[1.25] max-w-[30ch]">
            {r.quote}
          </blockquote>
        )}

        {/* Photo gallery (extra photos beyond the cover) — click to enlarge */}
        {r.photos.slice(embed ? 0 : 1).length > 0 && (
          <PhotoLightbox
            photos={r.photos.slice(embed ? 0 : 1)}
            alt={r.imageAlt || r.title}
          />
        )}

        {/* Tags + press link */}
        <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {r.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1 rounded-full bg-[#334F5A]/[0.06] text-[#334F5A]/75"
              >
                {t}
              </span>
            ))}
          </div>
          {r.pressUrl && (
            <a
              href={r.pressUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-mono text-sm text-[#334F5A] inline-flex items-center gap-2"
            >
              {ui.coverage}
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </a>
          )}
        </div>
      </article>

      <FooterSection />
    </main>
  );
}
