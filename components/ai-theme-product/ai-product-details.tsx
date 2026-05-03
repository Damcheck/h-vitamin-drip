"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useCart } from '@/components/boty/cart-context'
import { useState } from 'react'

export function AIProductDetails({ treatment }: { treatment: any }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  return (
    <section className="bg-[#F4F1E9] py-24 px-6 relative z-30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Left: 2x2 Grid */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="aspect-square bg-[#E8E3D9] rounded-3xl overflow-hidden relative shadow-inner">
             <Image src="/images/products/serum-bottles-1.png" alt="Texture 1" fill className="object-cover mix-blend-multiply opacity-70" />
          </div>
          <div className="aspect-square bg-[#DBC297]/40 rounded-3xl overflow-hidden relative shadow-inner">
             <Image src="/images/products/amber-dropper-bottles.png" alt="Texture 2" fill className="object-cover mix-blend-multiply opacity-70" />
          </div>
          <div className="aspect-square bg-[#132B23]/10 rounded-3xl overflow-hidden relative shadow-inner p-4">
             <Image src="/ai_green_pill_stone_1777828406737.png" alt="Texture 3" fill className="object-cover rounded-2xl" />
          </div>
          <div className="aspect-square bg-[#E8E3D9] rounded-3xl overflow-hidden relative shadow-inner">
             <Image src="/ai_products_amber_1777828029216.png" alt="Texture 4" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Right: Details & CTA */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-[#132B23] uppercase mb-4">
            {treatment.name}
          </h2>
          
          <div className="flex items-center gap-2 mb-6 text-[#C4A67B]">
            {[1, 2, 3, 4, 5].map((i) => (
               <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <div className="text-4xl font-bold text-[#132B23] mb-8">
            ₦{treatment.price.toLocaleString()}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 bg-white/50 border border-[#C4A67B]/30 rounded-full w-fit px-4 py-2 mb-8 shadow-inner">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#606864] hover:text-[#132B23] px-2 text-lg">−</button>
            <span className="text-[#132B23] font-bold w-6 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="text-[#606864] hover:text-[#132B23] px-2 text-lg">+</button>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-4 mb-12">
            <button 
              onClick={() => addItem({ id: treatment.id, name: treatment.name, price: treatment.price, image: treatment.image })}
              className="w-full md:w-3/4 bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-gold hover:scale-105 transition-all duration-300"
            >
              Add to Cart
            </button>
            <a 
              href={`https://wa.me/2348000000000?text=Hi, I want to buy ${treatment.name}`}
              className="w-full md:w-3/4 bg-[#132B23] text-[#EBE7DF] py-4 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-all duration-300 text-center"
            >
              Buy Now
            </a>
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-4">
            {(treatment.benefits || ["Accelerated Skin Repair", "Deep Dermal Hydration", "Cellular Amplification"]).slice(0, 3).map((benefit: string, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#DBC297]/20 flex items-center justify-center text-[#132B23] font-bold">
                  ✓
                </div>
                <span className="text-[#132B23] font-medium text-sm">{benefit}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
