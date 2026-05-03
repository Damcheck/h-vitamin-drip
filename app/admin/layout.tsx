"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard, Package, ShoppingCart,
  FileText, Settings, LogOut, Menu, X,
  Sparkles, Bell
} from "lucide-react"

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products",  label: "Treatments",  icon: Package },
  { href: "/admin/orders",    label: "Bookings",  icon: ShoppingCart },
  { href: "/admin/content",   label: "Content",   icon: FileText },
  { href: "/admin/settings",  label: "Settings",  icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname()
  const router    = useRouter()
  const [open, setOpen] = useState(false)
  const [notifs] = useState(3)

  useEffect(() => {
    if (pathname === "/admin") return
    if (!sessionStorage.getItem("admin_auth")) router.replace("/admin")
  }, [pathname, router])

  if (pathname === "/admin") return <>{children}</>

  return (
    <div className="min-h-screen flex bg-[#F4F1E9]">

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#132B23]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-[#132B23]
        transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]
        lg:translate-x-0 lg:static lg:z-auto border-r border-[#C4A67B]/20 shadow-2xl
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-[#C4A67B]/20">
          <Link href="/" target="_blank" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#DBC297] to-[#C4A67B] shadow-gold">
              <span className="text-[#132B23] font-serif font-black text-xl leading-none">H</span>
            </div>
            <div>
              <p className="text-[#EBE7DF] font-serif text-sm leading-none mb-1">H Vitamin Drip</p>
              <p className="text-[#C4A67B] text-[9px] uppercase tracking-widest font-bold">Admin Portal</p>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="text-[#EBE7DF]/50 hover:text-[#C4A67B] transition-colors lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto no-scrollbar">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-gold"
                    : "text-[#EBE7DF]/60 hover:text-[#DBC297] hover:bg-[#C4A67B]/10"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {href === "/admin/orders" && notifs > 0 && !active && (
                  <span className="ml-auto text-[10px] font-black px-2 py-0.5 rounded-full bg-[#C4A67B] text-[#132B23]">
                    {notifs}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-6 border-t border-[#C4A67B]/20 space-y-2 bg-[#1a382e]/50">
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-[#EBE7DF]/60 hover:text-[#DBC297] hover:bg-[#C4A67B]/10 transition-all">
            <Sparkles className="w-4 h-4" /> View Website
          </Link>
          <button
            onClick={() => { sessionStorage.removeItem("admin_auth"); router.push("/admin") }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-[#EBE7DF]/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#FCFAF7]/80 backdrop-blur-md border-b border-[#C4A67B]/20 lg:px-8 z-30 sticky top-0">
          <button onClick={() => setOpen(true)} className="lg:hidden text-[#132B23] hover:text-[#C4A67B] transition-colors">
            <Menu className="w-6 h-6" />
          </button>

          {/* Page title — hidden on mobile, shown on desktop via children */}
          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button className="relative w-10 h-10 rounded-full bg-[#E8E3D9] flex items-center justify-center hover:bg-[#DBC297] hover:shadow-gold transition-all duration-300 group">
              <Bell className="w-4 h-4 text-[#132B23] group-hover:scale-110 transition-transform" />
              {notifs > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-[#FCFAF7] bg-[#132B23]" />
              )}
            </button>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm bg-gradient-to-br from-[#132B23] to-[#1a382e] text-[#DBC297] shadow-lg border border-[#C4A67B]/30">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
