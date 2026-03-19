import type { Metadata, Viewport } from 'next'
import { Anton, DM_Sans } from 'next/font/google'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Visuals by Ramadani — Sport & Automotive Fotografie',
  description:
    'Professioneller Sport- und Automotive-Fotograf aus London. Spezialisiert auf Boxveranstaltungen, Fußball und Luxus-Autoevents in Europa und dem Nahen Osten.',
  openGraph: {
    title: 'Visuals by Ramadani',
    description: 'Premium Sport & Automotive Fotografie',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${anton.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
