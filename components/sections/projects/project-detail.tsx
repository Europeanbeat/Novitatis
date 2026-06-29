import { LocaleLink } from "@/components/i18n/locale-link";
import { type Project } from "@/lib/projects-content";
import { getProjects } from "@/lib/projects-i18n";
import type { Locale } from "@/lib/i18n/config";
import { PhotoLightbox } from "@/components/sections/references/photo-lightbox";

const UI = {
  en: {
    allProjects: "All projects", service: "Service", year: "Year",
    location: "Location", scope: "Scope", methods: "Methods",
    projectDetail: "Project detail", readSummary: "Read the full summary",
    related: "Related projects", viewProject: "View project", visitSite: "Visit the website",
  },
  hu: {
    allProjects: "Összes projekt", service: "Szolgáltatás", year: "Év",
    location: "Helyszín", scope: "Hatókör", methods: "Módszerek",
    projectDetail: "A projekt részletei", readSummary: "A teljes összefoglaló elolvasása",
    related: "Kapcsolódó projektek", viewProject: "Projekt megtekintése", visitSite: "Weboldal megtekintése",
  },
} as const;

export function ProjectDetail({ project: p, locale }: { project: Project; locale: Locale }) {
  const u = UI[locale] ?? UI.en;
  const detailParas = p.detail.split(/\n+/).filter(Boolean);
  const meta = [
    { label: u.service, value: p.pillar },
    { label: u.year, value: p.year },
    { label: u.location, value: p.location },
    { label: u.scope, value: p.scope },
    { label: u.methods, value: p.methods },
  ].filter((m) => m.value);

  const related = getProjects(locale)
    .filter((x) => x.slug !== p.slug && x.pillarSlug === p.pillarSlug)
    .slice(0, 3);

  return (
    <>
      <article className="relative z-10 max-w-[920px] mx-auto px-6 lg:px-10 pt-28 pb-24">
        <LocaleLink
          href="/references"
          className="font-mono text-sm text-[#334F5A]/70 inline-flex items-center gap-2 mb-10"
        >
          <span className="text-[#AAD7E6]">&larr;</span> {u.allProjects}
        </LocaleLink>

        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white bg-[#334F5A] px-3 py-1 rounded-full">
            {p.pillar}
          </span>
          {(p.year || p.location) && (
            <span className="font-mono text-sm text-[#334F5A]/60">
              {[p.year, p.location].filter(Boolean).join(" · ")}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-display text-[#334F5A] leading-[1.05] max-w-[24ch]">
          {p.title}
        </h1>

        {/* Overview — the consumable summary */}
        <p className="mt-6 text-lg lg:text-xl text-[#334F5A]/85 leading-relaxed max-w-[64ch]">
          {p.overview}
        </p>

        {/* Cover + gallery photos, click to enlarge (UX review: photos couldn't be zoomed) */}
        {(p.cover || p.gallery.length > 0) && (
          <PhotoLightbox
            cover={p.cover || undefined}
            photos={p.gallery}
            alt={p.imageAlt || p.title}
          />
        )}

        {/* Live site link (UX review: development projects had no link to the result) */}
        {p.liveUrl && (
          <div className="mt-8">
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#334F5A] text-white font-mono text-sm px-6 py-3 group transition-colors hover:bg-[#283d46]"
            >
              <span>{u.visitSite}</span>
              <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1">
                &#8599;
              </span>
            </a>
          </div>
        )}

        {/* Quote */}
        {p.quote && (
          <blockquote className="mt-10 border-l-2 border-[#AAD7E6] pl-6 font-display text-2xl lg:text-3xl text-[#334F5A] leading-[1.25] max-w-[32ch]">
            {p.quote}
          </blockquote>
        )}

        {/* Project detail — the longer read for those who want it */}
        {detailParas.length > 0 && (
          <div className="mt-12">
            <h2 className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider mb-5">
              {u.projectDetail}
            </h2>
            <div className="space-y-5 text-[#334F5A]/85 leading-relaxed text-[17px] max-w-[64ch]">
              {detailParas.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {/* At a glance */}
        {meta.length > 0 && (
          <div className="mt-12 pt-8 border-t border-foreground/10 grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-[#334F5A]/55 mb-1">
                  {m.label}
                </dt>
                <dd className="text-[#334F5A]/85 leading-snug">{m.value}</dd>
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {p.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1 rounded-full bg-[#334F5A]/[0.06] text-[#334F5A]/75"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Closing action — open the full executive summary PDF(s) */}
        {p.pdfs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-foreground/10">
            <p className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider mb-4">
              {u.readSummary}
            </p>
            <div className="flex flex-wrap gap-3">
              {p.pdfs.map((pdf) => (
                <a
                  key={pdf.href}
                  href={pdf.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[#334F5A] text-white font-mono text-sm px-6 py-3 group transition-colors hover:bg-[#283d46]"
                >
                  <span>{pdf.label}</span>
                  <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10 pb-20">
          <h2 className="font-mono text-xs text-[#334F5A]/60 uppercase tracking-wider mb-6">
            {u.related}
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <LocaleLink
                key={r.slug}
                href={`/references/${r.slug}`}
                className="group flex flex-col rounded-2xl bg-white border border-foreground/10 p-6 transition-all duration-300 hover:border-[#AAD7E6] hover:-translate-y-1"
              >
                <span className="font-mono text-[11px] text-[#334F5A]/55 mb-3">
                  {[r.year, r.location].filter(Boolean).join(" · ")}
                </span>
                <h3 className="font-display text-lg text-[#334F5A] leading-snug mb-3">
                  {r.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-2 font-mono text-xs text-[#334F5A]">
                  {u.viewProject}
                  <span className="text-[#AAD7E6] transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </LocaleLink>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
