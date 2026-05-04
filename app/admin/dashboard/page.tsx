"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Package, ShoppingCart, TrendingUp, Users,
  ArrowRight, ArrowUpRight, Plus, Activity,
  Clock, CheckCircle2, AlertCircle
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Treatment } from "@/lib/products"
import { motion } from "framer-motion"





const statusStyle: Record<string, { dot: string; label: string; bg: string; text: string }> = {
  confirmed: { dot: "#4ade80", label: "Confirmed", bg: "rgba(74, 222, 128, 0.1)", text: "#4ade80" },
  pending:   { dot: "#fbbf24", label: "Pending",   bg: "rgba(251, 191, 36, 0.1)", text: "#fbbf24" },
  completed: { dot: "#60a5fa", label: "Completed", bg: "rgba(96, 165, 250, 0.1)", text: "#60a5fa" },
  cancelled: { dot: "#f87171", label: "Cancelled", bg: "rgba(248, 113, 113, 0.1)", text: "#f87171" },
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const card = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }

function fmt(n: number) {
  if (n >= 1_000_000) return `₦${(n/1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `₦${(n/1_000).toFixed(0)}K`
  return `₦${n.toLocaleString()}`
}

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("Good morning")
  const [topProducts, setTopProducts] = useState<Treatment[]>([])
  const [productsCount, setProductsCount] = useState(0)
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [bookingsCount, setBookingsCount] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    const h = new Date().getHours()
    if (h >= 12 && h < 17) setGreeting("Good afternoon")
    else if (h >= 17)      setGreeting("Good evening")
    
    async function loadData() {
      const { data: pData, count: pCount } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
      
      if (pCount !== null) setProductsCount(pCount)
      if (pData) {
        setTopProducts(pData.slice(0, 5).map(d => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          category: d.category,
          tagline: d.tagline,
          description: d.description,
          price: Number(d.price),
          image: d.image,
          duration: d.duration,
          featured: d.featured,
        })) as Treatment[])
      }

      const { data: bData, count: bCount } = await supabase
        .from('bookings')
        .select('*, booking_items(quantity, price_at_booking, products(name))', { count: 'exact' })
        .order('created_at', { ascending: false })

      if (bCount !== null) setBookingsCount(bCount)
      if (bData) {
        setRecentBookings(bData.slice(0, 4).map(b => ({
          id: b.id.slice(0, 8),
          client: b.client_name,
          treatment: b.booking_items?.[0]?.products?.name || 'Multiple items',
          amount: Number(b.total_amount),
          status: b.status,
          time: new Date(b.created_at).toLocaleDateString(),
        })))
        const rev = bData.reduce((acc, b) => acc + Number(b.total_amount), 0)
        setTotalRevenue(rev)
      }
    }
    loadData()
  }, [])

  const stats = [
    { label: "Total Products", value: productsCount, suffix: "", change: "", up: true, icon: Package },
    { label: "Total Bookings", value: bookingsCount, suffix: "", change: "", up: true, icon: ShoppingCart },
    { label: "Total Revenue", value: totalRevenue, suffix: "₦", change: "", up: true, icon: TrendingUp },
    { label: "Total Clients", value: bookingsCount, suffix: "", change: "", up: true, icon: Users },
  ]

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] text-[#EBE7DF]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-1">{greeting} 👋</p>
          <h1 className="text-3xl font-serif text-white uppercase tracking-wider">Dashboard</h1>
        </div>
        <Link href="/admin/products/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] transition-all hover:scale-105 shadow-[0_0_20px_rgba(219,194,151,0.2)]">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <motion.div key={s.label} variants={card}
            className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg flex flex-col gap-4 relative overflow-hidden group hover:border-[#DBC297]/30 transition-all duration-500">
            <div className="absolute -inset-24 bg-gradient-to-br from-[#DBC297]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
            
            <div className="flex items-start justify-between relative z-10">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-[#DBC297] group-hover:scale-110 transition-transform duration-500">
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-3xl font-serif text-white mb-1">
                {s.suffix === "₦" ? fmt(s.value) : `${s.value.toLocaleString()}${s.suffix}`}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">

        {/* Recent Bookings */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#DBC297]" />
              <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Recent Bookings</h2>
            </div>
            <Link href="/admin/orders"
              className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] hover:text-white flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-white/5 flex-1">
            {recentBookings.length === 0 ? (
              <div className="p-8 text-center text-white/40 text-sm">No recent bookings found.</div>
            ) : recentBookings.map((b) => {
              const s = statusStyle[b.status] || statusStyle.pending
              return (
                <div key={b.id} className="flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition-colors">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-serif font-bold text-sm bg-gradient-to-br from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-md">
                    {b.client[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{b.client}</p>
                    <p className="text-xs text-white/50 truncate">{b.treatment}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">₦{b.amount.toLocaleString()}</p>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mt-1"
                      style={{ background: s.bg, color: s.text }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                      {s.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-[#DBC297]" />
              <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Top Products</h2>
            </div>
            <Link href="/admin/products"
              className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] hover:text-white flex items-center gap-1 transition-colors">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5 flex-1">
            {topProducts.length === 0 ? (
              <div className="p-8 text-center text-white/40 text-sm">No products found.</div>
            ) : topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group">
                <span className="text-sm font-serif font-black text-[#DBC297]/50 group-hover:text-[#DBC297] w-4 text-center transition-colors">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{p.name}</p>
                  <p className="text-[11px] text-white/50">₦{p.price.toLocaleString()}</p>
                </div>
                {p.featured && (
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#DBC297]/10 text-[#DBC297] border border-[#DBC297]/20">
                    Top
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.4 }}>
        <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-5">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { href:"/admin/products/new", icon: Plus,          label:"Add Product",    sub:"Upload new treatment" },
            { href:"/admin/orders",       icon: CheckCircle2,  label:"View Bookings",  sub:"Manage appointments" },
            { href:"/admin/content",      icon: AlertCircle,   label:"Edit Content",   sub:"Update homepage text" },
            { href:"/admin/settings",     icon: Clock,         label:"Site Settings",  sub:"Update configuration" },
          ].map((a) => (
            <Link key={a.href} href={a.href}
              className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(219,194,151,0.15)] hover:border-[#DBC297]/40 transition-all duration-300 group block relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-white/5 border border-white/10 group-hover:border-[#DBC297]/30 transition-colors relative z-10">
                <a.icon className="w-5 h-5 text-[#DBC297] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-xs font-bold text-white mb-1 relative z-10">{a.label}</p>
              <p className="text-[10px] text-white/50 relative z-10">{a.sub}</p>
              <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-white/20 group-hover:text-[#DBC297] transition-colors" />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
