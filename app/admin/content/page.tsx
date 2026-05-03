"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

export default function AdminContentPage() {
  const [saved, setSaved] = useState(false)
  const [content, setContent] = useState({
    // Hero
    heroHeadline: "Personalized treatments made with Rx ingredients and supplements.",
    heroCta: "Shop now",
    // Announcement
    announcementBar: "Free consultation with every booking · Same-day appointments in Lagos & Abuja",
    // Best Sellers title
    bestSellersTitle: "Best seller",
    // Feature section
    featureHeadline: "Clarify pores and minimize Imperfections for clearer skin",
    // Newsletter
    newsletterHeadline: "Subscribe now and get 25% off on your first purchase.",
    newsletterSub: "Join thousands of wellness enthusiasts and receive exclusive offers.",
    // About
    aboutMission: "Making premium wellness accessible to every Nigerian",
    // Contact details
    phone: "+234 800 000 0000",
    email: "hello@hvitamindrip.ng",
    locations: "Lagos, Abuja, Port Harcourt",
    hours: "Mon–Sat: 8am – 8pm",
    whatsapp: "2348000000000",
    // Social links
    instagram: "https://www.instagram.com/",
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const textField = (label: string, key: keyof typeof content, multi = false) => (
    <div>
      <label className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">{label}</label>
      {multi ? (
        <textarea
          rows={3}
          value={content[key]}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] outline-none focus:border-[#043222] resize-none transition-all"
        />
      ) : (
        <input
          value={content[key]}
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
        {textField("Hero Headline", "heroHeadline", true)}
        {textField("CTA Button Text", "heroCta")}
        {textField("Announcement Bar Text", "announcementBar")}
      </div>

      {/* Sections */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-4">
        <SectionTitle title="Homepage Sections" />
        {textField("Best Sellers Section Title", "bestSellersTitle")}
        {textField("Dark Feature Section Headline", "featureHeadline", true)}
      </div>

      {/* Newsletter */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-4">
        <SectionTitle title="Newsletter Section" />
        {textField("Newsletter Headline", "newsletterHeadline", true)}
        {textField("Newsletter Subtext", "newsletterSub", true)}
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-4">
        <SectionTitle title="Contact Details" desc="Shown on contact page and footer" />
        {textField("Phone Number", "phone")}
        {textField("Email Address", "email")}
        {textField("Locations", "locations")}
        {textField("Business Hours", "hours")}
        {textField("WhatsApp Number (digits only)", "whatsapp")}
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-4">
        <SectionTitle title="Social Media Links" />
        {textField("Instagram URL", "instagram")}
        {textField("Facebook URL", "facebook")}
        {textField("Twitter/X URL", "twitter")}
      </div>
    </form>
  )
}
