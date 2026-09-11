import React from 'react';

export default function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://rovilcoffee.com/#organization',
    name: 'Rovil Coffee & Tea',
    legalName: 'Virovil (K) Co. Limited',
    alternateName: [
      'Rovil',
      'Rovil Coffee',
      'Rovil Tea',
      'Virovil Limited',
      'Virovil',
      'Rovil Coffee & Tea Exporters Kenya',
      'Rovil Global',
    ],
    url: 'https://rovilcoffee.com',
    logo: 'https://rovilcoffee.com/images/rovil-logo.svg',
    image: 'https://rovilcoffee.com/images/branded/rovil-hero-advert.jpg',
    description:
      'Licensed Kenyan exporter of single-origin Arabica green coffee (Grades AA, AB, PB), rare royal purple tea, orthodox whole leaf, and roasted macadamia nuts from Mount Kenya.',
    email: 'info@rovilcoffee.com',
    telephone: '+254721487948',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Moi Avenue',
      postOfficeBoxNumber: 'P.O. Box 21237-00100',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi County',
      postalCode: '00100',
      addressCountry: 'KE',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Worldwide' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Japan' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'South Korea' },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Government Export License',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Agriculture and Food Authority (AFA) - Coffee Directorate Kenya',
        },
      },
    ],
    knowsAbout: [
      'Kenya Arabica Grade AA',
      'Kenya Arabica Grade AB',
      'Kenya Peaberry PB',
      'SL28 and SL34 Coffee Cultivars',
      'Kenyan Royal Purple Tea TRFK 306',
      'Black CTC Tea',
      'Orthodox Tea',
      'EUDR Deforestation Compliance',
      'FOB Incoterms Export Shipping',
      'Mombasa Port Coffee Export',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://rovilcoffee.com/#website',
    url: 'https://rovilcoffee.com',
    name: 'Rovil Coffee & Tea',
    alternateName: 'Virovil (K) Co. Ltd',
    publisher: {
      '@id': 'https://rovilcoffee.com/#organization',
    },
    inLanguage: 'en-US',
  };

  const sitelinksSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Products & Packaged Reserves',
        description: 'Browse single-origin Kenyan Arabica retail packs, purple tea boxes, green tea, and roasted mixed nuts.',
        url: 'https://rovilcoffee.com/products',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'What We Do - Export Grades',
        description: 'Bulk container lots of Kenya Grade AA, AB, PB coffee beans and orthodox specialty teas under FOB Incoterms.',
        url: 'https://rovilcoffee.com/what-we-do',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'Our Farm & Mount Kenya Terroir',
        description: 'High-elevation coffee estates at 1,950m ASL and 1,200+ partnered smallholder farming families with EUDR compliance.',
        url: 'https://rovilcoffee.com/our-farm',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Global Export Markets',
        description: 'Worldwide shipping corridors connecting Mombasa Port and JKIA Nairobi to Europe, USA, UK, Middle East, and Asia.',
        url: 'https://rovilcoffee.com/export-markets',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Request a Bulk Quote',
        description: 'Direct B2B commercial export desk for container volume quotations, shipping schedules, and cupping samples (PSS).',
        url: 'https://rovilcoffee.com/#contact',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
      />
    </>
  );
}
