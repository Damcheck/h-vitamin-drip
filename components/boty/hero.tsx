"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const bottles = [
  { src: "/images/products/amber-dropper-bottles.png",  w: "w-[90px] md:w-[120px]",  h: "h-[180px] md:h-[240px]", rotate: -8,  delay: 0.55, mb: "mb-4" },
  { src: "/images/products/serum-bottles-1.png",         w: "w-[110px] md:w-[150px]", h: "h-[220px] md:h-[300px]", rotate: -3,  delay: 0.62, mb: "" },
  { src: "/images/products/pump-bottles-cream.png",      w: "w-[130px] md:w-[180px]", h: "h-[260px] md:h-[360px]", rotate: 0,   delay: 0.58, mb: "" },
  { src: "/images/products/spray-bottles.png",           w: "w-[110px] md:w-[150px]", h: "h-[220px] md:h-[300px]", rotate: 3,   delay: 0.62, mb: "" },
  { src: "/images/products/eye-serum-bottles.png",       w: "w-[90px] md:w-[120px]",  h: "h-[180px] md:h-[240px]", rotate: 8,   delay: 0.55, mb: "mb-4" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh-hero">

      {/* ── Floating orb decorations ── */}
      <div className="absolute top-20 left-[5%] w-[400px] h-[400px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #BFF74C 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-[5%] w-[300px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #043222 0%, transparent 70%)" }} />

      {/* ── Main text block ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-8 pt-16 pb-0 text-center">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

          {/* Pill label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-[#043222]/10"
            style={{ background: "rgba(4,50,34,.05)" }}>
            <span className="w-2 h-2 rounded-full animate-float" style={{ background: "#BFF74C" }} />
            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#043222]/60">
              Nurse-led · Home delivery · Nigeria
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[52px] sm:text-[68px] md:text-[88px] font-black leading-[0.98] tracking-[-0.03em] text-[#043222] max-w-4xl mx-auto mb-8">
            Premium IV Therapy{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Delivered</span>
              <motion.span
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-2 h-4 origin-left -z-0 rounded-sm"
                style={{ background: "#BFF74C" }}
              />
            </span>{" "}
            to You
          </h1>

          {/* Sub */}
          <p className="text-[16px] md:text-[18px] text-[#043222]/55 max-w-xl mx-auto leading-relaxed mb-10 font-medium">
            Pharmaceutical-grade IV drips, vitamin boosters and injections — administered by registered nurses at your home or office across Nigeria.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link href="/shop"
              className="btn-primary group shadow-float">
              Shop Treatments
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://wa.me/447495393025" target="_blank" rel="noopener noreferrer"
              className="btn-outline">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book on WhatsApp
            </a>
          </div>
        </motion.div>

        {/* ── Trust bar ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-6 flex-wrap mb-0">
          {[
            { n: "5,000+", l: "Treatments" },
            { n: "98%",    l: "Satisfaction" },
            { n: "50+",    l: "Nurses" },
            { n: "3",      l: "Cities" },
          ].map(s => (
            <div key={s.l} className="flex flex-col items-center">
              <span className="text-[22px] font-black text-[#043222]">{s.n}</span>
              <span className="text-[11px] font-semibold text-[#043222]/50 uppercase tracking-wider">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Product bottles strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full mt-10"
        style={{ height: "360px" }}
      >
        {/* Gradient shelf */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 0%, #deebd0 35%, #c8ddb8 100%)" }} />

        {/* Top blend */}
        <div className="absolute top-0 left-0 right-0 h-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #F8F9F6, transparent)" }} />

        {/* Bottles */}
        <div className="absolute inset-0 flex items-end justify-center gap-4 md:gap-6 px-4">
          {bottles.map((b, i) => (
            <motion.div key={i}
              initial={{ y: 60, rotate: b.rotate * 0.5 }}
              animate={{ y: 0, rotate: b.rotate }}
              transition={{ duration: 1.3, delay: b.delay, ease: [0.22, 1, 0.36, 1] }}
              className={`relative ${b.w} ${b.h} ${b.mb} shrink-0`}
              style={{ transformOrigin: "bottom center", filter: "drop-shadow(0 20px 40px rgba(4,50,34,.2))" }}
            >
              <Image src={b.src} alt="Product" fill className="object-contain" sizes="180px" />
            </motion.div>
          ))}
        </div>

        {/* Floating badges */}
        <motion.div initial={{ opacity: 0, x: -20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute top-8 left-[6%] z-20 hidden md:flex items-center gap-3 glass-card rounded-2xl px-4 py-3 animate-float-slow">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#BFF74C" }}>⚡</div>
          <div>
            <p className="text-[10px] font-bold text-[#043222]/50 uppercase tracking-wider">Best Seller</p>
            <p className="text-[13px] font-bold text-[#043222]">Energy Drip</p>
            <p className="text-[12px] font-semibold text-[#043222]">₦170,000</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 1.55 }}
          className="absolute top-8 right-[6%] z-20 hidden md:block glass-card rounded-2xl px-4 py-3 animate-float">
          <div className="flex items-center gap-1 mb-1">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-3 h-3 fill-yellow-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <p className="text-[12px] font-bold text-[#043222]">5.0 · 200+ reviews</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
