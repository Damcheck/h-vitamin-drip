"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const igPosts = [
  { bg: "#E8F0EC", emoji: "💉", label: "Energy Drip session" },
  { bg: "#F0E8EC", emoji: "✨", label: "Glow up results" },
  { bg: "#E8ECF0", emoji: "🌿", label: "Vitamin C infusion" },
  { bg: "#F0ECE8", emoji: "⚡", label: "NAD+ therapy" },
  { bg: "#ECF0E8", emoji: "💊", label: "Booster shot" },
  { bg: "#EEE8F0", emoji: "🧴", label: "Skin & Hair Drip" },
]

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setDone(true); setEmail("") }
  }

  return (
    <>
      {/* Instagram-style Gallery Grid */}
      <section className="py-20 bg-[#F8F9F6]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#043222]/40 mb-2">Community</p>
              <h2 className="text-[36px] font-black tracking-tight text-[#043222]">@hvitamindrip</h2>
            </div>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-[13px] font-bold text-[#043222]/60 hover:text-[#043222] transition-colors">
              Follow us <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* 6-tile gallery */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {igPosts.map((post, i) => (
              <motion.a
                key={i}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ scale: 1.04 }}
                className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 overflow-hidden relative group cursor-pointer"
                style={{ background: post.bg }}
              >
                <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
                  {post.emoji}
                </span>
                <div className="absolute inset-0 bg-[#043222]/0 group-hover:bg-[#043222]/50 transition-all duration-300 flex items-center justify-center rounded-2xl">
                  <p className="text-white text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity text-center px-2">
                    {post.label}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section — dark premium */}
      <section className="relative overflow-hidden py-20" style={{ background: "#043222" }}>
        {/* Background orb */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "#BFF74C" }} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] mb-4"
                style={{ color: "#BFF74C" }}>
                Newsletter
              </p>
              <h2 className="text-[40px] md:text-[52px] font-black leading-tight tracking-tight text-white mb-5">
                Subscribe and get{" "}
                <span style={{ color: "#BFF74C" }}>25% off</span>{" "}
                your first treatment
              </h2>
              <p className="text-[15px] text-white/55 leading-relaxed mb-8 max-w-md">
                Join 5,000+ wellness enthusiasts. Get exclusive offers, health tips, and priority booking for new treatments.
              </p>

              {/* Benefits */}
              <div className="flex flex-col gap-3">
                {[
                  "25% off your first booking",
                  "Early access to new treatments",
                  "Monthly wellness tips from our nurses",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#BFF74C" }} />
                    <span className="text-[14px] font-semibold text-white/70">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="glass-dark rounded-[28px] p-8">
                {done ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "#BFF74C" }}>
                      <CheckCircle2 className="w-8 h-8 text-[#043222]" />
                    </div>
                    <h3 className="text-[22px] font-bold text-white mb-2">You&apos;re in! 🎉</h3>
                    <p className="text-[14px] text-white/60">
                      Check your email for your 25% discount code.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-[20px] font-bold text-white mb-2">Get your discount code</h3>
                    <p className="text-[13px] text-white/50 mb-6">
                      Enter your email and we&apos;ll send it right over.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <input
                        type="text"
                        placeholder="Your first name"
                        className="w-full rounded-[14px] px-5 py-4 text-[14px] font-medium outline-none"
                        style={{
                          background: "rgba(255,255,255,.08)",
                          border: "1.5px solid rgba(255,255,255,.12)",
                          color: "white",
                        }}
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full rounded-[14px] px-5 py-4 text-[14px] font-medium outline-none"
                        style={{
                          background: "rgba(255,255,255,.08)",
                          border: "1.5px solid rgba(255,255,255,.12)",
                          color: "white",
                        }}
                      />
                      <button
                        type="submit"
                        className="w-full py-4 rounded-full font-bold text-[15px] transition-all hover:opacity-90"
                        style={{ background: "#BFF74C", color: "#043222" }}
                      >
                        Claim my 25% discount
                      </button>
                    </form>
                    <p className="text-[11px] text-white/30 text-center mt-4">
                      No spam, ever. Unsubscribe any time.
                    </p>
                  </>
                )}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 mt-5 justify-center">
                <div className="flex -space-x-2">
                  {["AO","ET","CA","TB","NG"].map((a) => (
                    <div key={a} className="w-8 h-8 rounded-full border-2 border-[#043222] flex items-center justify-center text-[10px] font-black"
                      style={{ background: "#BFF74C", color: "#043222" }}>
                      {a}
                    </div>
                  ))}
                </div>
                <p className="text-[12px] font-semibold text-white/50">
                  5,000+ subscribers
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
