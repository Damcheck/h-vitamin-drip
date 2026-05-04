"use client"

import { useState, useEffect } from "react"
import { Search, Eye, CheckCircle2, XCircle, Clock, MessageCircle, Loader2, Package, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"

type Booking = {
  id: string
  client: string
  email: string
  phone: string
  treatment: string
  amount: number
  status: "confirmed" | "pending" | "completed" | "cancelled"
  date: string
  time: string
  address: string
  notes: string
  created_at: string
}

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  confirmed: { color: "bg-green-500/10 text-green-400 border border-green-500/20", icon: CheckCircle2, label: "Confirmed" },
  pending:   { color: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20", icon: Clock, label: "Pending" },
  completed: { color: "bg-blue-500/10 text-blue-400 border border-blue-500/20", icon: CheckCircle2, label: "Completed" },
  cancelled: { color: "bg-red-500/10 text-red-400 border border-red-500/20", icon: XCircle, label: "Cancelled" },
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState<Booking | null>(null)
  const [data, setData] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchBookings = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    else setLoading(true)

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("*, booking_items(quantity, price_at_booking, products(name))")
      .order("created_at", { ascending: false })

    if (bookings) {
      setData(bookings.map(b => ({
        id: b.id,
        client: b.client_name || "Unknown",
        email: b.client_email || "",
        phone: b.client_phone || "",
        treatment: b.booking_items?.[0]?.products?.name || (b.booking_items?.length > 1 ? `${b.booking_items.length} treatments` : "Treatment"),
        amount: Number(b.total_amount) || 0,
        status: b.status || "pending",
        date: b.preferred_date ? new Date(b.preferred_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : new Date(b.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        time: b.preferred_time || "TBC",
        address: b.address || "—",
        notes: b.notes || "",
        created_at: b.created_at,
      })))
    }
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => { fetchBookings() }, [])

  const filtered = data.filter((b) => {
    const matchSearch =
      b.client.toLowerCase().includes(search.toLowerCase()) ||
      b.treatment.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || b.status === statusFilter
    return matchSearch && matchStatus
  })

  const updateStatus = async (id: string, status: Booking["status"]) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id)
    if (!error) {
      setData(prev => prev.map(b => b.id === id ? { ...b, status } : b))
      if (selected?.id === id) setSelected(s => s ? { ...s, status } : null)
    }
  }

  const stats = {
    total: data.length,
    confirmed: data.filter((b) => b.status === "confirmed").length,
    pending: data.filter((b) => b.status === "pending").length,
    completed: data.filter((b) => b.status === "completed").length,
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] text-[#EBE7DF]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-white uppercase tracking-wider">Bookings</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1">{data.length} total from database</p>
        </div>
        <button onClick={() => fetchBookings(true)} disabled={refreshing}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50">
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-white" },
          { label: "Confirmed", value: stats.confirmed, color: "text-green-400" },
          { label: "Pending", value: stats.pending, color: "text-yellow-400" },
          { label: "Completed", value: stats.completed, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 text-center hover:border-[#DBC297]/30 transition-all duration-300">
            <p className={`text-4xl font-serif font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DBC297]" />
          <input placeholder="Search by client, treatment, ID…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-5 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm outline-none focus:border-[#DBC297] transition-all text-white placeholder:text-white/40" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1a382e] border border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#DBC297] text-white appearance-none cursor-pointer sm:w-auto w-full">
          <option value="all">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 text-[#DBC297] animate-spin" />
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden shadow-lg mt-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#DBC297]">Client</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#DBC297] hidden md:table-cell">Treatment</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#DBC297] hidden lg:table-cell">Date</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#DBC297]">Amount</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#DBC297]">Status</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-[#DBC297]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => {
                  const cfg = statusConfig[booking.status] || statusConfig.pending
                  return (
                    <tr key={booking.id} className="border-t border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-white group-hover:text-[#DBC297] transition-colors">{booking.client}</p>
                        <p className="text-[11px] text-white/50">{booking.phone || booking.email}</p>
                      </td>
                      <td className="px-6 py-5 text-sm text-white/80 hidden md:table-cell max-w-[200px] truncate">{booking.treatment}</td>
                      <td className="px-6 py-5 text-xs text-white/60 hidden lg:table-cell">{booking.date} · {booking.time}</td>
                      <td className="px-6 py-5 text-sm font-bold text-white">₦{booking.amount.toLocaleString()}</td>
                      <td className="px-6 py-5">
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button onClick={() => setSelected(booking)}
                            className="w-10 h-10 bg-white/5 hover:bg-[#DBC297] border border-white/10 hover:border-[#DBC297] rounded-xl flex items-center justify-center transition-all group/btn" title="View details">
                            <Eye className="w-4 h-4 text-white group-hover/btn:text-[#132B23]" />
                          </button>
                          {booking.phone && (
                            <a href={`https://wa.me/${booking.phone.replace(/\D/g, "")}?text=Hello ${booking.client}, regarding your booking…`}
                              target="_blank" rel="noopener noreferrer"
                              className="w-10 h-10 bg-green-500/10 hover:bg-green-500 border border-green-500/20 hover:border-green-500 rounded-xl flex items-center justify-center transition-all group/wa" title="WhatsApp">
                              <MessageCircle className="w-4 h-4 text-green-400 group-hover/wa:text-white" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-24 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Package className="w-8 h-8 text-[#DBC297]" />
                </div>
                <p className="text-lg font-serif text-white">{data.length === 0 ? "No bookings yet" : "No matching bookings"}</p>
                <p className="text-sm text-white/50">{data.length === 0 ? "Bookings from the checkout will appear here in real-time." : "Try a different search or filter."}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Detail Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[500px] bg-[#132B23] overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] border-l border-white/10"
            >
              <div className="p-8 md:p-10 flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="text-[10px] text-[#DBC297] font-bold uppercase tracking-widest">Booking #{selected.id.slice(0, 8)}</p>
                    <h2 className="text-2xl font-serif text-white mt-1">{selected.client}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all">
                    <XCircle className="w-5 h-5 text-white/70" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6 bg-white/5 border border-white/10 rounded-[2rem] p-8">
                  {[
                    { label: "Treatment", value: selected.treatment },
                    { label: "Amount", value: `₦${selected.amount.toLocaleString()}` },
                    { label: "Date & Time", value: `${selected.date} at ${selected.time}` },
                    { label: "Address", value: selected.address },
                    { label: "Email", value: selected.email || "—" },
                    { label: "Phone", value: selected.phone || "—" },
                    { label: "Notes", value: selected.notes || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1.5 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">{label}</p>
                      <p className="text-[15px] text-white leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Status update */}
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-4">Update Status</p>
                  <div className="grid grid-cols-2 gap-3">
                    {(["confirmed", "pending", "completed", "cancelled"] as Booking["status"][]).map((s) => (
                      <button key={s} onClick={() => updateStatus(selected.id, s)}
                        className={`py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest border-2 transition-all ${
                          selected.status === s
                            ? "border-[#DBC297] bg-[#DBC297] text-[#132B23]"
                            : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                        }`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                {selected.phone && (
                  <a href={`https://wa.me/${selected.phone.replace(/\D/g, "")}?text=Hello ${selected.client}, this is H Vitamin Drip regarding your booking…`}
                    target="_blank" rel="noopener noreferrer"
                    className="w-full py-5 rounded-full text-[11px] font-bold uppercase tracking-widest text-white text-center flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1dba58] transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)]">
                    <MessageCircle className="w-5 h-5" /> Message on WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
