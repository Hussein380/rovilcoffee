import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { initialProductsCatalog } from '@/data/productsCatalog';

export async function POST() {
  try {
    await dbConnect();
    const deleted = await Product.deleteMany({});
    
    const seedItems = initialProductsCatalog.map((item) => ({
      name: item.name,
      category: item.category,
      categoryLabel: item.categoryLabel,
      tagline: item.tagline,
      description: item.description,
      image: item.image,
      priceRetailUSD: item.priceRetailUSD,
      priceRetailKES: item.priceRetailKES,
      unitWeight: item.unitWeight,
      wholesalePriceUSD: item.wholesalePriceUSD,
      wholesaleMOQ: item.wholesaleMOQ,
      isPopular: !!item.isPopular,
      isNew: !!item.isNew,
      origin: item.origin,
      flavorNotes: item.flavorNotes || [],
      specs: item.specs || [],
    }));

    const inserted = await Product.insertMany(seedItems);

    return NextResponse.json({
      success: true,
      deletedCount: deleted.deletedCount,
      insertedCount: inserted.length,
      items: inserted.map((i) => ({ id: i._id, name: i.name, category: i.category })),
    });
  } catch (error) {
    console.error('Reset error:', error);
    return NextResponse.json({ error: 'Reset failed' }, { status: 500 });
  }
}
