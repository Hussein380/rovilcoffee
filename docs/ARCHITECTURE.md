# Rovil Coffee & Tea - Frontend Architecture & System Design

## 1. Overview
Rovil Coffee & Tea is a licensed Kenyan coffee and tea export company supplying commercial quantities to international commodity buyers across Europe, the UK, the USA, Asia, Japan, and Africa.

The platform is engineered as a high-performance **Single Page Application (SPA)** using **Next.js (App Router)** and **TypeScript**, designed with an enterprise-grade dark luxury aesthetic and interactive 3D origin visualization.

---

## 2. Design System & Tokens
The design philosophy is **Premium African Global Corporate**:
- **Background Base:** Deep roasted espresso & charcoal (`#0B0907`, `#120E0B`, `#1A1410`).
- **Surface Elevation:** Glassmorphic card surfaces (`rgba(28, 22, 18, 0.75)` with `backdrop-filter: blur(16px)` and subtle warm borders `rgba(212, 163, 115, 0.15)`).
- **Primary Accent:** Kenyan Warm Gold / Amber (`#D4A373`, `#E6BA88`).
- **Secondary Accent:** Highland Botanical Green (`#3D5A45`, `#52795D`).
- **Typography:**
  - Headings: Elegant serif / high-contrast corporate typography (`Playfair Display`, `Cinzel`, or clean `Outfit`).
  - Body / Data: Crisp sans-serif (`Inter` / `Plus Jakarta Sans`) with tabular numerals for screen sizes, container metrics, and pricing formulas.

---

## 3. Directory Structure

```text
src/
├── app/
│   ├── layout.tsx                # Global HTML structure, fonts, meta tags
│   ├── page.tsx                  # Master SPA page assembling all sections seamlessly
│   └── globals.css               # Design tokens, typography, CSS reset, glassmorphism
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Fixed glassmorphism navigation with scroll progress & active anchor spy
│   │   ├── Footer.tsx            # Verified corporate export footer with Nairobi credentials
│   │   └── MobileMenu.tsx        # Responsive slide-over navigation
│   ├── 3d/
│   │   ├── ExportGlobe.tsx       # Three.js Canvas with Kenya origin point & flight path particle arcs
│   │   └── GlobeWrapper.tsx      # Dynamic client loader (ssr: false) with sleek fallback skeleton
│   ├── sections/
│   │   ├── HeroSection.tsx       # Split-screen hero with 3D globe, license badge, and primary CTAs
│   │   ├── CredibilityStrip.tsx  # 4 corporate confidence metrics
│   │   ├── ExportPillars.tsx     # What We Export (Kenyan Arabica vs Kenyan Tea)
│   │   ├── CoffeeGrades.tsx      # Interactive grade viewer (AA, AB, PB, C, MH) with live specs
│   │   ├── TeaPortfolio.tsx      # Interactive tea portfolio (Purple, Orthodox, CTC Black, Loose Leaf)
│   │   ├── FarmJourney.tsx       # 6-step estate-to-port lifecycle (Cultivate → Export)
│   │   ├── QualityLogistics.tsx  # QC lab standards, documentation, and Mombasa port logistics
│   │   ├── GlobalMarkets.tsx     # Destination markets & container transit matrix
│   │   ├── RfqEngine.tsx         # Integrated B2B export quotation calculator & form
│   │   └── ContactDesk.tsx       # Direct export desk, Nairobi HQ address, and phone lines
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       └── SectionHeading.tsx
├── data/                         # Decoupled mock database ready for future admin integration
│   ├── coffeeGrades.ts
│   ├── teaVarieties.ts
│   ├── farmStages.ts
│   ├── exportMarkets.ts
│   └── companyInfo.ts
├── types/                        # Strongly typed domain models
│   ├── coffee.ts
│   ├── tea.ts
│   ├── market.ts
│   └── rfq.ts
└── lib/                          # Utility helpers
    └── utils.ts
```

---

## 4. SPA State Management & Zero-Reload UX
1. **Smooth Scroll & Navigation Spy:**
   - Active section is determined using `IntersectionObserver`.
   - Navbar updates the active link highlight automatically as the buyer scrolls.
2. **Context-Aware Quote Pre-Fill:**
   - When a buyer clicks "Inquire for Grade AA" or "Request Purple Tea Quote", the page smoothly glides to `#rfq-quote` and automatically pre-selects the product and grade in the form.
3. **Optimized 3D Performance:**
   - The Three.js globe only updates animation frames when in the active viewport (detected via IntersectionObserver), minimizing battery/GPU overhead.
