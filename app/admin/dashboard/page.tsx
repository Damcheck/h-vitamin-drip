"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Package, ShoppingCart, TrendingUp, Users,
  ArrowRight, ArrowUpRight, Plus, Activity,
  Clock, CheckCircle2, AlertCircle
} from "lucide-react"
import { treatments } from "@/lib/products"
import { motion } from "framer-motion"

const mockStats = [
  { label: "Total Products", value: treatments.length, suffix: "", change: "+2", up: true, icon: Package, color: "#043222", bg: "#E8F0EC" },
  { label: "Bookings Today", value: 8, suffix: "", change: "+3", up: true, icon: ShoppingCart, color: "#7c3aed", bg: "#F3EEFF" },
  { label: "Revenue (May)", value: 2840000, suffix: "₦", change: "+24%", up: true, icon: TrendingUp, color: "#0284c7", bg: "#EFF8FF" },
  { label: "Total Clients", value: 5243, suffix: "+", change: "All time", up: true, icon: Users, color: "#059669", bg: "#ECFDF5" },
]

const recentBookings = [
  { id: "BK-001", client: "Adaeze Okonkwo", treatment: "Energy Drip", amount: 170000, status: "confirmed", time: "2:30 PM" },
  { id: "BK-002", client: "Emeka Taiwo",    treatment: "Glutathione Detox", amount: 150000, status: "pending",   time: "11:00 AM" },
  { id: "BK-003", client: "Chidinma Eze",   treatment: "Skin & Hair Drip", amount: 160000, status: "completed", time: "9:00 AM" },
  { id: "BK-004", client: "Ngozi Obi",      treatment: "NAD+ Therapy",    amount: 85000,  status: "confirmed", time: "Yesterday" },
]

const statusStyle: Record<string, { dot: string; label: string; bg: string; text: string }> = {
  confirmed: { dot: "#22c55e", label: "Confirmed", bg: "#F0FDF4", text: "#16a34a" },
  pending:   { dot: "#f59e0b", label: "Pending",   bg: "#FFFBEB", text: "#d97706" },
  completed: { dot: "#3b82f6", label: "Completed", bg: "#EFF6FF", text: "#2563eb" },
  cancelled: { dot: "#ef4444", label: "Cancelled", bg: "#FEF2F2", text: "#dc2626" },
}

const topProducts = treatments.slice(0, 5)

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const card = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }

function fmt(n: number) {
  if (n >= 1_000_000) return `₦${(n/1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `₦${(n/1_000).toFixed(0)}K`
  return `₦${n.toLocaleString()}`
}

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("Good morning")
  useEffect(() => {
    const h = new Date().getHours()
    if (h >= 12 && h < 17) setGreeting("Good afternoon")
    else if (h >= 17)      setGreeting("Good evening")
  }, [])

  return (
    <div className="flex flex-col gap-7 max-w-[1200px]">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-semibold text-[#6B7A65] mb-0.5">{greeting} 👋</p>
          <h1 className="text-[26px] font-black tracking-tight" style={{ color: "#043222" }}>Dashboard</h1>
        </div>
        <Link href="/admin/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold text-white transition-all hover:opacity-90 shadow-sm"
          style={{ background: "#043222" }}>
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((s) => (
          <motion.div key={s.label} variants={card}
            className="admin-card p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${s.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                {s.change}
              </span>
            </div>
            <div>
              <p className="text-[28px] font-black leading-none mb-1" style={{ color: "#043222" }}>
                {s.suffix === "₦" ? fmt(s.value) : `${s.value.toLocaleString()}${s.suffix}`}
              </p>
              <p className="text-[12px] font-semibold text-[#6B7A65]">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-5">

        {/* Recent Bookings */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
          className="admin-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8DF]/60">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#043222]" />
              <h2 className="text-[15px] font-bold" style={{ color: "#043222" }}>Recent Bookings</h2>
            </div>
            <Link href="/admin/orders"
              className="text-[12px] font-bold text-[#6B7A65] hover:text-[#043222] flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-[#E2E8DF]/40">
            {recentBookings.map((b) => {
              const s = statusStyle[b.status]
              return (
                <div key={b.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F9F6]/80 transition-colors">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-[13px]"
                    style={{ background: "#E8F0EC", color: "#043222" }}>
                    {b.client[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#043222] truncate">{b.client}</p>
                    <p className="text-[11px] text-[#6B7A65] truncate">{b.treatment}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[13px] font-bold" style={{ color: "#043222" }}>₦{b.amount.toLocaleString()}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
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
          className="admin-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-5 border-b border-[#E2E8DF]/60">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#043222]" />
              <h2 className="text-[15px] font-bold" style={{ color: "#043222" }}>Top Products</h2>
            </div>
            <Link href="/admin/products"
              className="text-[12px] font-bold text-[#6B7A65] hover:text-[#043222] flex items-center gap-1 transition-colors">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-[#E2E8DF]/40">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#F8F9F6] transition-colors">
                <span className="text-[12px] font-black text-[#6B7A65] w-5 text-center">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-[#043222] truncate">{p.name}</p>
                  <p className="text-[11px] text-[#6B7A65]">₦{p.price.toLocaleString()}</p>
                </div>
                {p.featured && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: "#BFF74C", color: "#043222" }}>
                    ★ Top
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.4 }}>
        <h2 className="text-[15px] font-bold mb-4" style={{ color: "#043222" }}>Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href:"/admin/products", icon: Plus,          label:"Add Product",    sub:"Upload new treatment",    color:"#043222", bg:"#E8F0EC" },
            { href:"/admin/orders",   icon: CheckCircle2,  label:"Confirm Booking",sub:"3 pending approvals",     color:"#7c3aed", bg:"#F3EEFF" },
            { href:"/admin/content",  icon: AlertCircle,   label:"Edit Content",   sub:"Update homepage text",    color:"#0284c7", bg:"#EFF8FF" },
            { href:"/admin/settings", icon: Clock,         label:"Set Hours",      sub:"Update business hours",   color:"#059669", bg:"#ECFDF5" },
          ].map((a) => (
            <Link key={a.href} href={a.href}
              className="admin-card p-5 hover:-translate-y-0.5 group block">
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-3" style={{ background: a.bg }}>
                <a.icon className="w-5 h-5" style={{ color: a.color }} />
              </div>
              <p className="text-[13px] font-bold text-[#043222] mb-0.5">{a.label}</p>
              <p className="text-[11px] text-[#6B7A65]">{a.sub}</p>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#6B7A65] mt-3 group-hover:text-[#043222] transition-colors" />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
