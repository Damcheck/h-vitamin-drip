"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Loader2, Save } from "lucide-react"

export default function AdminContentPage() {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [content, setContent] = useState<Record<string, string>>({
    hero_headline: "",
    hero_cta: "",
    announcement_bar: "",
    best_sellers_title: "",
    feature_headline: "",
    newsletter_headline: "",
    newsletter_sub: "",
    about_mission: "",
    contact_phone: "",
    contact_email: "",
    locations: "",
    hours: "",
    contact_whatsapp: "",
    instagram_url: "",
    facebook_url: "",
    twitter_url: "",
  })

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error && Object.keys(data).length > 0) {
          setContent(prev => ({ ...prev, ...data }))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const textField = (label: string, key: string, multi = false) => (
    <div>
      <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-2 block">{label}</label>
      {multi ? (
        <textarea
          rows={3}
          value={content[key] || ""}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#DBC297] resize-none transition-all text-white placeholder:text-white/30"
        />
      ) : (
        <input
          value={content[key] || ""}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm outline-none focus:border-[#DBC297] transition-all text-white placeholder:text-white/30"
        />
      )}
    </div>
  )

  const SectionTitle = ({ title, desc }: { title: string; desc?: string }) => (
    <div className="border-b border-white/10 pb-6 mb-6">
      <h2 className="text-[15px] font-bold text-white uppercase tracking-wider">{title}</h2>
      {desc && <p className="text-[11px] text-white/50 mt-1">{desc}</p>}
    </div>
  )

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#DBC297] animate-spin" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8 max-w-4xl text-[#EBE7DF]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-serif text-white uppercase tracking-wider">Content</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mt-1">Edit website text and details</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-[0_0_20px_rgba(219,194,151,0.2)] hover:scale-105"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>)}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8">
          {/* Homepage Hero */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col gap-5 shadow-lg">
            <SectionTitle title="Homepage Hero" desc="The main headline and CTA button text" />
            {textField("Hero Headline", "hero_headline", true)}
            {textField("CTA Button Text", "hero_cta")}
            {textField("Announcement Bar Text", "announcement_bar")}
          </div>

          {/* Sections */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col gap-5 shadow-lg">
            <SectionTitle title="Homepage Sections" />
            {textField("Best Sellers Section Title", "best_sellers_title")}
            {textField("Dark Feature Section Headline", "feature_headline", true)}
          </div>
          
          {/* Newsletter */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col gap-5 shadow-lg">
            <SectionTitle title="Newsletter Section" />
            {textField("Newsletter Headline", "newsletter_headline", true)}
            {textField("Newsletter Subtext", "newsletter_sub", true)}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Contact Details */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col gap-5 shadow-lg">
            <SectionTitle title="Contact Details" desc="Shown on contact page and footer" />
            {textField("Phone Number", "contact_phone")}
            {textField("Email Address", "contact_email")}
            {textField("Locations", "locations")}
            {textField("Business Hours", "hours")}
            {textField("WhatsApp Number (digits only)", "contact_whatsapp")}
          </div>

          {/* Social Links */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col gap-5 shadow-lg">
            <SectionTitle title="Social Media Links" />
            {textField("Instagram URL", "instagram_url")}
            {textField("Facebook URL", "facebook_url")}
            {textField("Twitter/X URL", "twitter_url")}
          </div>
        </div>
      </div>
    </form>
  )
}
