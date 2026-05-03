"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIFooter } from "@/components/ai-theme/ai-footer"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

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
    <main className="min-h-screen bg-[#F4F1E9]">
      <AIHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-[#C4A67B]/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#C4A67B] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">GET IN TOUCH</p>
            <h1 className="font-serif text-5xl md:text-7xl text-[#132B23] uppercase leading-tight">CONNECTION</h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          
          {/* Left: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl text-[#132B23] mb-6 uppercase">
              Schedule Your<br />Enhancement
            </h2>
            <p className="text-[#606864] text-sm leading-relaxed mb-12 max-w-md">
              Whether you have a question about our elixirs, want to book a private session, or are interested in a corporate wellness package, our concierges are ready to assist.
            </p>

            <div className="flex flex-col gap-6">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-6 p-6 bg-[#FCFAF7]/40 backdrop-blur-md rounded-2xl border border-[#C4A67B]/30 hover:border-[#C4A67B]/70 hover:shadow-gold transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full border border-[#C4A67B] flex items-center justify-center text-[#C4A67B] group-hover:bg-[#C4A67B] group-hover:text-[#132B23] transition-colors">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#606864] mb-1">
                      {info.label}
                    </p>
                    <p className="text-sm font-bold text-[#132B23]">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-12 p-8 bg-[#132B23] rounded-[2rem] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#132B23] to-transparent z-10 pointer-events-none"></div>
              <div className="relative z-20">
                <p className="font-serif text-2xl text-[#EBE7DF] mb-2">Priority Booking</p>
                <p className="text-[#DBC297] text-xs mb-6 max-w-[250px]">
                  Message our clinical team directly on WhatsApp for same-day concierge bookings.
                </p>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-gold hover:scale-105 transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#FCFAF7]/40 backdrop-blur-2xl rounded-[3rem] border border-[#C4A67B]/30 p-10 shadow-gold"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#DBC297] to-[#C4A67B] rounded-full flex items-center justify-center mb-6 shadow-gold">
                  <svg className="w-10 h-10 text-[#132B23]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl text-[#132B23] mb-4">Transmission Received</h3>
                <p className="text-[#606864] text-sm">Our concierge team will contact you within 2 hours to confirm your appointment.</p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-3xl text-[#132B23] mb-8">Initiate Contact</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mb-2 block">Full Name</label>
                      <input
                        required
                        placeholder="e.g. Jane Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#F4F1E9]/50 border border-[#C4A67B]/40 rounded-xl px-5 py-4 text-sm text-[#132B23] placeholder:text-[#606864]/50 outline-none focus:border-[#132B23] transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mb-2 block">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#F4F1E9]/50 border border-[#C4A67B]/40 rounded-xl px-5 py-4 text-sm text-[#132B23] placeholder:text-[#606864]/50 outline-none focus:border-[#132B23] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mb-2 block">Phone / WhatsApp</label>
                    <input
                      required
                      placeholder="+234 800 000 0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#F4F1E9]/50 border border-[#C4A67B]/40 rounded-xl px-5 py-4 text-sm text-[#132B23] placeholder:text-[#606864]/50 outline-none focus:border-[#132B23] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mb-2 block">Treatment Interest</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-[#F4F1E9]/50 border border-[#C4A67B]/40 rounded-xl px-5 py-4 text-sm text-[#132B23] outline-none focus:border-[#132B23] transition-all appearance-none"
                    >
                      <option value="">Select an Elixir…</option>
                      <option>Energy Drip (Myers Cocktail)</option>
                      <option>Glutathione Detox</option>
                      <option>High Dose Vitamin C</option>
                      <option>NAD+ Therapy</option>
                      <option>Other / Consultation Required</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mb-2 block">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Any specific health goals or requirements?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#F4F1E9]/50 border border-[#C4A67B]/40 rounded-xl px-5 py-4 text-sm text-[#132B23] placeholder:text-[#606864]/50 outline-none focus:border-[#132B23] transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-[#132B23] text-[#DBC297] py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#1a382e] hover:-translate-y-1 transition-all duration-300"
                  >
                    Submit Request
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <AIFooter />
    </main>
  )
}
