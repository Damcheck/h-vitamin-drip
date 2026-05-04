"use client"

import { motion } from "framer-motion"
import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIFooter } from "@/components/ai-theme/ai-footer"
import Link from "next/link"
import Image from "next/image"

const stats = [
  { value: "5,000+", label: "Treatments given" },
  { value: "98%", label: "Client satisfaction" },
  { value: "50+", label: "Registered nurses" },
  { value: "3", label: "Cities covered" },
]

const values = [
  { title: "Safety First", desc: "All treatments are administered by registered nurses and comply with Nigerian medical regulations." },
  { title: "Premium Quality", desc: "We source only pharmaceutical-grade ingredients from certified suppliers." },
  { title: "Convenience", desc: "We come to you — at home, in the office, or at your event across Lagos, Abuja, and Port Harcourt." },
  { title: "Personalised Care", desc: "Every client receives a tailored assessment to ensure the right treatment plan for their needs." },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F4F1E9]">
      <AIHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-[#C4A67B]/20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#C4A67B] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">OUR STORY</p>
            <h1 className="font-serif text-5xl md:text-7xl text-[#132B23] uppercase leading-tight mb-8">
              PIONEERING<br />CELLULAR WELLNESS
            </h1>
            <p className="text-[#606864] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              We are Nigeria&apos;s leading nurse-led IV vitamin therapy service, bringing clinical-grade wellness treatments directly to you. A seamless fusion of science, luxury, and health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#132B23] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image src="/ai_dark_marble_1777828612578.png" alt="Marble" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="font-serif text-4xl md:text-5xl text-[#DBC297] mb-2">{s.value}</p>
                <p className="text-[#EBE7DF] text-[10px] font-bold uppercase tracking-[0.2em]">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 bg-[#F4F1E9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[#C4A67B]/30 shadow-gold"
            >
              <Image src="/ai_hero_sofa_1777827823407.png" alt="Gloria" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132B23]/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-[#FCFAF7]/20 backdrop-blur-xl border border-[#C4A67B]/30 rounded-2xl p-6 text-center">
                <p className="text-[#DBC297] text-[10px] uppercase tracking-widest font-bold mb-2">FOUNDER & MANAGING DIRECTOR</p>
                <p className="font-serif text-2xl text-[#EBE7DF]">Gloria</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[#C4A67B] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">OUR STORY</p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#132B23] leading-tight mb-8 uppercase">
                Born Out of Passion For Wellness
              </h2>
              <div className="space-y-6 text-[#606864] text-sm leading-loose">
                <p>
                  Our founder, Gloria, a dedicated and registered nurse with a heart for healing and passion for improving lives, began her journey in 2009 after completing her nursing program. After years of training and medical practice in national health service, she felt a calling to explore a different path that allows her to combine her nursing expertise with her passion for holistic health. Following this calling with seeking a more holistic approach to health and wellness, Gloria ventured into the world of vitamin drip therapy.
                </p>
                <p>
                  With a solid background in nursing and deep understanding of human body and given to months of intensive study and research, consultations, and collaborating with experts in the field to ensure her new venture offers the highest quality care to those seeking her services. In 2021, Holistic Vitamin Drips & Wellness Product officially launched, where she combines her nursing expertise with the power of IV therapy.
                </p>
                <p>
                  Today, the lofty idea of Gloria thrives, offering a warm and inviting space where clients can receive personalized treatments tailored to their individual needs. Her dedication to providing exceptional care has built a loyal following, and she continues to be a beacon of wellness in her community.
                </p>
                <p>
                  With each drip administered and each life touched, our founder is living the purpose of her calling and making a difference in the world. Holistic Vitamins Drip and Wellness’ journey was not just a venture but a calling—a calling to heal, nurture, and empower others on their path to well-being.
                </p>
              </div>
              <Link
                href="/treatments"
                className="mt-10 inline-flex items-center gap-4 bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-gold hover:scale-105 transition-all duration-300"
              >
                Experience the difference today &rarr;
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values / Team */}
      <section className="py-32 bg-gradient-to-b from-[#E3E8E1] to-[#F4F1E9] border-t border-[#C4A67B]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[#C4A67B] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">MEET THE TEAM</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#132B23] uppercase">People Behind The Scene</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#FCFAF7]/40 backdrop-blur-xl rounded-[2rem] p-8 border border-[#C4A67B]/30 hover:border-[#C4A67B]/70 hover:shadow-gold transition-all duration-300"
            >
              <h3 className="font-serif text-2xl text-[#132B23] mb-2">Gloria</h3>
              <p className="text-[#C4A67B] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Founder & Managing Director</p>
              <p className="text-[#606864] text-xs leading-relaxed">
                Gloria is an advanced nurse practitioner and dedicated healthcare professional with a passion for optimizing patient well-being. As an Advanced Nurse Practitioner, she brings a wealth of clinical expertise and holistic care to her practice. Gloria is committed to providing personalized and compassionate care to her patients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-[#FCFAF7]/40 backdrop-blur-xl rounded-[2rem] p-8 border border-[#C4A67B]/30 hover:border-[#C4A67B]/70 hover:shadow-gold transition-all duration-300"
            >
              <h3 className="font-serif text-2xl text-[#132B23] mb-2">Hilda</h3>
              <p className="text-[#C4A67B] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Assistant Managing Director in Clinical Practice</p>
              <p className="text-[#606864] text-xs leading-relaxed">
                An experienced nurse, Hilda has been a general nurse and midwife for over 40 years. She currently works in an acute setting and has a passion for teaching the younger generation and delivering exceptional care to people. Hilda is an expert in venepuncture and calculation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <AIFooter />
    </main>
  )
}
