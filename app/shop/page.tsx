"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { treatments } from "@/lib/products"
import { useCart } from "@/components/boty/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import type { Treatment } from "@/lib/products"

const productImages: Record<string, string> = {
  "energy-drip": "/images/products/serum-bottles-1.png",
  "glutathione-detox": "/images/products/amber-dropper-bottles.png",
  "high-dose-vitamin-c": "/images/products/spray-bottles.png",
  "nad-therapy": "/images/products/eye-serum-bottles.png",
  "skin-hair-drip": "/images/products/pump-bottles-cream.png",
  "immunity-booster": "/images/products/jars-wooden-lid.png",
  "detox-therapy": "/images/products/tube-bottles.png",
  "hydration-drip": "/images/products/spray-bottles.png",
  "anti-ageing-therapy": "/images/products/pump-bottles-lavender.png",
  "fitness-drip": "/images/products/serum-bottles-1.png",
  "alpha-lipoic-acid": "/images/products/amber-dropper-bottles.png",
  "multivitamin-drip": "/images/products/cream-jars-colored.png",
  "healthy-hair-drip": "/images/products/pump-bottles-lavender.png",
  "iron-drip": "/images/products/tube-bottles.png",
  "vitamin-b12-booster": "/images/products/eye-serum-bottles.png",
  "biotin-b7-booster": "/images/products/pump-bottles-cream.png",
  "vitamin-d3-booster": "/images/products/amber-dropper-bottles.png",
  "magnesium-injection": "/images/products/jars-wooden-lid.png",
  "b-cocktail": "/images/products/spray-bottles.png",
  "vitamin-d-injection": "/images/products/eye-serum-bottles.png",
  "hay-fever-injection": "/images/products/pump-bottles-lavender.png",
}

const cardBg = [
  "bg-[#F0F4EC]", "bg-[#EEF0F4]", "bg-[#F4EEF0]", "bg-[#F4F0EE]",
  "bg-[#F0EBF8]", "bg-[#EBF4F0]", "bg-[#F8F0EB]", "bg-[#EBF0F8]",
]

const categoryFilters = [
  { key: "all", label: "All Treatments" },
  { key: "iv-drip", label: "IV Drips" },
  { key: "booster", label: "Boosters" },
  { key: "injection", label: "Injections" },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const { addItem } = useCart()

  const filtered =
    selectedCategory === "all" ? treatments : treatments.filter((t) => t.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Hero */}
      <div className="pt-[88px] bg-background border-b border-border/30">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-3">
              Our Treatments
            </p>
            <h1 className="text-[48px] md:text-[64px] font-bold text-foreground leading-tight">
              Shop
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-14">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Desktop Filters */}
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? "bg-foreground text-white"
                    : "bg-white border border-border/40 text-foreground/60 hover:text-foreground hover:border-border"
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
            className="sm:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/40 text-[13px] font-semibold text-foreground/70"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>

          <span className="text-[13px] text-muted-foreground shrink-0">
            {filtered.length} {filtered.length === 1 ? "treatment" : "treatments"}
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
                className="fixed inset-0 bg-foreground/40 z-50"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[18px] font-bold">Filter</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {categoryFilters.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => { setSelectedCategory(cat.key); setShowFilters(false) }}
                    className={`w-full px-5 py-3.5 rounded-xl text-left text-[14px] font-semibold transition-all ${
                      selectedCategory === cat.key
                        ? "bg-foreground text-white"
                        : "bg-muted text-foreground/70 hover:text-foreground"
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
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((treatment, i) => (
              <ShopCard
                key={treatment.id}
                treatment={treatment}
                color={cardBg[i % cardBg.length]}
                onAddToCart={() =>
                  addItem({
                    id: treatment.id,
                    name: treatment.name,
                    price: treatment.price,
                    image: productImages[treatment.id] || treatment.image,
                  })
                }
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}

function ShopCard({
  treatment,
  color,
  onAddToCart,
}: {
  treatment: Treatment
  color: string
  onAddToCart: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const img = productImages[treatment.id] || treatment.image

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col rounded-[24px] overflow-hidden bg-white border border-border/30 hover:border-border/60 transition-all duration-300"
    >
      {/* Image */}
      <div className={`relative ${color} aspect-square overflow-hidden flex items-center justify-center`}>
        {treatment.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-full">
              Best seller
            </span>
          </div>
        )}
        {treatment.originalPrice && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-foreground text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              Save ₦{(treatment.originalPrice - treatment.price).toLocaleString()}
            </span>
          </div>
        )}
        <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-105">
          <Image src={img} alt={treatment.name} fill className="object-contain" sizes="(max-width:768px) 50vw, 25vw" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-3"
        >
          <button
            onClick={onAddToCart}
            className="w-full bg-foreground text-white text-[13px] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/80 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Book now
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[12px] text-muted-foreground mb-1.5">{treatment.duration}</p>
        <Link href={`/treatment/${treatment.slug}`}>
          <h3 className="text-[14px] font-bold text-foreground mb-3 line-clamp-2 hover:underline underline-offset-2 leading-tight">
            {treatment.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-[16px] font-bold text-foreground">₦{treatment.price.toLocaleString()}</span>
            {treatment.originalPrice && (
              <span className="text-[12px] text-muted-foreground line-through">₦{treatment.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={onAddToCart}
            className="w-8 h-8 bg-foreground text-white rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
