import { FarmStage } from '@/types';

export const farmStages: FarmStage[] = [
  {
    step: '01',
    title: 'Cultivate & Nurture',
    durationOrSeason: 'Year-Round Agricultural Cycle',
    location: 'Central Kenya Highlands (1,700m – 2,100m ASL)',
    summary: 'High-altitude microclimates, deep red volcanic soils, and consistent equatorial rainfall create dense cherry growth and concentrated sugars.',
    details: [
      'Volcanic loam rich in potassium and phosphorus',
      'Shade-grown under indigenous canopy trees to regulate cherry maturation',
      'Continuous agronomic monitoring for optimal cherry health',
    ],
  },
  {
    step: '02',
    title: 'Selective Hand Harvest',
    durationOrSeason: 'Main Crop: Oct – Dec | Fly Crop: May – July',
    location: 'Estate Plots & Partner Outgrower Shambas',
    summary: 'Harvesting is exclusively performed by experienced pickers who select only fully ripened crimson-red cherries, passing through each tree multiple times per season.',
    details: [
      'Strict elimination of green, under-ripe, or insect-damaged cherries',
      'Daily sorting at the collection weighing station prior to wet pulping',
      'Brix refractometer sugar monitoring for peak flavor density',
    ],
  },
  {
    step: '03',
    title: 'Wet Milling & Fermentation',
    durationOrSeason: 'Same-Day Pulping (Within 8 hours of harvest)',
    location: 'Certified Washing Station (Wet Mill)',
    summary: 'Fresh mountain river water powers eco-pulpers before undergoing traditional Kenyan double-fermentation (12–24h dry + 12h clean soak), developing iconic citric vibrance.',
    details: [
      'Eco-efficient disc pulpers with minimal water consumption',
      'Traditional washing channels for density separation of sinkers vs floaters',
      'Clean spring water soak for final mucilage clarification',
    ],
  },
  {
    step: '04',
    title: 'Sun-Drying & Mechanical Grading',
    durationOrSeason: '14 – 21 Days of Controlled Sun Drying',
    location: 'Raised African Drying Beds & Dry Mill',
    summary: 'Parchment is spread on ventilated raised hessian beds under natural African sunlight, turned hourly until stabilized at an optimal 10.5% – 11.5% moisture content.',
    details: [
      'Regular moisture meter testing using certified DICKEY-john / Gehaka units',
      'Hulling and screen sizing through rotary perforations (Screen 18/17/16/15)',
      'Gravity table separation to segregate beans by specific density',
    ],
  },
  {
    step: '05',
    title: 'Lab Cupping & Hermetic Packaging',
    durationOrSeason: 'Pre-Shipment Quality Protocol',
    location: 'Quality Control Laboratory, Nairobi',
    summary: 'Every batch undergoes rigorous SCA cupping evaluation by licensed Q-graders. Upon certification, beans are packed into GrainPro hermetic protective liners inside 60kg export sisal bags.',
    details: [
      'SCA 100-point cupping evaluation and defect tolerance counts',
      'GrainPro 50-micron hermetic barrier prevents moisture re-absorption and odor contamination',
      'Lot coding, farm tracking tags, and official export seal application',
    ],
  },
  {
    step: '06',
    title: 'Customs & Port of Mombasa Export',
    durationOrSeason: 'Weekly Ocean Vessel Sailing Schedules',
    location: 'ICD Nairobi → Kilindini Harbour, Port of Mombasa',
    summary: 'Containers are packed at the Inland Container Depot (ICD) Nairobi, transported by rail direct to Kilindini Harbour in Mombasa, and cleared for rapid ocean transit to destination ports worldwide.',
    details: [
      'Complete export documentation: Phytosanitary, Certificate of Origin, Bill of Lading',
      'FOB Mombasa or CIF destination port incoterms contracts',
      'Direct ocean carrier bookings to Europe, UK, USA, Japan, Asia, and Africa',
    ],
  },
];
