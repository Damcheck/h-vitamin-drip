"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'

export function AIProductIngredients({ treatment }: { treatment: any }) {
  const ingredients = treatment.keyIngredients || [
    "Mushroom cultures",
    "Rare botanical extracts",
    "Minerals",
    "Antioxidants"
  ];

  return (
    <section className="bg-[#F4F1E9] py-24 px-6 border-t border-[#C4A67B]/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#606864] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">INGREDIENT</p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#132B23] uppercase">
            CULTIVATED FROM THE CORE
          </h2>
        </div>

        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12 w-full md:w-1/3 text-center md:text-right"
          >
            <div>
              <h4 className="font-bold text-[#132B23] text-sm mb-2">{ingredients[0] || "Active Compound"}</h4>
              <p className="text-[#606864] text-xs leading-relaxed">Micro-cellular nutrient delivery system embedded within botanicals.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#132B23] text-sm mb-2">{ingredients[1] || "Botanicals"}</h4>
              <p className="text-[#606864] text-xs leading-relaxed">Rare elements extracted from core botanical ecosystems.</p>
            </div>
          </motion.div>

          {/* Center Image */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border border-[#C4A67B]/30 z-10"
          >
             <Image src="/ai_green_pill_stone_1777828406737.png" alt="Ingredients" fill className="object-cover" />
          </motion.div>

          {/* Right Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12 w-full md:w-1/3 text-center md:text-left"
          >
            <div>
              <h4 className="font-bold text-[#132B23] text-sm mb-2">{ingredients[2] || "Minerals"}</h4>
              <p className="text-[#606864] text-xs leading-relaxed">Electrolytes optimized for immediate cellular absorption.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#132B23] text-sm mb-2">{ingredients[3] || "Vitamins"}</h4>
              <p className="text-[#606864] text-xs leading-relaxed">Essential vitamins to revitalize the body's natural state.</p>
            </div>
          </motion.div>
        </div>

        {/* Detailed Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#FCFAF7]/60 backdrop-blur-md border border-[#C4A67B]/30 p-8 rounded-[2rem] max-w-4xl mx-auto shadow-inner text-center"
        >
          <p className="text-[#606864] text-xs md:text-sm leading-loose">
            Detailed description of the core ingredients of {treatment.name}. We source the finest {ingredients.join(", ")}, synthesized using advanced extraction methods to ensure maximum bioavailability and clinical efficacy inside our treatments.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
