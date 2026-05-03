"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

const posts = [
  {
    slug: "benefits-of-iv-vitamin-therapy",
    title: "The Science Behind IV Vitamin Therapy: Why It Works",
    excerpt: "Discover why intravenous delivery of vitamins and nutrients is far more effective than oral supplements, and how it can transform your health.",
    category: "Education",
    date: "Apr 28, 2026",
    readTime: "5 min read",
    bg: "bg-[#E8EDE5]",
  },
  {
    slug: "glutathione-skin-brightening-nigeria",
    title: "Glutathione Drips: The Secret Behind Glowing Skin in Nigeria",
    excerpt: "From Lagos to Abuja, glutathione IV therapy is becoming the go-to treatment for skin brightening. Here's everything you need to know.",
    category: "Skin Care",
    date: "Apr 20, 2026",
    readTime: "7 min read",
    bg: "bg-[#EDE5E8]",
  },
  {
    slug: "nad-therapy-anti-ageing",
    title: "NAD+ Therapy: The Anti-Ageing Treatment You Need to Know About",
    excerpt: "NAD+ is a vital coenzyme that declines with age. Learn how NAD+ IV therapy can restore your energy, mental clarity, and cellular health.",
    category: "Anti-Ageing",
    date: "Apr 14, 2026",
    readTime: "6 min read",
    bg: "bg-[#E5EBF0]",
  },
  {
    slug: "home-iv-drip-what-to-expect",
    title: "What to Expect from Your First Home IV Drip Session",
    excerpt: "Never had an IV drip at home before? We walk you through exactly what happens, step by step, so you know what to expect.",
    category: "Guide",
    date: "Apr 5, 2026",
    readTime: "4 min read",
    bg: "bg-[#F0EBF8]",
  },
  {
    slug: "energy-drip-busy-professionals",
    title: "Why Busy Nigerian Professionals Are Choosing Energy IV Drips",
    excerpt: "Chronic fatigue, brain fog, and burnout are on the rise. Here's how the Myers Cocktail is helping high-achievers reclaim their vitality.",
    category: "Wellness",
    date: "Mar 28, 2026",
    readTime: "5 min read",
    bg: "bg-[#EBF4F0]",
  },
  {
    slug: "immunity-booster-before-travel",
    title: "Boost Your Immunity Before International Travel",
    excerpt: "Travelling abroad? Give your immune system the best defence with our immunity IV drip, designed to protect you from seasonal illnesses.",
    category: "Immunity",
    date: "Mar 18, 2026",
    readTime: "4 min read",
    bg: "bg-[#F8F0EB]",
  },
]

const categories = ["All", "Education", "Skin Care", "Anti-Ageing", "Guide", "Wellness", "Immunity"]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-[88px]">
        {/* Hero */}
        <div className="bg-background border-b border-border/30 py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-3">
                Wellness Insights
              </p>
              <h1 className="text-[48px] md:text-[64px] font-bold text-foreground leading-tight">Blog</h1>
            </motion.div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                  cat === "All"
                    ? "bg-foreground text-white"
                    : "bg-white border border-border/40 text-foreground/60 hover:text-foreground hover:border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured post (first one larger) */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8 mb-8"
          >
            <Link href={`/blog/${posts[0].slug}`} className="group">
              <div className={`aspect-[4/3] rounded-[28px] ${posts[0].bg} overflow-hidden mb-5 relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-48 bg-gradient-to-b from-white/30 to-white/10 rounded-full" />
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all" />
                <span className="absolute top-5 left-5 bg-white rounded-full px-3 py-1.5 text-[12px] font-bold text-foreground">
                  {posts[0].category}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[12px] text-muted-foreground">{posts[0].date}</span>
                <span className="text-muted-foreground">·</span>
                <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {posts[0].readTime}
                </span>
              </div>
              <h2 className="text-[26px] font-bold text-foreground leading-tight mb-3 group-hover:underline underline-offset-4">
                {posts[0].title}
              </h2>
              <p className="text-[15px] text-foreground/60 leading-relaxed mb-4">{posts[0].excerpt}</p>
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-foreground">
                Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Second featured post */}
            <Link href={`/blog/${posts[1].slug}`} className="group">
              <div className={`aspect-[4/3] rounded-[28px] ${posts[1].bg} overflow-hidden mb-5 relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-44 bg-gradient-to-b from-white/30 to-white/10 rounded-full" />
                </div>
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all" />
                <span className="absolute top-5 left-5 bg-white rounded-full px-3 py-1.5 text-[12px] font-bold text-foreground">
                  {posts[1].category}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[12px] text-muted-foreground">{posts[1].date}</span>
                <span className="text-muted-foreground">·</span>
                <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {posts[1].readTime}
                </span>
              </div>
              <h2 className="text-[22px] font-bold text-foreground leading-tight mb-3 group-hover:underline underline-offset-4">
                {posts[1].title}
              </h2>
              <p className="text-[14px] text-foreground/60 leading-relaxed mb-4">{posts[1].excerpt}</p>
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-foreground">
                Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Remaining posts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {posts.slice(2).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                  <div className={`aspect-[4/3] rounded-[20px] ${post.bg} overflow-hidden mb-4 relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-32 bg-gradient-to-b from-white/30 to-white/10 rounded-full" />
                    </div>
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all" />
                    <span className="absolute top-4 left-4 bg-white rounded-full px-2.5 py-1 text-[11px] font-bold text-foreground">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] text-muted-foreground">{post.date}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-[11px] text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-foreground leading-tight group-hover:underline underline-offset-2">
                    {post.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-foreground py-16 text-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-[28px] font-bold mb-2">Get wellness tips in your inbox</h2>
              <p className="text-[14px] text-white/60">Subscribe and get 25% off your first treatment.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 shrink-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 text-white placeholder:text-white/40 border border-white/20 rounded-full px-5 py-3 text-[14px] outline-none focus:border-primary w-64"
              />
              <button type="submit" className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-[14px] font-bold hover:bg-primary/80 transition-all whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
