import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products & Packaged Reserves | Kenyan Coffee & Specialty Teas',
  description:
    'Explore official ROVIL packaged 125g Arabica ground coffees, 150g rare Royal Purple & Orthodox teas, Highland green tea, and roasted macadamia nuts. Multi-currency pricing & wholesale inquiries.',
  keywords: [
    'Rovil Coffee products',
    'Rovil packaged coffee Kenya',
    'Kenyan Arabica 125g ground coffee',
    'Rovil purple tea box',
    'Black orthodox purple tea Kenya',
    'Highland pure green tea Kenya',
    'Kenyan roasted mixed nuts',
    'roasted macadamias Kenya',
    'buy Kenyan coffee retail and wholesale',
  ],
  alternates: {
    canonical: 'https://rovilcoffee.com/products',
  },
  openGraph: {
    title: 'ROVIL Packaged Coffee, Rare Teas & Nuts Collection',
    description:
      'Artisanal coffees and rare royal purple teas grown on Mount Kenya and packaged in Nairobi for boutique cafes, gourmet grocers, and distributors worldwide.',
    url: 'https://rovilcoffee.com/products',
    images: [
      {
        url: 'https://rovilcoffee.com/images/branded/rovil-hero-advert.jpg',
        width: 1200,
        height: 630,
        alt: 'ROVIL Kenyan Coffee and Specialty Tea Collection',
      },
    ],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
