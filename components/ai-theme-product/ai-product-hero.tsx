"use client"
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function AIProductHero({ treatment }: { treatment: any }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative w-full min-h-[90vh] bg-gradient-to-b from-[#F4F1E9] to-[#D5E1D6] flex flex-col items-center justify-start pt-36 pb-32 overflow-hidden">
      
      {/* Title */}
      <motion.div style={{ opacity: opacityText }} className="relative z-10 w-full flex flex-col items-center text-center px-4 mb-16">
        <p className="text-[#606864] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">POSSIBILITY BY DESIGN</p>
        <h1 className="font-serif text-5xl md:text-7xl text-[#132B23] uppercase leading-tight max-w-4xl mx-auto">
          THE SIGNATURE<br />{treatment.name}
        </h1>
      </motion.div>

      {/* Main Image Area */}
      <div className="relative w-full max-w-5xl h-[500px] md:h-[600px] mx-auto z-20 flex justify-center items-end px-4">
        
        {/* Model Background (Parallax) */}
        <motion.div style={{ y: yBg }} className="absolute right-0 top-0 w-1/3 h-2/3 rounded-2xl overflow-hidden opacity-80 z-0 hidden md:block">
          <Image src="/ai_hero_sofa_1777827823407.png" alt="Model" fill className="object-cover" />
        </motion.div>

        {/* Floating Stats - Left */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-4 md:left-24 top-1/3 bg-[#FCFAF7]/60 backdrop-blur-xl border border-[#C4A67B]/30 rounded-2xl p-4 flex flex-col items-center shadow-gold z-30"
        >
          <div className="text-xl mb-1">⚡</div>
          <div className="font-serif text-2xl text-[#132B23] font-bold">99%</div>
          <div className="text-[8px] uppercase tracking-widest text-[#606864] text-center max-w-[80px]">Bioavailability</div>
        </motion.div>

        {/* Floating Stats - Right */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-4 md:right-24 top-1/4 bg-[#FCFAF7]/60 backdrop-blur-xl border border-[#C4A67B]/30 rounded-2xl p-4 flex flex-col items-center shadow-gold z-30"
        >
          <div className="text-xl mb-1">💧</div>
          <div className="font-serif text-2xl text-[#132B23] font-bold">35%</div>
          <div className="text-[8px] uppercase tracking-widest text-[#606864] text-center max-w-[80px]">Cellular Hydration</div>
        </motion.div>

        {/* Product Bottle */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-64 h-80 md:w-80 md:h-[400px] z-20"
        >
          <Image src={treatment.image || "/ai_products_amber_1777828029216.png"} alt={treatment.name} fill className="object-contain" />
        </motion.div>

        {/* Green Marble Slab */}
        <div className="absolute bottom-0 w-[120%] md:w-[150%] h-32 md:h-48 z-10 transform -translate-x-1/2 left-1/2">
          <Image src="/ai_dark_marble_1777828612578.png" alt="Marble Slab" fill className="object-cover" style={{ transform: "perspective(1000px) rotateX(75deg)" }} />
        </div>
      </div>
    </section>
  )
}
