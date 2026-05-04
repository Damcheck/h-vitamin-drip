"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { MessageSquare, Mail, Phone, Calendar, Trash2 } from "lucide-react"

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
    return <div className="text-sm text-gray-500">Loading inbox...</div>
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-[28px] font-bold" style={{ color: "#043222" }}>Inbox</h1>
          <p className="text-[13px] text-gray-500 mt-1">Manage contact form submissions</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-full border border-gray-200 text-[12px] font-bold text-[#043222]">
          {submissions.length} Messages
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-200 overflow-hidden">
        {submissions.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No messages yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-[16px] text-gray-900">{sub.name}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <a href={`mailto:${sub.email}`} className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-[#043222]">
                        <Mail className="w-3.5 h-3.5" /> {sub.email}
                      </a>
                      {sub.phone && (
                        <a href={`tel:${sub.phone}`} className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-[#043222]">
                          <Phone className="w-3.5 h-3.5" /> {sub.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                      <Calendar className="w-3 h-3" />
                      {new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button onClick={() => handleDelete(sub.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {sub.service && (
                  <div className="mb-3 inline-flex items-center px-3 py-1 bg-[#e8f0ec] text-[#043222] rounded-full text-[11px] font-bold">
                    Interested in: {sub.service}
                  </div>
                )}
                
                {sub.message && (
                  <p className="text-[14px] text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
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
