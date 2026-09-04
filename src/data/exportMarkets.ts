import { ExportMarket } from '@/types';

export const exportMarkets: ExportMarket[] = [
  {
    region: 'Europe',
    majorHubs: ['Port of Rotterdam (Netherlands)', 'Port of Hamburg (Germany)', 'Port of Antwerp (Belgium)', 'Port of Le Havre (France)'],
    leadTimeDays: '21 – 26 Days',
    standardVessels: 'Direct ocean carriers via Suez Canal / Red Sea corridor',
    containerOptions: '20ft FCL (19.2 MT / 320 Bags) or 40ft FCL Bulk Liner',
    complianceNotes: 'Full EU Deforestation Regulation (EUDR) geolocation compliance, Phytosanitary certification, SCA cupping sheets.',
  },
  {
    region: 'United Kingdom',
    majorHubs: ['Port of Felixstowe', 'London Gateway', 'Port of Southampton'],
    leadTimeDays: '22 – 28 Days',
    standardVessels: 'Scheduled multi-weekly container services',
    containerOptions: '20ft FCL & Specialty LCL pallets',
    complianceNotes: 'UK Customs declaration, Certificate of Origin, Moisture analysis report (<11.5%).',
  },
  {
    region: 'United States & Canada',
    majorHubs: ['Port of New York / New Jersey', 'Port of Oakland / San Francisco', 'Port of Houston', 'Port of Seattle / Vancouver'],
    leadTimeDays: '28 – 35 Days',
    standardVessels: 'Transshipment & direct trans-Atlantic / trans-Pacific connections',
    containerOptions: '20ft FCL (GrainPro lined) & refrigerated reefer containers upon request',
    complianceNotes: 'FDA Prior Notice compliance, ICO Certificate of Origin, Bioterrorism Act registration.',
  },
  {
    region: 'Japan & East Asia',
    majorHubs: ['Port of Yokohama / Tokyo (Japan)', 'Port of Kobe (Japan)', 'Port of Busan (South Korea)', 'Port of Shanghai (China)'],
    leadTimeDays: '24 – 30 Days',
    standardVessels: 'Direct Indian Ocean / Straits of Malacca maritime routes',
    containerOptions: '20ft FCL hermetically sealed',
    complianceNotes: 'Rigorous Japanese MHLW pesticide residue compliance test reports, Grade AA screen guarantee.',
  },
  {
    region: 'Middle East & Gulf',
    majorHubs: ['Port of Jebel Ali (Dubai, UAE)', 'King Abdulaziz Port (Dammam, Saudi Arabia)', 'Jeddah Islamic Port'],
    leadTimeDays: '10 – 14 Days',
    standardVessels: 'Fast direct Gulf corridor feeder and mainliner services',
    containerOptions: '20ft / 40ft FCL',
    complianceNotes: 'Arab-Swiss / GCC Chamber of Commerce authenticated Certificate of Origin.',
  },
  {
    region: 'Intra-Africa',
    majorHubs: ['Port of Durban (South Africa)', 'Port of Alexandria (Egypt)', 'Port of Djibouti', 'Lagos / Apapa (Nigeria)'],
    leadTimeDays: '7 – 18 Days',
    standardVessels: 'Coastal maritime shipping and regional multimodal rail/road corridors',
    containerOptions: 'Containerized FCL & road haulage trailers',
    complianceNotes: 'AfCFTA preferential tariff documentation, COMESA origin certification.',
  },
];
