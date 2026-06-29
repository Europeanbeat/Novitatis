import type { Metadata } from "next";
import { getServicesContent } from "@/lib/services-content";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { alternatesFor } from "@/lib/i18n/seo";
import { ServiceDetail } from "@/components/sections/services/service-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  const practice = getServicesContent(lang).practices.find(
    (p) => p.slug === "development",
  )!;
  return { title: practice.title, description: practice.description, alternates: alternatesFor(lang, "/services/development") };
}

export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Locale = isLocale(locale) ? locale : "en";
  return <ServiceDetail slug="development" locale={lang} />;
}
