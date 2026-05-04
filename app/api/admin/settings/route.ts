import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, validateAuthToken, extractToken } from "@/lib/supabase-server"

async function requireAuth(req: NextRequest) {
  const token = extractToken(req)
  if (!token) return null
  return validateAuthToken(token)
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Failed to fetch site settings:', error)
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }

    return NextResponse.json(data || {})
  } catch (err) {
    console.error('Settings GET API Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await requireAuth(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const updates = await req.json()

    // Since we only have one row, we can just update without a where clause, 
    // or we can select the id first. Better to just update the first row we find, or insert if none.
    
    const { data: existing } = await supabaseAdmin.from('site_settings').select('id').limit(1).single()

    if (existing) {
      const { error } = await supabaseAdmin
        .from('site_settings')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)

      if (error) throw error
    } else {
      const { error } = await supabaseAdmin
        .from('site_settings')
        .insert([{
           ...updates,
           updated_at: new Date().toISOString()
        }])
      
      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Settings PUT API Error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
