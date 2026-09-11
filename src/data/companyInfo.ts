export const companyInfo = {
  name: 'Rovil Coffee & Tea',
  legalEntity: 'Virovil (K) Co. Limited',
  tagline: 'Kenyan Coffee & Tea, Exported to the World',
  subheading: 'Licensed Kenyan Exporter supplying commercial volumes to roasters, importers, and trading houses globally.',
  licensing: {
    status: 'Officially Licensed Coffee Exporter',
    authority: 'Government of Kenya | Coffee Directorate (AFA)',
    originCountry: 'Republic of Kenya',
    portOfOrigin: 'Port of Mombasa (Kilindini Harbour) & JKIA Airport (Nairobi)',
    inlandDepot: 'Inland Container Depot (ICD), Nairobi',
  },
  logistics: {
    incoterms: 'FOB (Free On Board)',
    freightResponsibility: 'All freight and transit costs are paid by the buyer.',
    airFreightRule: 'Orders under 1 metric tonne (under 1,000 kg) are dispatched via Air Cargo through Jomo Kenyatta International Airport (JKIA), Nairobi at buyer\'s cost.',
    seaFreightRule: 'Consignments of 1 metric tonne and above (1,000 kg or more / FCL container lots) are shipped via Ocean Freight through the Port of Mombasa (Kilindini Harbour) at buyer\'s cost.',
  },
  traceability: {
    overview: '100% Origin Chain-of-Custody: Products can be tracked from the farm through the airport (JKIA) or seaport (Mombasa) to the exact destination worldwide.',
    pipeline: [
      { step: '01', title: 'Farm Origin & Wet Mill', location: 'Mount Kenya / Nyeri / Kiambu', desc: 'GPS-mapped farm blocks, variety certification (SL28, SL34, TRFK 306), and selective harvest batch logging.' },
      { step: '02', title: 'Dry Milling & Cupping QC', location: 'Nairobi & Central Highlands', desc: 'Precision mechanical grading (AA, AB, PB), SCA 86+ cupping analysis, and GrainPro hermetic packing.' },
      { step: '03', title: 'Airport / Seaport Dispatch Hub', location: 'JKIA (Air Cargo) / Mombasa Port (Ocean Freight)', desc: 'Phytosanitary inspection (KEPHIS), ICO Certificate of Origin, Air Waybill (AWB) or Ocean B/L container seal tracking.' },
      { step: '04', title: 'Exact Buyer Destination Delivery', location: 'Buyer Destination Port & Warehouse Globally', desc: 'Live vessel GPS & air cargo status tracking directly to your nominated discharge point worldwide.' },
    ],
  },
  address: {
    street: 'Moi Avenue',
    poBox: 'P.O. Box 21237-00100',
    city: 'Nairobi',
    country: 'Kenya',
  },
  contacts: {
    phonePrimary: '+254 721 487 948',
    phoneSecondary: '+254 722 661 065',
    email: 'virovillimited@gmail.com',
    whatsapp: '+254721487948',
  },
  hours: 'Monday – Friday: 08:00 – 17:00 EAT (UTC+3)',
  metrics: [
    {
      label: 'Licensed Exporter',
      value: 'Regulated Origin',
      sub: 'Kenya Coffee Directorate AFA',
    },
    {
      label: 'Volume Capability',
      value: '10 MT – 100+ MT',
      sub: '20ft / 40ft Full Containers',
    },
    {
      label: 'Direct Traceability',
      value: 'Central Kenya Highlands',
      sub: 'Mt. Kenya & Aberdares Terroir',
    },
    {
      label: 'Global Delivery',
      value: '6 Continents',
      sub: 'Direct Port of Mombasa Shipments',
    },
  ],
};
