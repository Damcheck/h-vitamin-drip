import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types matching our DB schema
export type Product = {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  long_description?: string
  price: number
  original_price?: number
  category: "iv-drip" | "booster" | "injection" | "therapy"
  duration: string
  image_url: string
  featured: boolean
  sort_order?: number
  key_ingredients: string[]
  benefits: string[]
  who_is_it_for?: string
  disclaimer?: string
  created_at?: string
  updated_at?: string
}

export type Booking = {
  id: string
  client_name: string
  email: string
  phone: string
  treatment_id?: string
  treatment_name: string
  price: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  booking_date?: string
  booking_time?: string
  location?: string
  channel: "website" | "whatsapp"
  notes?: string
  created_at?: string
}

export type SiteContent = {
  id: string
  key: string
  value: string
  updated_at?: string
}

// ---- Products ----
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
  if (error) throw error
  return data as Product[]
}

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(4)
  if (error) throw error
  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()
  if (error) throw error
  return data as Product
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("products").insert(product).select().single()
  if (error) throw error
  return data as Product
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const { data, error } = await supabase
    .from("products")
    .update({ ...product, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data as Product
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) throw error
}

// ---- Bookings ----
export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data as Booking[]
}

export async function createBooking(booking: Omit<Booking, "id" | "created_at">) {
  const { data, error } = await supabase.from("bookings").insert(booking).select().single()
  if (error) throw error
  return data as Booking
}

export async function updateBookingStatus(id: string, status: Booking["status"]) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data as Booking
}

// ---- Image Upload ----
export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()
  const fileName = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage.from("product-images").upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  })
  if (error) throw error

  const { data } = supabase.storage.from("product-images").getPublicUrl(fileName)
  return data.publicUrl
}

// ---- Site Content ----
export async function getSiteContent(key: string): Promise<string> {
  const { data } = await supabase.from("site_content").select("value").eq("key", key).single()
  return data?.value ?? ""
}

export async function updateSiteContent(key: string, value: string) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
  if (error) throw error
}
