import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { verifyAdminRequest } from '@/lib/auth';

// GET /api/products — public, returns all products
export async function GET() {
  try {
    await dbConnect();
    let products = await Product.find({}).sort({ createdAt: -1 }).lean();

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

    if (!body?.name || !body.name.trim()) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    const category = body.category?.trim() || 'coffee';
    const categoryLabel = body.categoryLabel?.trim() || (category === 'tea' ? 'Kenyan Specialty Tea' : 'Kenyan Arabica Coffee');
    const defaultImage = category === 'tea' ? '/images/branded/rovil-tea-canister.jpg' : '/images/branded/rovil-coffee-pouch.jpg';

    const parseNum = (val: unknown, fallback = 0) => {
      if (val === undefined || val === null || val === '') return fallback;
      const n = Number(val);
      return isNaN(n) ? fallback : n;
    };

    const product = await Product.create({
      name: body.name.trim(),
      category,
      categoryLabel,
      tagline: body.tagline ? body.tagline.trim() : '',
      description: body.description ? body.description.trim() : '',
      image: body.image && body.image.trim() ? body.image.trim() : defaultImage,
      priceRetailUSD: parseNum(body.priceRetailUSD, 0),
      priceRetailKES: parseNum(body.priceRetailKES, 0),
      unitWeight: body.unitWeight ? body.unitWeight.trim() : 'Standard Pack',
      wholesalePriceUSD: body.wholesalePriceUSD !== undefined && body.wholesalePriceUSD !== null && body.wholesalePriceUSD !== '' && !isNaN(Number(body.wholesalePriceUSD)) ? Number(body.wholesalePriceUSD) : undefined,
      wholesaleMOQ: body.wholesaleMOQ ? body.wholesaleMOQ.trim() : undefined,
      isPopular: Boolean(body.isPopular),
      isNew: Boolean(body.isNew),
      origin: body.origin ? body.origin.trim() : 'Kenya',
      flavorNotes: Array.isArray(body.flavorNotes) ? body.flavorNotes.filter(Boolean) : [],
      specs: Array.isArray(body.specs) ? body.specs.filter((s: any) => s && (s.label || s.value)) : [],
    });

    return NextResponse.json(
      {
        ...product.toObject(),
        id: product._id.toString(),
        _id: undefined,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('POST /api/products error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to create product' }, { status: 500 });
  }
}
