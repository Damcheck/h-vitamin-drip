"use client"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function AICollection() {
  const products = [
    {
      id: 1,
      name: "The Radiance Drip",
      desc: "Glutathione, Vitamin C, Biotin",
      price: "$199",
      img: "/ai_products_amber_1777828029216.png"
    },
    {
      id: 2,
      name: "Immunity Elixir",
      desc: "High Dose Vitamin C, Zinc, B-Complex",
      price: "$149",
      img: "/ai_frosted_glass_bottles_1777828556271.png"
    },
    {
      id: 3,
      name: "Deep Hydration",
      desc: "Electrolytes, Magnesium, B12",
      price: "$129",
      img: "/placeholder.jpg" // fallback to existing images for variety
    },
    {
      id: 4,
      name: "Energy Boost",
      desc: "NAD+, B12, Amino Acids",
      price: "$249",
      img: "/ai_green_pill_stone_1777828406737.png"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section className="bg-[#F4F1E9] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl text-[#132B23] uppercase leading-tight">
              The Curated Collection.<br />Our Signature Elixirs.
            </h2>
          </div>
          <Link href="/shop" className="text-[#132B23] text-sm tracking-widest uppercase font-semibold border-b border-[#132B23] pb-1 hover:text-[#C4A67B] hover:border-[#C4A67B] transition-colors mt-6 md:mt-0">
            See All Products &rarr;
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((p) => (
            <Link href="/treatment/radiance-drip" key={p.id} className="block w-full">
              <motion.div variants={cardVariants} className="group relative bg-[#FCFAF7]/40 backdrop-blur-md rounded-[2rem] p-4 border border-[#C4A67B]/20 transition-all duration-500 hover:shadow-gold hover:border-[#C4A67B]/70 hover:bg-[#FCFAF7]/80 flex flex-col h-full cursor-pointer">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-6 bg-[#F4F1E9]">
                <Image 
                  src={p.img} 
                  alt={p.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#132B23]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow justify-between px-2">
                <div>
                  <h3 className="font-serif text-xl text-[#132B23] mb-2">{p.name}</h3>
                  <p className="text-[#606864] text-xs tracking-wide leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-[#132B23]/10 pt-4 mt-auto">
                  <span className="font-semibold text-[#132B23] text-sm">Book {p.price}</span>
                  <div className="w-8 h-8 rounded-full bg-[#132B23] text-[#C4A67B] flex items-center justify-center transform group-hover:-rotate-45 transition-transform duration-300 shadow-gold">
                    &rarr;
                  </div>
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
