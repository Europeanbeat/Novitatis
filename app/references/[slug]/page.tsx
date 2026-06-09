import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/navigation";
import { FooterSection } from "@/components/layout/footer";
import { references } from "@/lib/references-content";

export function generateStaticParams() {
  return references.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = references.find((x) => x.slug === slug);
  if (!r) return {};
  return {
    title: r.seoTitle,
    description: r.seoDescription,
    openGraph: {
      title: r.seoTitle,
      description: r.seoDescription,
      images: r.cover ? [r.cover] : undefined,
    },
  };
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = references.find((x) => x.slug === slug);
  if (!r) notFound();

  const embed = embedUrl(r.videoUrl);
  const isSpotify = embed?.includes("spotify");
  const paragraphs = r.description.split(/\n+/).filter(Boolean);

  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      <article className="relative z-10 max-w-[920px] mx-auto px-6 lg:px-10 pt-28 pb-24">
        <a
          href="/references"
          className="font-mono text-sm text-[#334F5A]/70 inline-flex items-center gap-2 mb-10"
        >
          <span className="text-[#AAD7E6]">&larr;</span> All projects
        </a>

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

        {/* Photo gallery (extra photos beyond the cover) */}
        {r.photos.length > 1 && (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3">
            {r.photos.slice(embed ? 0 : 1).map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={r.imageAlt || r.title}
                loading="lazy"
                className="w-full h-44 object-cover rounded-xl"
              />
            ))}
          </div>
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
              Read the coverage
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
