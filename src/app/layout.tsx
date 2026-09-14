import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/JsonLd';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#23150c',
  colorScheme: 'light dark',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://rovilcoffee.com'),
  title: {
    default: 'Rovil Coffee & Tea | Licensed Kenyan Exporters | Virovil (K) Co. Ltd',
    template: '%s | Rovil Coffee & Tea - Licensed Kenyan Exporters',
  },
  description:
    'Licensed Kenyan exporter of single-origin Arabica green coffee (Grades AA, AB, PB), rare royal purple tea, black orthodox tea, and roasted macadamia nuts from Mount Kenya. Full lot traceability, EUDR compliance, and strict FOB Mombasa Incoterms.',
  keywords: [
    // Brand Name Keywords
    'Rovil',
    'Rovil Coffee',
    'Rovil Tea',
    'Rovil Coffee & Tea',
    'Virovil',
    'Virovil Limited',
    'Virovil (K) Co. Ltd',
    'Rovil Global',
    'Rovil Global Kenyan Coffee',
    'Rovil Coffee & Tea Exporters Kenya',
    // B2B Coffee Export Keywords
    'Kenyan coffee exporter',
    'Kenya Arabica Grade AA',
    'Kenya Arabica Grade AB',
    'Kenya Peaberry PB',
    'bulk green coffee beans Kenya',
    'green coffee bean exporter Kenya',
    'raw coffee beans Kenya wholesale',
    'Mount Kenya coffee beans',
    'SL28 green coffee beans',
    'SL34 coffee beans Kenya',
    'single-origin Arabica green coffee',
    'FOB Mombasa coffee exporter',
    'specialty coffee exporter Kenya',
    'Nairobi coffee trading desk',
    // Specialty Tea Export Keywords
    'Kenya purple tea exporter',
    'royal purple tea TRFK 306',
    'bulk purple tea Kenya',
    'Kenyan black orthodox tea',
    'CTC black tea Kenya bulk',
    'highland pure green tea Kenya',
    'bulk tea exporter Kenya',
    'Mombasa tea export',
    // Compliance & Quality Keywords
    'EUDR compliant coffee Kenya',
    'SCA certified coffee Kenya',
    'Kenya Coffee Directorate licensed exporter',
    'Agriculture and Food Authority AFA Kenya',
    'GrainPro coffee bags Kenya',
  ],
  authors: [{ name: 'Virovil (K) Co. Limited', url: 'https://rovilcoffee.com' }],
  creator: 'Virovil (K) Co. Limited',
  publisher: 'Virovil (K) Co. Limited',
  category: 'Commodity Export & Agriculture',
  alternates: {
    canonical: 'https://rovilcoffee.com',
  },
  openGraph: {
    title: 'Rovil Coffee & Tea | Licensed Kenyan Exporters',
    description:
      'Direct from the volcanic soils of Mount Kenya (1,950m ASL). Pure Arabica green beans (Grades AA, AB, PB) and rare Royal Purple Tea exported worldwide under FOB Incoterms.',
    url: 'https://rovilcoffee.com',
    siteName: 'Rovil Coffee & Tea Kenya',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://rovilcoffee.com/images/branded/rovil-hero-advert.jpg',
        width: 1200,
        height: 630,
        alt: 'ROVIL Global Kenyan Coffee & Tea Commercial Showcase',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rovil Coffee & Tea | Licensed Kenyan Exporters',
    description:
      'Single-origin Arabica green beans (Grades AA, AB, PB) and rare Royal Purple Tea exported from Mount Kenya to international roasters worldwide.',
    images: ['https://rovilcoffee.com/images/branded/rovil-hero-advert.jpg'],
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
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ROVIL Coffee',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable} ${inter.className}`}>
      <head>
        <JsonLd />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#23150c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ROVIL Coffee" />
        <meta name="application-name" content="ROVIL Coffee" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preload" href="/textures/earth_atmos_2048.jpg" as="image" />
        <link rel="preload" href="/textures/earth_clouds_1024.png" as="image" />
      </head>
      <body className={`${inter.className} bg-white text-[#1f1610] antialiased selection:bg-[#6f4327] selection:text-white relative`}>
        {/* PWA Service Worker Registration */}
        <ServiceWorkerRegister />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-80L5DKH8KV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-80L5DKH8KV', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
