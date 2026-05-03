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
  confirmed: { dot: "#22c55e", label: "Confirmed", bg: "#22c55e/10", text: "#16a34a" },
  pending:   { dot: "#f59e0b", label: "Pending",   bg: "#f59e0b/10", text: "#d97706" },
  completed: { dot: "#3b82f6", label: "Completed", bg: "#3b82f6/10", text: "#2563eb" },
  cancelled: { dot: "#ef4444", label: "Cancelled", bg: "#ef4444/10", text: "#dc2626" },
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
    { label: "Total Products", value: productsCount, suffix: "", change: "", up: true, icon: Package, color: "#132B23", bg: "#C4A67B/20" },
    { label: "Total Bookings", value: bookingsCount, suffix: "", change: "", up: true, icon: ShoppingCart, color: "#132B23", bg: "#C4A67B/20" },
    { label: "Total Revenue", value: totalRevenue, suffix: "₦", change: "", up: true, icon: TrendingUp, color: "#132B23", bg: "#C4A67B/20" },
    { label: "Total Clients", value: bookingsCount, suffix: "", change: "", up: true, icon: Users, color: "#132B23", bg: "#C4A67B/20" },
  ]

  return (
    <div className="flex flex-col gap-8 max-w-[1200px]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C4A67B] mb-1">{greeting} 👋</p>
          <h1 className="text-3xl font-serif text-[#132B23] uppercase">Dashboard</h1>
        </div>
        <Link href="/admin/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] transition-all hover:scale-105 shadow-gold">
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <motion.div key={s.label} variants={card}
            className="bg-[#FCFAF7]/60 backdrop-blur-md p-6 rounded-2xl border border-[#C4A67B]/20 shadow-sm flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#C4A67B]/20 border border-[#C4A67B]/30">
                <s.icon className="w-5 h-5 text-[#132B23]" />
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${s.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {s.change}
              </span>
            </div>
            <div>
              <p className="text-3xl font-serif text-[#132B23] mb-1">
                {s.suffix === "₦" ? fmt(s.value) : `${s.value.toLocaleString()}${s.suffix}`}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#606864]">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-6">

        {/* Recent Bookings */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
          className="bg-[#FCFAF7]/60 backdrop-blur-md rounded-2xl border border-[#C4A67B]/20 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#C4A67B]/20 bg-[#FCFAF7]">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#132B23]" />
              <h2 className="text-sm font-serif font-bold text-[#132B23] uppercase tracking-wider">Recent Bookings</h2>
            </div>
            <Link href="/admin/orders"
              className="text-[10px] font-bold uppercase tracking-widest text-[#C4A67B] hover:text-[#132B23] flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-[#C4A67B]/10 flex-1">
            {recentBookings.map((b) => {
              const s = statusStyle[b.status]
              return (
                <div key={b.id} className="flex items-center gap-4 px-6 py-5 hover:bg-[#F4F1E9]/80 transition-colors">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-serif font-bold text-sm bg-[#132B23] text-[#DBC297] border border-[#C4A67B]/30 shadow-md">
                    {b.client[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#132B23] truncate">{b.client}</p>
                    <p className="text-xs text-[#606864] truncate">{b.treatment}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[#132B23]">₦{b.amount.toLocaleString()}</p>
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
          className="bg-[#FCFAF7]/60 backdrop-blur-md rounded-2xl border border-[#C4A67B]/20 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#C4A67B]/20 bg-[#FCFAF7]">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-[#132B23]" />
              <h2 className="text-sm font-serif font-bold text-[#132B23] uppercase tracking-wider">Top Products</h2>
            </div>
            <Link href="/admin/products"
              className="text-[10px] font-bold uppercase tracking-widest text-[#C4A67B] hover:text-[#132B23] flex items-center gap-1 transition-colors">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-[#C4A67B]/10 flex-1">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#F4F1E9]/80 transition-colors">
                <span className="text-sm font-serif font-black text-[#C4A67B] w-4 text-center">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#132B23] truncate">{p.name}</p>
                  <p className="text-[11px] text-[#606864]">₦{p.price.toLocaleString()}</p>
                </div>
                {p.featured && (
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#132B23] text-[#DBC297]">
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
        <h2 className="text-sm font-serif font-bold text-[#132B23] uppercase tracking-wider mb-5">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { href:"/admin/products", icon: Plus,          label:"Add Product",    sub:"Upload new treatment" },
            { href:"/admin/orders",   icon: CheckCircle2,  label:"Confirm Booking",sub:"3 pending approvals" },
            { href:"/admin/content",  icon: AlertCircle,   label:"Edit Content",   sub:"Update homepage text" },
            { href:"/admin/settings", icon: Clock,         label:"Set Hours",      sub:"Update business hours" },
          ].map((a) => (
            <Link key={a.href} href={a.href}
              className="bg-[#FCFAF7]/60 backdrop-blur-md p-6 rounded-2xl border border-[#C4A67B]/20 shadow-sm hover:shadow-gold hover:border-[#C4A67B]/50 transition-all duration-300 group block">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#C4A67B]/10 group-hover:bg-[#C4A67B]/20 transition-colors">
                <a.icon className="w-5 h-5 text-[#132B23]" />
              </div>
              <p className="text-xs font-bold text-[#132B23] mb-1">{a.label}</p>
              <p className="text-[10px] text-[#606864]">{a.sub}</p>
              <ArrowUpRight className="w-4 h-4 text-[#C4A67B] mt-4 group-hover:text-[#132B23] transition-colors" />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
