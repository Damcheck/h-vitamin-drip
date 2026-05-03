"use client"
import { motion } from 'framer-motion'

export function AIProductPathway() {
  const steps = [
    { time: "Week 1-2", effect: "Initial Glow", icon: "✨" },
    { time: "Week 2-3", effect: "Cellular Rejuvenation", icon: "🧬" },
    { time: "Week 3-4", effect: "Cellular Regeneration", icon: "🔬" },
    { time: "Week 5-6", effect: "Elegant Glow", icon: "🌟" },
    { time: "Week 7-8", effect: "Cellular Luminescence", icon: "⚡" }
  ];

  return (
    <section className="bg-[#E3E8E1] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#606864] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">METHODOLOGY</p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#132B23] uppercase">
            A PATHWAY TO LUMINESCENCE
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative w-full flex flex-col md:flex-row justify-between items-start md:items-center">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-[1px] bg-[#132B23]/20 z-0"></div>

          {steps.map((step, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              key={i} 
              className="relative z-10 flex flex-row md:flex-col items-center text-center gap-6 md:gap-4 mb-8 md:mb-0"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border border-[#132B23]/10 shadow-lg shrink-0">
                <span className="text-3xl text-[#132B23]">{step.icon}</span>
              </div>
              <div className="flex flex-col text-left md:text-center mt-2">
                <p className="text-[#606864] text-[10px] uppercase tracking-[0.1em] font-bold mb-1">{step.time}</p>
                <h4 className="font-bold text-[#132B23] text-sm uppercase max-w-[120px]">{step.effect}</h4>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}
