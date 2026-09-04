# Rovil Coffee & Tea - Admin API & Management Backend Blueprint

## 1. Scope
This document specifies the future backend data architecture and admin API schema to manage:
- RFQ (Request for Quote) submissions & status pipeline
- Product grades (pricing indicators, availability, harvest year, cupping scores)
- Export shipment milestones & market updates
- License & certification document uploads

---

## 2. Proposed Database Schema (PostgreSQL / Supabase Ready)

### `rfq_submissions`
```sql
CREATE TABLE rfq_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  destination_port TEXT NOT NULL,
  product_category TEXT NOT NULL CHECK (product_category IN ('coffee', 'tea', 'both')),
  coffee_grade TEXT CHECK (coffee_grade IN ('AA', 'AB', 'PB', 'C', 'MH', 'none')),
  tea_variety TEXT CHECK (tea_variety IN ('purple', 'orthodox', 'black_ctc', 'loose_leaf', 'none')),
  volume_metric_tonnes NUMERIC NOT NULL,
  incoterms TEXT NOT NULL CHECK (incoterms IN ('FOB_MOMBASA', 'CIF', 'CFR', 'EXW')),
  packaging_preference TEXT,
  target_shipping_window TEXT,
  additional_notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'negotiating', 'contract_signed', 'dispatched', 'closed'))
);
```

### `product_catalog`
```sql
CREATE TABLE product_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('coffee', 'tea')),
  code TEXT NOT NULL UNIQUE, -- e.g. 'KEN-AA', 'KEN-PURPLE'
  name TEXT NOT NULL,
  screen_size TEXT,
  cupping_notes TEXT,
  elevation_meters TEXT,
  harvest_season TEXT,
  current_availability_status TEXT DEFAULT 'available_for_contract',
  minimum_order_quantity_mt NUMERIC DEFAULT 1.0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Future Admin API Endpoints
- `POST /api/rfq` - Submit a new RFQ (rate-limited, sends automated email confirmation to buyer + alert to Rovil trade desk).
- `GET /api/admin/rfqs` - Protected route for Rovil team to filter, review, and export quotes.
- `PATCH /api/admin/rfqs/:id` - Update quote status (`new` -> `quoted` -> `contract_signed`).
- `GET /api/products` - Return current live specifications and seasonal stock availability.
