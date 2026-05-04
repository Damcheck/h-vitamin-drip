"use client"

import Link from "next/link"
import { ArrowRight, Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const links = {
  Treatments: [
    { label: "IV Drips",   href: "/shop?category=iv-drip" },
    { label: "Boosters",   href: "/shop?category=booster" },
    { label: "Injections", href: "/shop?category=injection" },
    { label: "View All",   href: "/shop" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog",     href: "/blog" },
    { label: "FAQs",     href: "/faqs" },
    { label: "Contact",  href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use",   href: "/terms" },
    { label: "Cookie Policy",  href: "/cookies" },
  ],
}

export function Footer() {
  return (
    <footer style={{ background: "#043222" }}>
      {/* Top CTA strip */}
      <div className="border-b border-white/8">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-[32px] md:text-[40px] font-black text-white leading-tight tracking-tight mb-2">
                Ready to feel better?
              </h2>
              <p className="text-[14px] text-white/50">
                Book a treatment today — same-day appointments available.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold text-[#043222] hover:opacity-90 transition-all group"
                style={{ background: "#BFF74C" }}>
                Shop Treatments
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://wa.me/447495393025" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[14px] font-bold text-white border border-white/20 hover:bg-white/8 transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "#BFF74C" }}>
                <span className="text-[#043222] font-black text-lg">H</span>
              </div>
              <span className="text-white font-black text-[16px]">H Vitamin Drip</span>
            </Link>
            <p className="text-[13px] text-white/45 leading-relaxed mb-6 max-w-[220px]">
              Nigeria&apos;s leading nurse-led IV vitamin therapy service — delivered to you.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: Phone, text: "+44 7495 393025",   href: "tel:+447495393025" },
                { icon: Mail,  text: "info@hvitamindrip.co.uk", href: "mailto:info@hvitamindrip.co.uk" },
                { icon: MapPin, text: "Lagos · Abuja · PH",  href: "/contact" },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href}
                  className="flex items-center gap-2.5 text-[12px] text-white/45 hover:text-white/80 transition-colors">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {text}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {[
                { Icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
                { Icon: Facebook,  href: "https://facebook.com/",  label: "Facebook" },
                { Icon: Twitter,   href: "https://twitter.com/",   label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30 mb-5">{title}</p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="text-[13px] text-white/50 hover:text-white transition-colors font-medium">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            © {new Date().getFullYear()} H Vitamin Drip. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[12px] text-white/20">
            <span>Made with</span>
            <span className="text-red-400">♥</span>
            <span>in Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
