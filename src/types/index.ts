export type CoffeeGradeCode = 'AA' | 'AB' | 'PB' | 'C' | 'MH';

export interface CoffeeGrade {
  id: string;
  code: CoffeeGradeCode;
  name: string;
  screenSize: string;
  screenMm: string;
  beanDescription: string;
  cupProfile: {
    aroma: string;
    acidity: string;
    body: string;
    notes: string[];
  };
  packaging: string;
  minimumOrder: string;
  availability: 'Immediate Commercial Supply' | 'Seasonal Allocation';
  tagline: string;
  accentBadge: string;
}

export type TeaVarietyCode = 'purple' | 'orthodox' | 'black-ctc' | 'loose-leaf';

export interface TeaVariety {
  id: string;
  code: TeaVarietyCode;
  name: string;
  subtitle: string;
  description: string;
  originDetails: string;
  liquorColor: string;
  tasteNotes: string[];
  packaging: string;
  minimumOrder: string;
  keyBenefit: string;
}

export interface FarmStage {
  step: string;
  title: string;
  durationOrSeason: string;
  location: string;
  summary: string;
  details: string[];
}

export interface ExportMarket {
  region: string;
  majorHubs: string[];
  leadTimeDays: string;
  standardVessels: string;
  containerOptions: string;
  complianceNotes: string;
}

export interface RfqFormData {
  companyName: string;
  contactName: string;
  businessEmail: string;
  phone: string;
  country: string;
  destinationPort: string;
  commodityType: 'coffee' | 'tea' | 'both';
  selectedCoffeeGrade: CoffeeGradeCode | '';
  selectedTeaVariety: TeaVarietyCode | '';
  estimatedVolumeMt: string;
  incoterms: 'FOB Mombasa' | 'CIF Destination Port' | 'CFR Port' | 'EXW Warehouse';
  packagingPreference: string;
  notes: string;
}
