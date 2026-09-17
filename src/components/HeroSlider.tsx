'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  href: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  // 1. Signature Hero Pack (Starts with this image as explicitly requested)
  {
    id: 'hero-advert',
    src: '/images/branded/rovil-hero-advert.jpg',
    alt: 'ROVIL Global Kenyan Coffee 125g and Black Orthodox & Purple Tea 150g',
    title: 'ROVIL Signature Export Line',
    category: 'Packaged Reserves',
    href: '/products',
  },
  // 2. Branded Products & Showcases
  {
    id: 'coffee-showcase',
    src: '/images/branded/rovil-coffee-showcase.jpg',
    alt: 'ROVIL Kenyan Arabica Coffee Beans and Packaged Roast',
    title: 'Mount Kenya Arabica Roast',
    category: 'Signature Coffee',
    href: '/products',
  },
  {
    id: 'tea-showcase',
    src: '/images/branded/rovil-tea-showcase.jpg',
    alt: 'ROVIL Black Orthodox and Royal Purple Tea Selection',
    title: 'Black Orthodox & Purple Tea',
    category: 'Specialty Tea',
    href: '/products',
  },
  {
    id: 'greentea-showcase',
    src: '/images/branded/rovil-greentea-showcase.jpg',
    alt: 'ROVIL Highland Pure Green Tea Pouch and Brew',
    title: 'Highland Pure Green Tea',
    category: 'Emerald Harvest',
    href: '/products',
  },
  {
    id: 'nuts-showcase',
    src: '/images/branded/rovil-nuts-showcase.jpg',
    alt: 'ROVIL Gourmet Roasted Mixed Macadamia and Cashew Nuts',
    title: 'Gourmet Roasted Mixed Nuts',
    category: 'Value-Added Agro',
    href: '/products',
  },
  {
    id: 'coffee-pouch',
    src: '/images/branded/rovil-coffee-pouch.jpg',
    alt: '250g Whole Bean Valve Pouch',
    title: '250g Whole Bean Valve Pouch',
    category: 'Degassing Pouch',
    href: '/products',
  },
  {
    id: 'tea-canister',
    src: '/images/branded/rovil-tea-canister.jpg',
    alt: 'ROVIL Luxury Embossed Loose Leaf Tea Canister',
    title: 'Luxury Loose-Leaf Canister',
    category: 'Luxury Canister',
    href: '/products',
  },
  {
    id: 'retail-cups',
    src: '/images/branded/rovil-retail-cups.jpg',
    alt: 'ROVIL Artisan Cafe and Retail Cups',
    title: 'Artisan Cafe & Retail Collection',
    category: 'Hospitality Range',
    href: '/products',
  },
  {
    id: 'bulk-coffee',
    src: '/images/branded/rovil-bulk-coffee.jpg',
    alt: 'Kenyan Green Arabica 60kg Burlap Export Bags in Warehouse',
    title: 'Commercial Bulk Green Arabica',
    category: 'FOB Bulk Export',
    href: '/what-we-do',
  },

  // 3. Mount Kenya Farm & Harvest Origin
  {
    id: 'farm-hero',
    src: '/images/our-farm/kenya-coffee-farm-hero.jpg',
    alt: 'Mount Kenya Highland Arabica Coffee Plantation',
    title: 'Mount Kenya Highland Terroir',
    category: 'Origin & Terroir',
    href: '/our-farm',
  },
  {
    id: 'ripe-cherries',
    src: '/images/our-farm/ripe-coffee-cherries.jpg',
    alt: 'Selective Hand-Picked Ripe Coffee Cherries',
    title: 'Selective Hand-Plucking',
    category: 'Farm Harvest',
    href: '/our-farm',
  },
  {
    id: 'drying-parchment',
    src: '/images/our-farm/drying-parchment-coffee.jpg',
    alt: 'African Raised Sun-Drying Beds for Coffee Parchment',
    title: 'African Raised Drying Beds',
    category: 'Natural Curing',
    href: '/our-farm',
  },
  {
    id: 'tea-two-leaves',
    src: '/images/our-farm/tea-two-leaves-bud.jpg',
    alt: 'Hand Plucking Two Leaves and a Bud in Highland Tea Estate',
    title: 'Two Leaves & A Bud Pluck',
    category: 'Artisan Tea Harvest',
    href: '/our-farm',
  },
  {
    id: 'purple-tea-macro',
    src: '/images/our-farm/purple-tea-crop-macro.jpg',
    alt: 'Macro View of Rare TRFK 306 Purple Tea Plant',
    title: 'Rare TRFK 306 Purple Tea',
    category: 'Rare Cultivar',
    href: '/our-farm',
  },

  // 4. Quality Control & Processing
  {
    id: 'green-grading',
    src: '/images/what-we-do/green-coffee-grading.jpg',
    alt: 'Screen Grading and Sorting of Raw Green Coffee Beans',
    title: 'Precision Screen Grading',
    category: 'Milling & Sorting',
    href: '/what-we-do',
  },
  {
    id: 'cupping-lab',
    src: '/images/what-we-do/cupping-lab-qc.jpg',
    alt: 'Certified Cupping Laboratory Sensory Quality Control',
    title: 'Certified Cupping Lab (SCA 85+)',
    category: 'Quality Control',
    href: '/what-we-do',
  },
  {
    id: 'grainpro-bags',
    src: '/images/what-we-do/grainpro-export-bags.jpg',
    alt: 'Hermetic Multi-Layer GrainPro Green Coffee Export Liners',
    title: 'Hermetic GrainPro Packaging',
    category: 'Ocean Protection',
    href: '/what-we-do',
  },
];

const AUTO_SLIDE_INTERVAL = 2000; // Exactly 2 seconds

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const total = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // 2-second auto-sliding interval
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [nextSlide]);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      role="region"
      aria-label="ROVIL Product & Origin Showcase"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-stone-900/10 select-none bg-transparent"
    >
      {/* Sliding Carousel Track */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-full h-full shrink-0 overflow-hidden"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              unoptimized
              className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Subtle Minimal Caption Overlay at Bottom (Clean & Non-Intrusive) */}
      <div className="absolute inset-x-0 bottom-0 pt-12 pb-3 px-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none flex items-end justify-between gap-3">
        <Link
          href={currentSlide.href}
          className="pointer-events-auto text-left hover:opacity-90 transition-opacity"
        >
          <span className="inline-block text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#e8cbb0] drop-shadow-xs">
            {currentSlide.category}
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white leading-tight drop-shadow-sm">
            {currentSlide.title}
          </h3>
        </Link>

        {/* Minimal Subtle Navigation Arrows (Appear on hover or touch) */}
        <div className="pointer-events-auto flex items-center gap-1.5 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            aria-label="Previous slide"
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all active:scale-95 focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            aria-label="Next slide"
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all active:scale-95 focus:outline-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Minimal Ultra-Thin Progress Line at the very bottom */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-white/20 pointer-events-none">
        <div
          key={currentIndex}
          className="h-full bg-[#d8a87b] animate-[progress_2s_linear]"
          style={{
            animation: 'heroProgress 2s linear forwards',
          }}
        />
      </div>

      {/* CSS Keyframe for the 2-second progress bar */}
      <style jsx>{`
        @keyframes heroProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
