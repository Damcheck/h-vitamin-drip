"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { useCart } from "./cart-context"
import type { Treatment } from "@/lib/products"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const cardColors = [
  "bg-[#F0EBF8]",
  "bg-[#EBF4F0]",
  "bg-[#F8F0EB]",
  "bg-[#EBF0F8]",
]

export function CTABanner() {
  const { addItem } = useCart()
  const [recentProducts, setRecentProducts] = useState<Treatment[]>([])

  useEffect(() => {
    async function loadRecent() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4)
      
      if (data) {
        setRecentProducts(data.map(d => ({
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
    }
    loadRecent()
  }, [])

  return (
    <>
      {/* Recent Products Section */}
      <section className="py-20 bg-[#F4F6F2]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-2">
                More Treatments
              </p>
              <h2 className="text-[38px] md:text-[48px] font-bold text-foreground">
                Recent products
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-[14px] font-semibold text-foreground underline-offset-4 hover:underline"
            >
              See all products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {recentProducts.map((treatment, i) => (
              <MiniProductCard
                key={treatment.id}
                treatment={treatment}
                color={cardColors[i % cardColors.length]}
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
          </div>
        </div>
      </section>

      {/* GlowRadiance CTA Feature */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-[#E8EDE5]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-72 bg-gradient-to-b from-[#b8ccaf] to-[#8faa7a] rounded-full opacity-60" />
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-8 left-8 bg-white rounded-2xl px-5 py-4 shadow-lg">
                <p className="text-[12px] text-muted-foreground mb-1">Starting from</p>
                <p className="text-[22px] font-bold text-foreground">₦35,000</p>
              </div>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-4">
                Glow & Radiance
              </p>
              <h2 className="text-[38px] md:text-[52px] font-bold text-foreground leading-tight mb-5">
                H Vitamin Drip Glow Radiance
              </h2>
              <p className="text-[15px] text-foreground/60 leading-relaxed mb-8">
                Achieve radiant and healthy skin with our GlowRadiance IV Drip, a luxurious blend of potent antioxidants including Glutathione, Vitamin C, and B vitamins. Designed to brighten, detox, and restore your natural glow from within.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 rounded-full text-[14px] font-bold hover:bg-foreground/80 transition-all duration-200 group"
              >
                Shop now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

function MiniProductCard({
  treatment,
  color,
  onAddToCart,
}: {
  treatment: Treatment
  color: string
  onAddToCart: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col rounded-[24px] overflow-hidden bg-white border border-border/30 hover:border-border/60 transition-all duration-300"
    >
      <div className={`relative ${color} aspect-square overflow-hidden flex items-center justify-center`}>
        {treatment.originalPrice && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-foreground text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              Save ₦{(treatment.originalPrice - treatment.price).toLocaleString()}
            </span>
          </div>
        )}

        <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-105">
          <Image
            src={treatment.image}
            alt={treatment.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
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

      <div className="p-4">
        <p className="text-[12px] text-muted-foreground mb-1.5">{treatment.duration}</p>
        <Link href={`/treatment/${treatment.slug}`}>
          <h3 className="text-[15px] font-bold text-foreground mb-3 line-clamp-2 hover:underline underline-offset-2">
            {treatment.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-[17px] font-bold text-foreground">
              ₦{treatment.price.toLocaleString()}
            </span>
            {treatment.originalPrice && (
              <span className="text-[13px] text-muted-foreground line-through">
                ₦{treatment.originalPrice.toLocaleString()}
              </span>
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
