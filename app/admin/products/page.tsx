"use client"

import { useState, useEffect } from "react"
import type { Treatment } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Pencil, Trash2, Star, ArrowRight, Package, X, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ImageUploader } from "@/components/admin/image-uploader"
import { supabase } from "@/lib/supabase"

const catColor: Record<string, { bg: string; text: string }> = {
  "iv-drip":   { bg: "#132B23/10", text: "#132B23" },
  "booster":   { bg: "#C4A67B/20", text: "#C4A67B" },
  "injection": { bg: "#DBC297/20", text: "#DBC297" },
  "therapy":   { bg: "#606864/10", text: "#606864" },
}

const EMPTY: Partial<Treatment> & { image: string } = {
  name: "", tagline: "", description: "", price: undefined,
  originalPrice: undefined, category: "iv-drip", duration: "",
  image: "", featured: false,
  keyIngredients: [], benefits: [], whoIsItFor: "",
  disclaimer: "Individual results may vary. Always consult with a healthcare professional.",
}

export default function AdminProductsPage() {
  const [products, setProducts]   = useState<Treatment[]>([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState("")
  const [catFilter, setCatFilter] = useState("all")
  const [deleteId, setDeleteId]   = useState<string | null>(null)
  const [panel, setPanel]         = useState<{ open: boolean; edit: Treatment | null }>({ open: false, edit: null })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) {
      // Map database columns back to camelCase for the frontend Treatment interface
      const mapped = data.map(d => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        tagline: d.tagline,
        description: d.description,
        price: Number(d.price),
        originalPrice: d.original_price ? Number(d.original_price) : undefined,
        category: d.category,
        duration: d.duration,
        image: d.image,
        featured: d.featured,
        keyIngredients: d.ingredients || [],
        benefits: d.benefits || [],
        whoIsItFor: d.who_is_it_for || "",
        disclaimer: d.disclaimer || "",
      })) as Treatment[]
      setProducts(mapped)
    } else {
      console.error("Error fetching products:", error)
    }
    setLoading(false)
  }

  const filtered = products.filter((p) => {
    const q = search.toLowerCase()
    return (catFilter === "all" || p.category === catFilter) &&
      (p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q))
  })

  const openAdd  = () => setPanel({ open: true, edit: null })
  const openEdit = (p: Treatment) => setPanel({ open: true, edit: p })
  const closePanel = () => setPanel({ open: false, edit: null })

  const handleSave = async (data: Partial<Treatment>) => {
    const isEdit = !!panel.edit
    const slug = data.slug || (data.name || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-")

    const dbRow = {
      name: data.name,
      slug: slug,
      tagline: data.tagline,
      description: data.description,
      price: data.price,
      original_price: data.originalPrice,
      category: data.category,
      duration: data.duration,
      image: data.image,
      featured: data.featured,
      ingredients: data.keyIngredients,
      benefits: data.benefits,
      who_is_it_for: data.whoIsItFor,
      disclaimer: data.disclaimer
    }

    if (isEdit) {
      const { error } = await supabase.from('products').update(dbRow).eq('id', panel.edit!.id)
      if (!error) {
        setProducts(prev => prev.map(p => p.id === panel.edit!.id ? { ...p, ...data } as Treatment : p))
      }
    } else {
      const { data: newRow, error } = await supabase.from('products').insert([dbRow]).select().single()
      if (!error && newRow) {
        const newP = { ...data, id: newRow.id, slug: newRow.slug } as Treatment
        setProducts(prev => [newP, ...prev])
      }
    }
    closePanel()
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
    setDeleteId(null)
  }

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('products').update({ featured: !currentStatus }).eq('id', id)
    if (!error) {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p))
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-[1200px]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[#132B23] uppercase">Treatments</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mt-1">{products.length} registered</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-gold hover:scale-105 transition-all">
          <Plus className="w-4 h-4" /> Add Treatment
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4A67B]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search treatments…"
            className="w-full pl-11 pr-4 py-3 bg-[#FCFAF7]/60 backdrop-blur-md border border-[#C4A67B]/30 rounded-xl text-sm outline-none focus:border-[#132B23] transition-all text-[#132B23]" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} 
          className="w-full sm:w-auto px-4 py-3 bg-[#FCFAF7]/60 backdrop-blur-md border border-[#C4A67B]/30 rounded-xl text-sm outline-none focus:border-[#132B23] transition-all text-[#132B23] appearance-none cursor-pointer">
          <option value="all">All Categories</option>
          <option value="iv-drip">IV Drips</option>
          <option value="booster">Boosters</option>
          <option value="injection">Injections</option>
          <option value="therapy">Therapy</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-2 border-[#C4A67B] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(p => {
              const cc = catColor[p.category] || catColor["iv-drip"]
              return (
                <motion.div key={p.id} layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FCFAF7]/60 backdrop-blur-md border border-[#C4A67B]/20 rounded-2xl overflow-hidden flex flex-col group hover:shadow-gold hover:border-[#C4A67B]/50 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-[#F4F1E9] overflow-hidden flex items-center justify-center border-b border-[#C4A67B]/20">
                    <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-105">
                      <Image src={p.image || "/placeholder.svg"} alt={p.name} fill className="object-contain drop-shadow-2xl" sizes="200px" />
                    </div>
                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-[#132B23]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                      <button onClick={() => openEdit(p)}
                        className="w-10 h-10 bg-[#DBC297] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Pencil className="w-4 h-4 text-[#132B23]" />
                      </button>
                      <button onClick={() => setDeleteId(p.id)}
                        className="w-10 h-10 bg-[#F4F1E9] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                      <Link href={`/treatment/${p.slug}`} target="_blank"
                        className="w-10 h-10 bg-[#C4A67B] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4 text-[#132B23]" />
                      </Link>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {p.featured && (
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#132B23] text-[#DBC297] shadow-lg">Featured</span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full w-fit" style={{ background: cc.bg, color: cc.text }}>
                      {p.category.replace("-", " ")}
                    </span>
                    <p className="text-sm font-bold leading-snug line-clamp-2 text-[#132B23]">{p.name}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#C4A67B]/20">
                      <span className="text-sm font-serif font-black text-[#132B23]">
                        ₦{p.price.toLocaleString()}
                      </span>
                      <button onClick={() => toggleFeatured(p.id, p.featured || false)}
                        title={p.featured ? "Remove from featured" : "Add to featured"}
                        className={`transition-colors ${p.featured ? "text-[#C4A67B]" : "text-[#606864]/30 hover:text-[#C4A67B]"}`}>
                        <Star className={`w-5 h-5 ${p.featured ? "fill-[#C4A67B]" : ""}`} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Add product tile */}
          <motion.button onClick={openAdd} layout
            className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-[#C4A67B]/40 rounded-2xl hover:border-[#132B23] hover:bg-[#C4A67B]/5 transition-all duration-300 min-h-[250px] group">
            <div className="w-14 h-14 rounded-full bg-[#C4A67B]/20 group-hover:bg-[#132B23] flex items-center justify-center transition-colors">
              <Plus className="w-6 h-6 text-[#132B23] group-hover:text-[#DBC297]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#606864] group-hover:text-[#132B23] transition-colors">Add Treatment</p>
          </motion.button>
        </motion.div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-24 flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#C4A67B]/20 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#132B23]" />
          </div>
          <p className="text-lg font-serif text-[#132B23]">No treatments found</p>
          <p className="text-sm text-[#606864]">Adjust your search or add a new treatment to get started.</p>
        </div>
      )}

      {/* ── DELETE MODAL ── */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#132B23]/40 backdrop-blur-sm z-50"
              onClick={() => setDeleteId(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-[#FCFAF7] border border-[#C4A67B]/30 rounded-[2rem] p-10 max-w-sm w-full shadow-2xl">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Trash2 className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="font-serif text-2xl text-center text-[#132B23] mb-3">Delete Treatment?</h3>
                <p className="text-sm text-[#606864] text-center mb-8">
                  This will permanently remove this treatment from your database and website.
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setDeleteId(null)}
                    className="flex-1 py-4 rounded-full border border-[#C4A67B]/40 text-xs font-bold uppercase tracking-widest text-[#606864] hover:border-[#132B23] hover:text-[#132B23] transition-all">
                    Cancel
                  </button>
                  <button onClick={() => handleDelete(deleteId)}
                    className="flex-1 py-4 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── ADD / EDIT PANEL ── */}
      <AnimatePresence>
        {panel.open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#132B23]/40 backdrop-blur-sm z-50"
              onClick={closePanel} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[540px] bg-[#FCFAF7] shadow-2xl flex flex-col overflow-hidden border-l border-[#C4A67B]/30">
              <ProductForm
                initial={panel.edit}
                onSave={handleSave}
                onClose={closePanel}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── PRODUCT FORM ───────────────────────────────────────── */
function ProductForm({
  initial, onSave, onClose,
}: {
  initial: Treatment | null
  onSave: (data: Partial<Treatment>) => void
  onClose: () => void
}) {
  const [form, setForm] = useState({
    name:           initial?.name ?? "",
    tagline:        initial?.tagline ?? "",
    description:    initial?.description ?? "",
    price:          initial?.price?.toString() ?? "",
    originalPrice:  initial?.originalPrice?.toString() ?? "",
    category:       initial?.category ?? "iv-drip",
    duration:       initial?.duration ?? "",
    featured:       initial?.featured ?? false,
    image:          initial?.image ?? "",
    keyIngredients: initial?.keyIngredients?.join(", ") ?? "",
    benefits:       initial?.benefits?.join(", ") ?? "",
    whoIsItFor:     initial?.whoIsItFor ?? "",
    disclaimer:     initial?.disclaimer ?? "Individual results may vary. Always consult with a healthcare professional.",
  })
  
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      keyIngredients: form.keyIngredients.split(",").map(s => s.trim()).filter(Boolean),
      benefits:       form.benefits.split(",").map(s => s.trim()).filter(Boolean),
    })
  }

  const Field = ({ label, k, type = "text", placeholder = "", multi = false }: { label: string; k: string; type?: string; placeholder?: string; multi?: boolean }) => (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864]">{label}</label>
      {multi
        ? <textarea rows={3} value={(form as Record<string, string>)[k]} onChange={set(k)} placeholder={placeholder}
            className="w-full px-4 py-3 bg-[#F4F1E9] border border-[#C4A67B]/40 rounded-xl text-sm outline-none focus:border-[#132B23] transition-all resize-none text-[#132B23] placeholder:text-[#606864]/50" />
        : <input type={type} value={(form as Record<string, string>)[k]} onChange={set(k)} placeholder={placeholder}
            className="w-full px-4 py-3 bg-[#F4F1E9] border border-[#C4A67B]/40 rounded-xl text-sm outline-none focus:border-[#132B23] transition-all text-[#132B23] placeholder:text-[#606864]/50" />
      }
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full bg-[#FCFAF7]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-[#C4A67B]/20 bg-[#FCFAF7]">
        <h2 className="font-serif text-2xl text-[#132B23]">
          {initial ? "Edit Treatment" : "New Treatment"}
        </h2>
        <button type="button" onClick={onClose}
          className="w-10 h-10 rounded-full bg-[#F4F1E9] flex items-center justify-center hover:bg-[#C4A67B]/20 transition-colors">
          <X className="w-5 h-5 text-[#132B23]" />
        </button>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">

        {/* Image Upload — prominent at top */}
        <ImageUploader
          value={form.image}
          onChange={url => setForm(prev => ({ ...prev, image: url }))}
          label="Treatment Image *"
        />

        <Field label="Treatment Name *" k="name" placeholder="e.g. Energy Drip (Myers Cocktail)" />
        <Field label="Tagline *" k="tagline" placeholder="Short compelling line" />
        <Field label="Description *" k="description" placeholder="Full treatment description…" multi />

        <div className="grid grid-cols-2 gap-5">
          <Field label="Price (₦) *" k="price" type="number" placeholder="170000" />
          <Field label="Original Price (₦)" k="originalPrice" type="number" placeholder="200000" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864]">Category *</label>
            <select value={form.category} onChange={set("category")} 
              className="w-full px-4 py-3 bg-[#F4F1E9] border border-[#C4A67B]/40 rounded-xl text-sm outline-none focus:border-[#132B23] transition-all text-[#132B23] appearance-none cursor-pointer">
              <option value="iv-drip">IV Drip</option>
              <option value="booster">Booster</option>
              <option value="injection">Injection</option>
              <option value="therapy">Therapy</option>
            </select>
          </div>
          <Field label="Duration *" k="duration" placeholder="45–60 minutes" />
        </div>

        <Field label="Key Ingredients (comma-separated)" k="keyIngredients" placeholder="Vitamin C, B12, Magnesium…" />
        <Field label="Benefits (comma-separated)" k="benefits" placeholder="Boosts energy, Reduces fatigue…" />
        <Field label="Who Is It For?" k="whoIsItFor" placeholder="Ideal for people who…" />

        {/* Featured toggle */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-[#F4F1E9] border border-[#C4A67B]/20">
          <div>
            <p className="text-sm font-bold text-[#132B23]">Featured Treatment</p>
            <p className="text-[10px] text-[#606864] uppercase tracking-widest font-bold mt-1">Show in Curated Collection</p>
          </div>
          <button type="button" onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))}
            className="w-12 h-6 rounded-full relative transition-colors duration-300"
            style={{ background: form.featured ? "#132B23" : "#C4A67B/30" }}>
            <div className="w-4 h-4 rounded-full bg-[#FCFAF7] absolute top-1 transition-all duration-300 shadow-md" 
              style={{ left: form.featured ? "28px" : "4px" }} />
          </button>
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-8 py-6 border-t border-[#C4A67B]/20 flex gap-4 bg-[#FCFAF7]">
        <button type="button" onClick={onClose}
          className="flex-1 py-4 rounded-full border border-[#C4A67B]/40 text-xs font-bold uppercase tracking-widest text-[#606864] hover:border-[#132B23] hover:text-[#132B23] transition-all">
          Cancel
        </button>
        <button type="submit"
          className="flex-1 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-gold">
          <CheckCircle2 className="w-4 h-4" />
          {initial ? "Save Changes" : "Create Treatment"}
        </button>
      </div>
    </form>
  )
}
