"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2, Clock, ShoppingBag, ChevronDown, Star } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { getTreatmentBySlug, treatments } from "@/lib/products"
import { useCart } from "@/components/boty/cart-context"
import { motion, AnimatePresence } from "framer-motion"

const productImages: Record<string, string[]> = {
  default: [
    "/images/products/serum-bottles-1.png",
    "/images/products/amber-dropper-bottles.png",
    "/images/products/spray-bottles.png",
    "/images/products/pump-bottles-cream.png",
  ],
}

function getImages(slug: string, mainImage: string): string[] {
  if (productImages[slug]) return productImages[slug]
  return [mainImage, ...productImages.default.filter((i) => i !== mainImage).slice(0, 3)]
}

const reviews = [
  { name: "Adaeze O.", rating: 5, text: "Absolutely amazing! I felt the difference after just one session. The nurse was professional and the service was seamless.", date: "2 weeks ago" },
  { name: "Emeka T.", rating: 5, text: "Best investment I've made for my health. Highly recommended for anyone in Lagos!", date: "1 month ago" },
  { name: "Chidinma A.", rating: 5, text: "The convenience of having this done at home is unbeatable. Top quality service.", date: "3 weeks ago" },
]

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-[15px] font-bold text-foreground">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-foreground/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) notFound()

  const { addItem } = useCart()
  const [selectedPackage, setSelectedPackage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeImg, setActiveImg] = useState(0)

  const images = getImages(treatment.slug, treatment.image)
  const packages = treatment.packages || [{ label: "Single Session", price: treatment.price }]
  const currentPrice = packages[selectedPackage]?.price ?? treatment.price

  const whatsappText = `Hi! I'd like to book the ${treatment.name} — ${packages[selectedPackage]?.label}. Price: ₦${(currentPrice * quantity).toLocaleString()}`
  const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(whatsappText)}`

  const related = treatments.filter((t) => t.category === treatment.category && t.id !== treatment.id).slice(0, 4)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-[88px]">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-5 border-b border-border/30">
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{treatment.name}</span>
          </div>
        </div>

        {/* Product Section */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16">
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-[28px] overflow-hidden bg-[#F0F4EC]"
              >
                <Image
                  src={images[activeImg]}
                  alt={treatment.name}
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </motion.div>
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative aspect-square rounded-[16px] overflow-hidden bg-[#F0F4EC] border-2 transition-all duration-200 ${
                      activeImg === i ? "border-foreground" : "border-transparent hover:border-border"
                    }`}
                  >
                    <Image src={img} alt={`${treatment.name} view ${i + 1}`} fill className="object-contain p-2" sizes="80px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info — Sticky */}
            <div className="lg:sticky lg:top-[100px] h-fit">
              {/* Category Badge */}
              <span className="inline-block bg-primary/20 text-foreground text-[12px] font-bold px-3 py-1.5 rounded-full mb-4 capitalize">
                {treatment.category.replace("-", " ")}
              </span>

              <h1 className="text-[32px] md:text-[40px] font-bold text-foreground leading-tight mb-3">
                {treatment.name}
              </h1>

              {/* Stars */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-[13px] font-medium text-muted-foreground">5.0 (200+ reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[36px] font-bold text-foreground">
                  ₦{currentPrice.toLocaleString()}
                </span>
                {treatment.originalPrice && (
                  <span className="text-[18px] text-muted-foreground line-through">
                    ₦{treatment.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-[15px] text-foreground/60 leading-relaxed mb-7">
                {treatment.description}
              </p>

              {/* Package Selection */}
              {packages.length > 1 && (
                <div className="mb-6">
                  <p className="text-[13px] font-bold uppercase tracking-widest text-foreground/40 mb-3">
                    Select Package
                  </p>
                  <div className="flex flex-col gap-2">
                    {packages.map((pkg, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedPackage(i)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-[14px] border-2 text-left transition-all duration-200 ${
                          selectedPackage === i
                            ? "border-foreground bg-foreground/5"
                            : "border-border/40 hover:border-border"
                        }`}
                      >
                        <span className="text-[14px] font-semibold text-foreground">{pkg.label}</span>
                        <span className="text-[14px] font-bold text-foreground">₦{pkg.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center bg-muted rounded-full overflow-hidden border border-border/40">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground text-xl font-light"
                  >−</button>
                  <span className="w-10 text-center text-[15px] font-bold text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 flex items-center justify-center text-foreground/60 hover:text-foreground text-xl font-light"
                  >+</button>
                </div>
                <button
                  onClick={() => addItem({ id: treatment.id, name: treatment.name, price: currentPrice, image: treatment.image })}
                  className="flex-1 bg-foreground text-white py-3.5 rounded-full text-[14px] font-bold hover:bg-foreground/80 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to cart
                </button>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-full text-[14px] font-bold hover:bg-[#1dba58] transition-all duration-200 mb-6"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book via WhatsApp
              </a>

              {/* Quick Info */}
              <div className="flex items-center gap-4 p-4 bg-muted rounded-[14px]">
                <Clock className="w-4 h-4 text-foreground/40 shrink-0" />
                <p className="text-[13px] text-foreground/60">
                  <span className="font-semibold text-foreground">Duration: </span>{treatment.duration}
                </p>
              </div>

              {/* Accordions */}
              <div className="mt-8 border-t border-border/40">
                <AccordionItem title="Key Ingredients">
                  <ul className="flex flex-col gap-2">
                    {treatment.keyIngredients.map((ing) => (
                      <li key={ing} className="flex items-center gap-2 text-[14px] text-foreground/70">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
                <AccordionItem title="Benefits">
                  <ul className="flex flex-col gap-2">
                    {treatment.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-[14px] text-foreground/70">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
                <AccordionItem title="Who Is It For?">
                  <p className="text-[14px] text-foreground/60 leading-relaxed">{treatment.whoIsItFor}</p>
                </AccordionItem>
                <AccordionItem title="Disclaimer">
                  <p className="text-[14px] text-foreground/60 leading-relaxed">{treatment.disclaimer}</p>
                </AccordionItem>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-[#F4F6F2] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <h2 className="text-[32px] font-bold text-foreground mb-8">Customer Reviews</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {reviews.map((r, i) => (
                <div key={i} className="bg-white rounded-[20px] p-6 border border-border/30">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[14px] text-foreground/70 leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-foreground">{r.name}</span>
                    <span className="text-[12px] text-muted-foreground">{r.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="py-16 max-w-[1280px] mx-auto px-6 lg:px-8">
            <h2 className="text-[32px] font-bold text-foreground mb-8">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((t) => (
                <Link
                  key={t.id}
                  href={`/treatment/${t.slug}`}
                  className="group flex flex-col rounded-[20px] overflow-hidden bg-white border border-border/30 hover:border-border/60 transition-all"
                >
                  <div className="relative bg-[#F0F4EC] aspect-square flex items-center justify-center">
                    <div className="relative w-3/4 h-3/4 group-hover:scale-105 transition-transform duration-500">
                      <Image src={t.image} alt={t.name} fill className="object-contain" sizes="200px" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[14px] font-bold text-foreground line-clamp-2 mb-1">{t.name}</h3>
                    <p className="text-[15px] font-bold text-foreground">₦{t.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
