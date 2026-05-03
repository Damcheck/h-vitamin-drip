"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      sessionStorage.setItem("admin_auth", "true")
      router.push("/admin/dashboard")
    }
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
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
              <div className="bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold px-4 py-3 rounded-xl">
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

          <p className="text-center text-[10px] text-[#606864] mt-6 uppercase tracking-widest font-bold">
            Sign in with your administrator credentials
          </p>
        </div>
      </div>
    </div>
  )
}
