'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard3D from '@/components/products/ProductCard3D';
import ProductDetailDrawer from '@/components/products/ProductDetailDrawer';
import ProductEditModal from '@/components/products/ProductEditModal';
import { initialProductsCatalog } from '@/data/productsCatalog';
import { ProductCategory, ProductItem } from '@/types/product';

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'branded-coffee', label: 'ROVIL Roasted Coffee' },
  { id: 'branded-tea', label: 'ROVIL Specialty Tea' },
  { id: 'cafe-cups', label: 'Cafe & Eco Cups' },
  { id: 'bulk-coffee', label: 'Bulk Green Coffee Export' },
  { id: 'bulk-tea', label: 'Bulk CTC Tea Export' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProductsCatalog);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'KES'>('USD');
  const [isOwnerMode, setIsOwnerMode] = useState(false);

  // Modals state
  const [inspectProduct, setInspectProduct] = useState<ProductItem | null>(null);
  const [editProduct, setEditProduct] = useState<ProductItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync to localStorage for persistence across reloads
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rovil_products_catalog');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load saved products:', e);
    }
  }, []);

  const saveProductsState = (updatedList: ProductItem[]) => {
    setProducts(updatedList);
    try {
      localStorage.setItem('rovil_products_catalog', JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to persist products:', e);
    }
  };

  const handleSaveProduct = (product: ProductItem) => {
    const existingIndex = products.findIndex((p) => p.id === product.id);
    let updated: ProductItem[];
    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = product;
    } else {
      updated = [product, ...products];
    }
    saveProductsState(updated);
  };

  const handleResetDefaults = () => {
    if (confirm('Reset product catalog to default ROVIL items?')) {
      saveProductsState(initialProductsCatalog);
    }
  };

  // Filtered list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.flavorNotes.some((n) => n.toLowerCase().includes(q)) ||
        p.origin.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-[#3e2211] selection:text-white">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact Top Header & Controls Bar */}
          <div className="pt-4 pb-6 border-b border-stone-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#23150c] tracking-tight">
                  Products &amp; Export Catalog
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  ROVIL branded retail coffees, specialty teas, cafe supplies, and bulk container lots.
                </p>
              </div>

              {/* Right Controls: Currency Switcher & Owner Mode Toggle */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Currency Switcher */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
                  <span className="text-xs font-semibold text-stone-500 pl-2 pr-1">Currency:</span>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      currency === 'USD'
                        ? 'bg-[#23150c] text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => setCurrency('KES')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      currency === 'KES'
                        ? 'bg-[#23150c] text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    KES (KES)
                  </button>
                </div>

                {/* Owner Mode Switch */}
                <button
                  onClick={() => setIsOwnerMode(!isOwnerMode)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isOwnerMode
                      ? 'bg-[#23150c] text-white border-[#23150c] shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span>✏️</span>
                  <span>Owner Edit Mode: {isOwnerMode ? 'ON' : 'OFF'}</span>
                </button>

                {isOwnerMode && (
                  <button
                    onClick={() => {
                      setEditProduct(null);
                      setIsEditModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#3e2211] text-white shadow-xs hover:bg-[#23150c] transition-all"
                  >
                    + Post Product
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="mt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#23150c] text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full lg:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-8 pr-4 py-1.5 rounded-xl border border-stone-300 text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#3e2211] bg-white"
                />
                <svg
                  className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-600"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="py-3 flex items-center justify-between text-xs text-stone-500">
            <span>
              Showing <strong className="text-stone-800">{filteredProducts.length}</strong> items
              {selectedCategory !== 'all' && (
                <> in <span className="text-stone-800 font-semibold">{CATEGORIES.find(c => c.id === selectedCategory)?.label}</span></>
              )}
            </span>
            <span className="hidden sm:inline text-stone-400">
              Interactive 3D Cards
            </span>
          </div>

          {/* 3D Products Grid (Immediately Visible) */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
              {filteredProducts.map((product) => (
                <ProductCard3D
                  key={product.id}
                  product={product}
                  currency={currency}
                  isOwnerMode={isOwnerMode}
                  onQuickView={(p) => setInspectProduct(p)}
                  onEdit={(p) => {
                    setEditProduct(p);
                    setIsEditModalOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-stone-50 rounded-3xl border border-stone-200">
              <h3 className="text-base font-bold text-stone-900">No matching products found</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try searching for a different term or clearing your category filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#23150c] text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Product Inspect / Specs Modal */}
      <ProductDetailDrawer
        product={inspectProduct}
        currency={currency}
        isOwnerMode={isOwnerMode}
        onClose={() => setInspectProduct(null)}
        onEdit={(p) => {
          setInspectProduct(null);
          setEditProduct(p);
          setIsEditModalOpen(true);
        }}
      />

      {/* Owner Post / Edit Modal */}
      <ProductEditModal
        isOpen={isEditModalOpen}
        productToEdit={editProduct}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditProduct(null);
        }}
        onSave={handleSaveProduct}
      />

      <Footer />
    </div>
  );
}
