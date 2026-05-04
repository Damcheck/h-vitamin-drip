"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { MessageSquare, Mail, Phone, Calendar, Trash2, Loader2 } from "lucide-react"

type Submission = {
  id: string
  name: string
  email: string
  phone: string | null
  service: string | null
  message: string | null
  created_at: string
}

export default function InboxPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setSubmissions(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return
    await supabase.from('contact_submissions').delete().eq('id', id)
    setSubmissions(submissions.filter(s => s.id !== id))
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#DBC297] animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl text-[#EBE7DF]">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-serif text-white uppercase tracking-wider">Inbox</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mt-1">Manage contact form submissions</p>
        </div>
        <div className="px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#DBC297] shadow-lg">
          {submissions.length} Messages
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden shadow-lg">
        {submissions.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-lg font-serif text-white">No messages yet.</p>
            <p className="text-sm text-white/40">When customers contact you, messages will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-8 hover:bg-white/5 transition-colors group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-serif text-xl text-white group-hover:text-[#DBC297] transition-colors">{sub.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      <a href={`mailto:${sub.email}`} className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
                        <Mail className="w-3.5 h-3.5" /> {sub.email}
                      </a>
                      {sub.phone && (
                        <a href={`tel:${sub.phone}`} className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
                          <Phone className="w-3.5 h-3.5" /> {sub.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40">
                      <Calendar className="w-3 h-3" />
                      {new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button onClick={() => handleDelete(sub.id)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/50 hover:bg-red-500/10 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {sub.service && (
                  <div className="mb-4 inline-flex items-center px-4 py-1.5 bg-[#DBC297]/10 border border-[#DBC297]/20 text-[#DBC297] rounded-full text-[9px] font-bold uppercase tracking-widest">
                    Interested in: {sub.service}
                  </div>
                )}
                
                {sub.message && (
                  <p className="text-sm text-white/80 leading-relaxed bg-[#132B23]/50 p-6 rounded-2xl border border-white/5 font-medium">
                    {sub.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
