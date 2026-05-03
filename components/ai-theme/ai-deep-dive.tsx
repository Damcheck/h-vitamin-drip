"use client"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function AIDeepDive() {
  return (
    <section className="bg-[#F4F1E9] py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Image (Slides from Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2"
        >
          <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-float">
            <Image 
              src="/ai_green_pill_stone_1777828406737.png" 
              alt="Feature Deep Dive" 
              fill 
              className="object-cover transition-transform duration-[2s] hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right Content (Slides from Right) */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <p className="text-[#606864] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">FEATURE DEEP DIVE</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#132B23] leading-tight mb-8">
            THE HVITAMIN DIVE:<br/>
            A SYNERGISTIC<br/>
            FOR RADIANCE
          </h2>
          <p className="text-[#606864] text-base leading-relaxed mb-10 max-w-lg">
            A closer look into our bespoke formulated supplements designed for daily wellness. 
            Infused with essential compounds, carefully selected for maximum absorption and clinical efficacy.
          </p>
          
          <Link href="/contact" className="inline-block bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest shadow-gold hover:scale-105 transition-all duration-300">
            Join Our Circle
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
