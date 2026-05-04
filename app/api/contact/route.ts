import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
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

    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          service: service?.trim() || null,
          message: message?.trim() || null,
        }
      ])

    if (error) {
      console.error('Supabase insert error (contact):', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Contact API Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
