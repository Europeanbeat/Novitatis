import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  title: 'Novitatis – Innovation in tourism',
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
        <PageCurtain />
        <RouteCurtain />
        <SmoothScroll />
        {children}
        <DiscoveryPopup />
        <Analytics />
      </body>
    </html>
  )
}