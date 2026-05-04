import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // We can use the anon key here because RLS allows public inserts
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase credentials missing')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Check if email already exists to avoid unique constraint errors bleeding to client
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .single()

    if (existing) {
      // If already subscribed, just return success so we don't leak info or show errors
      return NextResponse.json({ success: true })
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: email.trim().toLowerCase() }])

    if (error) {
      console.error('Supabase insert error (newsletter):', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Newsletter API Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
