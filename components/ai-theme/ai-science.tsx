"use client"
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function AIScience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Slow zoom on the marble background
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  const cards = [
    { title: "In Your Home", desc: "Convenient", icon: "🏠" },
    { title: "In Your Office", desc: "Professional", icon: "🏢" },
    { title: "At Our Space", desc: "Private Lounge", icon: "✨" },
    { title: "No Minimum", desc: "Accessible", icon: "💎" }
  ];

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section ref={ref} className="relative w-full py-32 overflow-hidden bg-[#132B23]">
      {/* Background Image with Parallax Zoom */}
      <motion.div style={{ scale: scaleBg }} className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay">
        <Image 
          src="/ai_dark_marble_1777828612578.png" 
          alt="Dark Emerald Marble Texture" 
          fill 
          className="object-cover"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-[#EBE7DF] leading-[1.1] mb-8">
            HOLISTIC VITAMIN DRIPS & WELLNESS
          </h2>
          <p className="text-[#C4A67B] text-lg mb-8 leading-relaxed">
            We help you understand the best ways to tend to your body through advanced testing practices and catered treatments that optimize your health and vitality.
          </p>
          <Link href="/about" className="inline-block bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:shadow-gold hover:scale-105 transition-all duration-300">
            Learn more &rarr;
          </Link>
        </motion.div>

        {/* Right Content - 2x2 Glass Grid */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {cards.map((card, i) => (
            <motion.div variants={cardVariants} key={i} className="group relative bg-[#FCFAF7]/10 backdrop-blur-xl border border-[#C4A67B]/20 p-8 rounded-3xl transition-all duration-500 hover:bg-[#FCFAF7]/20 hover:border-[#C4A67B]/50 hover:shadow-gold cursor-pointer">
              <div className="flex justify-between items-start mb-12">
                <div className="w-10 h-10 rounded-full bg-[#132B23]/50 flex items-center justify-center text-xl border border-[#C4A67B]/20 group-hover:bg-[#C4A67B] group-hover:text-[#132B23] transition-colors duration-500">
                  {card.icon}
                </div>
                <div className="text-[#C4A67B] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                  &rarr;
                </div>
              </div>
              <h3 className="font-serif text-2xl text-[#EBE7DF] mb-2">{card.title}</h3>
              <p className="text-[#C4A67B] text-xs uppercase tracking-widest font-semibold">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div className="relative z-10 mt-32 w-full border-y border-[#C4A67B]/20 bg-[#132B23]/60 backdrop-blur-2xl overflow-hidden py-4 flex whitespace-nowrap">
        <div className="animate-marquee inline-flex items-center gap-12 text-[#DBC297] text-xs tracking-[0.2em] uppercase font-bold px-6">
          <span>Targeted Supplements</span> <span>•</span>
          <span>Powerful IVs</span> <span>•</span>
          <span>Laser Resurfacing</span> <span>•</span>
          <span>Revitalizing Therapeutics</span> <span>•</span>
          <span>Cellular Hydration</span> <span>•</span>
          <span>Essentials &amp; More</span> <span>•</span>
          <span>Targeted Supplements</span> <span>•</span>
          <span>Powerful IVs</span> <span>•</span>
          <span>Laser Resurfacing</span> <span>•</span>
          <span>Revitalizing Therapeutics</span> <span>•</span>
          <span>Cellular Hydration</span> <span>•</span>
          <span>Essentials &amp; More</span>
        </div>
      </div>
    </section>
  )
}
