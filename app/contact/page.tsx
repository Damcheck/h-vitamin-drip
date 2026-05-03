"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react"

const contactInfo = [
  { icon: Phone, label: "Phone / WhatsApp", value: "+234 800 000 0000", href: "tel:+2348000000000" },
  { icon: Mail, label: "Email", value: "hello@hvitamindrip.ng", href: "mailto:hello@hvitamindrip.ng" },
  { icon: MapPin, label: "Locations", value: "Lagos · Abuja · Port Harcourt", href: "#" },
  { icon: Clock, label: "Hours", value: "Mon–Sat: 8am – 8pm", href: "#" },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", service: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-[88px]">
        {/* Hero */}
        <div className="bg-background border-b border-border/30 py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-3">Get in touch</p>
              <h1 className="text-[48px] md:text-[64px] font-bold text-foreground leading-tight">Contact</h1>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Left: Info */}
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-4">Our Details</p>
              <h2 className="text-[36px] font-bold text-foreground mb-6 leading-tight">
                We&apos;d love to hear from you
              </h2>
              <p className="text-[15px] text-foreground/60 leading-relaxed mb-10">
                Whether you have a question about our treatments, want to book a session, or are interested in a corporate wellness package, our team is ready to help.
              </p>

              <div className="flex flex-col gap-5">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-5 bg-white rounded-[20px] border border-border/30 hover:border-border/60 transition-all group"
                  >
                    <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-foreground/40 mb-0.5">
                        {info.label}
                      </p>
                      <p className="text-[15px] font-bold text-foreground">{info.value}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-foreground/30 ml-auto group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-[#E8F5E9] rounded-[20px] border border-[#25D366]/20">
                <p className="text-[15px] font-bold text-foreground mb-2">Prefer to book on WhatsApp?</p>
                <p className="text-[14px] text-foreground/60 mb-4">
                  Message us directly for the fastest response and same-day booking.
                </p>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-[14px] font-bold hover:bg-[#1dba58] transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-[28px] border border-border/30 p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-[22px] font-bold text-foreground mb-2">Message sent!</h3>
                  <p className="text-[15px] text-foreground/60">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-[22px] font-bold text-foreground mb-6">Send us a message</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[12px] font-semibold uppercase tracking-wider text-foreground/40 mb-1.5 block">Full Name</label>
                        <input
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-muted/50 border border-border/40 rounded-[12px] px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold uppercase tracking-wider text-foreground/40 mb-1.5 block">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-muted/50 border border-border/40 rounded-[12px] px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold uppercase tracking-wider text-foreground/40 mb-1.5 block">Phone / WhatsApp</label>
                      <input
                        placeholder="+234 800 000 0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-muted/50 border border-border/40 rounded-[12px] px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold uppercase tracking-wider text-foreground/40 mb-1.5 block">Treatment Interest</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full bg-muted/50 border border-border/40 rounded-[12px] px-4 py-3 text-[14px] text-foreground outline-none focus:border-foreground transition-all"
                      >
                        <option value="">Select a treatment…</option>
                        <option>Energy Drip (Myers Cocktail)</option>
                        <option>Glutathione Detox</option>
                        <option>High Dose Vitamin C</option>
                        <option>NAD+ Therapy</option>
                        <option>Skin & Hair Drip</option>
                        <option>Other / Not Sure</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold uppercase tracking-wider text-foreground/40 mb-1.5 block">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us more about what you're looking for…"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-muted/50 border border-border/40 rounded-[12px] px-4 py-3 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-foreground text-white py-4 rounded-full text-[14px] font-bold hover:bg-foreground/80 transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      Send message
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
