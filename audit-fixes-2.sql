-- ═══════════════════════════════════════════════════════════════
-- Phase 2.5: Add missing columns to site_settings
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.site_settings 
  ADD COLUMN IF NOT EXISTS hero_headline text DEFAULT 'Personalized treatments made with Rx ingredients and supplements.',
  ADD COLUMN IF NOT EXISTS hero_cta text DEFAULT 'Shop now',
  ADD COLUMN IF NOT EXISTS announcement_bar text DEFAULT 'Free consultation with every booking · Same-day appointments in Lagos & Abuja',
  ADD COLUMN IF NOT EXISTS best_sellers_title text DEFAULT 'Best seller',
  ADD COLUMN IF NOT EXISTS feature_headline text DEFAULT 'Clarify pores and minimize Imperfections for clearer skin',
  ADD COLUMN IF NOT EXISTS newsletter_headline text DEFAULT 'Subscribe now and get 25% off on your first purchase.',
  ADD COLUMN IF NOT EXISTS newsletter_sub text DEFAULT 'Join thousands of wellness enthusiasts and receive exclusive offers.',
  ADD COLUMN IF NOT EXISTS about_mission text DEFAULT 'Making premium wellness accessible to every Nigerian',
  ADD COLUMN IF NOT EXISTS locations text DEFAULT 'Lagos, Abuja, Port Harcourt',
  ADD COLUMN IF NOT EXISTS hours text DEFAULT 'Mon–Sat: 8am – 8pm',
  ADD COLUMN IF NOT EXISTS facebook_url text DEFAULT 'https://facebook.com/',
  ADD COLUMN IF NOT EXISTS twitter_url text DEFAULT 'https://twitter.com/',
  ADD COLUMN IF NOT EXISTS site_name text DEFAULT 'H Vitamin Drip',
  ADD COLUMN IF NOT EXISTS site_url text DEFAULT 'https://hvitamindrip.co.uk',
  ADD COLUMN IF NOT EXISTS currency text DEFAULT 'NGN',
  ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'Africa/Lagos',
  ADD COLUMN IF NOT EXISTS email_notifications boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS whatsapp_notifications boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS new_booking_alert boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS cancellation_alert boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS notification_email text DEFAULT 'info@hvitamindrip.co.uk',
  ADD COLUMN IF NOT EXISTS notification_phone text DEFAULT '+447495393025';
