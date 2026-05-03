"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { useCart } from "./cart-context"
import type { Treatment } from "@/lib/products"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const productImages: Record<string, string> = {
  "energy-drip": "/images/products/serum-bottles-1.png",
  "glutathione-detox": "/images/products/amber-dropper-bottles.png",
  "high-dose-vitamin-c": "/images/products/spray-bottles.png",
  "nad-therapy": "/images/products/eye-serum-bottles.png",
  "skin-hair-drip": "/images/products/pump-bottles-cream.png",
  "vitamin-b12-booster": "/images/products/eye-serum-bottles.png",
}

// Exact card background colors from Healup
const cardBgs = [
  "#F2F4EF", // muted sage
  "#F0EEF4", // muted lavender
  "#F4F0EE", // muted blush
  "#EEF3F0", // muted mint
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function ProductGrid() {
  const { addItem } = useCart()
  const [featured, setFeatured] = useState<Treatment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(4)

      if (data) {
        setFeatured(data.map(d => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          category: d.category,
          tagline: d.tagline,
          description: d.description,
          price: Number(d.price),
          originalPrice: d.original_price ? Number(d.original_price) : undefined,
          image: d.image,
          duration: d.duration,
          featured: d.featured,
        })) as Treatment[])
      }
      setLoading(false)
    }
    fetchFeatured()
  }, [])

  return (
    <section className="py-20 bg-[#F8F9F8]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-[40px] md:text-[52px] font-bold text-foreground leading-tight tracking-[-0.02em]">
              Best seller
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-[14px] font-semibold text-foreground/60 hover:text-foreground transition-colors"
          >
            See all products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Product Grid — 4 columns */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-2 border-[#C4A67B] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {featured.map((treatment, i) => (
              <ProductCard
                key={treatment.id}
                treatment={treatment}
                cardBg={cardBgs[i % cardBgs.length]}
                onAddToCart={() =>
                  addItem({ id: treatment.id, name: treatment.name, price: treatment.price, image: productImages[treatment.id] || treatment.image })
                }
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ProductCard({
  treatment,
  cardBg,
  onAddToCart,
}: {
  treatment: Treatment
  cardBg: string
  onAddToCart: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const img = productImages[treatment.id] || treatment.image
  const savingsAmt = treatment.originalPrice ? treatment.originalPrice - treatment.price : 0

  return (
    <motion.div
      variants={item}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col rounded-[20px] overflow-hidden bg-white border border-[#e8e8e8] hover:shadow-md transition-all duration-300"
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: cardBg, aspectRatio: "1/1" }}
      >
        {/* Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {treatment.originalPrice && (
            <span className="bg-[#043222] text-white text-[11px] font-bold px-3 py-1.5 rounded-full leading-none">
              Save ₦{savingsAmt.toLocaleString()}
            </span>
          )}
          {treatment.featured && !treatment.originalPrice && (
            <span className="bg-[#043222] text-white text-[11px] font-bold px-3 py-1.5 rounded-full leading-none">
              Best seller
            </span>
          )}
        </div>

        {/* Product image */}
        <div
          className="relative w-4/5 h-4/5 transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        >
          <Image
            src={img}
            alt={treatment.name}
            fill
            className="object-contain"
            sizes="(max-width:768px) 50vw, 25vw"
          />
        </div>

        {/* Hover — Buy Now button slides up from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-300"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <button
            onClick={onAddToCart}
            className="w-full bg-[#043222] text-white text-[13px] font-semibold py-3 rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#023018] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Buy now
          </button>
        </div>
      </div>

      {/* Card info */}
      <div className="p-4 flex flex-col gap-1">
        <span className="text-[11px] text-[#888] font-medium">{treatment.duration}</span>
        <Link href={`/treatment/${treatment.slug}`}>
          <h3 className="text-[14px] font-bold text-[#043222] leading-snug line-clamp-2 hover:underline underline-offset-2">
            {treatment.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[16px] font-bold text-[#043222]">
              ₦{treatment.price.toLocaleString()}
            </span>
            {treatment.originalPrice && (
              <span className="text-[13px] text-[#aaa] line-through">
                ₦{treatment.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={onAddToCart}
            className="w-8 h-8 rounded-full bg-[#043222] text-white flex items-center justify-center hover:bg-[#BFF74C] hover:text-[#043222] transition-all duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
