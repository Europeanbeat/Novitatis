import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { PageCurtain } from '@/components/layout/page-curtain'
import { RouteCurtain } from '@/components/layout/route-curtain'
import { DiscoveryPopup } from '@/components/layout/discovery-popup'
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.novitatis.hu'),
  title: {
    default: 'Novitatis – Innovation in tourism',
    template: '%s · Novitatis',
  },
  description: 'Consulting, custom development, education and public speaking for the digital future of tourism. Our brands: Visible Tourism, Turizmus Tudástár, AI4Tourism.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {/* Entity structured data: helps search and AI answer engines (GEO) identify the organisation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.novitatis.hu/#organisation",
                  name: "Novitatis",
                  url: "https://www.novitatis.hu",
                  logo: "https://www.novitatis.hu/images/novi_logo.png",
                  email: "info@novitatis.hu",
                  description:
                    "Specialist advisory network for the tourism sector: consulting, custom development, education and public speaking for the digital future of tourism.",
                  knowsAbout: [
                    "tourism",
                    "destination management",
                    "AI in tourism",
                    "digital tourism",
                    "AI search visibility",
                    "GEO",
                    "AEO",
                  ],
                  brand: ["Visible Tourism", "Turizmus Tudástár", "AI4Tourism"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.novitatis.hu/#website",
                  url: "https://www.novitatis.hu",
                  name: "Novitatis",
                  publisher: { "@id": "https://www.novitatis.hu/#organisation" },
                  inLanguage: "en",
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