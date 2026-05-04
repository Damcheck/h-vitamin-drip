"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Eye, EyeOff, Shield, Bell, Globe, LogOut, Mail, Lock, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

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

  // Auth States
  const [userEmail, setUserEmail] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [emailMsg, setEmailMsg] = useState({ text: "", type: "" })
  const [emailLoading, setEmailLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState("")

  const [passwords, setPasswords] = useState({ newPw: "", confirm: "" })
  const [pwMsg, setPwMsg] = useState({ text: "", type: "" })
  const [pwLoading, setPwLoading] = useState(false)
  const [showPwOtpInput, setShowPwOtpInput] = useState(false)
  const [pwOtp, setPwOtp] = useState("")

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function init() {
      // Load current auth user
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) setUserEmail(user.email)

      // Load DB settings
      try {
        const res = await fetch('/api/admin/settings')
        const data = await res.json()
        if (!data.error && Object.keys(data).length > 0) {
          setSettings(prev => ({ ...prev, ...data }))
        }
      } catch (err) {}
      
      setLoading(false)
    }
    init()
  }, [])

  const handleSaveSettings = async (e: React.FormEvent) => {
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

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail || newEmail === userEmail) return
    setEmailLoading(true)
    setEmailMsg({ text: "", type: "" })

    if (!showOtpInput) {
      // Step 1: Request OTP
      const { error } = await supabase.auth.updateUser({ email: newEmail })
      if (error) {
        setEmailMsg({ text: error.message, type: "error" })
      } else {
        setShowOtpInput(true)
        setEmailMsg({ text: "An 8-digit code has been sent to your new email. Please enter it below.", type: "success" })
      }
    } else {
      // Step 2: Verify OTP
      if (otp.length !== 8) {
        setEmailMsg({ text: "Please enter a valid 8-digit code.", type: "error" })
        setEmailLoading(false)
        return
      }
      const { data, error } = await supabase.auth.verifyOtp({
        email: newEmail,
        token: otp,
        type: 'email_change'
      })
      
      if (error) {
        setEmailMsg({ text: error.message, type: "error" })
      } else {
        setEmailMsg({ text: "Email updated successfully!", type: "success" })
        setUserEmail(newEmail)
        setNewEmail("")
        setOtp("")
        setShowOtpInput(false)
      }
    }
    setEmailLoading(false)
  }

  const cancelEmailChange = () => {
    setShowOtpInput(false)
    setOtp("")
    setEmailMsg({ text: "", type: "" })
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwMsg({ text: "", type: "" })

    if (passwords.newPw.length < 6) {
      setPwMsg({ text: "Password must be at least 6 characters", type: "error" })
      return
    }
    if (passwords.newPw !== passwords.confirm) {
      setPwMsg({ text: "Passwords do not match", type: "error" })
      return
    }

    setPwLoading(true)

    if (!showPwOtpInput) {
      // Step 1: Request OTP for password reset
      const { error } = await supabase.auth.resetPasswordForEmail(userEmail)
      if (error) {
        setPwMsg({ text: error.message, type: "error" })
      } else {
        setShowPwOtpInput(true)
        setPwMsg({ text: "An 8-digit security code has been sent to your email. Enter it to confirm.", type: "success" })
      }
    } else {
      // Step 2: Verify OTP and then Update Password
      if (pwOtp.length !== 8) {
        setPwMsg({ text: "Please enter a valid 8-digit code.", type: "error" })
        setPwLoading(false)
        return
      }

      // Verify the OTP
      const { error: otpError } = await supabase.auth.verifyOtp({
        email: userEmail,
        token: pwOtp,
        type: 'recovery'
      })

      if (otpError) {
        setPwMsg({ text: otpError.message, type: "error" })
        setPwLoading(false)
        return
      }

      // OTP verified successfully, now update the password
      const { error: updateError } = await supabase.auth.updateUser({ password: passwords.newPw })
      
      if (updateError) {
        setPwMsg({ text: updateError.message, type: "error" })
      } else {
        setPwMsg({ text: "Password updated successfully!", type: "success" })
        setPasswords({ newPw: "", confirm: "" })
        setPwOtp("")
        setShowPwOtpInput(false)
      }
    }
    setPwLoading(false)
  }

  const cancelPasswordChange = () => {
    setShowPwOtpInput(false)
    setPwOtp("")
    setPwMsg({ text: "", type: "" })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    document.cookie = 'sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push("/admin")
  }

  const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button
      type="button"
      onClick={onToggle}
      className="relative w-12 h-6 rounded-full transition-all duration-300"
      style={{ backgroundColor: active ? "#DBC297" : "rgba(255,255,255,0.1)" }}
    >
      <div className={`absolute top-1 w-4 h-4 bg-[#132B23] rounded-full shadow-md transition-all duration-300 ${active ? "left-7" : "left-1"}`} />
    </button>
  )

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#DBC297] animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl text-[#EBE7DF]">
      <div>
        <h1 className="text-3xl font-serif text-white uppercase tracking-wider">Settings</h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mt-1">Manage configuration and security</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8">
          
          {/* Email Settings */}
          <form onSubmit={handleChangeEmail} className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col gap-6 shadow-lg group hover:border-[#DBC297]/30 transition-all duration-500">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#DBC297]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider">Account Email</h2>
                <p className="text-[11px] text-white/50">Change your login email address</p>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-2 block">Current Email</label>
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white/70">
                {userEmail || "Loading..."}
              </div>
            </div>
            
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-2 block">New Email</label>
              <input
                type="email"
                required
                disabled={showOtpInput}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#DBC297] transition-all text-white placeholder:text-white/30 disabled:opacity-50"
                placeholder="Enter new email address"
              />
            </div>

            {showOtpInput && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-2 block">Verification Code (8 Digits)</label>
                <input
                  type="text"
                  required
                  maxLength={8}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // Only allow digits
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xl tracking-[0.25em] text-center font-mono outline-none focus:border-[#DBC297] transition-all text-white placeholder:text-white/30"
                  placeholder="••••••••"
                />
              </div>
            )}

            {emailMsg.text && (
              <p className={`text-[11px] font-bold px-4 py-3 rounded-xl ${emailMsg.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#DBC297]/10 text-[#DBC297] border border-[#DBC297]/20'}`}>
                {emailMsg.text}
              </p>
            )}

            <div className="flex gap-4 mt-2">
              <button type="submit" disabled={emailLoading || (!showOtpInput && (!newEmail || newEmail === userEmail)) || (showOtpInput && otp.length !== 8)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-[0_0_20px_rgba(219,194,151,0.2)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100">
                {emailLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (showOtpInput ? "Verify & Update" : "Send Code")}
              </button>
              {showOtpInput && (
                <button type="button" onClick={cancelEmailChange} disabled={emailLoading}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Change Password */}
          <form onSubmit={handlePasswordChange} className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col gap-6 shadow-lg group hover:border-[#DBC297]/30 transition-all duration-500">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#DBC297]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider">Change Password</h2>
                <p className="text-[11px] text-white/50">Update your admin login password</p>
              </div>
            </div>

            {[
              { label: "New Password", key: "newPw", show: showNewPw, toggle: () => setShowNewPw(!showNewPw) },
              { label: "Confirm New Password", key: "confirm", show: showNewPw, toggle: () => {} },
            ].map(({ label, key, show, toggle }) => (
              <div key={key}>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-2 block">{label}</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    required
                    disabled={showPwOtpInput}
                    value={passwords[key as keyof typeof passwords]}
                    onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pr-12 text-sm outline-none focus:border-[#DBC297] transition-all text-white placeholder:text-white/30 disabled:opacity-50"
                    placeholder="••••••••"
                  />
                  {key !== "confirm" && !showPwOtpInput && (
                    <button type="button" onClick={toggle} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {showPwOtpInput && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-2 block">Verification Code (8 Digits)</label>
                <input
                  type="text"
                  required
                  maxLength={8}
                  value={pwOtp}
                  onChange={(e) => setPwOtp(e.target.value.replace(/\D/g, ''))} // Only allow digits
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xl tracking-[0.25em] text-center font-mono outline-none focus:border-[#DBC297] transition-all text-white placeholder:text-white/30"
                  placeholder="••••••••"
                />
              </div>
            )}

            {pwMsg.text && (
              <p className={`text-[11px] font-bold px-4 py-3 rounded-xl ${pwMsg.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#DBC297]/10 text-[#DBC297] border border-[#DBC297]/20'}`}>
                {pwMsg.type === 'success' && <CheckCircle2 className="w-3 h-3 inline mr-1 -mt-0.5" />} {pwMsg.text}
              </p>
            )}

            <div className="flex gap-4 mt-2">
              <button type="submit" disabled={pwLoading || (!showPwOtpInput && (!passwords.newPw || !passwords.confirm)) || (showPwOtpInput && pwOtp.length !== 8)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] shadow-[0_0_20px_rgba(219,194,151,0.2)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100">
                {pwLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (showPwOtpInput ? "Verify & Update" : "Send Code")}
              </button>
              {showPwOtpInput && (
                <button type="button" onClick={cancelPasswordChange} disabled={pwLoading}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                  Cancel
                </button>
              )}
            </div>
          </form>

        </div>

        <div className="flex flex-col gap-8">
          
          {/* General Settings */}
          <form onSubmit={handleSaveSettings} className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col gap-6 shadow-lg group hover:border-[#DBC297]/30 transition-all duration-500">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#DBC297]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider">Site Preferences</h2>
                <p className="text-[11px] text-white/50">Basic configuration details</p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {[
                { label: "Site Name", key: "site_name" },
                { label: "Site URL", key: "site_url" },
                { label: "Currency", key: "currency" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-2 block">{label}</label>
                  <input
                    value={settings[key as keyof typeof settings] as string || ""}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#DBC297] transition-all text-white"
                  />
                </div>
              ))}
            </div>

            <button type="submit" disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-all disabled:opacity-50 mt-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (saved ? <><CheckCircle2 className="w-4 h-4 text-[#DBC297]" /> Saved</> : "Save Preferences")}
            </button>
          </form>

          {/* Notifications */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 flex flex-col gap-6 shadow-lg group hover:border-[#DBC297]/30 transition-all duration-500">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-[#DBC297]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white uppercase tracking-wider">Notifications</h2>
                <p className="text-[11px] text-white/50">Alerts configuration</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: "Email Notifications", sub: "Receive booking alerts via email", key: "email_notifications" },
                { label: "New Booking Alert", sub: "Alert when a new booking is made", key: "new_booking_alert" },
              ].map(({ label, sub, key }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-[13px] font-bold text-white">{label}</p>
                    <p className="text-[11px] text-white/50 mt-1">{sub}</p>
                  </div>
                  <Toggle
                    active={settings[key as keyof typeof settings] as boolean}
                    onToggle={() => {
                      const updated = { ...settings, [key]: !settings[key as keyof typeof settings] }
                      setSettings(updated)
                      fetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(updated) })
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#DBC297] mb-2 block">Notification Email</label>
              <input
                value={settings.notification_email || ""}
                onChange={(e) => setSettings({ ...settings, notification_email: e.target.value })}
                onBlur={() => fetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(settings) })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#DBC297] transition-all text-white"
                placeholder="Alerts will be sent here"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 backdrop-blur-xl rounded-[2rem] border border-red-500/20 p-8 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-red-400 uppercase tracking-wider mb-1">Sign Out</h2>
            <p className="text-[11px] text-white/50">Securely sign out of the admin panel.</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
