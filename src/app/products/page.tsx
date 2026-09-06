'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard3D from '@/components/products/ProductCard3D';
import ProductDetailDrawer from '@/components/products/ProductDetailDrawer';
import { initialProductsCatalog } from '@/data/productsCatalog';
import { ProductItem } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

const BASE_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'coffee', label: 'Kenyan Coffee' },
  { id: 'tea', label: 'Specialty Tea' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProductsCatalog);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'KES'>('USD');
  // Quick view drawer state
  const [inspectProduct, setInspectProduct] = useState<ProductItem | null>(null);

  // Fetch live products from MongoDB API
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
            return;
          }
        }
      } catch (e) {
        console.warn('Could not fetch from /api/products, using initial catalog:', e);
      }
      setProducts(initialProductsCatalog);
    }
    loadProducts();
  }, []);

  // Dynamically compute category tabs to include any new coffee/tea/custom types added by admin
  const categories = useMemo(() => {
    const list = [...BASE_CATEGORIES];
    const seen = new Set(list.map((c) => c.id));

    for (const p of products) {
      if (p.category && !seen.has(p.category)) {
        seen.add(p.category);
        list.push({
          id: p.category,
          label: p.categoryLabel || p.category,
        });
      }
    }
    return list;
  }, [products]);

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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-[#3e2211] selection:text-white">
      <Navbar />

      <main className="pt-20 pb-20">
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

              {/* Right Controls: Currency Switcher & Admin Portal */}
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

              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="mt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Category Pills — mobile fade on right edge indicates scroll */}
              <div className="relative">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none pr-8 lg:pr-0">
                  {categories.map((cat) => (
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
                {/* Fade hint for mobile — hidden on lg */}
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden" />
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

          {/* Framing sentence + results count */}
          <div className="py-3 flex items-center justify-between text-xs text-stone-500">
            <span>
              Showing <strong className="text-stone-800">{filteredProducts.length}</strong> items
              {selectedCategory !== 'all' && (
                <> in <span className="text-stone-800 font-semibold">{categories.find((c) => c.id === selectedCategory)?.label}</span></>
              )}
            </span>
            <span className="hidden sm:inline text-stone-400">
              Retail packs and bulk container lots — direct from Kenyan farms
            </span>
          </div>

          {/* 3D Products Grid */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key={selectedCategory + searchQuery}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2"
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <ProductCard3D
                      product={product}
                      currency={currency}
                      isOwnerMode={false}
                      onQuickView={(p) => setInspectProduct(p)}
                      onEdit={() => {}}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center bg-stone-50 rounded-3xl border border-stone-200"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Back to Top button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[#23150c] text-white flex items-center justify-center shadow-lg hover:bg-[#3e2211] transition-all hover:scale-110"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Product Inspect / Specs Modal */}
      <ProductDetailDrawer
        product={inspectProduct}
        currency={currency}
        isOwnerMode={false}
        onClose={() => setInspectProduct(null)}
        onEdit={() => {}}
      />

      <Footer />
    </div>
  );
}
