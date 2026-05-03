"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Home, Clock } from "lucide-react"

const badges = [
  { icon: Zap, label: "Nurse-Led", sub: "Registered professionals" },
  { icon: Home, label: "Home Service", sub: "Lagos, Abuja & Port Harcourt" },
  { icon: Clock, label: "Book Today", sub: "Same-day appointments" },
  { icon: Shield, label: "Clinic Grade", sub: "Medical-grade quality" },
]

export function TrustBadges() {
  return (
    <section className="py-10 bg-white border-y border-border/30">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center shrink-0">
                <badge.icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-foreground">{badge.label}</p>
                <p className="text-[12px] text-foreground/50">{badge.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
