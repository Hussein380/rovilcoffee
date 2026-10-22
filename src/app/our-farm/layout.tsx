import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Farm & Mount Kenya Terroir | 1,950m ASL Highland Estates',
  description:
    'Discover ROVIL model coffee estates and 1,200+ smallholder partner cooperatives situated at 1,950m ASL on the fertile volcanic slopes of Mount Kenya, Nyeri, Kiambu, and Kirinyaga. Pure SL28, SL34, and TRFK 306 Purple Tea cultivars with 100% EUDR GPS polygon traceability.',
  keywords: [
    'Mount Kenya coffee farm',
    'Kenyan coffee estates',
    'high altitude coffee 1950m ASL',
    'Nyeri coffee farmers cooperatives',
    'Kiambu coffee farms',
    'Kirinyaga coffee smallholders',
    'volcanic soil Arabica coffee Kenya',
    'SL28 heirloom coffee trees',
    'SL34 coffee cultivar Kenya',
    'Batian disease resistant coffee',
    'Ruiru 11 coffee trees',
    'TRFK 306 purple tea farm Kenya',
    'EUDR compliant coffee Kenya',
    'GPS polygon farm mapping',
    'sustainable coffee wet mill Kenya',
    '72 hour double fermentation washed coffee',
    'raised African drying beds parchment',
    'ethical direct trade coffee Kenya',
    'smallholder farmer empowerment Kenya',
  ],
  alternates: {
    canonical: 'https://rovilcoffee.com/our-farm',
  },
  openGraph: {
    title: 'Mount Kenya Coffee Estates & Smallholder Terroirs | ROVIL',
    description:
      'Cultivated in nutrient-dense red volcanic soils at 1,950m ASL under native shade canopies with full EUDR compliance and GPS polygon traceability.',
    url: 'https://rovilcoffee.com/our-farm',
    images: [
      {
        url: 'https://rovilcoffee.com/images/our-farm/kenya-coffee-farm-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'ROVIL Highland Coffee Farm Terraced Slopes and Ripe Cherries at Mount Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mount Kenya Coffee Estates & Smallholder Terroirs | ROVIL',
    description:
      'High-altitude volcanic coffee estates at 1,950m ASL and 1,200+ partner smallholder families with EUDR compliance.',
    images: ['https://rovilcoffee.com/images/our-farm/kenya-coffee-farm-hero.jpg'],
  },
};

export default function OurFarmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
