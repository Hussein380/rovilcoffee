export type ProductCategory = 
  | 'all'
  | 'branded-coffee' 
  | 'branded-tea' 
  | 'cafe-cups' 
  | 'bulk-coffee' 
  | 'bulk-tea';

export interface ProductItem {
  id: string;
  name: string;
  category: 'branded-coffee' | 'branded-tea' | 'cafe-cups' | 'bulk-coffee' | 'bulk-tea';
  categoryLabel: string;
  tagline: string;
  description: string;
  image: string;
  priceRetailUSD: number;
  priceRetailKES: number;
  unitWeight: string; // e.g., "250g Pouch", "100g Canister", "60kg Bag"
  wholesalePriceUSD?: number;
  wholesaleMOQ?: string;
  isPopular?: boolean;
  isNew?: boolean;
  origin: string;
  flavorNotes: string[];
  specs: {
    label: string;
    value: string;
  }[];
}
