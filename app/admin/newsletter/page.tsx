"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Mail, Calendar, Trash2, Loader2 } from "lucide-react"

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
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#DBC297] animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl text-[#EBE7DF]">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white uppercase tracking-wider">Newsletter</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mt-1">Manage email subscribers</p>
        </div>
        <div className="flex gap-4">
          <div className="px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#DBC297] shadow-lg flex items-center justify-center">
            {subscribers.length} Subscribers
          </div>
          <button onClick={handleExport} className="px-6 py-3 bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(219,194,151,0.2)]">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden shadow-lg">
        {subscribers.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-lg font-serif text-white">No subscribers yet.</p>
            <p className="text-sm text-white/40">When users sign up for your newsletter, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#DBC297]">Email Address</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#DBC297]">Date Subscribed</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#DBC297] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium text-white group-hover:text-[#DBC297] transition-colors">{sub.email}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-white/50">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right flex justify-end">
                      <button onClick={() => handleDelete(sub.id)} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/50 hover:bg-red-500/10 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
