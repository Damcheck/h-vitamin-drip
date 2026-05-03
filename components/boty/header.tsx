"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ShoppingBag, Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { useCart } from "./cart-context"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  {
    label: "Treatments",
    href: "/shop",
    dropdown: [
      { label: "IV Drips", href: "/shop?category=iv-drip", desc: "Full infusion therapy" },
      { label: "Boosters", href: "/shop?category=booster", desc: "Quick vitamin shots" },
      { label: "Injections", href: "/shop?category=injection", desc: "Targeted nutrients" },
      { label: "View All", href: "/shop", desc: "Browse everything" },
    ],
  },
  { label: "About",   href: "/about" },
  { label: "Blog",    href: "/blog" },
  { label: "FAQs",    href: "/faqs" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [scrolled,  setScrolled]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown,  setDropdown]  = useState(false)
  const { totalItems, setIsOpen } = useCart()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <>
      {/* Announcement bar */}
      <div className="text-center py-2.5 text-[12px] font-semibold tracking-wide text-[#043222]"
        style={{ background: "#BFF74C" }}>
        🌿 Free consultation with every booking &nbsp;·&nbsp; Same-day in Lagos &amp; Abuja
      </div>

      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(248,249,246,0.92)" : "#F8F9F6",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(4,50,34,.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(4,50,34,.07)" : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#043222" }}>
              <span className="text-[#BFF74C] font-black text-base">H</span>
            </div>
            <span className="font-black text-[15px] tracking-tight hidden sm:block" style={{ color: "#043222" }}>
              H Vitamin Drip
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}>
                  <button className="flex items-center gap-1 px-4 py-2 rounded-full text-[14px] font-semibold text-[#043222]/70 hover:text-[#043222] hover:bg-[#E8F0EC] transition-all">
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdown ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-float border border-[#E2E8DF] p-2 z-50"
                      >
                        {link.dropdown.map((d) => (
                          <Link key={d.href} href={d.href}
                            className="flex flex-col gap-0.5 px-3.5 py-3 rounded-xl hover:bg-[#F0F4EC] transition-colors group">
                            <span className="text-[13px] font-bold text-[#043222] group-hover:text-[#043222]">{d.label}</span>
                            <span className="text-[11px] text-[#6B7A65]">{d.desc}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} href={link.href}
                  className="px-4 py-2 rounded-full text-[14px] font-semibold text-[#043222]/70 hover:text-[#043222] hover:bg-[#E8F0EC] transition-all">
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right: CTA + Cart */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/shop"
              className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-bold text-white transition-all hover:opacity-90 shadow-sm"
              style={{ background: "#043222" }}>
              Book now <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Cart */}
            <button onClick={() => setIsOpen(true)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#E8F0EC] transition-colors"
              aria-label="Open cart">
              <ShoppingBag className="w-5 h-5" style={{ color: "#043222" }} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center"
                  style={{ background: "#BFF74C", color: "#043222" }}>
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#E8F0EC] transition-colors">
              {mobileOpen ? <X className="w-5 h-5 text-[#043222]" /> : <Menu className="w-5 h-5 text-[#043222]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-[108px] z-30 bg-white border-b border-[#E2E8DF] overflow-hidden lg:hidden"
            style={{ boxShadow: "0 8px 32px rgba(4,50,34,.1)" }}
          >
            <nav className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href ?? link.label} href={link.href ?? "/shop"}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3.5 rounded-xl text-[15px] font-bold text-[#043222] hover:bg-[#F0F4EC] transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link href="/shop" onClick={() => setMobileOpen(false)}
                className="mt-3 w-full py-4 rounded-full text-[15px] font-bold text-white text-center"
                style={{ background: "#043222" }}>
                Book a Treatment
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
