"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, ChevronRight, Loader2, Save } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import type { Treatment } from "@/lib/products"
import { MultiImageUploader } from "@/components/admin/multi-image-uploader"

export type DBProduct = Treatment & {
  images?: string[];
  longDescription?: string;
  whoIsItFor?: string;
  disclaimer?: string;
}

type Tab = "basic" | "media" | "details"

export function ProductEditor({ initial }: { initial: DBProduct | null }) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("basic")
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name:            initial?.name ?? "",
    tagline:         initial?.tagline ?? "",
    description:     initial?.description ?? "",
    longDescription: initial?.longDescription ?? "",
    price:           initial?.price?.toString() ?? "",
    originalPrice:   initial?.originalPrice?.toString() ?? "",
    category:        initial?.category ?? "iv-drip",
    duration:        initial?.duration ?? "",
    featured:        initial?.featured ?? false,
    images:          initial?.images?.length ? initial.images : (initial?.image ? [initial.image] : []),
    keyIngredients:  initial?.keyIngredients?.join(", ") ?? "",
    benefits:        initial?.benefits?.join(", ") ?? "",
    whoIsItFor:      initial?.whoIsItFor ?? "",
    disclaimer:      initial?.disclaimer ?? "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    const slug = (initial?.slug) || (form.name || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-")
    const finalImages = form.images && form.images.length > 0 ? form.images : [""]
    const keyIngredients = form.keyIngredients.split(",").map(s => s.trim()).filter(Boolean)
    const benefits = form.benefits.split(",").map(s => s.trim()).filter(Boolean)
    
    const dbRow = {
      name: form.name, slug, tagline: form.tagline, description: form.description,
      long_description: form.longDescription, price: Number(form.price),
      original_price: form.originalPrice ? Number(form.originalPrice) : null,
      category: form.category, duration: form.duration,
      image: finalImages[0] || "",
      images: finalImages, featured: form.featured,
      ingredients: keyIngredients, benefits,
      who_is_it_for: form.whoIsItFor, disclaimer: form.disclaimer,
    }

    if (initial) {
      await supabase.from("products").update(dbRow).eq("id", initial.id)
    } else {
      await supabase.from("products").insert([dbRow])
    }
    
    setSaving(false)
    router.push("/admin/products")
    router.refresh()
  }

  const Field = ({ label, k, type = "text", placeholder = "", rows = 3, multi = false }: { label: string; k: string; type?: string; placeholder?: string; rows?: number; multi?: boolean }) => (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297]">{label}</label>
      {multi
        ? <textarea rows={rows} value={(form as Record<string, string>)[k]} onChange={set(k)} placeholder={placeholder}
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#DBC297] transition-all resize-none text-white placeholder:text-white/40" />
        : <input type={type} value={(form as Record<string, string>)[k]} onChange={set(k)} placeholder={placeholder}
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#DBC297] transition-all text-white placeholder:text-white/40" />
      }
    </div>
  )

  const tabs: { id: Tab; label: string }[] = [
    { id: "basic",   label: "1. Basic Info" },
    { id: "media",   label: "2. Media & Photos" },
    { id: "details", label: "3. Deep Details" },
  ]

  return (
    <div className="flex flex-col gap-8 max-w-[900px] mx-auto text-[#EBE7DF]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif text-white uppercase tracking-wider">{initial ? "Edit Treatment" : "New Treatment"}</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mt-1">{initial ? form.name : "Create a new product"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Tabs */}
        <div className="flex border-b border-white/10 px-8 bg-white/5">
          {tabs.map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)}
              className={`py-6 px-6 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-all -mb-px
                ${tab === t.id ? "border-[#DBC297] text-[#DBC297]" : "border-transparent text-white/50 hover:text-white"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-8 md:p-12 min-h-[400px]">
            {tab === "basic" && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Field label="Treatment Name *" k="name" placeholder="e.g. Energy Drip (Myers Cocktail)" />
                <Field label="Tagline *" k="tagline" placeholder="Short compelling one-liner (e.g. The ultimate energy boost)" />
                <Field label="Description *" k="description" placeholder="Main product description used on cards…" multi rows={3} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field label="Price (₦) *" k="price" type="number" placeholder="170000" />
                  <Field label="Original Price (₦)" k="originalPrice" type="number" placeholder="200000" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297]">Category *</label>
                    <div className="relative">
                      <select value={form.category} onChange={set("category")}
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#DBC297] transition-all text-white appearance-none cursor-pointer">
                        <option value="iv-drip">IV Drip</option>
                        <option value="booster">Booster</option>
                        <option value="injection">Injection</option>
                        <option value="therapy">Therapy</option>
                      </select>
                      <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                  <Field label="Duration *" k="duration" placeholder="e.g. 45–60 minutes" />
                </div>

                {/* Featured toggle */}
                <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-sm font-bold text-white">Featured Treatment</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-1">Show on homepage curated section</p>
                  </div>
                  <button type="button" onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))}
                    className="w-14 h-8 rounded-full relative transition-colors duration-300 flex-shrink-0"
                    style={{ background: form.featured ? "#DBC297" : "rgba(255,255,255,0.1)" }}>
                    <div className="w-6 h-6 rounded-full bg-[#132B23] absolute top-1 transition-all duration-300 shadow-md"
                      style={{ left: form.featured ? "28px" : "4px" }} />
                  </button>
                </div>

                <div className="flex items-center justify-end mt-4">
                  <button type="button" onClick={() => setTab("media")}
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-[11px] font-bold text-white transition-all uppercase tracking-widest">
                    Next: Add Photos <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {tab === "media" && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-[#DBC297]/10 border border-[#DBC297]/20 rounded-2xl p-6">
                  <p className="text-sm text-[#DBC297] leading-relaxed">
                    📸 Upload up to <strong>5 images</strong>. The <strong>first image</strong> is shown as the main product image. Hover any image to set it as main or remove it.
                  </p>
                </div>
                <MultiImageUploader
                  values={form.images}
                  onChange={urls => setForm(prev => ({ ...prev, images: urls }))}
                  maxImages={5}
                  label=""
                />
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                  <button type="button" onClick={() => setTab("basic")} className="text-[11px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest">
                    ← Back
                  </button>
                  <button type="button" onClick={() => setTab("details")}
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-[11px] font-bold text-white transition-all uppercase tracking-widest">
                    Next: Deep Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {tab === "details" && (
              <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Field label="Long Description" k="longDescription" placeholder="Full in-depth description of the treatment used on the product detail page…" multi rows={6} />
                <Field label="Key Ingredients (comma-separated)" k="keyIngredients" placeholder="Vitamin C, B12, Magnesium…" />
                <Field label="Benefits (comma-separated)" k="benefits" placeholder="Boosts energy, Reduces fatigue…" />
                <Field label="Who Is It For?" k="whoIsItFor" placeholder="Ideal for people who…" multi rows={3} />
                <Field label="Medical Disclaimer" k="disclaimer" placeholder="Individual results may vary…" multi rows={3} />
                
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                  <button type="button" onClick={() => setTab("media")} className="text-[11px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest text-left">
                    ← Back to Photos
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 md:px-12 py-6 bg-white/5 border-t border-white/10 flex justify-end gap-4">
            <Link href="/admin/products"
              className="px-8 py-4 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white/80 hover:border-white hover:text-white transition-all">
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60 bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-[0_0_20px_rgba(219,194,151,0.2)] hover:scale-105 transition-all">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving…" : (initial ? "Save Changes" : "Create Treatment")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
