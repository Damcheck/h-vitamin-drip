# Supabase Setup — Run this SQL in your Supabase SQL Editor

# Go to: https://supabase.com → Your Project → SQL Editor → New Query → Paste & Run

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  price BIGINT NOT NULL,
  original_price BIGINT,
  category TEXT NOT NULL CHECK (category IN ('iv-drip','booster','injection','therapy')),
  duration TEXT NOT NULL,
  image_url TEXT NOT NULL DEFAULT '/images/products/serum-bottles-1.png',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  key_ingredients TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  who_is_it_for TEXT,
  disclaimer TEXT DEFAULT 'Individual results may vary. Always consult with a healthcare professional before starting any new treatment.',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  treatment_id UUID REFERENCES products(id),
  treatment_name TEXT NOT NULL,
  price BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  booking_date DATE,
  booking_time TEXT,
  location TEXT,
  channel TEXT NOT NULL DEFAULT 'website' CHECK (channel IN ('website','whatsapp')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read access for products and site_content
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);

-- Public insert for bookings (customers booking)
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Service role has full access (for admin)
CREATE POLICY "Service full products" ON products USING (auth.role() = 'service_role');
CREATE POLICY "Service full bookings" ON bookings USING (auth.role() = 'service_role');
CREATE POLICY "Service full content" ON site_content USING (auth.role() = 'service_role');

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Auth upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Auth delete images" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');
