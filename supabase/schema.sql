-- =============================================================================
-- ShanghaiExport.com - Supabase PostgreSQL Database Schema
-- =============================================================================

-- 1. Create Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  body_type TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  price_fob_usd NUMERIC NOT NULL,
  range_km INTEGER,
  top_speed_kmh INTEGER,
  acceleration_0_100 TEXT,
  battery_kwh NUMERIC,
  drive_type TEXT,
  seating INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'Available',
  images TEXT[] NOT NULL DEFAULT '{}',
  color_options JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id TEXT,
  vehicle_name TEXT,
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  destination_port TEXT NOT NULL,
  message TEXT,
  shipping_type TEXT DEFAULT 'Ro-Ro',
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Vehicles
-- Anyone can view available vehicles
CREATE POLICY "Public vehicles are viewable by everyone" 
  ON public.vehicles FOR SELECT 
  USING (true);

-- Authenticated or service role can insert/update/delete vehicles
CREATE POLICY "Admin can insert vehicles" 
  ON public.vehicles FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin can update vehicles" 
  ON public.vehicles FOR UPDATE 
  USING (true);

CREATE POLICY "Admin can delete vehicles" 
  ON public.vehicles FOR DELETE 
  USING (true);

-- 5. RLS Policies for Inquiries
-- Public can submit an inquiry
CREATE POLICY "Anyone can submit an inquiry" 
  ON public.inquiries FOR INSERT 
  WITH CHECK (true);

-- Inquiries are readable by everyone / admin
CREATE POLICY "Inquiries viewable by admin" 
  ON public.inquiries FOR SELECT 
  USING (true);

CREATE POLICY "Inquiries updatable by admin" 
  ON public.inquiries FOR UPDATE 
  USING (true);
