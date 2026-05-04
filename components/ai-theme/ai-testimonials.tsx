"use client"
import { motion } from 'framer-motion'

export function AITestimonials() {
  const reviews = [
    {
      text: "Holistic vitamin drip staff Gloria came to my house to administer the Myers cocktail. She is so professional, very patient as I have needle phobia and I feel great after my drip infusion, I will highly recommend them for all your vitamins and wellness products.",
      author: "Claire",
      role: "Verified Client",
      tag: "MYERS COCKTAIL"
    },
    {
      text: "This Hvitamindrip literally changed my life. As a mum of 4 and a businesswoman, my life is so hectic that I was always so tired until I got introduced to this Hvitamindrip. Since I started taking it, I have got my energy back, my skin glows.",
      author: "Claudine",
      role: "Verified Client",
      tag: "ENERGY DRIP"
    },
    {
      text: "The Vitamin drip was amazing! Prior to receiving it I was constantly feeling tired, dull and exhausted, but after taking it I feel lighter, re-energised and like myself again. My friends have also told me that my face looks a lot brighter.",
      author: "Eniola",
      role: "Verified Client",
      tag: "SKIN GLOW"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  }

  return (
    <section className="bg-[#F4F1E9] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#606864] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">TESTIMONIALS</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#132B23]">
            WHAT OUR CUSTOMERS ARE SAYING ABOUT US.
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {reviews.map((review, i) => (
            <motion.div variants={cardVariants} key={i} className="bg-[#FCFAF7]/60 backdrop-blur-xl border border-[#C4A67B]/20 p-10 rounded-[2rem] hover:shadow-gold hover:-translate-y-2 hover:bg-[#FCFAF7] transition-all duration-500 flex flex-col justify-between">
              
              <div>
                <div className="text-4xl text-[#C4A67B] font-serif mb-6 leading-none">“</div>
                <div className="flex gap-1 text-[#C4A67B] mb-6">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-[#606864] text-sm leading-relaxed mb-8">
                  {review.text}
                </p>
              </div>

              <div>
                <span className="inline-block border border-[#C4A67B]/30 text-[#C4A67B] text-[9px] uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                  {review.tag}
                </span>
                
                <div className="flex items-center gap-4 pt-6 border-t border-[#132B23]/10">
                  <div className="w-10 h-10 rounded-full bg-[#132B23] flex items-center justify-center text-[#DBC297] font-serif text-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#132B23] text-sm">{review.author}</h4>
                    <p className="text-[10px] text-[#606864] uppercase tracking-wider">{review.role}</p>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
