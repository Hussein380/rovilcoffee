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
      'Kenya Arabica Grade AA (Screen 17/18)',
      'Kenya Arabica Grade AB (Screen 15/16)',
      'Kenya Peaberry PB Green Coffee',
      'Kenya Grade C Coffee',
      'Kenya Grade E Elephant Beans',
      'SL28 and SL34 Arabica Cultivars',
      'Batian and Ruiru 11 Coffee Varieties',
      'Mount Kenya High-Altitude Terroir (1,950m ASL)',
      'Kenyan Royal Purple Tea TRFK 306',
      'Single-Origin Orthodox Black Tea',
      'CTC Black Tea (BP1, PF1, PD, D1)',
      'Highland Pure Green Tea Kenya',
      'EUDR Deforestation Compliance & GPS Polygon Traceability',
      'FOB Mombasa & CIF Incoterms Export Logistics',
      'GrainPro Hermetic Lined 60kg Coffee Jute Bags',
      'ICO Certificate of Origin and KEPHIS Phytosanitary Clearance',
      'SCA 86+ Specialty Coffee Cupping Standards',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Kenyan Coffee & Specialty Tea Export Portfolio',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Kenya Grade AA Arabica Green Coffee Beans (Screen 17/18)',
            description: 'Top-tier large screen Arabica beans from Mount Kenya volcanic soils, delivering intense blackcurrant aromatics, bright citric acidity, and SCA 87.5+ cupping score.',
            category: 'Green Coffee Beans',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Kenya Grade AB Arabica Green Coffee Beans (Screen 15/16)',
            description: 'Premium combined A and B screen Arabica beans offering crisp malic acidity, floral sweetness, and caramel finish.',
            category: 'Green Coffee Beans',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Kenya Peaberry (PB) Single-Origin Arabica',
            description: 'Rare single round bean per cherry with concentrated fruit sugars, intense aroma, and stone fruit complexity.',
            category: 'Specialty Peaberry Coffee',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Kenyan Royal Purple Tea (TRFK 306)',
            description: 'Rare high-altitude tea cultivar rich in anthocyanin antioxidants with a distinct purple hue and sweet floral liquor.',
            category: 'Specialty Purple Tea',
          },
        },
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://rovilcoffee.com/#website',
    url: 'https://rovilcoffee.com',
    name: 'Rovil Coffee & Tea',
    alternateName: ['Virovil (K) Co. Ltd', 'ROVIL Global'],
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What green coffee grades does Rovil export from Kenya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rovil exports all official Kenyan green Arabica grades including Grade AA (Screen 17/18, 7.2mm), Grade AB (Screen 15/16, 6.8mm), Grade PB (Peaberry), Grade C, and Grade E (Elephant beans). All beans are grown on Mount Kenya slopes, wet-milled, and packed in 60kg GrainPro hermetic lined jute bags.',
        },
      },
      {
        '@type': 'Question',
        name: 'What coffee cultivars and varietals are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our coffee consignments comprise historic heirloom SL28 and SL34 cultivars renowned for bright citric acidity and blackcurrant notes, alongside disease-resistant Batian and Ruiru 11 varieties, cultivated at elevations exceeding 1,950 meters above sea level.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Rovil coffee compliant with the European Union Deforestation Regulation (EUDR)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. 100% of Rovil coffee lots feature GPS polygon farm mapping and full chain of custody compliance verified under the statutory European Union Deforestation Regulation (EUDR), guaranteeing zero deforestation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the minimum export shipping volumes and Incoterms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For ocean freight, our standard commercial allocation is a 20ft FCL container containing 320 bags (19.2 Metric Tonnes) dispatched from the Port of Mombasa under FOB or CIF Incoterms. Air freight consignments and micro-lots under 1 tonne are dispatched through JKIA Nairobi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can international coffee roasters and importers request cupping samples (PSS)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Rovil dispatches 250g to 500g Pre-Shipment Samples (PSS) globally via DHL and FedEx express air courier directly from our Nairobi quality control cupping laboratory with certified moisture sheets and screen grading data.',
        },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
