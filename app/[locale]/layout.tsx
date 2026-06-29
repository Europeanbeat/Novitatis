import React from "react"
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageCurtain } from '@/components/layout/page-curtain'
import { RouteCurtain } from '@/components/layout/route-curtain'
import { DiscoveryPopup } from '@/components/layout/discovery-popup'
import { locales, isLocale, type Locale } from '@/lib/i18n/config'
import '../globals.css'

// "latin-ext" is needed for Hungarian characters like ő and ű
// (Cserkeszőlő, KULTKIKÖTŐ); plain "latin" stops at é and ü.
const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: '--font-jetbrains'
});

const BASE = 'https://www.novitatis.hu'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const lang: Locale = isLocale(locale) ? locale : 'en'

  const content = {
    en: {
      title: 'Novitatis – Innovation in tourism',
      description:
        'Consulting, custom development, education and public speaking for the digital future of tourism. Our brands: Visible Tourism, Turizmus Tudástár, AI4Tourism.',
    },
    hu: {
      title: 'Novitatis – Innováció a turizmusban',
      description:
        'Tanácsadás, egyedi fejlesztés, oktatás és előadások a turizmus digitális jövőjéért. Márkáink: Visible Tourism, Turizmus Tudástár, AI4Tourism.',
    },
  }[lang]

  return {
    metadataBase: new URL(BASE),
    title: {
      default: content.title,
      template: '%s · Novitatis',
    },
    description: content.description,
    alternates: {
      canonical: `${BASE}/${lang}`,
      languages: {
        en: `${BASE}/en`,
        hu: `${BASE}/hu`,
        'x-default': `${BASE}/en`,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} className="bg-background">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {/* Entity structured data: helps search and AI answer engines (GEO) identify the organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["Organization", "ProfessionalService"],
                  "@id": "https://www.novitatis.hu/#organisation",
                  name: "Novitatis",
                  url: "https://www.novitatis.hu",
                  logo: "https://www.novitatis.hu/images/novi_logo.png",
                  email: "info@novitatis.hu",
                  description:
                    "Specialist advisory network for the tourism sector: consulting, custom development, education and public speaking for the digital future of tourism.",
                  areaServed: ["Hungary", "Europe"],
                  knowsAbout: [
                    "tourism",
                    "destination management",
                    "AI in tourism",
                    "digital tourism",
                    "AI search visibility",
                    "GEO",
                    "AEO",
                    "answer engine optimisation",
                    "generative engine optimisation",
                    "tourism consulting",
                    "destination management organisation",
                    "tourism digitalisation",
                    "tourism strategy",
                  ],
                  brand: ["Visible Tourism", "Turizmus Tudástár", "AI4Tourism"],
                  founder: { "@id": "https://www.novitatis.hu/#adam-schmutz" },
                },
                {
                  "@type": "Person",
                  "@id": "https://www.novitatis.hu/#adam-schmutz",
                  name: "Adam Schmutz",
                  jobTitle: "Founder & tourism strategy consultant",
                  worksFor: { "@id": "https://www.novitatis.hu/#organisation" },
                  affiliation: {
                    "@type": "CollegeOrUniversity",
                    name: "University of Pannonia",
                  },
                  knowsAbout: [
                    "tourism strategy",
                    "AI search visibility",
                    "GEO",
                    "destination management",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.novitatis.hu/#website",
                  url: "https://www.novitatis.hu",
                  name: "Novitatis",
                  publisher: { "@id": "https://www.novitatis.hu/#organisation" },
                  inLanguage: locale,
                },
              ],
            }),
          }}
        />
        <PageCurtain />
        <RouteCurtain />
        <SmoothScroll />
        {children}
        <DiscoveryPopup />
      </body>
    </html>
  )
}
