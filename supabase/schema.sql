-- =============================================================================
-- ShanghaiExport.com - Complete Supabase PostgreSQL Database Setup & Seed
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
  id TEXT PRIMARY KEY,
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

-- 4. Clean existing policies to prevent duplicate policy errors
DROP POLICY IF EXISTS "Public vehicles are viewable by everyone" ON public.vehicles;
DROP POLICY IF EXISTS "Anyone can insert vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Anyone can update vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Anyone can delete vehicles" ON public.vehicles;

DROP POLICY IF EXISTS "Anyone can submit an inquiry" ON public.inquiries;
DROP POLICY IF EXISTS "Inquiries viewable by admin" ON public.inquiries;
DROP POLICY IF EXISTS "Inquiries updatable by admin" ON public.inquiries;

-- 5. RLS Policies for Vehicles
CREATE POLICY "Public vehicles are viewable by everyone" 
  ON public.vehicles FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can insert vehicles" 
  ON public.vehicles FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update vehicles" 
  ON public.vehicles FOR UPDATE 
  USING (true);

CREATE POLICY "Anyone can delete vehicles" 
  ON public.vehicles FOR DELETE 
  USING (true);

-- 6. RLS Policies for Inquiries
CREATE POLICY "Anyone can submit an inquiry" 
  ON public.inquiries FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Inquiries viewable by admin" 
  ON public.inquiries FOR SELECT 
  USING (true);

CREATE POLICY "Inquiries updatable by admin" 
  ON public.inquiries FOR UPDATE 
  USING (true);

-- 7. Seed Initial Export Vehicles (Stored in Cloudflare R2 Bucket: shanghaiexport)
INSERT INTO public.vehicles (
  id, name, brand, model, year, body_type, fuel_type, price_fob_usd,
  range_km, top_speed_kmh, acceleration_0_100, battery_kwh, drive_type,
  seating, featured, status, images, description
) VALUES
(
  'xiaomi-su7-max',
  'Xiaomi SU7 Max AWD',
  'Xiaomi',
  'SU7',
  2024,
  'Sedan',
  'Pure Electric (BEV)',
  34800,
  800,
  265,
  '2.78s',
  101,
  'AWD',
  5,
  true,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/xiaomi-su7-max.jpg',
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/geely-galaxy-e8.jpg',
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/byd-seal.jpg'
  ],
  'The Xiaomi SU7 Max is an ultra-high performance all-electric flagship sedan featuring an 800V silicon carbide architecture, HyperOS smart cockpit, and 673 horsepower.'
),
(
  'byd-yangwang-u8',
  'BYD Yangwang U8 Premium Edition',
  'BYD',
  'Yangwang U8',
  2025,
  'SUV',
  'Extended Range (EREV)',
  148000,
  1000,
  200,
  '3.6s',
  49.05,
  '4WD',
  5,
  true,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/byd-yangwang-u8.jpg',
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/jetour-t2.jpg'
  ],
  'Million-RMB luxury off-road flagship with e4 quad-motor technology, DiSus-P hydraulic suspension, 360-degree tank turns, and emergency floatation capability.'
),
(
  'zeekr-001-fr',
  'Zeekr 001 Luxury Shooting Brake',
  'Zeekr',
  '001',
  2024,
  'Coupe',
  'Pure Electric (BEV)',
  38500,
  750,
  240,
  '3.3s',
  100,
  'AWD',
  5,
  true,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/zeekr-001.jpg',
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/chery-tiggo-9.jpg'
  ],
  'Built on Geely SEA platform with an 800V high-voltage system, dual motors producing 544 HP, and air suspension with CCD damping.'
),
(
  'li-auto-l9-ultra',
  'Li Auto L9 Ultra Flagship SUV',
  'Li Auto',
  'L9',
  2025,
  'SUV',
  'Extended Range (EREV)',
  59500,
  1412,
  180,
  '5.3s',
  52.3,
  'AWD',
  6,
  true,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/li-auto-l9.jpg',
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/voyah-dreamer.jpg'
  ],
  'The premier full-size family smart SUV from China. Dual 15.7-inch OLED 3K screens, rear entertainment theater, dual wireless charging, and zero-gravity massage seats.'
),
(
  'nio-et7-executive',
  'NIO ET7 Executive All-Electric Sedan',
  'NIO',
  'ET7',
  2024,
  'Sedan',
  'Pure Electric (BEV)',
  56000,
  675,
  200,
  '3.8s',
  100,
  'AWD',
  5,
  false,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/nio-et7.jpg'
  ],
  'Luxury high-end electric business sedan equipped with NIO Autonomous Driving (NAD), LiDAR sensor suite, NOMI intelligent assistant, and 3-minute battery swap compatibility.'
),
(
  'byd-seal-performance',
  'BYD Seal EV Performance AWD',
  'BYD',
  'Seal',
  2024,
  'Sedan',
  'Pure Electric (BEV)',
  26900,
  650,
  180,
  '3.8s',
  82.5,
  'AWD',
  5,
  false,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/byd-seal.jpg'
  ],
  'Award-winning EV sedan powered by BYD ultra-safe Blade Battery and Cell-to-Body (CTB) integration technology with 530 HP dual motors.'
),
(
  'jetour-t2-4wd',
  'Jetour T2 Traveler 4WD Off-Roader',
  'Jetour',
  'T2',
  2024,
  'Off-Road',
  'Petrol',
  23500,
  850,
  180,
  '8.1s',
  NULL,
  '4WD',
  5,
  false,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/jetour-t2.jpg'
  ],
  'Rugged boxy 4WD SUV with BorgWarner 6th-gen intelligent torque management, 2.0TGDI turbocharged engine, and Qualcomm Snapdragon 8155 chip cockpit.'
),
(
  'chery-tiggo-9',
  'Chery Tiggo 9 Flagship 7-Seater',
  'Chery',
  'Tiggo 9',
  2025,
  'SUV',
  'Plug-in Hybrid (PHEV)',
  24800,
  1300,
  205,
  '4.9s',
  34.4,
  'AWD',
  7,
  false,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/chery-tiggo-9.jpg'
  ],
  'Chery flagship luxury 7-seat hybrid SUV featuring CDC electromagnetic suspension, Sony 14-speaker sound system, and zero-gravity passenger lounger.'
),
(
  'geely-galaxy-e8',
  'Geely Galaxy E8 Smart Sedan',
  'Geely',
  'Galaxy E8',
  2024,
  'Sedan',
  'Pure Electric (BEV)',
  24200,
  665,
  210,
  '3.49s',
  76,
  'AWD',
  5,
  false,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/geely-galaxy-e8.jpg'
  ],
  'Worlds lowest drag coefficient of 0.199 Cd, massive 45-inch 8K borderless unibody screen, and SEA architecture engineered with Volvo safety DNA.'
),
(
  'voyah-dreamer-phev',
  'Voyah Dreamer Luxury Executive MPV',
  'Voyah',
  'Dreamer',
  2024,
  'MPV',
  'Plug-in Hybrid (PHEV)',
  52500,
  1231,
  200,
  '5.9s',
  43,
  'AWD',
  7,
  false,
  'Available',
  ARRAY[
    'https://pub-fd2ae53de5ae41b1aee16df0031dc281.r2.dev/vehicles/voyah-dreamer.jpg'
  ],
  'First-class business carrier with airplane-style reclining massage seats, air suspension with magic carpet road preview, and 5-star C-NCAP safety rating.'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  model = EXCLUDED.model,
  year = EXCLUDED.year,
  body_type = EXCLUDED.body_type,
  fuel_type = EXCLUDED.fuel_type,
  price_fob_usd = EXCLUDED.price_fob_usd,
  range_km = EXCLUDED.range_km,
  top_speed_kmh = EXCLUDED.top_speed_kmh,
  acceleration_0_100 = EXCLUDED.acceleration_0_100,
  battery_kwh = EXCLUDED.battery_kwh,
  drive_type = EXCLUDED.drive_type,
  seating = EXCLUDED.seating,
  featured = EXCLUDED.featured,
  status = EXCLUDED.status,
  images = EXCLUDED.images,
  description = EXCLUDED.description;
