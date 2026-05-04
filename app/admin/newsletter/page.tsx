"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Mail, Calendar, Trash2 } from "lucide-react"

type Subscriber = {
  id: string
  email: string
  created_at: string
}

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    const { data } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setSubscribers(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return
    await supabase.from('newsletter_subscribers').delete().eq('id', id)
    setSubscribers(subscribers.filter(s => s.id !== id))
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Date Subscribed\n" 
      + subscribers.map(s => `${s.email},${new Date(s.created_at).toISOString()}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (loading) {
    return <div className="text-sm text-gray-500">Loading subscribers...</div>
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-bold" style={{ color: "#043222" }}>Newsletter</h1>
          <p className="text-[13px] text-gray-500 mt-1">Manage email subscribers</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-[12px] font-bold text-[#043222]">
            {subscribers.length} Subscribers
          </div>
          <button onClick={handleExport} className="px-4 py-2 bg-[#043222] text-white rounded-full text-[12px] font-bold hover:bg-[#1a382e] transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-200 overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No subscribers yet.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Email Address</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Date Subscribed</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[14px] font-medium text-gray-900">{sub.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[12px] text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(sub.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
