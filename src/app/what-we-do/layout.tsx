import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What We Do | Bulk Export Supply Chain & Coffee Grading Technical Dossier',
  description:
    'Comprehensive technical dossier on ROVIL bulk green coffee supply chain: Official Kenyan screen grading (AA Screen 17/18, AB Screen 15/16, PB), SCA 86+ cupping standards, 72h double fermentation, 60kg GrainPro hermetic packing, and Port of Mombasa container shipping under FOB Incoterms.',
  keywords: [
    'Kenya coffee grading system',
    'Kenya Grade AA screen 17 18',
    'Kenya Grade AB screen 15 16',
    'Kenya Peaberry sorting',
    'green coffee bulk supply chain Kenya',
    'Port of Mombasa coffee shipping',
    'GrainPro coffee bags Kenya',
    'SCA specialty coffee standards Kenya',
    'washed Arabica wet milling Kenya',
    'coffee moisture content 10.5 11.5',
    'ICO certificate of origin Kenya',
    '20ft FCL coffee container 320 bags',
    'commercial coffee export logistics',
    'pre-shipment cupping samples PSS',
    'agricultural food authority AFA Kenya',
    'Coffee Directorate licensed milling',
    'FOB Incoterms coffee Kenya',
    'Mount Kenya terroir SL28 SL34',
  ],
  alternates: {
    canonical: 'https://rovilcoffee.com/what-we-do',
  },
  openGraph: {
    title: 'ROVIL Bulk Coffee Export & Technical Grading Dossier | Port of Mombasa',
    description:
      'Detailed export specifications: Kenya screen sizes (AA, AB, PB), GrainPro packing, SCA cupping profiles, and containerized dispatch from Mombasa Port.',
    url: 'https://rovilcoffee.com/what-we-do',
    images: [
      {
        url: 'https://rovilcoffee.com/images/branded/rovil-bulk-coffee.jpg',
        width: 1200,
        height: 630,
        alt: 'ROVIL Kenya Grade AA Green Coffee Burlap Export Bags at Milling Warehouse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROVIL Bulk Coffee Export & Technical Grading Dossier | Port of Mombasa',
    description:
      'Official Kenya screen grading, GrainPro lined 60kg bags, and commercial container allocations under FOB Mombasa.',
    images: ['https://rovilcoffee.com/images/branded/rovil-bulk-coffee.jpg'],
  },
};

export default function WhatWeDoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
