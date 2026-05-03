"use client"
import { motion } from 'framer-motion'

export function AIProductApplication() {
  const steps = [
    { title: "Cleansing", desc: "Cleansing the area ensures maximum absorption.", icon: "✨" },
    { title: "Use the calibrated system", desc: "Administer using our proprietary medical protocols.", icon: "💧" },
    { title: "Post-care", desc: "Maintain the glow with dedicated nutrient lock-in routines.", icon: "🌿" }
  ];

  return (
    <section className="bg-gradient-to-b from-[#F4F1E9] to-[#E3E8E1] py-24 px-6 border-t border-[#C4A67B]/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#606864] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">DETAILED</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#132B23] uppercase">
            APPLICATION ARCHITECTURE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              key={i} 
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DBC297] to-[#C4A67B] flex items-center justify-center text-2xl mb-6 shadow-gold">
                {step.icon}
              </div>
              <h4 className="font-bold text-[#132B23] text-sm uppercase tracking-wider mb-3">{step.title}</h4>
              <p className="text-[#606864] text-xs leading-relaxed max-w-[200px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
