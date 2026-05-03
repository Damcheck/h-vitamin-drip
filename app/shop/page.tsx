"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react"
import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIFooter } from "@/components/ai-theme/ai-footer"
import { useCart } from "@/components/boty/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import type { Treatment } from "@/lib/products"
import { supabase } from "@/lib/supabase"

const categoryFilters = [
  { key: "all", label: "The Collection" },
  { key: "iv-drip", label: "Signature Drips" },
  { key: "booster", label: "Elixirs & Boosters" },
  { key: "injection", label: "Targeted Injections" },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    async function loadProducts() {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (data) {
        setTreatments(data.map(d => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          category: d.category,
          tagline: d.tagline,
          description: d.description,
          price: Number(d.price),
          image: d.image,
          duration: d.duration,
          featured: d.featured,
        })) as Treatment[])
      }
      setLoading(false)
    }
    loadProducts()
  }, [])

  const filtered =
    selectedCategory === "all" ? treatments : treatments.filter((t) => t.category === selectedCategory)

  return (
    <main className="min-h-screen bg-[#F4F1E9]">
      <AIHeader />

      {/* Page Hero */}
      <div className="pt-[100px] pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#C4A67B] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">OUR TREATMENTS</p>
            <h1 className="font-serif text-5xl md:text-7xl text-[#132B23] uppercase leading-tight">
              THE SHOP
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16 border-b border-[#C4A67B]/20 pb-8">
          
          {/* Desktop Filters */}
          <div className="hidden sm:flex items-center gap-4 flex-wrap">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                  selectedCategory === cat.key
                    ? "bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-gold"
                    : "bg-transparent border border-[#C4A67B]/30 text-[#132B23] hover:bg-[#FCFAF7]/40 hover:border-[#C4A67B]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile filter toggle */}
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="sm:hidden inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#C4A67B]/40 text-xs font-bold uppercase tracking-widest text-[#132B23]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>

          <span className="text-xs font-bold tracking-widest uppercase text-[#606864]">
            {filtered.length} {filtered.length === 1 ? "Elixir" : "Elixirs"}
          </span>
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[#132B23]/40 backdrop-blur-sm z-50"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed inset-y-0 left-0 w-[300px] bg-[#F4F1E9] z-50 p-6 flex flex-col gap-4 border-r border-[#C4A67B]/20"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl text-[#132B23]">Filters</h2>
                  <button onClick={() => setShowFilters(false)} className="text-[#132B23]">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {categoryFilters.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => { setSelectedCategory(cat.key); setShowFilters(false) }}
                    className={`w-full px-5 py-4 rounded-xl text-left text-xs font-bold uppercase tracking-widest transition-all ${
                      selectedCategory === cat.key
                        ? "bg-[#132B23] text-[#DBC297]"
                        : "bg-transparent text-[#132B23] hover:bg-[#C4A67B]/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-2 border-[#C4A67B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((treatment) => (
                <ShopCard
                  key={treatment.id}
                  treatment={treatment}
                  onAddToCart={() =>
                    addItem({
                      id: treatment.id,
                      name: treatment.name,
                      price: treatment.price,
                      image: treatment.image,
                    })
                  }
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AIFooter />
    </main>
  )
}

function ShopCard({ treatment, onAddToCart }: { treatment: Treatment; onAddToCart: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-[#FCFAF7]/40 backdrop-blur-md rounded-[2rem] p-4 border border-[#C4A67B]/20 transition-all duration-500 hover:shadow-gold hover:border-[#C4A67B]/70 hover:bg-[#FCFAF7]/80 flex flex-col h-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-[#E8E3D9]">
        {treatment.featured && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-[#132B23] text-[#DBC297] text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full">
              Signature
            </span>
          </div>
        )}
        <Link href={`/treatment/${treatment.slug}`}>
          <Image src={treatment.image} alt={treatment.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 w-full p-3 z-20"
        >
          <button
            onClick={(e) => { e.preventDefault(); onAddToCart() }}
            className="w-full bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] text-xs font-bold uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Bag
          </button>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#132B23]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between px-2">
        <div>
          <Link href={`/treatment/${treatment.slug}`}>
            <h3 className="font-serif text-lg text-[#132B23] mb-2 group-hover:text-[#C4A67B] transition-colors">{treatment.name}</h3>
          </Link>
          <p className="text-[#606864] text-[10px] uppercase tracking-widest mb-4">
            {treatment.duration}
          </p>
        </div>
        
        <div className="flex items-center justify-between border-t border-[#132B23]/10 pt-4 mt-auto">
          <span className="font-bold text-[#132B23] text-sm">₦{treatment.price.toLocaleString()}</span>
          <button onClick={(e) => { e.preventDefault(); onAddToCart() }} className="w-8 h-8 rounded-full border border-[#C4A67B] text-[#C4A67B] flex items-center justify-center hover:bg-[#C4A67B] hover:text-[#132B23] transition-all duration-300">
            +
          </button>
        </div>
      </div>
    </motion.div>
  )
}
