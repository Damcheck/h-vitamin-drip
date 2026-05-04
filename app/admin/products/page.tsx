"use client"

import { useState, useEffect } from "react"
import type { Treatment } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Pencil, Trash2, Star, ArrowRight, Package, X, CheckCircle2, ChevronRight, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { MultiImageUploader } from "@/components/admin/multi-image-uploader"
import { supabase } from "@/lib/supabase"

type DBProduct = Treatment & { images?: string[]; longDescription?: string; whoIsItFor?: string; disclaimer?: string }

const catColor: Record<string, { bg: string; text: string }> = {
  "iv-drip":   { bg: "rgba(19,43,35,0.08)", text: "#132B23" },
  "booster":   { bg: "rgba(196,166,123,0.15)", text: "#8B6F3E" },
  "injection": { bg: "rgba(219,194,151,0.2)", text: "#7A6030" },
  "therapy":   { bg: "rgba(96,104,100,0.1)", text: "#606864" },
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<DBProduct[]>([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState("")
  const [catFilter, setCatFilter] = useState("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false })
    if (data) {
      setProducts(data.map(d => ({
        id: d.id, name: d.name, slug: d.slug, tagline: d.tagline,
        description: d.description, longDescription: d.long_description || "",
        price: Number(d.price), originalPrice: d.original_price ? Number(d.original_price) : undefined,
        category: d.category, duration: d.duration, image: d.image,
        images: d.images || [d.image].filter(Boolean),
        featured: d.featured,
        keyIngredients: d.ingredients || [], benefits: d.benefits || [],
        whoIsItFor: d.who_is_it_for || "", disclaimer: d.disclaimer || "",
      })) as DBProduct[])
    }
    setLoading(false)
  }

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    return (catFilter === "all" || p.category === catFilter) &&
      (p.name.toLowerCase().includes(q) || (p.tagline || "").toLowerCase().includes(q))
  })



  const handleDelete = async (id: string) => {
    await supabase.from("products").delete().eq("id", id)
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleteId(null)
  }

  const toggleFeatured = async (id: string, cur: boolean) => {
    await supabase.from("products").update({ featured: !cur }).eq("id", id)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p))
  }

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] text-[#EBE7DF]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-white uppercase tracking-wider">Treatments</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1">{products.length} registered in database</p>
        </div>
        <Link href="/admin/products/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-[0_0_20px_rgba(219,194,151,0.2)] hover:scale-105 transition-all">
          <Plus className="w-4 h-4" /> Add Treatment
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DBC297]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search treatments…"
            className="w-full pl-11 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm outline-none focus:border-[#DBC297] transition-all text-white placeholder:text-white/40" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-3 bg-[#1a382e] border border-white/10 rounded-2xl text-sm outline-none focus:border-[#DBC297] transition-all text-white appearance-none cursor-pointer">
          <option value="all">All Categories</option>
          <option value="iv-drip">IV Drips</option>
          <option value="booster">Boosters</option>
          <option value="injection">Injections</option>
          <option value="therapy">Therapy</option>
        </select>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 text-[#C4A67B] animate-spin" />
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => {
              const cc = catColor[p.category] || catColor["iv-drip"]
              const mainImg = (p.images && p.images.length > 0) ? p.images[0] : (p.image || "/placeholder.svg")
              return (
                <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:shadow-[0_0_20px_rgba(219,194,151,0.15)] hover:border-[#DBC297]/40 transition-all duration-300">
                  <div className="relative aspect-square bg-gradient-to-b from-white/5 to-transparent overflow-hidden border-b border-white/10 p-4">
                    <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                      <Image src={mainImg} alt={p.name} fill className="object-contain drop-shadow-2xl" sizes="200px" />
                    </div>
                    {/* Image count badge */}
                    {p.images && p.images.length > 1 && (
                      <span className="absolute bottom-2 right-2 text-[9px] font-bold bg-[#DBC297] text-[#132B23] px-2 py-0.5 rounded-full">
                        {p.images.length} photos
                      </span>
                    )}
                    <div className="absolute inset-0 bg-[#132B23]/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                      <Link href={`/admin/products/${p.id}/edit`} className="w-10 h-10 bg-[#DBC297] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Pencil className="w-4 h-4 text-[#132B23]" />
                      </Link>
                      <button onClick={() => setDeleteId(p.id)} className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500/20 hover:border-red-500/50 transition-colors">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                      <Link href={`/treatment/${p.slug}`} target="_blank" className="w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </Link>
                    </div>
                    {p.featured && (
                      <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#DBC297]/10 border border-[#DBC297]/30 text-[#DBC297] shadow-lg">Featured</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full w-fit bg-white/10 text-white/80 border border-white/5">
                      {p.category.replace("-", " ")}
                    </span>
                    <p className="text-sm font-bold leading-snug line-clamp-2 text-white">{p.name}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                      <span className="text-sm font-serif font-black text-white">₦{p.price.toLocaleString()}</span>
                      <button onClick={() => toggleFeatured(p.id, p.featured || false)} className={`transition-colors ${p.featured ? "text-[#DBC297]" : "text-white/20 hover:text-[#DBC297]"}`}>
                        <Star className={`w-5 h-5 ${p.featured ? "fill-[#DBC297]" : ""}`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          <Link href="/admin/products/new"
            className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-white/20 rounded-3xl hover:border-[#DBC297] hover:bg-[#DBC297]/5 transition-all duration-300 min-h-[250px] group">
            <div className="w-14 h-14 rounded-full bg-white/5 group-hover:bg-[#DBC297] flex items-center justify-center transition-colors">
              <Plus className="w-6 h-6 text-white group-hover:text-[#132B23]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 group-hover:text-[#DBC297] transition-colors">Add Treatment</p>
          </Link>
        </motion.div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-24 flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#C4A67B]/20 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#132B23]" />
          </div>
          <p className="text-lg font-serif text-[#132B23]">No treatments found</p>
          <p className="text-sm text-[#606864]">Adjust your search or add a new treatment.</p>
        </div>
      )}

      {/* Delete modal */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50" onClick={() => setDeleteId(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-[#1a382e] border border-white/10 rounded-3xl p-10 max-w-sm w-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Trash2 className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="font-serif text-2xl text-center text-white mb-3">Delete Treatment?</h3>
                <p className="text-sm text-white/60 text-center mb-8">This will permanently remove this treatment from your database and website.</p>
                <div className="flex gap-4">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-4 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white/80 hover:border-white hover:text-white transition-all">Cancel</button>
                  <button onClick={() => handleDelete(deleteId)} className="flex-1 py-4 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg">Delete</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
