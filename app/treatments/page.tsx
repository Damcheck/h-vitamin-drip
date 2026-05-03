"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Clock, ArrowRight, SlidersHorizontal, X } from "lucide-react"
import { motion } from "framer-motion"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { treatments } from "@/lib/products"
import { useCart } from "@/components/boty/cart-context"
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

const categoryFilters = [
  { key: "all", label: "All Treatments" },
  { key: "iv-drip", label: "IV Drips" },
  { key: "booster", label: "Boosters" },
  { key: "injection", label: "Injections" },
  { key: "therapy", label: "Therapy" },
]

const categoryDescriptions: Record<string, string> = {
  all: "Our full range of IV drips, vitamin boosters, and injections — delivered to your home or office by our registered nurses.",
  "iv-drip": "Full intravenous infusions delivering vitamins, minerals and nutrients directly into your bloodstream for 100% bioavailability.",
  booster: "Targeted vitamin injections for specific health goals — quick, effective and administered in minutes.",
  injection: "Intramuscular injections for rapid absorption of essential vitamins and minerals.",
  therapy: "Specialist therapeutic treatments for complex health goals.",
}

export default function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const { addItem } = useCart()

  const filtered =
    selectedCategory === "all" ? treatments : treatments.filter((t) => t.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page hero */}
      <section className="relative pt-36 pb-20 bg-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm tracking-widest uppercase text-primary mb-3 block font-semibold">
            Nurse-Led Vitamin Therapy
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 text-balance leading-tight">
            Our Treatments
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
            {categoryDescriptions[selectedCategory]}
          </p>
          {/* Category pills */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium boty-transition ${
                  selectedCategory === cat.key
                    ? "bg-primary text-primary-foreground boty-shadow"
                    : "bg-background text-foreground/70 hover:text-foreground border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile filter button */}
          <div className="sm:hidden flex items-center justify-between mb-8">
            <span className="text-sm text-muted-foreground">{filtered.length} treatments</span>
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground border border-border px-4 py-2 rounded-full"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Mobile filter drawer */}
          {showFilters && (
            <div className="sm:hidden fixed inset-0 z-50 bg-background p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl">Filter</h2>
                <button type="button" onClick={() => setShowFilters(false)} className="p-2 text-foreground/70">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {categoryFilters.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => { setSelectedCategory(cat.key); setShowFilters(false) }}
                  className={`w-full px-6 py-4 mb-3 rounded-2xl text-left boty-transition ${
                    selectedCategory === cat.key ? "bg-primary text-primary-foreground" : "bg-card text-foreground boty-shadow"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* IV Drips are highlighted in a larger first card if category is all */}
          {selectedCategory === "all" ? (
            <div className="space-y-16">
              {categoryFilters.filter(c => c.key !== "all").map((cat) => {
                const catTreatments = treatments.filter(t => t.category === cat.key)
                if (!catTreatments.length) return null
                return (
                  <div key={cat.key}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground">{cat.label}</h2>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory(cat.key)}
                        className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
                      >
                        View all <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {catTreatments.map((t, index) => (
                        <motion.div
                          key={t.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <TreatmentCard
                            treatment={t}
                            image={productImages[t.id] || "/images/products/serum-bottles-1.png"}
                            onAddToCart={() => addItem({
                              id: t.id,
                              name: t.name,
                              description: t.tagline,
                              price: t.price,
                              image: productImages[t.id] || "/images/products/serum-bottles-1.png",
                            })}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TreatmentCard
                    treatment={t}
                    image={productImages[t.id] || "/images/products/serum-bottles-1.png"}
                    onAddToCart={() => addItem({
                      id: t.id,
                      name: t.name,
                      description: t.tagline,
                      price: t.price,
                      image: productImages[t.id] || "/images/products/serum-bottles-1.png",
                    })}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WhatsApp CTA banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 text-balance">
            Not sure which treatment is right for you?
          </h2>
          <p className="text-white/80 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Message us on WhatsApp and our registered nurses will help you choose the best treatment for your health goals.
          </p>
          <a
            href="https://wa.me/2348000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/90 boty-transition boty-shadow"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat with Our Team
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function TreatmentCard({
  treatment,
  image,
  onAddToCart,
}: {
  treatment: Treatment
  image: string
  onAddToCart: () => void
}) {
  return (
    <Link href={`/treatment/${treatment.slug}`} className="group">
      <div className="bg-card rounded-2xl overflow-hidden boty-shadow boty-transition group-hover:scale-[1.02] h-full flex flex-col border border-border/50">
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          <Image
            src={image}
            alt={treatment.name}
            fill
            className="object-cover boty-transition group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
          <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {treatment.category.replace("-", " ")}
          </span>
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAddToCart() }}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow"
            aria-label={`Book ${treatment.name}`}
          >
            <ShoppingBag className="w-4 h-4 text-foreground" />
          </button>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-serif text-lg text-foreground mb-1 leading-snug">{treatment.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{treatment.tagline}</p>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xl font-semibold text-foreground">₦{(treatment.price).toLocaleString()}</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {treatment.duration}
              </span>
              <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 boty-transition">
                View <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
