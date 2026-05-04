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
  confirmed: { color: "bg-green-100 text-green-700", icon: CheckCircle2, label: "Confirmed" },
  pending:   { color: "bg-yellow-100 text-yellow-700", icon: Clock, label: "Pending" },
  completed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle2, label: "Completed" },
  cancelled: { color: "bg-red-100 text-red-700", icon: XCircle, label: "Cancelled" },
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
    <div className="flex flex-col gap-6 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[#132B23] uppercase">Bookings</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mt-1">{data.length} total from database</p>
        </div>
        <button onClick={() => fetchBookings(true)} disabled={refreshing}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#F4F1E9] border border-[#C4A67B]/30 text-[#132B23] hover:bg-[#C4A67B]/20 transition-all disabled:opacity-50">
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-[#132B23]" },
          { label: "Confirmed", value: stats.confirmed, color: "text-green-600" },
          { label: "Pending", value: stats.pending, color: "text-yellow-600" },
          { label: "Completed", value: stats.completed, color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="bg-[#FCFAF7]/60 backdrop-blur-md rounded-2xl border border-[#C4A67B]/20 p-5 text-center">
            <p className={`text-3xl font-serif font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4A67B]" />
          <input placeholder="Search by client, treatment, ID…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#FCFAF7]/60 backdrop-blur-md border border-[#C4A67B]/30 rounded-xl text-sm outline-none focus:border-[#132B23] transition-all text-[#132B23]" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#FCFAF7]/60 backdrop-blur-md border border-[#C4A67B]/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#132B23] text-[#132B23] appearance-none cursor-pointer">
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
          <Loader2 className="w-8 h-8 text-[#C4A67B] animate-spin" />
        </div>
      ) : (
        <div className="bg-[#FCFAF7]/60 backdrop-blur-md rounded-2xl border border-[#C4A67B]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F4F1E9] border-b border-[#C4A67B]/20">
                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-[#606864]">Client</th>
                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-[#606864] hidden md:table-cell">Treatment</th>
                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-[#606864] hidden lg:table-cell">Date</th>
                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-[#606864]">Amount</th>
                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-[#606864]">Status</th>
                  <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-[#606864]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => {
                  const cfg = statusConfig[booking.status] || statusConfig.pending
                  return (
                    <tr key={booking.id} className="border-t border-[#C4A67B]/10 hover:bg-[#F4F1E9]/80 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-[#132B23]">{booking.client}</p>
                        <p className="text-[11px] text-[#606864]">{booking.phone || booking.email}</p>
                      </td>
                      <td className="px-5 py-4 text-xs text-[#132B23] hidden md:table-cell max-w-[180px] truncate">{booking.treatment}</td>
                      <td className="px-5 py-4 text-xs text-[#606864] hidden lg:table-cell">{booking.date} · {booking.time}</td>
                      <td className="px-5 py-4 text-sm font-bold text-[#132B23]">₦{booking.amount.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${cfg.color}`}>{cfg.label}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSelected(booking)}
                            className="w-8 h-8 bg-[#F4F1E9] hover:bg-[#C4A67B]/20 rounded-lg flex items-center justify-center transition-colors" title="View details">
                            <Eye className="w-3.5 h-3.5 text-[#132B23]" />
                          </button>
                          {booking.phone && (
                            <a href={`https://wa.me/${booking.phone.replace(/\D/g, "")}?text=Hello ${booking.client}, regarding your booking…`}
                              target="_blank" rel="noopener noreferrer"
                              className="w-8 h-8 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors" title="WhatsApp">
                              <MessageCircle className="w-3.5 h-3.5 text-green-600" />
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
              <div className="py-16 text-center flex flex-col items-center gap-3">
                <Package className="w-8 h-8 text-[#C4A67B]" />
                <p className="text-sm font-bold text-[#132B23]">{data.length === 0 ? "No bookings yet" : "No matching bookings"}</p>
                <p className="text-xs text-[#606864]">{data.length === 0 ? "Bookings from the checkout will appear here in real-time." : "Try a different search or filter."}</p>
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
              className="fixed inset-0 bg-[#132B23]/40 backdrop-blur-sm z-50" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[440px] bg-[#FCFAF7] overflow-y-auto shadow-2xl border-l border-[#C4A67B]/30"
            >
              <div className="p-7 flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-[#C4A67B]/20 pb-5">
                  <div>
                    <p className="text-[10px] text-[#606864] font-bold uppercase tracking-widest">Booking #{selected.id.slice(0, 8)}</p>
                    <h2 className="text-xl font-serif text-[#132B23]">{selected.client}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-full bg-[#F4F1E9] flex items-center justify-center hover:bg-[#C4A67B]/20 transition-colors">
                    <XCircle className="w-4 h-4 text-[#132B23]" />
                  </button>
                </div>

                {[
                  { label: "Treatment", value: selected.treatment },
                  { label: "Amount", value: `₦${selected.amount.toLocaleString()}` },
                  { label: "Date & Time", value: `${selected.date} at ${selected.time}` },
                  { label: "Address", value: selected.address },
                  { label: "Email", value: selected.email || "—" },
                  { label: "Phone", value: selected.phone || "—" },
                  { label: "Notes", value: selected.notes || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#606864]">{label}</p>
                    <p className="text-sm font-semibold text-[#132B23]">{value}</p>
                  </div>
                ))}

                {/* Status update */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mb-3">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(["confirmed", "pending", "completed", "cancelled"] as Booking["status"][]).map((s) => (
                      <button key={s} onClick={() => updateStatus(selected.id, s)}
                        className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                          selected.status === s
                            ? "border-[#132B23] bg-[#132B23] text-[#DBC297]"
                            : "border-[#C4A67B]/30 text-[#606864] hover:border-[#132B23] hover:text-[#132B23]"
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
                    className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white text-center flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1dba58] transition-all">
                    Message on WhatsApp
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
