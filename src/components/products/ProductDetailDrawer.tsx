'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductItem } from '@/types/product';

interface ProductDetailDrawerProps {
  product: ProductItem | null;
  currency: 'USD' | 'KES';
  onClose: () => void;
  onEdit?: (product: ProductItem) => void;
  isOwnerMode?: boolean;
}

export default function ProductDetailDrawer({
  product,
  currency,
  onClose,
  onEdit,
  isOwnerMode = false,
}: ProductDetailDrawerProps) {
  if (!product) return null;

  const formattedRetailPrice =
    currency === 'USD'
      ? `$${product.priceRetailUSD.toFixed(2)}`
      : `KES ${product.priceRetailKES.toLocaleString()}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#23150c]/80 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog */}
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-stone-200"
          >
            {/* Top Image Banner */}
            <div className="relative h-72 w-full bg-[#23150c]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover object-center brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23150c]/95 via-[#23150c]/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#23150c]/80 hover:bg-[#23150c] text-white backdrop-blur-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Floating Header Badges */}
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md mb-2 border border-white/20">
                    {product.categoryLabel}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-sm font-medium text-stone-300 mt-0.5">
                    {product.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
              {/* Pricing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                    Retail Unit Price ({product.unitWeight})
                  </span>
                  <div className="text-3xl font-bold text-[#23150c] mt-1">
                    {formattedRetailPrice}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Single consumer unit packaging
                  </p>
                </div>

                {product.wholesalePriceUSD ? (
                  <div className="border-t sm:border-t-0 sm:border-l border-stone-200 pt-3 sm:pt-0 sm:pl-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                      Wholesale B2B / Export
                    </span>
                    <div className="text-2xl font-bold text-stone-900 mt-1">
                      ${product.wholesalePriceUSD.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-stone-500">/ unit</span>
                    </div>
                    <p className="text-xs text-stone-600 font-medium mt-0.5">
                      MOQ: {product.wholesaleMOQ || 'Contact for container rates'}
                    </p>
                  </div>
                ) : (
                  <div className="border-t sm:border-t-0 sm:border-l border-stone-200 pt-3 sm:pt-0 sm:pl-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
                      Custom Inquiries
                    </span>
                    <div className="text-base font-bold text-stone-800 mt-1">
                      Flexible Contract Sizing
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Direct estate distribution
                    </p>
                  </div>
                )}
              </div>

              {/* Description & Origin */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-2">
                  Product Overview & Provenance
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200">
                  <svg className="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Estate Origin: {product.origin}</span>
                </div>
              </div>

              {/* Flavor Profile / Key Attributes */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-2.5">
                  Flavor Profile & Key Notes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavorNotes.map((note, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.specs.map((spec, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-stone-600">
                        {spec.label}
                      </span>
                      <span className="text-xs font-bold text-stone-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {isOwnerMode && onEdit && (
                  <button
                    onClick={() => {
                      onClose();
                      onEdit(product);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <svg className="w-4 h-4 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Edit in Owner Mode
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors"
                >
                  Back to Catalog
                </button>
              </div>

              <a
                href={`/#contact`}
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#3e2211] hover:bg-[#23150c] text-white text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-2 shadow-xs"
              >
                Inquire or Request Order Sample
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
