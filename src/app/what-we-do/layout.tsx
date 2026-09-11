import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Export Grades & Technical Dossier | Bulk Green Coffee & Teas',
  description:
    'Full technical export specifications for Kenyan Arabica Grade AA (Screen 17/18), Grade AB, Peaberry (PB), C, and bulk orthodox & CTC teas. Moisture 10.5%–11.5%, GrainPro 60kg burlap bags, strict FOB terms.',
  keywords: [
    'Kenya coffee export grades',
    'Kenya Arabica Grade AA',
    'Kenya Grade AB green coffee',
    'Kenya Peaberry PB green beans',
    'bulk green coffee exporter Kenya',
    'SL28 SL34 green coffee beans',
    'GrainPro coffee bags Kenya',
    'FOB Mombasa coffee price',
    'bulk black CTC tea Kenya',
    'bulk purple tea exporter',
    'ICO certificate coffee Kenya',
  ],
  alternates: {
    canonical: 'https://rovilcoffee.com/what-we-do',
  },
  openGraph: {
    title: 'Kenya Coffee & Tea Export Specifications | ROVIL',
    description:
      'Explore standard export grading, screen sizes, density sorting, and FOB shipment guidelines for international commodity roasters and trading houses.',
    url: 'https://rovilcoffee.com/what-we-do',
    images: [
      {
        url: 'https://rovilcoffee.com/images/branded/rovil-bulk-coffee.jpg',
        width: 1200,
        height: 630,
        alt: 'ROVIL Bulk Green Coffee Bags at Milling Warehouse',
      },
    ],
  },
};

export default function WhatWeDoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
