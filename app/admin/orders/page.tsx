"use client"

import { useState } from "react"
import { Search, Eye, CheckCircle2, XCircle, Clock, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Booking = {
  id: string
  client: string
  email: string
  phone: string
  treatment: string
  price: string
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled"
  date: string
  time: string
  location: string
  channel: "Website" | "WhatsApp"
  notes: string
}

const bookings: Booking[] = [
  { id: "BK-001", client: "Adaeze Okonkwo", email: "adaeze@email.com", phone: "+234 801 234 5678", treatment: "Energy Drip (Myers Cocktail)", price: "₦170,000", status: "Confirmed", date: "May 3, 2026", time: "2:30 PM", location: "Lekki Phase 1, Lagos", channel: "Website", notes: "First-time client. Preferred female nurse." },
  { id: "BK-002", client: "Emeka Taiwo", email: "emeka@email.com", phone: "+234 802 345 6789", treatment: "Glutathione Detox", price: "₦150,000", status: "Pending", date: "May 3, 2026", time: "11:00 AM", location: "Victoria Island, Lagos", channel: "WhatsApp", notes: "" },
  { id: "BK-003", client: "Chidinma Eze", email: "chidinma@email.com", phone: "+234 803 456 7890", treatment: "Skin & Hair Drip", price: "₦160,000", status: "Completed", date: "May 2, 2026", time: "10:00 AM", location: "Ikoyi, Lagos", channel: "Website", notes: "Returning client — 3rd session" },
  { id: "BK-004", client: "Tunde Bello", email: "tunde@email.com", phone: "+234 804 567 8901", treatment: "Vitamin B12 Booster", price: "₦35,000", status: "Confirmed", date: "May 2, 2026", time: "3:00 PM", location: "Wuse 2, Abuja", channel: "WhatsApp", notes: "" },
  { id: "BK-005", client: "Ngozi Obi", email: "ngozi@email.com", phone: "+234 805 678 9012", treatment: "NAD+ Therapy", price: "₦85,000", status: "Cancelled", date: "May 1, 2026", time: "1:00 PM", location: "GRA, Port Harcourt", channel: "Website", notes: "Client cancelled — rescheduling" },
  { id: "BK-006", client: "Kunle Adeyemi", email: "kunle@email.com", phone: "+234 806 789 0123", treatment: "High Dose Vitamin C", price: "₦130,000", status: "Pending", date: "May 4, 2026", time: "9:00 AM", location: "Ikeja, Lagos", channel: "Website", notes: "" },
]

const statusConfig = {
  Confirmed: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  Pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  Completed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle2 },
  Cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState<Booking | null>(null)
  const [data, setData] = useState<Booking[]>(bookings)

  const filtered = data.filter((b) => {
    const matchSearch =
      b.client.toLowerCase().includes(search.toLowerCase()) ||
      b.treatment.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || b.status === statusFilter
    return matchSearch && matchStatus
  })

  const updateStatus = (id: string, status: Booking["status"]) => {
    setData((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : null)
  }

  const stats = {
    total: data.length,
    confirmed: data.filter((b) => b.status === "Confirmed").length,
    pending: data.filter((b) => b.status === "Pending").length,
    completed: data.filter((b) => b.status === "Completed").length,
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-bold" style={{ color: "#043222" }}>Bookings</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">{data.length} total bookings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-gray-700" },
          { label: "Confirmed", value: stats.confirmed, color: "text-green-600" },
          { label: "Pending", value: stats.pending, color: "text-yellow-600" },
          { label: "Completed", value: stats.completed, color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-[16px] border border-gray-100 p-4 text-center">
            <p className={`text-[28px] font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="Search by client, treatment, ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-[12px] text-[14px] outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[20px] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">ID</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Client</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden md:table-cell">Treatment</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 hidden lg:table-cell">Date</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => {
                const { color } = statusConfig[booking.status]
                return (
                  <tr key={booking.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4 text-[13px] font-bold" style={{ color: "#043222" }}>{booking.id}</td>
                    <td className="px-5 py-4">
                      <p className="text-[13px] font-bold text-gray-800">{booking.client}</p>
                      <p className="text-[11px] text-gray-400">{booking.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-[12px] text-gray-600 hidden md:table-cell max-w-[180px] truncate">{booking.treatment}</td>
                    <td className="px-5 py-4 text-[12px] text-gray-500 hidden lg:table-cell">{booking.date} · {booking.time}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${color}`}>{booking.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(booking)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-[8px] flex items-center justify-center"
                          title="View details"
                        >
                          <Eye className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                        <a
                          href={`https://wa.me/${booking.phone.replace(/\D/g, "")}?text=Hello ${booking.client}, regarding your booking ${booking.id}…`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-green-50 hover:bg-green-100 rounded-[8px] flex items-center justify-center"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[14px] font-semibold text-gray-400">No bookings found</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Detail Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[440px] bg-white overflow-y-auto shadow-2xl"
            >
              <div className="p-7 flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                  <div>
                    <p className="text-[12px] text-gray-400 font-semibold">{selected.id}</p>
                    <h2 className="text-[18px] font-bold" style={{ color: "#043222" }}>{selected.client}</h2>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Details */}
                {[
                  { label: "Treatment", value: selected.treatment },
                  { label: "Price", value: selected.price },
                  { label: "Date & Time", value: `${selected.date} at ${selected.time}` },
                  { label: "Location", value: selected.location },
                  { label: "Email", value: selected.email },
                  { label: "Phone", value: selected.phone },
                  { label: "Channel", value: selected.channel },
                  { label: "Notes", value: selected.notes || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
                    <p className="text-[14px] font-semibold text-gray-800">{value}</p>
                  </div>
                ))}

                {/* Status update */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Confirmed", "Pending", "Completed", "Cancelled"] as Booking["status"][]).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className={`py-2.5 rounded-[10px] text-[13px] font-bold border-2 transition-all ${
                          selected.status === s
                            ? "border-[#043222] bg-[#043222] text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g, "")}?text=Hello ${selected.client}, this is H Vitamin Drip regarding your booking ${selected.id}…`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-full text-[14px] font-bold text-white text-center flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1dba58] transition-all"
                >
                  Message on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
