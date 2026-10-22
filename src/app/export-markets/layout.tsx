import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Export Markets & Maritime Shipping Corridors | Port of Mombasa',
  description:
    'Explore ROVIL global export trade routes: Direct maritime container shipping from the Port of Mombasa (MBA) and air cargo via JKIA Nairobi to roasters and importers across Europe, the UK, the United States, Japan, the Middle East, and Asia. Review ocean transit days, required buyer documents, and FOB/CIF Incoterms.',
  keywords: [
    'Kenyan coffee export markets',
    'Port of Mombasa coffee shipping',
    'Kenya coffee export to Germany',
    'Kenya coffee export to USA',
    'Kenya green coffee to UK',
    'specialty coffee shipping to Japan',
    'coffee exporter to Dubai UAE',
    'Kenya coffee to Saudi Arabia',
    'Mombasa ocean freight coffee transit times',
    '20ft container coffee shipment Mombasa',
    'air cargo coffee samples JKIA Nairobi',
    'FOB Mombasa terms coffee',
    'CIF coffee shipping Kenya',
    'Kenya coffee export documentation',
    'phytosanitary certificate KEPHIS',
    'bill of lading coffee container',
    'customs clearance green coffee',
  ],
  alternates: {
    canonical: 'https://rovilcoffee.com/export-markets',
  },
  openGraph: {
    title: 'Global Coffee Export Markets & Shipping Corridors | ROVIL Kenya',
    description:
      'Weekly container shipping from Port of Mombasa to 38+ international destinations with certified phytosanitary clearance and full chain of custody.',
    url: 'https://rovilcoffee.com/export-markets',
    images: [
      {
        url: 'https://rovilcoffee.com/images/what-we-do/green-coffee-grading.jpg',
        width: 1200,
        height: 630,
        alt: 'ROVIL Kenyan Coffee Export Lot Grading and Container Logistics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Coffee Export Markets & Shipping Corridors | ROVIL Kenya',
    description:
      'Connecting Kenyan coffee and tea terroirs to global roasters across 38+ countries via Port of Mombasa.',
    images: ['https://rovilcoffee.com/images/what-we-do/green-coffee-grading.jpg'],
  },
};

export default function ExportMarketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
