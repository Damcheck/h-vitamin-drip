"use client"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function AIInnovations() {
  const products = [
    { img: "/ai_products_amber_1777828029216.png", name: "H Vitamin Drip", desc: "Anti-Aging Formula" },
    { img: "/ai_green_pill_stone_1777828406737.png", name: "Anti-Aging Extract", desc: "Cellular Renewal" },
    { img: "/ai_frosted_glass_bottles_1777828556271.png", name: "H Vitamin Drip", desc: "Pure Hydration" },
    { img: "/ai_products_amber_1777828029216.png", name: "H Vitamin Drip", desc: "Energy Focus" }
  ];

  return (
    <section className="relative w-full py-32 overflow-hidden bg-[#132B23]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay">
        <Image 
          src="/ai_dark_marble_1777828612578.png" 
          alt="Dark Emerald Marble Texture" 
          fill 
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#C4A67B]/20 pb-8"
        >
          <div>
            <p className="text-[#C4A67B] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">NEW ARRIVALS</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#EBE7DF]">
              EXPLORE THE LATEST INNOVATIONS.
            </h2>
          </div>
          <Link href="/shop" className="text-[#DBC297] text-sm tracking-widest uppercase font-semibold border-b border-[#DBC297] pb-1 hover:text-[#EBE7DF] hover:border-[#EBE7DF] transition-colors mt-6 md:mt-0">
            See All Products &rarr;
          </Link>
        </motion.div>

        {/* Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
          >
          {products.map((p, i) => (
            <Link href="/treatment/glutathione-detox" key={i} className="block w-full">
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="group relative bg-[#FCFAF7]/10 backdrop-blur-2xl rounded-2xl p-3 md:p-4 border border-[#C4A67B]/30 transition-all duration-500 hover:bg-[#FCFAF7]/20 hover:border-[#C4A67B]/60 hover:shadow-gold overflow-hidden cursor-pointer h-full flex flex-col justify-between"
              >
                
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 md:mb-6 bg-[#132B23]/50">
                  <Image 
                    src={p.img} 
                    alt={p.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 mix-blend-lighten"
                  />
                </div>

                <div className="flex justify-between items-end relative z-10">
                  <div className="pr-2">
                    <p className="text-[#C4A67B] text-[7px] md:text-[9px] uppercase tracking-widest mb-1 line-clamp-1">{p.desc}</p>
                    <h3 className="font-serif text-sm md:text-lg text-[#EBE7DF] line-clamp-2">{p.name}</h3>
                  </div>
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#C4A67B] text-[#C4A67B] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:bg-[#C4A67B] group-hover:text-[#132B23] shadow-[0_0_15px_rgba(196,166,123,0.3)] text-xs md:text-base flex-shrink-0">
                    &rarr;
                  </div>
                </div>

              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
