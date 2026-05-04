import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const policies = [
  // Enable RLS on all tables
  `ALTER TABLE public.products ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY`,

  // Drop existing policies to avoid conflicts
  `DROP POLICY IF EXISTS "Public read products" ON public.products`,
  `DROP POLICY IF EXISTS "Admin insert products" ON public.products`,
  `DROP POLICY IF EXISTS "Admin update products" ON public.products`,
  `DROP POLICY IF EXISTS "Admin delete products" ON public.products`,
  `DROP POLICY IF EXISTS "Allow seed insert" ON public.products`,

  `DROP POLICY IF EXISTS "Public insert bookings" ON public.bookings`,
  `DROP POLICY IF EXISTS "Admin read bookings" ON public.bookings`,
  `DROP POLICY IF EXISTS "Admin update bookings" ON public.bookings`,
  `DROP POLICY IF EXISTS "Admin delete bookings" ON public.bookings`,

  `DROP POLICY IF EXISTS "Public insert booking_items" ON public.booking_items`,
  `DROP POLICY IF EXISTS "Admin read booking_items" ON public.booking_items`,
  `DROP POLICY IF EXISTS "Admin update booking_items" ON public.booking_items`,
  `DROP POLICY IF EXISTS "Admin delete booking_items" ON public.booking_items`,

  // Products: public read, authenticated write
  `CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true)`,
  `CREATE POLICY "Admin insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (true)`,
  `CREATE POLICY "Admin update products" ON public.products FOR UPDATE TO authenticated USING (true) WITH CHECK (true)`,
  `CREATE POLICY "Admin delete products" ON public.products FOR DELETE TO authenticated USING (true)`,

  // Bookings: public insert, authenticated read/update/delete
  `CREATE POLICY "Public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true)`,
  `CREATE POLICY "Admin read bookings" ON public.bookings FOR SELECT TO authenticated USING (true)`,
  `CREATE POLICY "Admin update bookings" ON public.bookings FOR UPDATE TO authenticated USING (true) WITH CHECK (true)`,
  `CREATE POLICY "Admin delete bookings" ON public.bookings FOR DELETE TO authenticated USING (true)`,

  // Booking items: public insert, authenticated read/update/delete
  `CREATE POLICY "Public insert booking_items" ON public.booking_items FOR INSERT WITH CHECK (true)`,
  `CREATE POLICY "Admin read booking_items" ON public.booking_items FOR SELECT TO authenticated USING (true)`,
  `CREATE POLICY "Admin update booking_items" ON public.booking_items FOR UPDATE TO authenticated USING (true)`,
  `CREATE POLICY "Admin delete booking_items" ON public.booking_items FOR DELETE TO authenticated USING (true)`,
]

async function run() {
  console.log('🔒 Applying RLS policies via Supabase REST API...\n')

  for (const sql of policies) {
    const label = sql.length > 80 ? sql.slice(0, 80) + '…' : sql
    const { error } = await supabase.rpc('exec_sql', { query: sql }).maybeSingle()
    
    if (error) {
      // Try direct REST call to pg
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ query: sql })
      })
      if (!res.ok) {
        console.log(`  ⚠️  ${label}`)
        console.log(`     (Will need to run in SQL Editor)`)
      } else {
        console.log(`  ✅ ${label}`)
      }
    } else {
      console.log(`  ✅ ${label}`)
    }
  }

  console.log('\n✅ RLS setup complete!')
  console.log('\n📋 If any policies showed warnings, please run rls-policies.sql in Supabase SQL Editor.')
}

run()
