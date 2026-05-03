"use client"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import type { Treatment } from '@/lib/products'
import { useState, useEffect } from 'react'

export function AIProductRelated({ currentTreatmentId }: { currentTreatmentId: string }) {
  const [related, setRelated] = useState<Treatment[]>([])

  useEffect(() => {
    async function loadRelated() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .neq('id', currentTreatmentId)
        .limit(3)
      
      if (data) {
        setRelated(data.map(d => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          category: d.category,
          tagline: d.tagline,
          description: d.description,
          price: Number(d.price),
          image: d.image,
          duration: d.duration,
          featured: d.featured,
        })) as Treatment[])
      }
    }
    loadRelated()
  }, [currentTreatmentId])

  return (
    <section className="bg-[#F4F1E9] py-24 px-6 border-t border-[#C4A67B]/20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side Text */}
        <div className="w-full lg:w-1/3">
          <p className="text-[#606864] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">GUIDED FOR</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#132B23] uppercase leading-tight">
            EXPLORE THE<br/>SYNERGY
          </h2>
        </div>

        {/* Right Side Cards */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((t, i) => (
            <Link href={`/treatment/${t.slug}`} key={t.id} className="block w-full">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#C4A67B]/20 hover:border-[#C4A67B]/60 hover:shadow-gold transition-all duration-300 h-full cursor-pointer"
              >
                <div className="relative aspect-square bg-[#F4F1E9] p-6 flex items-center justify-center">
                  <Image src={t.image} alt={t.name} fill className="object-contain p-6 transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                   <h3 className="font-serif text-[#132B23] font-bold text-lg mb-1">{t.name}</h3>
                   <div className="flex items-center justify-between mt-4">
                     <span className="text-[#606864] text-xs font-semibold uppercase tracking-widest">₦{t.price.toLocaleString()}</span>
                     <span className="w-6 h-6 rounded-full border border-[#132B23] flex items-center justify-center text-[#132B23] text-xs group-hover:bg-[#132B23] group-hover:text-[#DBC297] transition-all duration-300">&rarr;</span>
                   </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
