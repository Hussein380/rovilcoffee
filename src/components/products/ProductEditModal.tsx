'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductItem } from '@/types/product';

interface ProductEditModalProps {
  isOpen: boolean;
  productToEdit: ProductItem | null;
  onClose: () => void;
  onSave: (product: ProductItem) => void;
}

const PRESET_IMAGES = [
  { label: 'ROVIL Coffee Pouch (Roasted)', url: '/images/branded/rovil-coffee-pouch.jpg' },
  { label: 'ROVIL Tea Canister (Purple/Orthodox)', url: '/images/branded/rovil-tea-canister.jpg' },
  { label: 'ROVIL Eco Cups & Barista Gear', url: '/images/branded/rovil-retail-cups.jpg' },
  { label: 'Bulk Raw Green Coffee Grading', url: '/images/what-we-do/green-coffee-grading.jpg' },
  { label: 'Bulk 60kg GrainPro Bags', url: '/images/what-we-do/grainpro-export-bags.jpg' },
  { label: 'Bulk CTC Tea Consignments', url: '/images/what-we-do/kenyan-purple-ctc-teas.jpg' },
];

const CATEGORY_OPTIONS: { id: ProductItem['category']; label: string }[] = [
  { id: 'branded-coffee', label: 'ROVIL Packaged Retail Coffee' },
  { id: 'branded-tea', label: 'ROVIL Specialty & Purple Tea' },
  { id: 'cafe-cups', label: 'Cafe Supplies & Branded Eco Cups' },
  { id: 'bulk-coffee', label: 'Commercial Bulk Green Coffee Export' },
  { id: 'bulk-tea', label: 'Commercial Bulk CTC Tea Export' },
];

export default function ProductEditModal({
  isOpen,
  productToEdit,
  onClose,
  onSave,
}: ProductEditModalProps) {
  const [formData, setFormData] = useState<Partial<ProductItem>>({
    name: '',
    category: 'branded-coffee',
    categoryLabel: 'ROVIL Packaged Retail',
    tagline: '',
    description: '',
    image: '/images/branded/rovil-coffee-pouch.jpg',
    priceRetailUSD: 15.0,
    priceRetailKES: 2000,
    unitWeight: '250g Pouch',
    wholesalePriceUSD: 10.0,
    wholesaleMOQ: 'Case of 24 Pouches',
    origin: 'Mount Kenya Volcanic Highlands',
    flavorNotes: ['Citrus', 'Blackcurrant', 'Caramel'],
    specs: [
      { label: 'Roast Level', value: 'Medium Roast' },
      { label: 'Origin Altitude', value: '1,800m – 2,100m' },
    ],
  });

  const [notesInput, setNotesInput] = useState('');
  const [customImageInput, setCustomImageInput] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
      setNotesInput(productToEdit.flavorNotes.join(', '));
      setCustomImageInput(productToEdit.image);
    } else {
      setFormData({
        name: '',
        category: 'branded-coffee',
        categoryLabel: 'ROVIL Packaged Retail',
        tagline: '',
        description: '',
        image: '/images/branded/rovil-coffee-pouch.jpg',
        priceRetailUSD: 15.0,
        priceRetailKES: 2000,
        unitWeight: '250g Pouch',
        wholesalePriceUSD: 10.0,
        wholesaleMOQ: 'Case of 24 Pouches',
        origin: 'Mount Kenya Volcanic Highlands',
        flavorNotes: ['Citrus', 'Blackcurrant', 'Caramel'],
        specs: [
          { label: 'Roast Level', value: 'Medium Roast' },
          { label: 'Origin Altitude', value: '1,800m – 2,100m' },
        ],
      });
      setNotesInput('Citrus, Blackcurrant, Caramel');
      setCustomImageInput('/images/branded/rovil-coffee-pouch.jpg');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (cat: ProductItem['category']) => {
    const found = CATEGORY_OPTIONS.find((c) => c.id === cat);
    setFormData((prev) => ({
      ...prev,
      category: cat,
      categoryLabel: found ? found.label : 'ROVIL Products',
    }));
  };

  const handleUSDChange = (val: number) => {
    setFormData((prev) => ({
      ...prev,
      priceRetailUSD: val,
      priceRetailKES: Math.round(val * 135),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      alert('Please enter a product name');
      return;
    }

    const parsedNotes = notesInput
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);

    const savedProduct: ProductItem = {
      id: productToEdit ? productToEdit.id : `product-${Date.now()}`,
      name: formData.name || 'Untitled Product',
      category: (formData.category as ProductItem['category']) || 'branded-coffee',
      categoryLabel: formData.categoryLabel || 'ROVIL Products',
      tagline: formData.tagline || 'Premium Kenyan Selection',
      description: formData.description || 'Authentic single-origin Kenyan export item.',
      image: customImageInput.trim() || formData.image || '/images/branded/rovil-coffee-pouch.jpg',
      priceRetailUSD: Number(formData.priceRetailUSD) || 10,
      priceRetailKES: Number(formData.priceRetailKES) || 1350,
      unitWeight: formData.unitWeight || '250g',
      wholesalePriceUSD: formData.wholesalePriceUSD ? Number(formData.wholesalePriceUSD) : undefined,
      wholesaleMOQ: formData.wholesaleMOQ || undefined,
      origin: formData.origin || 'Mount Kenya',
      flavorNotes: parsedNotes.length > 0 ? parsedNotes : ['Specialty Grade'],
      specs: formData.specs && formData.specs.length > 0 ? formData.specs : [
        { label: 'Standard', value: 'Kenyan Export Grade' }
      ],
      isPopular: formData.isPopular,
      isNew: formData.isNew,
    };

    onSave(savedProduct);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#23150c]/80 backdrop-blur-sm"
        />

        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-stone-200"
          >
            {/* Modal Header */}
            <div className="bg-[#23150c] px-6 py-5 text-white flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-sm border border-white/20">
                  ✏️
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {productToEdit ? 'Edit Product Item' : 'Post New Product'}
                  </h3>
                  <p className="text-xs text-stone-300 font-medium">
                    Owner Mode: Instant Preview
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Product Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value as ProductItem['category'])}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3e2211] bg-stone-50"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. ROVIL Grade AA Mount Kenya Roast"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2211]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Catchy Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.tagline || ''}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Flagship High Elevation Roast"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2211]"
                  />
                </div>
              </div>

              {/* Pricing & Weights */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                  Pricing & Unit Configuration
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Retail Price (USD)
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      min="0"
                      value={formData.priceRetailUSD ?? ''}
                      onChange={(e) => handleUSDChange(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3e2211] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Retail Price (KES)
                    </label>
                    <input
                      type="number"
                      step="50"
                      min="0"
                      value={formData.priceRetailKES ?? ''}
                      onChange={(e) => setFormData({ ...formData, priceRetailKES: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3e2211] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Unit Packaging / Weight
                    </label>
                    <input
                      type="text"
                      value={formData.unitWeight || ''}
                      onChange={(e) => setFormData({ ...formData, unitWeight: e.target.value })}
                      placeholder="e.g. 250g Pouch / 60kg Bag"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2211] bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Wholesale Price (USD per unit)
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      min="0"
                      value={formData.wholesalePriceUSD ?? ''}
                      onChange={(e) => setFormData({ ...formData, wholesalePriceUSD: parseFloat(e.target.value) || 0 })}
                      placeholder="e.g. 10.50"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2211] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Wholesale MOQ (Minimum Order)
                    </label>
                    <input
                      type="text"
                      value={formData.wholesaleMOQ || ''}
                      onChange={(e) => setFormData({ ...formData, wholesaleMOQ: e.target.value })}
                      placeholder="e.g. Case of 24 / 1 Container"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2211] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Product Image
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCustomImageInput(preset.url);
                        setFormData({ ...formData, image: preset.url });
                      }}
                      className={`relative p-2 rounded-xl border text-left flex flex-col items-center gap-1.5 transition-all ${
                        customImageInput === preset.url
                          ? 'border-[#3e2211] bg-stone-100 ring-1 ring-[#3e2211]'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                      }`}
                    >
                      <div className="relative w-full h-16 rounded-lg overflow-hidden bg-stone-200">
                        <Image src={preset.url} alt={preset.label} fill sizes="(max-width: 768px) 50vw, 150px" className="object-cover" />
                      </div>
                      <span className="text-[11px] font-medium text-stone-800 text-center leading-tight line-clamp-1">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={customImageInput}
                  onChange={(e) => setCustomImageInput(e.target.value)}
                  placeholder="Or enter custom image path/URL"
                  className="w-full px-4 py-2 rounded-xl border border-stone-300 text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#3e2211]"
                />
              </div>

              {/* Description & Origin */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe tasting notes, roast characteristics, processing, and buyer benefits..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2211]"
                />
              </div>

              {/* Origin & Flavor notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Estate / Farm Origin
                  </label>
                  <input
                    type="text"
                    value={formData.origin || ''}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. Nyeri & Kirinyaga Highlands (1,950m)"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2211]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Flavor Notes (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={notesInput}
                    onChange={(e) => setNotesInput(e.target.value)}
                    placeholder="e.g. Blackcurrant, Caramel, Citrus, Jasmine"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2211]"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#3e2211] hover:bg-[#23150c] text-white text-xs font-bold tracking-wide transition-all shadow-sm"
                >
                  {productToEdit ? 'Save Changes' : 'Publish Product to Catalog'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
