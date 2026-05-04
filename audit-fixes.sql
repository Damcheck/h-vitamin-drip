-- ═══════════════════════════════════════════════════════════════
-- Phase 2 Audit Fixes: Schema Additions & RLS Policies
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ── CONTACT SUBMISSIONS TABLE ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text,
  message text,
  status text DEFAULT 'new', -- 'new', 'read', 'replied'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin read contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin update contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admin delete contact_submissions" ON public.contact_submissions;

CREATE POLICY "Public insert contact_submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin read contact_submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin update contact_submissions"
  ON public.contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete contact_submissions"
  ON public.contact_submissions FOR DELETE
  TO authenticated
  USING (true);

-- ── NEWSLETTER SUBSCRIBERS TABLE ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  status text DEFAULT 'active', -- 'active', 'unsubscribed'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin read newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin update newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admin delete newsletter_subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Public insert newsletter_subscribers"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin read newsletter_subscribers"
  ON public.newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin update newsletter_subscribers"
  ON public.newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin delete newsletter_subscribers"
  ON public.newsletter_subscribers FOR DELETE
  TO authenticated
  USING (true);

-- ── SITE SETTINGS TABLE ────────────────────────────────────────
-- This table should ideally contain only ONE row.
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_email text,
  contact_phone text,
  contact_whatsapp text,
  instagram_url text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin insert site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin update site_settings" ON public.site_settings;

CREATE POLICY "Public read site_settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admin insert site_settings"
  ON public.site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin update site_settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Initialize default settings row if table is empty
INSERT INTO public.site_settings (contact_email, contact_phone, contact_whatsapp, instagram_url)
SELECT 'info@hvitamindrip.co.uk', '+447495393025', '+447495393025', 'https://instagram.com/hvitamindrip'
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- ── VERIFY ─────────────────────────────────────────────────────
SELECT tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('contact_submissions', 'newsletter_subscribers', 'site_settings')
ORDER BY tablename, cmd;
