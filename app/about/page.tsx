"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: "5,000+", label: "Treatments given" },
  { value: "98%", label: "Client satisfaction" },
  { value: "50+", label: "Registered nurses" },
  { value: "3", label: "Cities covered" },
]

const team = [
  { name: "Dr. Adaeze Okonkwo", role: "Medical Director", bg: "bg-[#E8EDE5]" },
  { name: "Nurse Emeka Taiwo", role: "Senior IV Therapist", bg: "bg-[#EDE5E8]" },
  { name: "Nurse Chidinma Eze", role: "Wellness Specialist", bg: "bg-[#E5EBF0]" },
]

const values = [
  { title: "Safety First", desc: "All treatments are administered by registered nurses and comply with Nigerian medical regulations." },
  { title: "Premium Quality", desc: "We source only pharmaceutical-grade ingredients from certified suppliers." },
  { title: "Convenience", desc: "We come to you — at home, in the office, or at your event across Lagos, Abuja, and Port Harcourt." },
  { title: "Personalised Care", desc: "Every client receives a tailored assessment to ensure the right treatment plan for their needs." },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-[88px]">
        {/* Hero */}
        <div className="bg-foreground text-white py-24 overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p className="text-[13px] font-semibold uppercase tracking-widest text-white/40 mb-4">Our Story</p>
              <h1 className="text-[52px] md:text-[72px] font-bold leading-tight mb-6">
                About H Vitamin Drip
              </h1>
              <p className="text-[16px] text-white/60 leading-relaxed max-w-2xl">
                We are Nigeria&apos;s leading nurse-led IV vitamin therapy service, bringing clinical-grade wellness treatments directly to you wherever you are.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-primary py-12">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p className="text-[36px] font-bold text-foreground">{s.value}</p>
                  <p className="text-[13px] font-semibold text-foreground/60 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="aspect-[4/5] rounded-[32px] bg-[#E8EDE5] overflow-hidden relative"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-64 bg-gradient-to-b from-[#b8ccaf] to-[#8faa7a] rounded-full opacity-60" />
                </div>
                <div className="absolute bottom-8 left-8 bg-white rounded-2xl px-5 py-4 shadow-lg">
                  <p className="text-[13px] text-muted-foreground mb-1">Trusted by</p>
                  <p className="text-[22px] font-bold text-foreground">5,000+ Nigerians</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-4">Our Mission</p>
                <h2 className="text-[40px] md:text-[52px] font-bold text-foreground leading-tight mb-5">
                  Making premium wellness accessible to every Nigerian
                </h2>
                <p className="text-[15px] text-foreground/60 leading-relaxed mb-5">
                  H Vitamin Drip was founded with a simple belief: everyone deserves access to clinical-grade wellness care without leaving the comfort of their home. We are proud to be the first nurse-led, home-delivery IV therapy service in Nigeria.
                </p>
                <p className="text-[15px] text-foreground/60 leading-relaxed mb-8">
                  Every treatment is administered by a registered nurse, using pharmaceutical-grade ingredients sourced from certified suppliers. Your health and safety is our top priority.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 rounded-full text-[14px] font-bold hover:bg-foreground/80 transition-all group"
                >
                  Explore treatments
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="py-20 bg-[#F4F6F2]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-3">Our Values</p>
              <h2 className="text-[40px] font-bold text-foreground">What we stand for</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-[20px] p-6 border border-border/30"
                >
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-foreground">{i + 1}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-[14px] text-foreground/60 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="py-20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-3">Our Team</p>
              <h2 className="text-[40px] font-bold text-foreground">Meet the professionals</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-32 h-32 ${member.bg} rounded-full mb-4 flex items-center justify-center`}>
                    <span className="text-4xl font-bold text-foreground/20">{member.name[0]}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-foreground">{member.name}</h3>
                  <p className="text-[13px] text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-20 bg-foreground text-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-[40px] md:text-[52px] font-bold mb-4">Ready to feel the difference?</h2>
            <p className="text-[16px] text-white/60 mb-8 max-w-lg mx-auto">
              Book your first IV therapy session today and experience the H Vitamin Drip difference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-[14px] font-bold hover:bg-primary/80 transition-all"
              >
                Shop now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full text-[14px] font-bold hover:bg-white/20 transition-all"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
