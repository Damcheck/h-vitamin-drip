"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard, Package, ShoppingCart,
  FileText, Settings, LogOut, Menu, X,
  Sparkles, Bell, Shield, MessageSquare, Mail
} from "lucide-react"
import { supabase } from "@/lib/supabase"

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products",  label: "Treatments",  icon: Package },
  { href: "/admin/orders",    label: "Bookings",  icon: ShoppingCart },
  { href: "/admin/inbox",     label: "Inbox",     icon: MessageSquare },
  { href: "/admin/newsletter",label: "Newsletter",icon: Mail },
  { href: "/admin/content",   label: "Content",   icon: FileText },
  { href: "/admin/settings",  label: "Settings",  icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname()
  const router    = useRouter()
  const [open, setOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (pathname === "/admin") {
      setVerified(true)
      return
    }

    // Verify auth session via Supabase (not sessionStorage)
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.replace("/admin")
        return
      }
      setUserEmail(session.user.email || "Admin")
      setVerified(true)
    }
    checkAuth()

    // Listen for auth state changes (session expiry, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        if (event === 'SIGNED_OUT') router.replace("/admin")
      }
    })

    return () => subscription.unsubscribe()
  }, [pathname, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push("/admin")
  }

  if (pathname === "/admin") return <>{children}</>

  // Don't render admin content until auth is verified
  if (!verified) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#132B23]">
        <div className="flex flex-col items-center gap-3">
          <Shield className="w-8 h-8 text-[#DBC297] animate-pulse" />
          <p className="text-[10px] uppercase tracking-widest text-[#DBC297]/60 font-bold">Verifying session…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#132B23]">

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#132B23]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-[#1a382e]
        transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 border-r border-white/5 shadow-2xl
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
          <Link href="/" target="_blank" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#DBC297] to-[#C4A67B] shadow-[0_0_20px_rgba(219,194,151,0.2)]">
              <span className="text-[#132B23] font-serif font-black text-xl leading-none">H</span>
            </div>
            <div>
              <p className="text-white font-serif text-sm leading-none mb-1">H Vitamin Drip</p>
              <p className="text-[#DBC297] text-[9px] uppercase tracking-widest font-bold">Admin Portal</p>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="text-white/50 hover:text-[#DBC297] transition-colors lg:hidden">
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
                    ? "bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-[0_0_20px_rgba(219,194,151,0.2)]"
                    : "text-white/60 hover:text-[#DBC297] hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-6 border-t border-white/5 space-y-2 bg-[#132B23]/50 shrink-0">
          {/* Signed in as */}
          {userEmail && (
            <div className="px-4 py-2 mb-2">
              <p className="text-[9px] uppercase tracking-widest text-[#DBC297]/60 font-bold">Signed in as</p>
              <p className="text-[11px] text-white/80 font-semibold truncate">{userEmail}</p>
            </div>
          )}
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white/60 hover:text-[#DBC297] hover:bg-white/5 transition-all">
            <Sparkles className="w-4 h-4" /> View Website
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#132B23]/80 backdrop-blur-md border-b border-white/5 lg:px-8 z-30 sticky top-0">
          <button onClick={() => setOpen(true)} className="lg:hidden text-white/80 hover:text-[#DBC297] transition-colors">
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Secured</span>
            </div>
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-sm bg-gradient-to-br from-[#132B23] to-[#1a382e] text-[#DBC297] shadow-lg border border-[#C4A67B]/30">
              {userEmail ? userEmail[0].toUpperCase() : "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
