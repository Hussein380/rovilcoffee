import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Export Products & Catalog | Kenyan Coffee Beans & Specialty Teas',
  description:
    'Explore the official ROVIL Kenyan catalog: Single-origin Mount Kenya Arabica coffees (Grades AA, AB, PB), packaged roasted retail pouches, rare Royal Purple Tea (TRFK 306), black orthodox teas, and macadamia nuts for international roasters and gourmet retailers.',
  keywords: [
    'Kenyan coffee catalog',
    'Kenya coffee products',
    'buy green coffee beans Kenya',
    'Kenya Grade AA Arabica',
    'Kenya Grade AB beans',
    'Kenya Peaberry PB coffee',
    'Mount Kenya roasted coffee',
    'packaged coffee beans Nairobi',
    'ROVIL packaged reserves',
    'single origin coffee Kenya',
    'specialty coffee Kenya retail',
    'royal purple tea TRFK 306',
    'Kenya purple tea buy online',
    'Kenyan orthodox black tea',
    'highland green tea Kenya',
    'roasted macadamia nuts Kenya',
    'wholesale green coffee beans',
    'commercial container coffee Kenya',
    'coffee sample orders PSS',
  ],
  alternates: {
    canonical: 'https://rovilcoffee.com/products',
  },
  openGraph: {
    title: 'ROVIL Products Catalog | Kenyan Highland Coffees & Specialty Teas',
    description:
      'Official Kenyan product catalog featuring Mount Kenya single-origin Arabica (AA, AB, PB), consumer-packaged roasted reserves, and TRFK 306 Royal Purple Tea.',
    url: 'https://rovilcoffee.com/products',
    images: [
      {
        url: 'https://rovilcoffee.com/images/branded/rovil-product-trio.jpg',
        width: 1200,
        height: 630,
        alt: 'ROVIL Single Origin Kenyan Coffee and Royal Purple Tea Catalog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROVIL Products Catalog | Kenyan Highland Coffees & Specialty Teas',
    description:
      'Single-origin Kenyan Arabica green coffee, packaged reserves, and TRFK 306 Purple Tea from Mount Kenya.',
    images: ['https://rovilcoffee.com/images/branded/rovil-product-trio.jpg'],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
