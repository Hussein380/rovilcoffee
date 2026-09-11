import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Farm & Smallholder Sourcing | Mount Kenya Terroir',
  description:
    'Discover our high-altitude volcanic coffee estates at 1,950m ASL and 1,200+ partner smallholder farming families across Mount Kenya. EUDR compliant, GPS polygon mapped, sustainable wet milling.',
  keywords: [
    'Mount Kenya coffee farm',
    'Kenyan coffee estates',
    'Nyeri coffee farmers',
    'Kiambu coffee farms',
    'Kirinyaga coffee smallholders',
    'EUDR compliant coffee Kenya',
    'sustainable coffee farming Kenya',
    'Batian SL28 SL34 coffee trees',
    'purple tea cultivation Kenya',
    'direct trade coffee Kenya',
  ],
  alternates: {
    canonical: 'https://rovilcoffee.com/our-farm',
  },
  openGraph: {
    title: 'Mount Kenya Coffee Estates & Smallholder Partnerships | ROVIL',
    description:
      'Cultivated in nutrient-dense red volcanic soils under native shade canopies with full EUDR compliance and GPS polygon traceability.',
    url: 'https://rovilcoffee.com/our-farm',
    images: [
      {
        url: 'https://rovilcoffee.com/images/our-farm/kenya-coffee-farm-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'ROVIL Highland Coffee Farm Terraced Slopes and Ripe Cherries',
      },
    ],
  },
};

export default function OurFarmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
