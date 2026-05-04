"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Lock, User, AlertTriangle, ShieldAlert } from "lucide-react"
import { supabase } from "@/lib/supabase"

const MAX_ATTEMPTS = 5
const LOCKOUT_MINUTES = 15

function AdminLoginInner() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [locked, setLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)
  const router = useRouter()
  const searchParams = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)

  // Check if redirected with expired session
  useEffect(() => {
    if (searchParams.get('expired') === '1') {
      setError("Your session has expired. Please sign in again.")
      setLoading(false)
    }
  }, [searchParams])

  // Check for existing lockout on mount
  useEffect(() => {
    const lockUntil = localStorage.getItem('hvd_lock_until')
    if (lockUntil) {
      const remaining = Math.ceil((Number(lockUntil) - Date.now()) / 1000)
      if (remaining > 0) {
        setLocked(true)
        setLockTimer(remaining)
      } else {
        localStorage.removeItem('hvd_lock_until')
        localStorage.removeItem('hvd_attempts')
      }
    }
  }, [])

  // Countdown timer for lockout
  useEffect(() => {
    if (!locked || lockTimer <= 0) return
    const interval = setInterval(() => {
      setLockTimer(prev => {
        if (prev <= 1) {
          setLocked(false)
          localStorage.removeItem('hvd_lock_until')
          localStorage.removeItem('hvd_attempts')
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [locked, lockTimer])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (locked) return

    setLoading(true)
    setError("")

    // Check attempts
    const attempts = Number(localStorage.getItem('hvd_attempts') || '0')
    if (attempts >= MAX_ATTEMPTS) {
      const lockUntil = Date.now() + LOCKOUT_MINUTES * 60 * 1000
      localStorage.setItem('hvd_lock_until', String(lockUntil))
      setLocked(true)
      setLockTimer(LOCKOUT_MINUTES * 60)
      setLoading(false)
      setError("")
      return
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      if (authError) {
        const newAttempts = attempts + 1
        localStorage.setItem('hvd_attempts', String(newAttempts))

        if (newAttempts >= MAX_ATTEMPTS) {
          const lockUntil = Date.now() + LOCKOUT_MINUTES * 60 * 1000
          localStorage.setItem('hvd_lock_until', String(lockUntil))
          setLocked(true)
          setLockTimer(LOCKOUT_MINUTES * 60)
        } else {
          // Generic error — don't reveal if email or password was wrong
          setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
        }
        setLoading(false)
        return
      }

      // Set cookie for middleware
      if (data.session) {
        document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${data.session.expires_in}; SameSite=Lax; Secure`
      }

      // Success — clear attempts and sensitive data from memory
      localStorage.removeItem('hvd_attempts')
      localStorage.removeItem('hvd_lock_until')
      setEmail("")
      setPassword("")

      // Redirect to the page they were trying to access, or dashboard
      const redirect = searchParams.get('redirect') || '/admin/dashboard'
      router.push(redirect)
    } catch {
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1E9]">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#132B23] shadow-gold">
            <span className="text-[#DBC297] font-serif font-bold text-2xl">H</span>
          </div>
          <h1 className="font-serif text-3xl text-[#132B23] uppercase">Admin Portal</h1>
          <p className="text-[10px] uppercase tracking-widest text-[#606864] mt-2 font-bold">Secure Access</p>
        </div>

        {/* Card */}
        <div className="bg-[#FCFAF7]/40 backdrop-blur-2xl rounded-[2rem] border border-[#C4A67B]/30 p-8 shadow-2xl">
          {locked ? (
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                <ShieldAlert className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="font-serif text-xl text-[#132B23]">Account Locked</h2>
              <p className="text-sm text-[#606864] text-center leading-relaxed">
                Too many failed login attempts. Your account is temporarily locked for security.
              </p>
              <div className="text-3xl font-serif font-bold text-[#132B23] tabular-nums">
                {formatTime(lockTimer)}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#606864] font-bold">
                Until unlock
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleLogin} className="flex flex-col gap-5" autoComplete="off">
              {/* Email */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4A67B]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@hvitamindrip.ng"
                    autoComplete="off"
                    data-lpignore="true"
                    className="w-full pl-12 pr-4 py-4 bg-[#F4F1E9]/50 border border-[#C4A67B]/40 rounded-xl text-sm outline-none focus:border-[#132B23] transition-all text-[#132B23]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864] mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C4A67B]" />
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    data-lpignore="true"
                    className="w-full pl-12 pr-12 py-4 bg-[#F4F1E9]/50 border border-[#C4A67B]/40 rounded-xl text-sm outline-none focus:border-[#132B23] transition-all text-[#132B23]"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#606864] hover:text-[#132B23] transition-colors"
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all mt-4 disabled:opacity-60 bg-gradient-to-r from-[#DBC297] to-[#C4A67B] text-[#132B23] hover:shadow-gold hover:scale-[1.02]"
              >
                {loading ? "Authenticating…" : "Sign in"}
              </button>
            </form>
          )}

          <p className="text-center text-[10px] text-[#606864] mt-6 uppercase tracking-widest font-bold">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F4F1E9]">
        <div className="w-8 h-8 border-2 border-[#C4A67B] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AdminLoginInner />
    </Suspense>
  )
}
