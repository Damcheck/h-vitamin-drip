"use client"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function AIProductTestimonials() {
  const reviews = [
    { name: "Customer 1", img: "/images/people/person-1.jpg" },
    { name: "Customer 2", img: "/images/people/person-2.jpg" },
    { name: "Customer 3", img: "/images/people/person-3.jpg" },
    { name: "Customer 4", img: "/images/people/person-4.jpg" }
  ];

  return (
    <section className="bg-[#F4F1E9] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#606864] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">PROVEN</p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#132B23] uppercase">
            TESTIMONIALS OF LUMINESCENCE
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {reviews.map((r, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              key={i} 
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-[2rem] overflow-hidden border border-[#C4A67B]/30 shadow-gold group cursor-pointer"
            >
              {/* Image (Using generic placeholder logic to prevent 404s if missing) */}
              <div className="absolute inset-0 bg-[#E8E3D9] flex items-center justify-center text-xs text-[#C4A67B]">
                <Image src={r.img} alt={r.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => e.currentTarget.style.display = 'none'} />
              </div>

              {/* Glass Footer Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#132B23]/90 to-transparent backdrop-blur-sm">
                <p className="text-[10px] text-[#EBE7DF] uppercase tracking-widest font-bold mb-2">VERIFIED</p>
                <div className="flex items-center gap-1 text-[#C4A67B]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
