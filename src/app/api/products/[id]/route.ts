import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { verifyAdminRequest } from '@/lib/auth';

// PUT /api/products/[id] — admin only, update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
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

    const updateData = {
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
    };

    let updated = null;
    if (mongoose.isValidObjectId(id)) {
      updated = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    if (!updated) {
      updated = await Product.findOneAndUpdate(
        { $or: [{ id: id }, { name: id }] },
        updateData,
        { new: true, runValidators: true }
      );
    }

    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...updated.toObject(),
      id: updated._id.toString(),
      _id: undefined,
    });
  } catch (err: any) {
    console.error('PUT /api/products/[id] error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update product' }, { status: 500 });
  }
}

// DELETE /api/products/[id] — admin only
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await verifyAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;

    let deleted = null;
    if (mongoose.isValidObjectId(id)) {
      deleted = await Product.findByIdAndDelete(id);
    }

    if (!deleted) {
      deleted = await Product.findOneAndDelete({
        $or: [{ id: id }, { name: id }],
      });
    }

    if (!deleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err) {
    console.error('DELETE /api/products/[id] error:', err);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
