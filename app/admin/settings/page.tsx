"use client"

import { useState } from "react"
import { CheckCircle2, Eye, EyeOff, Shield, Bell, Globe, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [settings, setSettings] = useState({
    site_name: "",
    site_url: "",
    currency: "",
    timezone: "",
    email_notifications: true,
    whatsapp_notifications: true,
    new_booking_alert: true,
    cancellation_alert: true,
    notification_email: "",
    notification_phone: "",
  })
  const [passwords, setPasswords] = useState({ current: "", newPw: "", confirm: "" })
  const [pwError, setPwError] = useState("")
  const [pwSuccess, setPwSuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error && Object.keys(data).length > 0) {
          setSettings(prev => ({ ...prev, ...data }))
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
        body: JSON.stringify(settings)
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

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPwError("")
    if (passwords.current !== "hvitamin2026") {
      setPwError("Current password is incorrect")
      return
    }
    if (passwords.newPw.length < 8) {
      setPwError("New password must be at least 8 characters")
      return
    }
    if (passwords.newPw !== passwords.confirm) {
      setPwError("Passwords do not match")
      return
    }
    setPwSuccess(true)
    setPasswords({ current: "", newPw: "", confirm: "" })
    setTimeout(() => setPwSuccess(false), 3000)
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth")
    router.push("/admin")
  }

  const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button
      type="button"
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full transition-all duration-300"
      style={{ backgroundColor: active ? "#043222" : "#d1d5db" }}
    >
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${active ? "left-5" : "left-0.5"}`} />
    </button>
  )

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <h1 className="text-[28px] font-bold" style={{ color: "#043222" }}>Settings</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">Manage site configuration and preferences</p>
      </div>

      {/* General Settings */}
      <form onSubmit={handleSave} className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 bg-[#e8f0ec] rounded-[10px] flex items-center justify-center">
            <Globe className="w-4.5 h-4.5 text-[#043222]" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold" style={{ color: "#043222" }}>General</h2>
            <p className="text-[12px] text-gray-400">Basic site configuration</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Site Name", key: "site_name" },
            { label: "Site URL", key: "site_url" },
            { label: "Currency", key: "currency" },
            { label: "Timezone", key: "timezone" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">{label}</label>
              <input
                value={settings[key as keyof typeof settings] as string || ""}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] outline-none focus:border-[#043222] transition-all"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="self-start inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-bold transition-all"
          style={{ backgroundColor: saved ? "#16a34a" : "#043222", color: "white" }}
        >
          {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : "Save Settings"}
        </button>
      </form>

      {/* Notifications */}
      <div className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 bg-[#e8f0ec] rounded-[10px] flex items-center justify-center">
            <Bell className="w-4.5 h-4.5 text-[#043222]" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold" style={{ color: "#043222" }}>Notifications</h2>
            <p className="text-[12px] text-gray-400">Configure booking alerts</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: "Email Notifications", sub: "Receive booking alerts via email", key: "email_notifications" },
            { label: "WhatsApp Notifications", sub: "Receive booking alerts via WhatsApp", key: "whatsapp_notifications" },
            { label: "New Booking Alert", sub: "Alert when a new booking is made", key: "new_booking_alert" },
            { label: "Cancellation Alert", sub: "Alert when a booking is cancelled", key: "cancellation_alert" },
          ].map(({ label, sub, key }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-[14px] font-bold text-gray-800">{label}</p>
                <p className="text-[12px] text-gray-400">{sub}</p>
              </div>
              <Toggle
                active={settings[key as keyof typeof settings] as boolean}
                onToggle={() => setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] })}
              />
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">Notification Email</label>
            <input
              value={settings.notification_email || ""}
              onChange={(e) => setSettings({ ...settings, notification_email: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] outline-none focus:border-[#043222]"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">Notification Phone</label>
            <input
              value={settings.notification_phone || ""}
              onChange={(e) => setSettings({ ...settings, notification_phone: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 text-[14px] outline-none focus:border-[#043222]"
            />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <form onSubmit={handlePasswordChange} className="bg-white rounded-[20px] border border-gray-100 p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 bg-[#e8f0ec] rounded-[10px] flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-[#043222]" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold" style={{ color: "#043222" }}>Change Password</h2>
            <p className="text-[12px] text-gray-400">Update your admin login password</p>
          </div>
        </div>

        {[
          { label: "Current Password", key: "current", show: showCurrentPw, toggle: () => setShowCurrentPw(!showCurrentPw) },
          { label: "New Password", key: "newPw", show: showNewPw, toggle: () => setShowNewPw(!showNewPw) },
          { label: "Confirm New Password", key: "confirm", show: showNewPw, toggle: () => {} },
        ].map(({ label, key, show, toggle }) => (
          <div key={key}>
            <label className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 block">{label}</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={passwords[key as keyof typeof passwords]}
                onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-[12px] px-4 py-3 pr-12 text-[14px] outline-none focus:border-[#043222]"
                placeholder="••••••••"
              />
              {key !== "confirm" && (
                <button type="button" onClick={toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        ))}

        {pwError && <p className="text-[13px] text-red-600 font-medium">{pwError}</p>}
        {pwSuccess && <p className="text-[13px] text-green-600 font-medium flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Password changed successfully!</p>}

        <button
          type="submit"
          className="self-start px-6 py-2.5 rounded-full text-[13px] font-bold text-white transition-all"
          style={{ backgroundColor: "#043222" }}
        >
          Update Password
        </button>
      </form>

      {/* Danger Zone */}
      <div className="bg-white rounded-[20px] border border-red-100 p-6">
        <h2 className="text-[15px] font-bold text-red-600 mb-4">Sign Out</h2>
        <p className="text-[13px] text-gray-500 mb-4">Sign out of the admin panel and return to the login page.</p>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  )
}
