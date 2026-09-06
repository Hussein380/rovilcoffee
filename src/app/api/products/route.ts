import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { verifyAdminRequest } from '@/lib/auth';
import { initialProductsCatalog } from '@/data/productsCatalog';

// GET /api/products — public, returns all products
export async function GET() {
  try {
    await dbConnect();
    let products = await Product.find({}).sort({ createdAt: -1 }).lean();

    // Auto-seed initial items if collection is empty
    if (products.length === 0) {
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

      await Product.insertMany(seedItems);
      products = await Product.find({}).sort({ createdAt: -1 }).lean();
    }

    // Map MongoDB _id to id string for frontend compatibility
    const mapped = products.map((p) => ({
      ...p,
      id: (p._id as { toString(): string }).toString(),
      _id: undefined,
      __v: undefined,
    }));

    return NextResponse.json(mapped);
  } catch (err) {
    console.error('GET /api/products error:', err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST /api/products — admin only, create product
export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();

    const product = await Product.create({
      name: body.name,
      category: body.category,
      categoryLabel: body.categoryLabel,
      tagline: body.tagline,
      description: body.description,
      image: body.image,
      priceRetailUSD: Number(body.priceRetailUSD),
      priceRetailKES: Number(body.priceRetailKES),
      unitWeight: body.unitWeight,
      wholesalePriceUSD: body.wholesalePriceUSD ? Number(body.wholesalePriceUSD) : undefined,
      wholesaleMOQ: body.wholesaleMOQ || undefined,
      isPopular: Boolean(body.isPopular),
      isNew: Boolean(body.isNew),
      origin: body.origin,
      flavorNotes: Array.isArray(body.flavorNotes) ? body.flavorNotes : [],
      specs: Array.isArray(body.specs) ? body.specs : [],
    });

    return NextResponse.json(
      {
        ...product.toObject(),
        id: product._id.toString(),
        _id: undefined,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST /api/products error:', err);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
