import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/JsonLd';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import FloatingAssistant from '@/components/FloatingAssistant';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
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
    'Licensed Kenyan exporter of single-origin Arabica green coffee beans (Grades AA, AB, PB, C, E), rare Royal Purple Tea (TRFK 306), black orthodox teas, and macadamia nuts from Mount Kenya. Full lot traceability, EUDR compliance, and strict FOB Mombasa Incoterms.',
  keywords: [
    // 1. Brand Names & Entity Variations
    'Rovil',
    'Rovil Coffee',
    'Rovil Tea',
    'Rovil Coffee & Tea',
    'Rovil Kenya',
    'Rovil Global',
    'Rovil Global Kenyan Coffee',
    'Rovil Coffee Exporters',
    'Rovil Tea Exporters',
    'Rovil Coffee & Tea Exporters Kenya',
    'Virovil',
    'Virovil Limited',
    'Virovil (K) Co. Ltd',
    'Virovil Kenya',
    'Virovil Coffee',
    'Virovil Trading',

    // 2. Kenyan Coffee Core & Commercial Export
    'Kenyan coffee exporter',
    'Kenya coffee exporters list',
    'licensed Kenyan coffee exporter',
    'bulk green coffee beans Kenya',
    'green coffee bean exporter Kenya',
    'raw coffee beans Kenya wholesale',
    'unroasted coffee beans Kenya',
    'single-origin Arabica green coffee',
    'specialty coffee exporter Kenya',
    'Nairobi coffee trading desk',
    'commercial coffee export Kenya',
    'direct trade Kenyan coffee',
    'Kenya coffee container export',
    'FOB Mombasa coffee exporter',
    'CIF green coffee Kenya',

    // 3. Coffee Grades & Screen Sizes (Official Kenyan Grading System)
    'Kenya Arabica Grade AA',
    'Kenya Grade AA coffee beans',
    'Screen 17 18 coffee beans',
    'Kenya Arabica Grade AB',
    'Kenya Grade AB coffee',
    'Screen 15 16 coffee beans',
    'Kenya Peaberry PB',
    'Kenya PB green coffee',
    'Kenya Grade C coffee',
    'Kenya Grade E elephant beans',
    'Kenya Grade TT coffee',
    'Kenya Grade T coffee',
    'SCA 86+ Kenyan coffee',
    'SCA 87.5+ specialty coffee Grade AA',
    'cupping score specialty coffee Kenya',

    // 4. Coffee Varieties & Cultivars
    'SL28 green coffee beans',
    'SL28 Arabica cultivar Kenya',
    'SL34 green coffee beans',
    'SL34 Arabica variety',
    'Batian coffee variety Kenya',
    'Ruiru 11 coffee variety',
    'Kenya Bourbon heritage coffee',
    'Blue Mountain cultivar Kenya',
    'pure Arabica coffee beans Kenya',

    // 5. Origin Terroir & Mountain Elevations
    'Mount Kenya coffee beans',
    'Mount Kenya coffee terroir',
    'high altitude coffee 1950m ASL',
    'volcanic soil Arabica coffee Kenya',
    'Nyeri coffee beans exporter',
    'Kirinyaga specialty coffee',
    'Kiambu coffee estate',
    'Muranga coffee cooperatives',
    'Aberdare range coffee terroir',
    'shade grown Kenyan coffee',

    // 6. Processing Methods & Post-Harvest Quality
    'fully washed Kenyan coffee',
    'wet milled Arabica Kenya',
    '72 hour double fermentation coffee',
    'sun dried on raised African beds',
    'parchment coffee Kenya',
    'dry milling Kenya coffee',
    'moisture stabilized coffee 10.5 11.5 percent',
    'blackcurrant note Kenyan coffee',
    'bright citric phosphoric acidity coffee',
    'GrainPro hermetic lined jute bags 60kg',

    // 7. Specialty Teas (Purple Tea, Orthodox, CTC)
    'Kenya purple tea exporter',
    'royal purple tea TRFK 306',
    'anthocyanin rich purple tea',
    'antioxidant purple tea Kenya',
    'bulk purple tea Kenya wholesale',
    'Kenyan black orthodox tea',
    'single estate orthodox whole leaf tea',
    'CTC black tea Kenya bulk',
    'CTC BP1 PF1 PD D1 grades',
    'highland pure green tea Kenya',
    'white needle tea Kenya',
    'bulk tea exporter Kenya',
    'Mombasa tea auction exporter',
    'Kericho tea estates',
    'Nandi hills specialty tea',

    // 8. International Trade, Certifications & Compliance
    'EUDR compliant coffee Kenya',
    'EU deforestation regulation coffee Kenya',
    'GPS polygon farm traceability Kenya',
    'farm to destination lot traceability',
    'ICO Certificate of Origin coffee',
    'Agriculture and Food Authority AFA Kenya',
    'Kenya Coffee Directorate licensed',
    'KEPHIS phytosanitary certificate Kenya',
    'Port of Mombasa maritime coffee export',
    'JKIA Nairobi air cargo coffee samples',
    '20ft FCL container 320 bags 19.2 MT',
    'pre-shipment cupping samples PSS',

    // 9. Key Destination Markets & Global Buyers
    'Kenyan coffee buyers Germany',
    'Kenyan coffee importers USA',
    'specialty green coffee UK',
    'green coffee importers Japan',
    'coffee exporters to Saudi Arabia',
    'Dubai UAE coffee importers',
    'South Korea specialty coffee Kenya',
    'Netherlands green coffee distributors',
    'Australia coffee roasters Kenya origin',

    // 10. Retail & Packaged Line
    'ROVIL packaged roasted coffee',
    'ROVIL single-origin packaged reserves',
    'medium roast Kenya AA coffee',
    'dark roast Mount Kenya coffee',
    'packaged purple tea canisters',
    'boutique cafe coffee supplier Nairobi',
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
    title: 'rovil',
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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className}`}>
      <head>
        <JsonLd />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#23150c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="rovil" />
        <meta name="application-name" content="ROVIL Coffee" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preload" href="/textures/earth_atmos_2048.jpg" as="image" />
        <link rel="preload" href="/textures/earth_clouds_1024.png" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
        <FloatingAssistant />
      </body>
    </html>
  );
}
