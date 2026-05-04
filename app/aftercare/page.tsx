"use client"

import { motion } from "framer-motion"
import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIFooter } from "@/components/ai-theme/ai-footer"

export default function AftercarePage() {
  return (
    <main className="min-h-screen bg-[#F4F1E9]">
      <AIHeader />

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#C4A67B] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">POST-TREATMENT</p>
            <h1 className="font-serif text-5xl md:text-7xl text-[#132B23] uppercase leading-tight mb-8">
              AFTERCARE<br />GUIDE
            </h1>
            <p className="text-[#606864] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Thank you for choosing Holistic Vitamins & Wellness. To ensure you get the maximum benefit from your treatment, please follow these post-drip instructions carefully.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 pb-32">
        <div className="max-w-4xl mx-auto px-6 grid gap-8">
          
          {/* Instructions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-10 md:p-12 border border-[#C4A67B]/20 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#132B23] flex items-center justify-center text-[#DBC297] text-xl">🛡️</div>
              <h2 className="font-serif text-2xl text-[#132B23]">Immediate Instructions</h2>
            </div>
            <ul className="space-y-4">
              {[
                "Keep your bandage on for at least 30 minutes.",
                "Change the bandage if bleeding persists.",
                "Keep the puncture site clean and dry.",
                "Avoid water exposure for at least an hour."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#606864] text-sm leading-relaxed">
                  <span className="text-[#C4A67B] mt-0.5">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Side Effects */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-10 md:p-12 border border-[#C4A67B]/20 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-[#132B23] flex items-center justify-center text-[#DBC297] text-xl">ℹ️</div>
              <h2 className="font-serif text-2xl text-[#132B23]">Potential Side Effects</h2>
            </div>
            <p className="text-[#606864] text-sm mb-6">While our drips are a very low-risk procedure, some individuals may experience:</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#606864] text-sm leading-relaxed">
                <span className="text-[#C4A67B] mt-0.5">✦</span>
                Minor pain, bruising, or swelling at the injection site.
              </li>
              <li className="flex items-start gap-3 text-[#606864] text-sm leading-relaxed">
                <span className="text-[#C4A67B] mt-0.5">✦</span>
                Rare instances of infection, allergic reactions, or blood clots.
              </li>
            </ul>
          </motion.div>

          {/* Warnings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-red-50 rounded-[2rem] p-10 md:p-12 border border-red-200 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl">⚠️</div>
              <h2 className="font-serif text-2xl text-red-900">Seek Immediate Medical Attention If:</h2>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-red-800 text-sm leading-relaxed">
                <span className="text-red-500 mt-0.5">•</span>
                You experience severe allergic reactions (difficulty breathing, swelling of face, lips, or tongue).
              </li>
              <li className="flex items-start gap-3 text-red-800 text-sm leading-relaxed">
                <span className="text-red-500 mt-0.5">•</span>
                You develop persistent redness, swelling, or warmth around the injection site.
              </li>
              <li className="flex items-start gap-3 text-red-800 text-sm leading-relaxed">
                <span className="text-red-500 mt-0.5">•</span>
                You have excessive bleeding that doesn’t stop.
              </li>
            </ul>
            <p className="text-sm font-bold text-red-900">If you have any concerns, please contact us immediately.</p>
          </motion.div>

          <p className="text-center text-xs text-[#606864] mt-8">
            Disclaimer: Our drips are not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary.
          </p>
        </div>
      </section>

      <AIFooter />
    </main>
  )
}
