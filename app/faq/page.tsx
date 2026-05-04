"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIFooter } from "@/components/ai-theme/ai-footer"
import Image from "next/image"

const faqs = [
  {
    question: "What is IV Drip Hydration?",
    answer: "IV Drip Hydration is a low-risk procedure of administering vitamins and medications directly into the bloodstream. It ensures 100% absorption of nutrients for immediate effect."
  },
  {
    question: "Where do you offer your services?",
    answer: "We offer convenient IV drip and booster treatments at your preferred location within the Bexleyheath, Kent Area, and at any of our stores. We also specialize in Home and Office visits to bring wellness directly to your door."
  },
  {
    question: "Are the drips a substitute for a healthy lifestyle?",
    answer: "While our vitamin drips and boosters can significantly contribute to overall health, energy, and wellbeing, they are not a substitute for a healthy lifestyle. We recommend combining our treatments with regular exercise and a balanced diet for optimal results."
  },
  {
    question: "What is the difference between a Drip and a Booster?",
    answer: "A Drip is an Intravenous Drip administered via a cannula into a vein in your arm, taking around 40 minutes to deliver fluid and nutrients. A Booster Shot is a quick injection of a highly-concentrated single nutrient into the muscle in the arm."
  },
  {
    question: "How often should I get a vitamin drip?",
    answer: "We recommend that everyone listens to their own body. On average, we suggest having a Drip approximately once a month to maintain optimal hydration and nutrient levels."
  },
  {
    question: "Are there any age restrictions?",
    answer: "Yes, for safety and regulatory reasons, all clients must be over the age of 18 at the time of their appointment."
  },
  {
    question: "Are your staff qualified?",
    answer: "Absolutely. Our practice is entirely nurse-led. All treatments are administered by certified, NMC registered nurses, and we are fully insured by Westminster Insurance."
  }
]

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

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

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#C4A67B] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">SUPPORT</p>
            <h1 className="font-serif text-5xl md:text-6xl text-[#EBE7DF] uppercase leading-tight mb-6">
              Frequently Asked<br/>Questions
            </h1>
            <p className="text-[#DBC297] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Everything you need to know about our premium IV therapy, booster shots, and home-delivery services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isActive = activeIndex === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`border border-[#C4A67B]/20 rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? 'bg-[#FCFAF7]/10 backdrop-blur-xl shadow-[0_0_20px_rgba(196,166,123,0.15)]' : 'bg-[#FCFAF7]/5 hover:bg-[#FCFAF7]/10'}`}
                >
                  <button 
                    onClick={() => setActiveIndex(isActive ? null : idx)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                  >
                    <span className="font-serif text-xl text-[#EBE7DF]">{faq.question}</span>
                    <span className={`text-[#C4A67B] text-2xl transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-8 pb-6 text-[#b3b9b6] text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

        </div>
      </section>

      <AIFooter />
    </main>
  )
}
