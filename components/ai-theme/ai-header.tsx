"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, FileText, HeartHandshake, ShieldCheck, HelpCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

const resourcesLinks = [
  { href: "/faq", label: "FAQ", icon: HelpCircle, desc: "Common questions answered." },
  { href: "/aftercare", label: "Aftercare", icon: HeartHandshake, desc: "Post-treatment guidelines." },
  { href: "/become-a-partner", label: "Partner", icon: ShieldCheck, desc: "B2B and healthcare partnerships." },
  { href: "/terms-of-service", label: "Terms", icon: FileText, desc: "Legal and booking policies." },
]

export function AIHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResourcesHovered, setIsResourcesHovered] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setMobileResourcesOpen(false)
  }, [pathname])

  return (
    <>
      {/* 
        ========================
        DESKTOP & MOBILE HEADER
        ========================
      */}
      <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 flex justify-center ${isScrolled ? 'pt-4' : 'pt-0'}`}>
        
        {/* Top Banner (hide on scroll) */}
        {!isScrolled && (
          <div className="absolute top-0 left-0 w-full bg-[#C4A67B] text-[#132B23] py-2.5 text-center text-[10px] tracking-widest uppercase font-bold z-0">
            BEYOND VITAMIN DRIPS | 100% IV WELLNESS
          </div>
        )}

        <div 
          className={`relative z-10 transition-all duration-500 flex items-center justify-between w-full
            ${isScrolled 
              ? 'max-w-5xl mx-4 px-6 md:px-8 py-3 bg-[#FCFAF7]/80 backdrop-blur-xl border border-[#C4A67B]/20 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]' 
              : 'max-w-7xl mx-auto px-6 py-5 mt-10'
            }`}
        >
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#132B23] text-[#C4A67B] flex items-center justify-center font-bold font-serif text-sm border border-[#C4A67B]/20 transition-transform group-hover:rotate-12 duration-500 shadow-sm">
              HV
            </div>
            <span className="font-serif text-xl tracking-wide transition-colors duration-500 text-[#132B23]">
              HvitaminDrip
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.15em] font-semibold uppercase text-[#132B23]">
            <Link href="/treatments" className="hover:text-[#C4A67B] transition-colors">Treatments</Link>
            <Link href="/shop" className="hover:text-[#C4A67B] transition-colors">Products</Link>
            <Link href="/about" className="hover:text-[#C4A67B] transition-colors">Our Story</Link>
            
            {/* Resources Dropdown */}
            <div 
              className="relative h-full flex items-center py-2 cursor-pointer group"
              onMouseEnter={() => setIsResourcesHovered(true)}
              onMouseLeave={() => setIsResourcesHovered(false)}
            >
              <span className="flex items-center gap-1 hover:text-[#C4A67B] transition-colors">
                Resources <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isResourcesHovered ? 'rotate-180' : ''}`} />
              </span>
              
              {/* Mega Menu */}
              <AnimatePresence>
                {isResourcesHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-[#FCFAF7]/95 backdrop-blur-2xl border border-[#C4A67B]/30 rounded-3xl p-6 shadow-2xl z-50 grid grid-cols-2 gap-4"
                  >
                    {/* Invisible Bridge to keep hover active */}
                    <div className="absolute -top-6 left-0 w-full h-8 bg-transparent" />
                    
                    {resourcesLinks.map((link, idx) => (
                      <Link 
                        key={idx} 
                        href={link.href}
                        className="group/link flex flex-col gap-2 p-4 rounded-2xl hover:bg-[#132B23]/5 transition-colors border border-transparent hover:border-[#C4A67B]/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#132B23]/10 text-[#132B23] flex items-center justify-center group-hover/link:bg-[#C4A67B] group-hover/link:text-[#132B23] transition-colors">
                            <link.icon className="w-4 h-4" />
                          </div>
                          <span className="font-serif text-[#132B23] text-sm capitalize tracking-normal">{link.label}</span>
                        </div>
                        <p className="text-[9px] text-[#606864] normal-case tracking-normal leading-relaxed opacity-80 group-hover/link:opacity-100">
                          {link.desc}
                        </p>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/contact" className={`hidden md:flex px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-md ${isScrolled ? 'bg-[#132B23] text-[#DBC297] hover:bg-[#C4A67B] hover:text-[#132B23]' : 'bg-[#DBC297] text-[#132B23] hover:bg-white'}`}>
              Book a Drip
            </Link>
            
            <button 
              className={`md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border transition-colors ${isScrolled ? 'border-[#132B23]/20 text-[#132B23]' : 'border-[#132B23]/20 text-[#132B23]'}`} 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="w-4 h-[1.5px] bg-current block transition-all mb-1"></span>
              <span className="w-4 h-[1.5px] bg-current block transition-all mb-1"></span>
              <span className="w-4 h-[1.5px] bg-current block transition-all"></span>
            </button>
          </div>
        </div>
      </header>

      {/* 
        ========================
        MOBILE OVERLAY MENU
        ========================
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full h-screen bg-[#132B23]/95 backdrop-blur-3xl z-[100] flex flex-col overflow-y-auto"
          >
            {/* Mobile Header Inside Overlay */}
            <div className="w-full flex items-center justify-between px-6 py-6 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C4A67B] text-[#132B23] flex items-center justify-center font-bold font-serif text-sm">
                  HV
                </div>
              </div>
              <button 
                className="w-10 h-10 rounded-full border border-[#C4A67B]/30 text-[#C4A67B] flex flex-col justify-center items-center relative overflow-hidden group" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="w-4 h-[1.5px] bg-current block absolute rotate-45 transition-transform group-hover:rotate-90"></span>
                <span className="w-4 h-[1.5px] bg-current block absolute -rotate-45 transition-transform group-hover:-rotate-90"></span>
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 flex flex-col justify-center px-8 py-10 gap-6">
              {[
                { href: "/treatments", label: "Treatments" },
                { href: "/shop", label: "Products" },
                { href: "/about", label: "Our Story" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                >
                  <Link href={item.href} className="font-serif text-4xl text-[#EBE7DF] hover:text-[#C4A67B] transition-colors block">
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Accordion for Resources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-t border-white/10 pt-6 mt-4"
              >
                <button 
                  className="flex items-center justify-between w-full font-serif text-4xl text-[#EBE7DF]"
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-6 h-6 text-[#C4A67B] transition-transform duration-300 ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileResourcesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden flex flex-col gap-4 mt-6 pl-4"
                    >
                      {resourcesLinks.map((link, idx) => (
                        <Link 
                          key={idx} 
                          href={link.href}
                          className="text-[#DBC297] text-xl font-serif flex items-center gap-3"
                        >
                          <link.icon className="w-4 h-4 opacity-50" />
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10"
              >
                <Link href="/contact" className="inline-block bg-[#C4A67B] text-[#132B23] px-10 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-bold w-full text-center">
                  Book a Drip
                </Link>
              </motion.div>
            </div>
            
            {/* Mobile Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="px-8 pb-10 flex justify-between items-end"
            >
              <div className="text-[#606864] text-[10px] uppercase tracking-widest font-bold">
                <p>Mon - Sun</p>
                <p className="text-[#DBC297]">10:00 - 18:00</p>
              </div>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 text-white/50 flex items-center justify-center text-xs hover:text-[#C4A67B] hover:border-[#C4A67B] transition-colors">IG</a>
                <a href="#" className="w-8 h-8 rounded-full border border-white/20 text-white/50 flex items-center justify-center text-xs hover:text-[#C4A67B] hover:border-[#C4A67B] transition-colors">FB</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
