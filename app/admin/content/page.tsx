"use client"

import { useState, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"

export default function AdminContentPage() {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [content, setContent] = useState({
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

  const textField = (label: string, key: keyof typeof content, multi = false) => (
    <div>
      <label className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">{label}</label>
      {multi ? (
        <textarea
          rows={3}
          value={content[key] || ""}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] outline-none focus:border-[#043222] resize-none transition-all"
        />
      ) : (
        <input
          value={content[key] || ""}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] outline-none focus:border-[#043222] transition-all"
        />
      )}
    </div>
  )

  const SectionTitle = ({ title, desc }: { title: string; desc?: string }) => (
    <div className="border-b border-gray-100 pb-4 mb-5">
      <h2 className="text-[16px] font-bold" style={{ color: "#043222" }}>{title}</h2>
      {desc && <p className="text-[13px] text-gray-400 mt-0.5">{desc}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-bold" style={{ color: "#043222" }}>Content</h1>
          <p className="text-[13px] text-gray-400 mt-0.5">Edit website text and details</p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-bold transition-all"
          style={{ backgroundColor: saved ? "#16a34a" : "#043222", color: "white" }}
        >
          {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : "Save Changes"}
        </button>
      </div>

      {/* Homepage Hero */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-4">
        <SectionTitle title="Homepage Hero" desc="The main headline and CTA button text" />
        {textField("Hero Headline", "hero_headline", true)}
        {textField("CTA Button Text", "hero_cta")}
        {textField("Announcement Bar Text", "announcement_bar")}
      </div>

      {/* Sections */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-4">
        <SectionTitle title="Homepage Sections" />
        {textField("Best Sellers Section Title", "best_sellers_title")}
        {textField("Dark Feature Section Headline", "feature_headline", true)}
      </div>

      {/* Newsletter */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-4">
        <SectionTitle title="Newsletter Section" />
        {textField("Newsletter Headline", "newsletter_headline", true)}
        {textField("Newsletter Subtext", "newsletter_sub", true)}
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-4">
        <SectionTitle title="Contact Details" desc="Shown on contact page and footer" />
        {textField("Phone Number", "contact_phone")}
        {textField("Email Address", "contact_email")}
        {textField("Locations", "locations")}
        {textField("Business Hours", "hours")}
        {textField("WhatsApp Number (digits only)", "contact_whatsapp")}
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-4">
        <SectionTitle title="Social Media Links" />
        {textField("Instagram URL", "instagram_url")}
        {textField("Facebook URL", "facebook_url")}
        {textField("Twitter/X URL", "twitter_url")}
      </div>
    </form>
  )
}
