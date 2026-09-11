import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Export Markets & Trade Corridors | Worldwide Shipping',
  description:
    'Direct export corridors connecting Mombasa Port and JKIA Nairobi to 38+ countries in Europe, North America, Middle East, Japan, and Asia. Air cargo and sea freight under strict FOB Incoterms.',
  keywords: [
    'Kenya coffee export markets',
    'export coffee to Germany',
    'export coffee to USA',
    'export coffee to UK',
    'export coffee to Japan',
    'export tea to Middle East Dubai',
    'Port of Mombasa coffee shipping',
    'JKIA Nairobi air cargo coffee',
    'FOB Kenya coffee shipping policy',
    'container shipping green coffee Kenya',
  ],
  alternates: {
    canonical: 'https://rovilcoffee.com/export-markets',
  },
  openGraph: {
    title: 'International Shipping Corridors & Global Export Markets | ROVIL',
    description:
      'Traceable logistics from Mount Kenya partner blocks to global ports across 38+ countries worldwide.',
    url: 'https://rovilcoffee.com/export-markets',
    images: [
      {
        url: 'https://rovilcoffee.com/images/branded/rovil-hero-advert.jpg',
        width: 1200,
        height: 630,
        alt: 'ROVIL Global Trade Corridors',
      },
    ],
  },
};

export default function ExportMarketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
