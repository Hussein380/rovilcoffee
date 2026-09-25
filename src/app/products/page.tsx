'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard3D from '@/components/products/ProductCard3D';
import ProductDetailDrawer from '@/components/products/ProductDetailDrawer';
import { ProductItem } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search } from 'lucide-react';

const BASE_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'coffee', label: 'Kenyan Coffee' },
  { id: 'tea', label: 'Specialty Tea' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'KES'>('USD');
  // Quick view drawer state
  const [inspectProduct, setInspectProduct] = useState<ProductItem | null>(null);

  // Fetch live products from MongoDB API (strictly admin-created products)
  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setProducts(Array.isArray(data) ? data : []);
          }
        } else {
          if (isMounted) setProducts([]);
        }
      } catch (e) {
        console.warn('Could not fetch from /api/products:', e);
        if (isMounted) setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamically compute category tabs to include any categories added by admin
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
      const itemCat = p.category || 'coffee';
      const matchesCategory = selectedCategory === 'all' || itemCat === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.tagline && p.tagline.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.flavorNotes && p.flavorNotes.some((n) => n.toLowerCase().includes(q))) ||
        (p.origin && p.origin.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

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
                  ROVIL verified Kenyan coffees, specialty teas, cafe supplies, and export lots.
                </p>
              </div>

              {/* Right Controls: Currency Switcher */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
                  <span className="text-xs font-semibold text-stone-500 pl-2 pr-1">Currency:</span>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      currency === 'USD'
                        ? 'bg-[#23150c] text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => setCurrency('KES')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
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
              {/* Category Pills */}
              <div className="relative">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none pr-8 lg:pr-0">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-[#23150c] text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Box */}
              <div className="relative w-full lg:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  className="w-full pl-8 pr-4 py-1.5 rounded-lg border border-stone-300 text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#3e2211] bg-white"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-stone-400 hover:text-stone-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results count indicator */}
          <div className="py-3 flex items-center justify-between text-xs text-stone-500">
            <span>
              {loading ? (
                'Loading catalog...'
              ) : (
                <>
                  Showing <strong className="text-stone-800">{filteredProducts.length}</strong> items
                  {selectedCategory !== 'all' && (
                    <> in <span className="text-stone-800 font-semibold">{categories.find((c) => c.id === selectedCategory)?.label}</span></>
                  )}
                </>
              )}
            </span>
            <span className="hidden sm:inline text-stone-400">
              Verified lots direct from Kenya farmers and licensed exporters
            </span>
          </div>

          {/* Grid display: Loading skeleton, products, or empty state */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-stone-50 border border-stone-200 rounded-xl p-5 animate-pulse">
                  <div className="w-full h-56 bg-stone-200 rounded-lg mb-4" />
                  <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-stone-200 rounded w-1/2 mb-4" />
                  <div className="h-8 bg-stone-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key={selectedCategory + searchQuery}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2"
                >
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
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
              ) : products.length === 0 ? (
                <motion.div
                  key="no-products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center bg-stone-50 rounded-xl border border-stone-200 my-4"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900">No products in catalog yet</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    Products published by the administrator will appear here automatically.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="no-match"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center bg-stone-50 rounded-xl border border-stone-200 my-4"
                >
                  <h3 className="text-base font-bold text-stone-900">No matching products found</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    Try adjusting your search query or clearing selected filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-[#23150c] text-white text-xs font-semibold hover:bg-[#3e2211] transition-colors"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>

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
