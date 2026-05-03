"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AIHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#F4F1E9]/80 backdrop-blur-2xl shadow-gold py-2' : 'bg-transparent py-5'}`}>
      {/* Top Banner (hide on scroll) */}
      <div className={`bg-[#C4A67B] text-[#132B23] py-2.5 text-center text-[10px] tracking-widest uppercase font-bold w-full transition-all duration-500 ${isScrolled ? 'h-0 overflow-hidden py-0 opacity-0' : 'opacity-100'}`}>
        BEYOND VITAMIN DRIPS | 100% IV WELLNESS
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between mt-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-[#132B23] text-[#C4A67B] flex items-center justify-center font-bold font-serif text-sm border border-[#C4A67B]/20 transition-transform group-hover:scale-110 duration-500">
            HV
          </div>
          <span className="font-serif text-xl tracking-wide text-[#132B23] group-hover:text-[#C4A67B] transition-colors duration-500">
            HvitaminDrip
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.15em] font-semibold text-[#132B23] uppercase">
          <Link href="/treatments" className="hover:text-[#C4A67B] transition-colors">Treatments</Link>
          <Link href="/shop" className="hover:text-[#C4A67B] transition-colors">Products</Link>
          <Link href="/about" className="hover:text-[#C4A67B] transition-colors">Learn</Link>
          <Link href="/contact" className="hover:text-[#C4A67B] transition-colors">Book</Link>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden md:flex bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-gold transition-all duration-300 hover:scale-105">
            Book a Drip
          </Link>
          <button className="md:hidden text-[#132B23]" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-screen bg-[#132B23]/95 backdrop-blur-3xl z-[100] flex flex-col items-center justify-center"
          >
            <button className="absolute top-8 right-8 text-[#DBC297]" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={36} />
            </button>
            <nav className="flex flex-col items-center gap-8 text-2xl font-serif text-[#EBE7DF]">
              <Link href="/treatments" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#C4A67B]">Treatments</Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#C4A67B]">Products</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#C4A67B]">Learn</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#C4A67B] text-[#132B23] px-8 py-3 rounded-full mt-4 font-sans text-sm tracking-widest uppercase font-bold">Book a Drip</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
