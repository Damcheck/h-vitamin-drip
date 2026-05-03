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
  { href: "/admin/products",  label: "Products",  icon: Package },
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
    <div className="min-h-screen flex" style={{ background: "#F5F7F4" }}>

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-[240px]
        transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]
        lg:translate-x-0 lg:static lg:z-auto
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
        style={{ background: "#043222" }}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
          <Link href="/" target="_blank" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "#BFF74C" }}>
              <span className="text-[#043222] font-black text-base leading-none">H</span>
            </div>
            <div>
              <p className="text-white font-bold text-[13px] leading-none">H Vitamin Drip</p>
              <p className="text-white/40 text-[10px] mt-0.5">Admin</p>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white lg:hidden">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto no-scrollbar">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-[13px] text-[13px] font-semibold transition-all duration-200 ${
                  active
                    ? "text-[#043222]"
                    : "text-white/55 hover:text-white hover:bg-white/6"
                }`}
                style={active ? { background: "#BFF74C" } : {}}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {href === "/admin/orders" && notifs > 0 && !active && (
                  <span className="ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-full"
                    style={{ background: "#BFF74C", color: "#043222" }}>
                    {notifs}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/8 space-y-1">
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-[13px] text-[13px] font-semibold text-white/50 hover:text-white hover:bg-white/6 transition-all">
            <Sparkles className="w-4 h-4" /> View Website
          </Link>
          <button
            onClick={() => { sessionStorage.removeItem("admin_auth"); router.push("/admin") }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[13px] text-[13px] font-semibold text-white/50 hover:text-red-400 hover:bg-red-500/8 transition-all">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#E2E8DF] lg:px-8">
          <button onClick={() => setOpen(true)} className="lg:hidden text-[#043222]">
            <Menu className="w-5 h-5" />
          </button>

          {/* Page title — hidden on mobile, shown on desktop via children */}
          <div className="hidden lg:block" />

          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative w-9 h-9 rounded-full bg-[#F5F7F4] flex items-center justify-center hover:bg-[#EEF0EC] transition-colors">
              <Bell className="w-4 h-4 text-[#043222]" />
              {notifs > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ background: "#BFF74C" }} />
              )}
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px]"
              style={{ background: "#043222", color: "#BFF74C" }}>
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
