"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "Adaeze O.",
    location: "Lekki, Lagos",
    rating: 5,
    text: "I was nervous about IV therapy at home but the nurse was so professional and reassuring. I felt completely energised within hours. This is now my monthly ritual!",
    treatment: "Energy Drip",
    avatar: "AO",
    color: "#E8F0EC",
  },
  {
    name: "Emeka T.",
    location: "VI, Lagos",
    rating: 5,
    text: "The Glutathione drip is absolutely unreal. My skin has never looked better and everyone keeps asking what I am doing differently. 100% worth every naira.",
    treatment: "Glutathione Detox",
    avatar: "ET",
    color: "#EDE8F0",
  },
  {
    name: "Chidinma A.",
    location: "Wuse 2, Abuja",
    rating: 5,
    text: "I booked through WhatsApp and had a nurse at my door within 3 hours. The whole experience was so seamless and the results were instant. Absolutely outstanding service.",
    treatment: "Skin & Hair Drip",
    avatar: "CA",
    color: "#F0E8E8",
  },
  {
    name: "Tunde B.",
    location: "GRA, Port Harcourt",
    rating: 5,
    text: "As a busy executive I cannot afford to be tired. The NAD+ therapy has been life-changing — sharper focus, more energy, better sleep. I highly recommend to all professionals.",
    treatment: "NAD+ Therapy",
    avatar: "TB",
    color: "#E8EEF0",
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function Testimonials() {
  return (
    <section className="py-24 bg-[#F8F9F6] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#043222]/40 mb-3">
            What clients say
          </p>
          <h2 className="text-[40px] md:text-[52px] font-black leading-tight tracking-[-0.02em] text-[#043222]">
            Real results, real people
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {reviews.map((r) => (
            <motion.div
              key={r.name}
              variants={card}
              className="product-card p-6 flex flex-col gap-4 relative"
            >
              {/* Quote icon */}
              <Quote className="w-7 h-7 text-[#BFF74C] shrink-0" fill="#BFF74C" />

              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-[14px] text-[#043222]/70 leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Treatment tag */}
              <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full w-fit"
                style={{ background: "#BFF74C", color: "#043222" }}>
                {r.treatment}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#E2E8DF]/60">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-black text-[#043222] shrink-0"
                  style={{ background: r.color }}
                >
                  {r.avatar}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#043222]">{r.name}</p>
                  <p className="text-[11px] text-[#043222]/50">{r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: "🏥", label: "Registered nurses only" },
            { icon: "🧪", label: "Pharmaceutical-grade ingredients" },
            { icon: "🚗", label: "Home & office delivery" },
            { icon: "⚡", label: "Same-day appointments" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <span className="text-2xl">{b.icon}</span>
              <span className="text-[13px] font-semibold text-[#043222]/60">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
