"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  { label: "Immunity booster", href: "/treatments?category=iv-drip", img: "🛡️" },
  { label: "Skin care", href: "/treatments?category=booster", img: "✨" },
  { label: "Digestive care", href: "/treatments?category=injection", img: "🌿" },
  { label: "Hair care", href: "/treatments?category=therapy", img: "💫" },
]

export function FeatureSection() {
  return (
    <>
      {/* "Clarify pores" dark green section — exact Healup layout */}
      <section className="py-24 overflow-hidden" style={{ backgroundColor: "#043222" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* Left: Text block */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                className="font-bold leading-[1.08] tracking-[-0.02em] mb-8"
                style={{ fontSize: "clamp(36px, 4vw, 60px)", color: "#ffffff" }}
              >
                Clarify pores and minimize Imperfections for clearer skin
              </h2>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-[14px] font-bold transition-all duration-200 group"
                style={{ backgroundColor: "#BFF74C", color: "#043222" }}
              >
                Shop now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right: 2x2 Category cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                >
                  <Link
                    href={cat.href}
                    className="group flex flex-col rounded-[20px] p-6 min-h-[160px] transition-all duration-300 relative overflow-hidden"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.13)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)"
                    }}
                  >
                    <span className="text-3xl mb-auto">{cat.img}</span>
                    <div className="mt-8">
                      <h3 className="text-[16px] font-bold text-white leading-snug mb-1">
                        {cat.label}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color: "#BFF74C" }}>
                        Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Stats Bar */}
      <div className="overflow-hidden py-4" style={{ backgroundColor: "#BFF74C" }}>
        <div className="flex items-center gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[
            "5,000+ Treatments Given",
            "★ 5.0 Rating",
            "Nurse-Led Safety",
            "Lagos · Abuja · Port Harcourt",
            "98% Client Satisfaction",
            "Same-Day Booking",
            "5,000+ Treatments Given",
            "★ 5.0 Rating",
            "Nurse-Led Safety",
            "Lagos · Abuja · Port Harcourt",
          ].map((item, i) => (
            <span key={i} className="text-[13px] font-bold text-[#043222] shrink-0 flex items-center gap-12">
              {item}
              <span className="text-[#043222]/40">•</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
