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

    const updateData = {
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
  } catch (err) {
    console.error('PUT /api/products/[id] error:', err);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
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
