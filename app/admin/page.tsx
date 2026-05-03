"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, User } from "lucide-react"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simple client-side auth (in production, use proper auth)
    if (username === "admin" && password === "hvitamin2026") {
      sessionStorage.setItem("admin_auth", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Invalid username or password")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F8F9F8" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#043222" }}
          >
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <h1 className="text-[24px] font-bold" style={{ color: "#043222" }}>Admin Dashboard</h1>
          <p className="text-[14px] text-gray-500 mt-1">H Vitamin Drip — Content Management</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-8">
          <h2 className="text-[18px] font-bold mb-6" style={{ color: "#043222" }}>Sign in to continue</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <label className="text-[12px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-[12px] text-[14px] outline-none focus:border-[#043222] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[12px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={show ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-[12px] text-[14px] outline-none focus:border-[#043222] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-[13px] font-medium px-4 py-3 rounded-[10px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full text-[14px] font-bold transition-all mt-2 disabled:opacity-60"
              style={{ backgroundColor: "#043222", color: "white" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-[12px] text-gray-400 mt-5">
            Default: admin / hvitamin2026
          </p>
        </div>
      </div>
    </div>
  )
}
