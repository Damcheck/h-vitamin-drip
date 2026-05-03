"use client"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function AIFooter() {
  const pills1 = [
    { name: "Compound", icon: "🧬" },
    { name: "Isolation", icon: "🔬" },
    { name: "Compound", icon: "🧬" },
    { name: "Therapy", icon: "⚡" },
    { name: "Restore", icon: "🌿" },
    { name: "Compounds", icon: "🧬" }
  ];

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  return (
    <footer className="w-full">
      {/* 1. Subscribe Section */}
      <div className="bg-[#0B1A14] py-24 px-6 border-b border-[#C4A67B]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-end mb-12"
          >
            <div>
              <p className="text-[#DBC297] text-[10px] uppercase tracking-[0.2em] font-bold mb-2">EXCLUSIVE</p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#EBE7DF]">
                Subscribe and Get <span className="text-[#DBC297] italic">25%</span>
              </h2>
            </div>
            <Link href="/contact" className="text-[#DBC297] text-sm tracking-widest uppercase font-semibold border-b border-[#DBC297] pb-1 hover:text-[#EBE7DF] hover:border-[#EBE7DF] transition-colors mt-6 md:mt-0">
              Join Now &rarr;
            </Link>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-wrap gap-4"
          >
            {pills1.map((pill, i) => (
              <motion.div variants={pillVariants} key={i} className="flex-1 min-w-[120px] bg-[#EBE7DF] rounded-3xl py-8 px-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-[#DBC297]/30">
                <span className="text-2xl">{pill.icon}</span>
                <span className="text-[#132B23] text-xs font-semibold uppercase tracking-wider">{pill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. Powered By Section */}
      <div className="relative py-24 px-6 bg-[#132B23] overflow-hidden border-b border-[#C4A67B]/10">
        <motion.div 
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.1 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay"
        >
          <Image src="/ai_dark_marble_1777828612578.png" alt="Marble" fill className="object-cover" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#DBC297] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">THE LONG RUN</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#EBE7DF] mb-12 max-w-2xl">
              POWERED BY SCIENTIFICALLY-CURATED COMPOUNDS
            </h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-wrap gap-4"
          >
            {pills1.map((pill, i) => (
              <motion.div variants={pillVariants} key={i} className="flex-1 min-w-[120px] bg-[#FCFAF7]/10 backdrop-blur-2xl border border-[#C4A67B]/30 rounded-3xl py-6 px-4 flex flex-col items-center justify-center gap-3 hover:bg-[#FCFAF7]/20 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(196,166,123,0.3)]">
                <span className="text-xl opacity-80">{pill.icon}</span>
                <span className="text-[#DBC297] text-[10px] font-semibold uppercase tracking-wider">{pill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 3. Final Footer */}
      <div className="bg-[#0B1A14] pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center mb-24"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-[#EBE7DF]">
              READY TO FEEL BETTER?
            </h2>
            <div className="flex gap-4 mt-8 md:mt-0">
              <Link href="/contact" className="bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-gold hover:scale-105 transition-all duration-300">
                Start Your Journey
              </Link>
              <Link href="/about" className="border border-[#C4A67B] text-[#C4A67B] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C4A67B] hover:text-[#132B23] transition-all duration-300">
                Join Now
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-[#C4A67B]/20 pt-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="w-8 h-8 rounded-full bg-[#132B23] text-[#C4A67B] flex items-center justify-center font-bold font-serif text-xs border border-[#C4A67B]/20 group-hover:scale-110 transition-transform duration-300">
                  HV
                </div>
                <span className="font-serif text-lg tracking-wide text-[#EBE7DF] group-hover:text-[#C4A67B] transition-colors duration-300">
                  HvitaminDrip
                </span>
              </Link>
              <p className="text-[#606864] text-xs leading-loose mb-6">
                Building multi-layer luxury wellness experiences for the modern soul.
              </p>
              <div className="flex flex-col gap-2 text-[#606864] text-xs">
                <span>&copy; 2026 Hvitamin Drip</span>
                <span>All rights reserved.</span>
              </div>
            </div>

            <div>
              <h4 className="text-[#DBC297] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Treatments</h4>
              <ul className="flex flex-col gap-4 text-[#EBE7DF] text-xs">
                <li><Link href="/treatments" className="hover:text-[#C4A67B] transition-colors">IV Drips</Link></li>
                <li><Link href="/treatments" className="hover:text-[#C4A67B] transition-colors">Boosters</Link></li>
                <li><Link href="/about" className="hover:text-[#C4A67B] transition-colors">Wellness</Link></li>
                <li><Link href="/about" className="hover:text-[#C4A67B] transition-colors">Anti-Aging</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#DBC297] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Resources</h4>
              <ul className="flex flex-col gap-4 text-[#EBE7DF] text-xs">
                <li><Link href="/blog" className="hover:text-[#C4A67B] transition-colors">Journal</Link></li>
                <li><Link href="/about" className="hover:text-[#C4A67B] transition-colors">Science</Link></li>
                <li><Link href="/faqs" className="hover:text-[#C4A67B] transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#DBC297] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Legal</h4>
              <ul className="flex flex-col gap-4 text-[#EBE7DF] text-xs">
                <li><Link href="/privacy-policy" className="hover:text-[#C4A67B] transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#C4A67B] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  )
}
