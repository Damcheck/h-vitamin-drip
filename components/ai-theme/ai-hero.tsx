"use client"
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function AIHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Text Reveal Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section ref={ref} className="relative w-full min-h-[100vh] bg-[#F4F1E9] flex flex-col items-center justify-start pt-36 pb-32 overflow-hidden">
      
      <motion.div style={{ opacity: opacityText }} className="relative z-10 w-full flex flex-col items-center">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center w-full">
          {/* Tag */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 px-4 py-1.5 border border-[#C4A67B]/30 rounded-full text-[10px] uppercase tracking-widest text-[#606864] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4A67B] animate-pulse"></span>
            Premium IV Therapy &amp; More
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-center font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-[#132B23] max-w-6xl mx-auto mb-6 uppercase">
            FEEL THE DIFFERENCE WITH PERSONALISED VITAMIN DRIPS
          </motion.h1>

          <motion.p variants={itemVariants} className="text-center text-[#606864] max-w-2xl mx-auto text-sm md:text-base tracking-wide mb-16 px-4">
            We’re globally recognised as an intravenous and intramuscular nutrition clinic, we offer personalised therapies to optimize nutrient delivery and support overall health.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Hero Image Container */}
      <div className="relative w-full max-w-[1200px] h-[550px] md:h-[650px] mx-auto z-0 px-4 md:px-8 mt-4">
        
        {/* Floating Stats Glass Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-16 px-4 md:px-10 py-4 md:py-5 rounded-3xl bg-gradient-to-b from-[#C4A67B]/30 to-[#DBC297]/10 backdrop-blur-xl border border-[#C4A67B]/40 shadow-gold z-20 w-[95%] md:w-auto justify-center"
        >
          <div className="text-center">
             <div className="font-serif text-xl md:text-3xl font-medium text-[#132B23] mb-1">99.9%</div>
             <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-[#132B23]/80 font-bold">Absorption</div>
          </div>
          <div className="w-[1px] h-8 md:h-12 bg-[#132B23]/20"></div>
          <div className="text-center">
             <div className="font-serif text-xl md:text-3xl font-medium text-[#132B23] mb-1">PPG</div>
             <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-[#132B23]/80 font-bold">Clinical</div>
          </div>
          <div className="w-[1px] h-8 md:h-12 bg-[#132B23]/20"></div>
          <div className="text-center">
             <div className="font-serif text-xl md:text-3xl font-medium text-[#132B23] mb-1">2.5</div>
             <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-[#132B23]/80 font-bold">Hydration</div>
          </div>
        </motion.div>

        {/* Parallax Background Image */}
        <div className="absolute inset-x-4 inset-y-0 md:inset-x-8 md:inset-y-0 rounded-t-[3rem] rounded-b-xl overflow-hidden shadow-float">
          <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
            <Image 
              src="/ai_hero_sofa_1777827823407.png" 
              alt="Woman relaxing in luxury" 
              fill 
              className="object-cover object-center"
              priority
            />
          </motion.div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#132B23]/60 via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Levitating Products Images */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-4 md:gap-8 z-30 w-full justify-center px-4">
           <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="relative w-28 h-36 md:w-40 md:h-52 rounded-xl overflow-hidden shadow-lift border border-white/30 transform -rotate-3 hover:scale-105 duration-500"
           >
             <Image src="/ai_products_amber_1777828029216.png" alt="Product" fill className="object-cover" />
           </motion.div>
           
           <motion.div 
             animate={{ y: [0, -25, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="relative w-36 h-44 md:w-52 md:h-64 rounded-xl overflow-hidden shadow-float border border-[#C4A67B]/40 z-10 transform -translate-y-4 hover:scale-105 duration-500"
           >
             <Image src="/ai_frosted_glass_bottles_1777828556271.png" alt="Product" fill className="object-cover" />
           </motion.div>
           
           <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             className="relative w-28 h-36 md:w-40 md:h-52 rounded-xl overflow-hidden shadow-lift border border-white/30 transform rotate-3 hover:scale-105 duration-500"
           >
             <Image src="/ai_green_pill_stone_1777828406737.png" alt="Product" fill className="object-cover" />
           </motion.div>
        </div>
      </div>
    </section>
  )
}
