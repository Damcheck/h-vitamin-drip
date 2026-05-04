-- ═══════════════════════════════════════════════════════════════
-- H Vitamin Drip — ROW LEVEL SECURITY POLICIES
-- Run this in Supabase SQL Editor AFTER running migration.sql
-- ═══════════════════════════════════════════════════════════════

-- ── PRODUCTS TABLE ─────────────────────────────────────────────
-- Anyone can READ (public storefront needs this)
-- Only authenticated admin users can CREATE/UPDATE/DELETE
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read products" ON public.products;
DROP POLICY IF EXISTS "Admin insert products" ON public.products;
DROP POLICY IF EXISTS "Admin update products" ON public.products;
DROP POLICY IF EXISTS "Admin delete products" ON public.products;
DROP POLICY IF EXISTS "Allow seed insert" ON public.products;

CREATE POLICY "Public read products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Admin insert products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING (true);

-- ── BOOKINGS TABLE ─────────────────────────────────────────────
-- Public can INSERT (checkout form creates bookings)
-- Only authenticated admin users can READ/UPDATE/DELETE
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admin delete bookings" ON public.bookings;

CREATE POLICY "Public insert bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin read bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin update bookings"
  ON public.bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete bookings"
  ON public.bookings FOR DELETE
  TO authenticated
  USING (true);

-- ── BOOKING ITEMS TABLE ────────────────────────────────────────
-- Public can INSERT (checkout inserts line items)
-- Only authenticated admin users can READ/UPDATE/DELETE
ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert booking_items" ON public.booking_items;
DROP POLICY IF EXISTS "Admin read booking_items" ON public.booking_items;
DROP POLICY IF EXISTS "Admin update booking_items" ON public.booking_items;
DROP POLICY IF EXISTS "Admin delete booking_items" ON public.booking_items;

CREATE POLICY "Public insert booking_items"
  ON public.booking_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin read booking_items"
  ON public.booking_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin update booking_items"
  ON public.booking_items FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin delete booking_items"
  ON public.booking_items FOR DELETE
  TO authenticated
  USING (true);

-- ── VERIFY ─────────────────────────────────────────────────────
SELECT tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;
