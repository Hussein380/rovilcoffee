'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ProductItem } from '@/types/product';

interface ProductCard3DProps {
  product: ProductItem;
  currency: 'USD' | 'KES';
  isOwnerMode: boolean;
  onQuickView: (product: ProductItem) => void;
  onEdit: (product: ProductItem) => void;
}

export default function ProductCard3D({
  product,
  currency,
  isOwnerMode,
  onQuickView,
  onEdit,
}: ProductCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Damped spring physics for realistic luxury inertia
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const formattedRetailPrice =
    currency === 'USD'
      ? `$${product.priceRetailUSD.toFixed(2)}`
      : `KES ${product.priceRetailKES.toLocaleString()}`;

  const isBulk = product.category.startsWith('bulk');

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative flex flex-col justify-between h-full rounded-2xl bg-white border transition-all duration-300 shadow-sm ${
          isHovered
            ? 'shadow-xl border-[#3e2211]/40'
            : 'border-stone-200 hover:border-stone-300'
        } overflow-hidden`}
      >
        {/* Dynamic Glare Reflection Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isHovered ? 0.08 : 0,
            background: `radial-gradient(circle 320px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.8), transparent 70%)`,
          }}
        />

        {/* TOP SECTION: Massive Image Occupying Over 55% of the Card */}
        <div
          className="relative w-full h-72 sm:h-80 bg-stone-900 overflow-hidden"
          style={{ transform: 'translateZ(30px)' }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
          />

          {/* Subtle Top & Bottom Image Gradients for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />

          {/* Floating Badges on Top of Image */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
            <div className="flex flex-wrap gap-1.5 items-center">
              {product.isPopular && (
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#23150c]/90 text-white backdrop-blur-md border border-white/10 shadow-xs">
                  Bestseller
                </span>
              )}
              {product.isNew && (
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-stone-800/90 text-white backdrop-blur-md border border-white/10 shadow-xs">
                  New Season
                </span>
              )}
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/90 text-stone-900 backdrop-blur-md shadow-xs">
                {product.categoryLabel}
              </span>
            </div>

            {/* Owner Quick Edit Trigger */}
            {isOwnerMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(product);
                }}
                title="Edit this product (Owner Mode)"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-stone-900 shadow-sm hover:bg-stone-100 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit
              </button>
            )}
          </div>

          {/* Bottom Stamp in Image Area */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-20">
            <div className="px-2.5 py-1 rounded-md bg-[#23150c]/90 text-white text-xs font-medium tracking-wide backdrop-blur-sm border border-white/10">
              {product.unitWeight}
            </div>
            <div className="px-2.5 py-1 rounded-md bg-white/90 text-stone-900 text-xs font-semibold backdrop-blur-sm">
              {product.origin.split('(')[0].trim()}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Content & Details */}
        <div
          className="p-5 flex-1 flex flex-col justify-between"
          style={{ transform: 'translateZ(15px)' }}
        >
          <div>
            {/* Title & Tagline */}
            <h3 className="text-lg font-bold text-stone-900 leading-snug line-clamp-2">
              {product.name}
            </h3>
            <p className="mt-1 text-xs font-medium text-stone-500">
              {product.tagline}
            </p>

            {/* Description */}
            <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Flavor / Spec Pills */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.flavorNotes.slice(0, 3).map((note, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium border border-stone-200"
                >
                  {note}
                </span>
              ))}
              {product.flavorNotes.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md bg-stone-50 text-stone-500 text-[11px] font-medium border border-stone-200">
                  +{product.flavorNotes.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Pricing & Actions Section */}
          <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
                  {isBulk ? 'Lot Export Price' : 'Retail Price'}
                </span>
                <span className="text-2xl font-bold text-stone-950 tracking-tight">
                  {formattedRetailPrice}
                </span>
              </div>

              {product.wholesalePriceUSD && (
                <div className="text-right">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
                    Wholesale B2B
                  </span>
                  <span className="text-sm font-bold text-stone-800">
                    ${product.wholesalePriceUSD.toFixed(2)}
                    <span className="text-[11px] font-normal text-stone-500"> / unit</span>
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onQuickView(product)}
                className="w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
              >
                <svg className="w-3.5 h-3.5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Specs & Notes
              </button>

              <a
                href={`/#contact`}
                className="w-full py-2.5 px-3 rounded-xl bg-[#3e2211] hover:bg-[#23150c] text-white text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-1 shadow-xs"
              >
                Inquire / Order
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
