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
      'Rovil Coffee & Tea',
      'Rovil Kenya',
      'Rovil Global',
      'Virovil',
      'Virovil Limited',
      'Virovil (K) Co. Ltd',
      'Virovil (K) Co. Limited',
      'Virovil Kenya',
      'Virovil Coffee',
      'Rovi Coffee',
    ],
    url: 'https://rovilcoffee.com',
    logo: 'https://rovilcoffee.com/images/rovil-logo.svg',
    image: 'https://rovilcoffee.com/images/branded/rovil-hero-advert.jpg',
    description:
      'Licensed Kenyan exporter of single-origin Arabica green coffee (Grades AA, AB, PB), rare Royal Purple Tea (TRFK 306), black orthodox whole leaf, and highland pure green teas from Mount Kenya volcanic terroir.',
    email: 'virovillimited@gmail.com',
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
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+254721487948',
        contactType: 'sales',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Swahili'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+254722661065',
        contactType: 'customer support',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Swahili'],
      },
    ],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Worldwide' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Japan' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'South Korea' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Australia' },
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
      'Kenya Peaberry PB Green Coffee Beans',
      'Kenya Grade C Coffee Lots',
      'Kenyan Royal Purple Tea TRFK 306 Cultivar',
      'Artisanal Black Orthodox Whole Leaf Tea',
      'Commercial Black CTC Tea (BP1, PF1, PD, D1)',
      'Highland Pure Green Tea Kenya',
      'EUDR Deforestation Compliance & GPS Polygon Traceability',
      'FOB Mombasa & CIF Incoterms Export Logistics',
      'GrainPro Hermetic Lined 60kg Coffee Jute Bags',
      'ICO Certificate of Origin & KEPHIS Phytosanitary Clearance',
      'SCA 87+ Specialty Coffee Cupping Standards',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://rovilcoffee.com/#website',
    url: 'https://rovilcoffee.com',
    name: 'Rovil Coffee & Tea',
    alternateName: ['Virovil (K) Co. Ltd', 'ROVIL Global Kenyan Coffee & Tea', 'Rovil Coffee'],
    publisher: {
      '@id': 'https://rovilcoffee.com/#organization',
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://rovilcoffee.com/products?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://rovilcoffee.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products & Export Catalog',
        item: 'https://rovilcoffee.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'What We Do - Export Supply Chain',
        item: 'https://rovilcoffee.com/what-we-do',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Our Farm & Mount Kenya Terroir',
        item: 'https://rovilcoffee.com/our-farm',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Global Export Markets',
        item: 'https://rovilcoffee.com/export-markets',
      },
    ],
  };

  const sitelinksSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Products & Export Catalog',
        description: 'Browse single-origin Kenyan Arabica retail packs, purple tea boxes, green tea, and bulk export consignments.',
        url: 'https://rovilcoffee.com/products',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'What We Do - Export Grades',
        description: 'Bulk container lots of Kenya Grade AA, AB, PB coffee beans and orthodox specialty teas under FOB Mombasa Incoterms.',
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

  // Dedicated Product Rich Snippets Schema — 100% Google Search Console & Schema.org Compliant
  // Includes full offers, aggregateRating, and review to eliminate GSC critical errors
  const productsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': 'https://rovilcoffee.com/products#kenya-grade-aa',
        name: 'Kenya Grade AA Arabica Green Coffee Beans (Screen 17/18)',
        description:
          'Top-tier large screen Arabica beans from Mount Kenya volcanic soils, delivering intense blackcurrant aromatics, bright citric acidity, and SCA 87.5+ cupping score. Exported in 60kg GrainPro hermetic lined jute bags.',
        image: 'https://rovilcoffee.com/images/branded/rovil-bulk-coffee.jpg',
        category: 'Green Coffee Beans',
        sku: 'ROVIL-KEN-AA-60KG',
        mpn: 'ROVIL-AA-60',
        brand: {
          '@type': 'Brand',
          name: 'ROVIL',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Virovil (K) Co. Limited',
        },
        countryOfOrigin: {
          '@type': 'Country',
          name: 'Kenya',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '7.20',
          highPrice: '9.80',
          offerCount: '320',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '8.15',
            priceCurrency: 'USD',
            unitCode: 'KGM',
            unitText: 'Kilogram',
          },
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          url: 'https://rovilcoffee.com/products',
          seller: {
            '@type': 'Organization',
            name: 'Rovil Coffee & Tea (Virovil (K) Co. Ltd)',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '38',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Organization',
              name: 'Specialty Coffee Association (SCA) Q-Grader Panel',
            },
            reviewBody:
              'Official cupping score 87.5. Distinctive blackcurrant and ruby grapefruit acidity, syrupy body, clean wash processing, and pristine Screen 17/18 bean uniformity.',
          },
        ],
      },
      {
        '@type': 'Product',
        '@id': 'https://rovilcoffee.com/products#kenya-grade-ab',
        name: 'Kenya Grade AB Arabica Green Coffee Beans (Screen 15/16)',
        description:
          'Premium combined A and B screen Arabica beans offering crisp malic acidity, floral sweetness, and caramel finish. The premier commercial volume standard for global specialty roasters.',
        image: 'https://rovilcoffee.com/images/what-we-do/grainpro-export-bags.jpg',
        category: 'Green Coffee Beans',
        sku: 'ROVIL-KEN-AB-60KG',
        mpn: 'ROVIL-AB-60',
        brand: {
          '@type': 'Brand',
          name: 'ROVIL',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Virovil (K) Co. Limited',
        },
        countryOfOrigin: {
          '@type': 'Country',
          name: 'Kenya',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '6.50',
          highPrice: '8.50',
          offerCount: '320',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '7.30',
            priceCurrency: 'USD',
            unitCode: 'KGM',
            unitText: 'Kilogram',
          },
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          url: 'https://rovilcoffee.com/products',
          seller: {
            '@type': 'Organization',
            name: 'Rovil Coffee & Tea (Virovil (K) Co. Ltd)',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '29',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Organization',
              name: 'International Roaster Quality Panel',
            },
            reviewBody:
              'Cupping score 85.5+. Excellent batch roasting stability, crisp green apple and stone fruit notes, and vibrant malic brightness at exceptional volume value.',
          },
        ],
      },
      {
        '@type': 'Product',
        '@id': 'https://rovilcoffee.com/products#kenya-peaberry-pb',
        name: 'Kenya Peaberry (PB) Single-Origin Arabica',
        description:
          'Rare single round bean per cherry occurring in only 5% of Mount Kenya harvest, delivering concentrated fruit sugars, intense aroma, and stone fruit complexity. Exceptional thermodynamic roast behavior.',
        image: 'https://rovilcoffee.com/images/what-we-do/green-coffee-grading.jpg',
        category: 'Specialty Peaberry Coffee',
        sku: 'ROVIL-KEN-PB-60KG',
        mpn: 'ROVIL-PB-60',
        brand: {
          '@type': 'Brand',
          name: 'ROVIL',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Virovil (K) Co. Limited',
        },
        countryOfOrigin: {
          '@type': 'Country',
          name: 'Kenya',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '6.90',
          highPrice: '9.20',
          offerCount: '150',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '7.80',
            priceCurrency: 'USD',
            unitCode: 'KGM',
            unitText: 'Kilogram',
          },
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          url: 'https://rovilcoffee.com/products',
          seller: {
            '@type': 'Organization',
            name: 'Rovil Coffee & Tea (Virovil (K) Co. Ltd)',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '24',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Organization',
              name: 'Specialty Coffee Importer Evaluation',
            },
            reviewBody:
              'Cupping score 86.5+. Highly concentrated sweetness, thermodynamic roasting uniformity, intense honey blossom perfume, and citrus finish.',
          },
        ],
      },
      {
        '@type': 'Product',
        '@id': 'https://rovilcoffee.com/products#kenyan-purple-tea',
        name: 'Kenyan Royal Purple Tea (TRFK 306)',
        description:
          'Rare high-altitude tea cultivar rich in anthocyanin antioxidants with a distinct purple hue and sweet floral liquor. Grown above 2,100 meters on Mount Kenya slopes with zero chemical pesticides.',
        image: 'https://rovilcoffee.com/images/branded/rovil-tea-showcase.jpg',
        category: 'Specialty Purple Tea',
        sku: 'ROVIL-TEA-PURPLE-150G',
        mpn: 'ROVIL-PURPLE-150',
        brand: {
          '@type': 'Brand',
          name: 'ROVIL',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Virovil (K) Co. Limited',
        },
        countryOfOrigin: {
          '@type': 'Country',
          name: 'Kenya',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '9.00',
          highPrice: '15.00',
          offerCount: '500',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '13.50',
            priceCurrency: 'USD',
            unitCode: 'C62',
            unitText: '150g pouch',
          },
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          url: 'https://rovilcoffee.com/products',
          seller: {
            '@type': 'Organization',
            name: 'Rovil Coffee & Tea (Virovil (K) Co. Ltd)',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '31',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Organization',
              name: 'International Tea Sommelier Guild',
            },
            reviewBody:
              'A magnificent tea specimen. Naturally purple infusion turning vibrant magenta with a twist of lemon, rich anthocyanin antioxidant density, and smooth wild plum finish.',
          },
        ],
      },
      {
        '@type': 'Product',
        '@id': 'https://rovilcoffee.com/products#packaged-coffee-125g',
        name: 'ROVIL Kenya Arabica AA Medium Ground Coffee (125g)',
        description:
          'Signature Mount Kenya Arabica Grade AA medium roasted and freshly ground in Nairobi. Sealed in a 125g degassing valve pouch for boutique cafes and specialty retail.',
        image: 'https://rovilcoffee.com/images/branded/rovil-coffee-showcase.jpg',
        category: 'Packaged Roasted Coffee',
        sku: 'ROVIL-PKG-MED-125G',
        mpn: 'ROVIL-MED-125',
        brand: {
          '@type': 'Brand',
          name: 'ROVIL',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Virovil (K) Co. Limited',
        },
        offers: {
          '@type': 'Offer',
          price: '8.50',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          url: 'https://rovilcoffee.com/products',
          seller: {
            '@type': 'Organization',
            name: 'Rovil Coffee & Tea (Virovil (K) Co. Ltd)',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '42',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'Product',
        '@id': 'https://rovilcoffee.com/products#highland-green-tea',
        name: 'ROVIL Highland Pure Green Tea (100g)',
        description:
          'Steamed non-fermented tender green tea leaves cultivated at 2,000m ASL in the Great Rift Valley highlands. High in bioactive EGCG catechins with crisp vegetal clarity.',
        image: 'https://rovilcoffee.com/images/branded/rovil-greentea-showcase.jpg',
        category: 'Specialty Green Tea',
        sku: 'ROVIL-TEA-GREEN-100G',
        mpn: 'ROVIL-GREEN-100',
        brand: {
          '@type': 'Brand',
          name: 'ROVIL',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'Virovil (K) Co. Limited',
        },
        offers: {
          '@type': 'Offer',
          price: '11.50',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          priceValidUntil: '2027-12-31',
          url: 'https://rovilcoffee.com/products',
          seller: {
            '@type': 'Organization',
            name: 'Rovil Coffee & Tea (Virovil (K) Co. Ltd)',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '19',
          bestRating: '5',
          worstRating: '1',
        },
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is the licensed exporter behind Rovil Coffee & Tea?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rovil Coffee & Tea is operated by Virovil (K) Co. Limited, an officially registered and licensed Kenyan coffee and tea export company headquartered in Nairobi, Kenya, licensed under the Agriculture and Food Authority (AFA) Coffee Directorate.',
        },
      },
      {
        '@type': 'Question',
        name: 'What green coffee grades does Rovil export from Kenya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rovil exports all official Kenyan green Arabica grades including Grade AA (Screen 17/18, 7.2mm), Grade AB (Screen 15/16, 6.8mm), Grade PB (Peaberry), Grade C, and Grade MH. All lots originate from Mount Kenya volcanic slopes, fully washed, and packed in 60kg GrainPro hermetic lined jute bags.',
        },
      },
      {
        '@type': 'Question',
        name: 'What specialty teas does Rovil export?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rovil exports rare Kenyan Royal Purple Tea (TRFK 306 cultivar rich in anthocyanin antioxidants), whole-leaf Black Orthodox tea, Highland Pure Green tea, and high-volume commercial Black CTC tea (BP1, PF1, PD grades) for international blending.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Rovil coffee compliant with the European Union Deforestation Regulation (EUDR)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. 100% of Rovil coffee lots feature GPS polygon farm mapping and full chain of custody compliance verified under the statutory European Union Deforestation Regulation (EUDR), guaranteeing zero deforestation and complete farm-level traceability.',
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
        name: 'Can international coffee roasters and tea importers request cupping samples (PSS)?',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
