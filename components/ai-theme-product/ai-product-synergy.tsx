"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'

export function AIProductSynergy() {
  const compounds = [
    { name: "Compound 1", icon: "🧬" },
    { name: "Skincare", icon: "💧" },
    { name: "Restore", icon: "🌿" },
    { name: "Energy", icon: "⚡" },
    { name: "Wellness", icon: "☀️" },
    { name: "Antioxidants", icon: "🔬" },
    { name: "Luminescence", icon: "✨" },
    { name: "Hydration", icon: "🧊" },
    { name: "Pro-Care", icon: "🛡️" },
    { name: "Bio-Active", icon: "🦠" }
  ];

  return (
    <section className="relative bg-[#132B23] py-24 overflow-hidden border-t border-[#C4A67B]/20">
      
      {/* Dark Marble Background */}
      <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay pointer-events-none">
        <Image src="/ai_dark_marble_1777828612578.png" alt="Marble" fill className="object-cover" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16 px-6">
          <p className="text-[#DBC297] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">COMPOUND</p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#EBE7DF] uppercase">
            COMPOUND SYNERGY PICKER
          </h2>
        </div>

        {/* Scrolling Picker */}
        <div className="w-full overflow-x-auto no-scrollbar px-6 pb-8 flex items-center gap-4 snap-x">
          {compounds.map((comp, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              key={i} 
              className="snap-center shrink-0 min-w-[140px] flex flex-col items-center justify-center gap-4 bg-[#FCFAF7]/10 backdrop-blur-xl border border-[#C4A67B]/30 rounded-full py-8 px-4 cursor-pointer hover:bg-[#FCFAF7]/20 hover:border-[#C4A67B]/70 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-2xl">{comp.icon}</div>
              <span className="text-[10px] uppercase tracking-widest text-[#DBC297] font-semibold text-center">{comp.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
