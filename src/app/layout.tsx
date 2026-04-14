import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default:
      'NaijaTravel Pro | Your Gateway to Seamless Nigerian & International Travel',
    template: '%s | NaijaTravel Pro',
  },
  description:
    'Book flights, hotels, and tour packages across Nigeria and worldwide. Best prices on domestic airlines like Air Peace, Arik, Dana Air. Visa services and travel insurance available.',
  keywords: [
    'Nigeria travel',
    'flight booking Nigeria',
    'Air Peace',
    'Arik Air',
    'hotel booking Lagos',
    'hotel booking Abuja',
    'tour packages Nigeria',
    'visa services Nigeria',
    'travel insurance Nigeria',
    'Lagos flights',
    'Abuja flights',
  ],
  authors: [{ name: 'NaijaTravel Pro' }],
  creator: 'NaijaTravel Pro',
  publisher: 'NaijaTravel Pro',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: '/',
    siteName: 'NaijaTravel Pro',
    title:
      'NaijaTravel Pro | Your Gateway to Seamless Nigerian & International Travel',
    description:
      'Book flights, hotels, and tour packages across Nigeria and worldwide. Best prices guaranteed.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NaijaTravel Pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'NaijaTravel Pro | Your Gateway to Seamless Nigerian & International Travel',
    description:
      'Book flights, hotels, and tour packages across Nigeria and worldwide. Best prices guaranteed.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
