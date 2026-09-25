import mongoose, { Schema, Document, Model, models } from 'mongoose';

export interface IProduct {
  name: string;
  category?: string;       // free-text — not an enum, supports any future type
  categoryLabel?: string;
  tagline?: string;
  description?: string;
  image?: string;          // Cloudinary URL or local /images/... path
  priceRetailUSD?: number;
  priceRetailKES?: number;
  unitWeight?: string;
  wholesalePriceUSD?: number;
  wholesaleMOQ?: string;
  isPopular?: boolean;
  isNew?: boolean;
  origin?: string;
  flavorNotes?: string[];
  specs?: { label: string; value: string }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const SpecSchema = new Schema<{ label: string; value: string }>(
  { label: String, value: String },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    name:            { type: String, required: true, trim: true },
    category:        { type: String, default: 'coffee', trim: true },
    categoryLabel:   { type: String, default: 'Kenyan Arabica Coffee', trim: true },
    tagline:         { type: String, required: false, default: '', trim: true },
    description:     { type: String, required: false, default: '', trim: true },
    image:           { type: String, default: '/images/branded/rovil-coffee-pouch.jpg' },
    priceRetailUSD:  { type: Number, default: 0, min: 0 },
    priceRetailKES:  { type: Number, default: 0, min: 0 },
    unitWeight:      { type: String, default: 'Standard Pack' },
    wholesalePriceUSD: { type: Number },
    wholesaleMOQ:    { type: String },
    isPopular:       { type: Boolean, default: false },
    isNew:           { type: Boolean, default: false },
    origin:          { type: String, default: 'Kenya' },
    flavorNotes:     { type: [String], default: [] },
    specs:           { type: [SpecSchema], default: [] },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

// In dev, delete cached model so schema changes take effect on hot reload
if (process.env.NODE_ENV === 'development' && models.Product) {
  delete models.Product;
}

const Product: Model<IProduct> =
  models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
