"use client"

import { useState } from "react"
import { treatments as defaultTreatments } from "@/lib/products"
import type { Treatment } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, Pencil, Trash2, Star, ArrowRight, Package, X, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ImageUploader } from "@/components/admin/image-uploader"

const catColor: Record<string, { bg: string; text: string }> = {
  "iv-drip":   { bg: "#EFF6FF", text: "#2563eb" },
  "booster":   { bg: "#F5F3FF", text: "#7c3aed" },
  "injection": { bg: "#FFF7ED", text: "#ea580c" },
  "therapy":   { bg: "#F0FDF4", text: "#16a34a" },
}

const EMPTY: Partial<Treatment> & { image: string } = {
  name: "", tagline: "", description: "", price: undefined,
  originalPrice: undefined, category: "iv-drip", duration: "",
  image: "", featured: false,
  keyIngredients: [], benefits: [], whoIsItFor: "",
  disclaimer: "Individual results may vary. Always consult with a healthcare professional.",
}

export default function AdminProductsPage() {
  const [products, setProducts]   = useState<Treatment[]>(defaultTreatments)
  const [search, setSearch]       = useState("")
  const [catFilter, setCatFilter] = useState("all")
  const [deleteId, setDeleteId]   = useState<string | null>(null)
  const [panel, setPanel]         = useState<{ open: boolean; edit: Treatment | null }>({ open: false, edit: null })

  const filtered = products.filter((p) => {
    const q = search.toLowerCase()
    return (catFilter === "all" || p.category === catFilter) &&
      (p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q))
  })

  const openAdd  = () => setPanel({ open: true, edit: null })
  const openEdit = (p: Treatment) => setPanel({ open: true, edit: p })
  const closePanel = () => setPanel({ open: false, edit: null })

  const handleSave = (data: Partial<Treatment>) => {
    if (panel.edit) {
      setProducts(prev => prev.map(p => p.id === panel.edit!.id ? { ...p, ...data } : p))
    } else {
      const newP: Treatment = {
        ...EMPTY, ...data,
        id: Date.now().toString(),
        slug: (data.name || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        keyIngredients: data.keyIngredients ?? [],
        benefits: data.benefits ?? [],
      } as Treatment
      setProducts(prev => [newP, ...prev])
    }
    closePanel()
  }

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleteId(null)
  }

  const toggleFeatured = (id: string) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p))

  return (
    <div className="flex flex-col gap-6 max-w-[1200px]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[26px] font-black tracking-tight" style={{ color: "#043222" }}>Products</h1>
          <p className="text-[13px] text-[#6B7A65] mt-0.5">{products.length} treatments</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold text-white shadow-sm hover:opacity-90 transition-all"
          style={{ background: "#043222" }}>
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A65]" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search treatments…"
            className="admin-input pl-11" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="admin-input w-auto">
          <option value="all">All Categories</option>
          <option value="iv-drip">IV Drips</option>
          <option value="booster">Boosters</option>
          <option value="injection">Injections</option>
          <option value="therapy">Therapy</option>
        </select>
      </div>

      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map(p => {
            const cc = catColor[p.category] || catColor["iv-drip"]
            return (
              <motion.div key={p.id} layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="admin-card overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-square bg-[#F0F4EC] overflow-hidden flex items-center justify-center">
                  <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-105">
                    <Image src={p.image} alt={p.name} fill className="object-contain" sizes="200px" />
                  </div>
                  {/* Hover actions */}
                  <div className="absolute inset-0 bg-[#043222]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                    <button onClick={() => openEdit(p)}
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Pencil className="w-4 h-4 text-[#043222]" />
                    </button>
                    <button onClick={() => setDeleteId(p.id)}
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                    <Link href={`/treatment/${p.slug}`} target="_blank"
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4 text-[#043222]" />
                    </Link>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    {p.featured && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: "#BFF74C", color: "#043222" }}>★ Featured</span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3.5 flex flex-col gap-2 flex-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full w-fit capitalize" style={cc}>
                    {p.category.replace("-", " ")}
                  </span>
                  <p className="text-[13px] font-bold leading-snug line-clamp-2" style={{ color: "#043222" }}>{p.name}</p>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#E2E8DF]/60">
                    <span className="text-[14px] font-black" style={{ color: "#043222" }}>
                      ₦{p.price.toLocaleString()}
                    </span>
                    <button onClick={() => toggleFeatured(p.id)}
                      title={p.featured ? "Remove from featured" : "Add to featured"}
                      className={`transition-colors ${p.featured ? "text-yellow-500" : "text-[#C8D5C4] hover:text-yellow-400"}`}>
                      <Star className={`w-4 h-4 ${p.featured ? "fill-yellow-400" : ""}`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Add product tile */}
        <motion.button onClick={openAdd} layout
          className="admin-card flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-[#C8D5C4] hover:border-[#043222] hover:bg-[#F0F4EC] transition-all duration-300 min-h-[200px] group">
          <div className="w-12 h-12 rounded-full bg-[#E8F0EC] group-hover:bg-[#BFF74C] flex items-center justify-center transition-colors">
            <Plus className="w-6 h-6 text-[#043222]" />
          </div>
          <p className="text-[13px] font-bold text-[#6B7A65] group-hover:text-[#043222] transition-colors">Add Product</p>
        </motion.button>
      </motion.div>

      {filtered.length === 0 && (
        <div className="py-20 flex flex-col items-center gap-3 text-center">
          <Package className="w-12 h-12 text-[#C8D5C4]" />
          <p className="text-[15px] font-bold text-[#6B7A65]">No products found</p>
          <p className="text-[13px] text-[#9CA3AF]">Try a different search or category</p>
        </div>
      )}

      {/* ── DELETE MODAL ── */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setDeleteId(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl">
                <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-5 mx-auto">
                  <Trash2 className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-[20px] font-bold text-center text-[#043222] mb-2">Delete product?</h3>
                <p className="text-[14px] text-[#6B7A65] text-center mb-7">
                  This will permanently remove this product from your website.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)}
                    className="flex-1 py-3.5 rounded-full border-2 border-[#E2E8DF] text-[14px] font-semibold text-[#6B7A65] hover:border-[#043222] hover:text-[#043222] transition-all">
                    Cancel
                  </button>
                  <button onClick={() => handleDelete(deleteId)}
                    className="flex-1 py-3.5 rounded-full bg-red-500 text-white text-[14px] font-bold hover:bg-red-600 transition-colors">
                    Yes, delete
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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={closePanel} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[540px] bg-white shadow-2xl flex flex-col overflow-hidden">
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
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B7A65]">{label}</label>
      {multi
        ? <textarea rows={3} value={(form as Record<string, string>)[k]} onChange={set(k)} placeholder={placeholder}
            className="admin-input resize-none" />
        : <input type={type} value={(form as Record<string, string>)[k]} onChange={set(k)} placeholder={placeholder}
            className="admin-input" />
      }
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8DF]">
        <h2 className="text-[18px] font-bold" style={{ color: "#043222" }}>
          {initial ? "Edit Product" : "Add New Product"}
        </h2>
        <button type="button" onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#F5F7F4] flex items-center justify-center hover:bg-[#E2E8DF] transition-colors">
          <X className="w-4 h-4 text-[#043222]" />
        </button>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

        {/* Image Upload — prominent at top */}
        <ImageUploader
          value={form.image}
          onChange={url => setForm(prev => ({ ...prev, image: url }))}
          label="Product Image *"
        />

        <Field label="Product Name *" k="name" placeholder="e.g. Energy Drip (Myers Cocktail)" />
        <Field label="Tagline *" k="tagline" placeholder="Short compelling line" />
        <Field label="Description *" k="description" placeholder="Full product description…" multi />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (₦) *" k="price" type="number" placeholder="170000" />
          <Field label="Original Price (₦)" k="originalPrice" type="number" placeholder="200000" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B7A65]">Category *</label>
            <select value={form.category} onChange={set("category")} className="admin-input">
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
        <div className="flex items-center justify-between p-4 rounded-[14px]" style={{ background: "#F5F7F4" }}>
          <div>
            <p className="text-[14px] font-bold text-[#043222]">Featured Product</p>
            <p className="text-[12px] text-[#6B7A65]">Show in Best Sellers on homepage</p>
          </div>
          <button type="button" onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))}
            className="toggle-track relative"
            style={{ background: form.featured ? "#043222" : "#D1D5DB" }}>
            <div className="toggle-thumb" style={{ left: form.featured ? "22px" : "2px" }} />
          </button>
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-6 py-5 border-t border-[#E2E8DF] flex gap-3">
        <button type="button" onClick={onClose}
          className="flex-1 py-3.5 rounded-full border-2 border-[#E2E8DF] text-[14px] font-semibold text-[#6B7A65] hover:border-[#043222] hover:text-[#043222] transition-all">
          Cancel
        </button>
        <button type="submit"
          className="flex-1 py-3.5 rounded-full text-[14px] font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          style={{ background: "#043222" }}>
          <CheckCircle2 className="w-4 h-4" />
          {initial ? "Save Changes" : "Add Product"}
        </button>
      </div>
    </form>
  )
}
