export type ProductCategory = string;

export interface ProductItem {
  id: string;
  name: string;
  category: string;
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
