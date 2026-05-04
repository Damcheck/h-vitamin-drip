import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin, validateAuthToken, extractToken } from "@/lib/supabase-server"

// ═══════════════════════════════════════════════════════════════
// SECURED Admin Products API
// GET: public (read-only, same as frontend)
// POST/PUT/DELETE: require valid Supabase auth token
// ═══════════════════════════════════════════════════════════════

export async function GET() {
  const { data, error } = await supabaseAdmin.from("products").select("*").order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

async function requireAuth(req: NextRequest) {
  const token = extractToken(req)
  if (!token) return null
  return validateAuthToken(token)
}

export async function POST(req: NextRequest) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  // Sanitize: only allow known fields
  const slug = (body.slug || (body.name || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-")).slice(0, 200)
  const safe = {
    name: String(body.name || "").slice(0, 300),
    slug,
    tagline: String(body.tagline || "").slice(0, 500),
    description: String(body.description || "").slice(0, 5000),
    long_description: String(body.long_description || "").slice(0, 10000),
    price: Math.max(0, Number(body.price) || 0),
    original_price: body.original_price ? Math.max(0, Number(body.original_price)) : null,
    category: ["iv-drip", "booster", "injection", "therapy"].includes(body.category) ? body.category : "iv-drip",
    duration: String(body.duration || "").slice(0, 100),
    image: String(body.image || "").slice(0, 500),
    images: Array.isArray(body.images) ? body.images.slice(0, 5).map((u: unknown) => String(u).slice(0, 500)) : [],
    featured: Boolean(body.featured),
    ingredients: Array.isArray(body.ingredients) ? body.ingredients.slice(0, 20).map((i: unknown) => String(i).slice(0, 200)) : [],
    benefits: Array.isArray(body.benefits) ? body.benefits.slice(0, 20).map((b: unknown) => String(b).slice(0, 200)) : [],
    who_is_it_for: String(body.who_is_it_for || "").slice(0, 2000),
    disclaimer: String(body.disclaimer || "").slice(0, 2000),
  }

  const { data, error } = await supabaseAdmin.from("products").insert([safe]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { id, ...updates } = body
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  // Sanitize updates — only allow known fields
  const safe: Record<string, unknown> = {}
  if (updates.name !== undefined)            safe.name = String(updates.name).slice(0, 300)
  if (updates.tagline !== undefined)         safe.tagline = String(updates.tagline).slice(0, 500)
  if (updates.description !== undefined)     safe.description = String(updates.description).slice(0, 5000)
  if (updates.long_description !== undefined) safe.long_description = String(updates.long_description).slice(0, 10000)
  if (updates.price !== undefined)           safe.price = Math.max(0, Number(updates.price) || 0)
  if (updates.original_price !== undefined)  safe.original_price = updates.original_price ? Math.max(0, Number(updates.original_price)) : null
  if (updates.category !== undefined)        safe.category = ["iv-drip", "booster", "injection", "therapy"].includes(updates.category) ? updates.category : "iv-drip"
  if (updates.duration !== undefined)        safe.duration = String(updates.duration).slice(0, 100)
  if (updates.image !== undefined)           safe.image = String(updates.image).slice(0, 500)
  if (updates.images !== undefined)          safe.images = Array.isArray(updates.images) ? updates.images.slice(0, 5) : []
  if (updates.featured !== undefined)        safe.featured = Boolean(updates.featured)
  if (updates.ingredients !== undefined)     safe.ingredients = Array.isArray(updates.ingredients) ? updates.ingredients.slice(0, 20) : []
  if (updates.benefits !== undefined)        safe.benefits = Array.isArray(updates.benefits) ? updates.benefits.slice(0, 20) : []
  if (updates.who_is_it_for !== undefined)   safe.who_is_it_for = String(updates.who_is_it_for).slice(0, 2000)
  if (updates.disclaimer !== undefined)      safe.disclaimer = String(updates.disclaimer).slice(0, 2000)
  if (updates.slug !== undefined)            safe.slug = String(updates.slug).slice(0, 200)

  const { data, error } = await supabaseAdmin.from("products").update(safe).eq("id", id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const user = await requireAuth(req)
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  const { error } = await supabaseAdmin.from("products").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
