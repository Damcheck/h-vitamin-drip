"use client"

import { motion } from "framer-motion"
import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIFooter } from "@/components/ai-theme/ai-footer"
import Image from "next/image"
import Link from "next/link"

const benefits = [
  { title: "High-Quality Products", desc: "Offer your clients our premium range of vitamins and supplements." },
  { title: "Exclusive Deals", desc: "Enjoy competitive pricing and lucrative incentives." },
  { title: "Expert Support", desc: "Benefit from our dedicated team's knowledge and resources." },
  { title: "Enhanced Brand Image", desc: "Associate your business with a trusted health and wellness brand." }
]

const roles = [
  { title: "Healthcare Professional", desc: "Offer your patients premium wellness solutions." },
  { title: "Gym or Fitness Center", desc: "Complement your fitness offerings with essential nutrients." },
  { title: "Retailer", desc: "Expand your product range with in-demand health products." },
  { title: "Startups & Established Brands", desc: "Elevate your corporate wellness programs." }
]

export default function PartnerPage() {
  return (
    <main className="min-h-screen bg-[#F4F1E9]">
      <AIHeader />

      <section className="relative pt-40 pb-32 overflow-hidden bg-[#132B23]">
        <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay pointer-events-none">
          <Image 
            src="/ai_dark_marble_1777828612578.png" 
            alt="Dark Emerald Marble Texture" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#C4A67B] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">B2B OPPORTUNITIES</p>
            <h1 className="font-serif text-5xl md:text-6xl text-[#EBE7DF] uppercase leading-tight mb-8">
              10X Your Health Care<br />Business Revenue
            </h1>
            <p className="text-[#DBC297] text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
              Partner with Holistic Vitamin Drips & Wellness to unlock a world of opportunities. Elevate your brand by associating with a trusted premium wellness provider.
            </p>
            <a 
              href="https://wa.me/+4407956841857"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-gold hover:scale-105 transition-all duration-300"
            >
              Take Me To The Discussion Table!
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#F4F1E9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-[#132B23] mb-4">As our partner, you'll gain access to:</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {benefits.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[2rem] p-8 border border-[#C4A67B]/20 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-[#132B23]/5 flex items-center justify-center text-[#C4A67B] mb-6 text-xl">
                  ✦
                </div>
                <h3 className="font-serif text-xl text-[#132B23] mb-3">{b.title}</h3>
                <p className="text-[#606864] text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#132B23] rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <Image src="/ai_dark_marble_1777828612578.png" alt="Marble" fill className="object-cover" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-[#EBE7DF] mb-12">Who are we looking for?</h2>
              
              <div className="grid sm:grid-cols-2 gap-6 text-left mb-16">
                {roles.map((r, i) => (
                  <div key={i} className="bg-[#FCFAF7]/10 backdrop-blur-md rounded-2xl p-6 border border-[#C4A67B]/20">
                    <h4 className="text-[#DBC297] font-serif text-lg mb-2">{r.title}</h4>
                    <p className="text-[#EBE7DF]/80 text-xs">{r.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-[#EBE7DF] text-xl font-serif mb-8">If you answered yes to any of these, let’s talk to get you started.</h3>
              
              <a 
                href="https://wa.me/+4407956841857"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#C4A67B] text-[#132B23] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#EBE7DF] hover:shadow-gold transition-all duration-300"
              >
                Start A Conversation
              </a>
            </div>
          </div>

        </div>
      </section>

      <AIFooter />
    </main>
  )
}
