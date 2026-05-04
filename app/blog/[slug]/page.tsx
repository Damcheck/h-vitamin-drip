import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIFooter } from "@/components/ai-theme/ai-footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

const posts = [
  {
    slug: "benefits-of-iv-vitamin-therapy",
    title: "The Science Behind IV Vitamin Therapy: Why It Works",
    content: "IV Vitamin Therapy is a method of administering vitamins and minerals directly into the bloodstream. By bypassing the digestive system, you get 100% absorption of the nutrients your body needs to thrive. Many of our clients report feeling more energetic, focused, and resilient to stress. While oral supplements can be broken down by stomach acid or poorly absorbed, an IV drip ensures your cells receive exactly what they need instantly.",
    category: "Education",
    date: "Apr 28, 2026",
    readTime: "5 min read",
    bg: "bg-[#E8EDE5]",
  },
  {
    slug: "glutathione-skin-brightening-nigeria",
    title: "Glutathione Drips: The Secret Behind Glowing Skin in Nigeria",
    content: "Glutathione is a powerful antioxidant naturally produced in the body, but factors like stress, poor diet, and environmental toxins can deplete our levels. Our Glutathione IV drips restore these levels, helping to neutralize free radicals, reduce hyperpigmentation, and promote a radiant, even skin tone. This treatment has become a cornerstone of the modern Nigerian skincare routine, delivering results that topical creams simply cannot match.",
    category: "Skin Care",
    date: "Apr 20, 2026",
    readTime: "7 min read",
    bg: "bg-[#EDE5E8]",
  },
  {
    slug: "nad-therapy-anti-ageing",
    title: "NAD+ Therapy: The Anti-Ageing Treatment You Need to Know About",
    content: "Nicotinamide Adenine Dinucleotide (NAD+) is an essential coenzyme found in every living cell, responsible for cellular energy and repair. As we age, our NAD+ levels drop significantly, leading to fatigue, cognitive decline, and physical signs of aging. NAD+ IV therapy replenishes these levels, effectively turning back the clock at a cellular level. Benefits include improved mental clarity, enhanced athletic performance, and better sleep.",
    category: "Anti-Ageing",
    date: "Apr 14, 2026",
    readTime: "6 min read",
    bg: "bg-[#E5EBF0]",
  },
  {
    slug: "home-iv-drip-what-to-expect",
    title: "What to Expect from Your First Home IV Drip Session",
    content: "Booking a home IV drip with us is designed to be a seamless, luxurious experience. Once you schedule your appointment, one of our registered nurses will arrive at your home or hotel. We begin with a brief medical consultation and vital signs check. Then, you simply relax on your sofa or bed while the IV is administered. The entire process takes about 45 minutes to an hour, during which you can read, work, or simply rest.",
    category: "Guide",
    date: "Apr 5, 2026",
    readTime: "4 min read",
    bg: "bg-[#F0EBF8]",
  },
  {
    slug: "energy-drip-busy-professionals",
    title: "Why Busy Nigerian Professionals Are Choosing Energy IV Drips",
    content: "The modern professional lifestyle often involves long hours, frequent travel, and high stress, which can quickly drain the body's reserves. Energy IV drips, such as our signature Myers Cocktail, provide a fast and effective way to recharge. Packed with B-Complex vitamins, Vitamin C, and Magnesium, this therapy helps combat burnout, improves focus, and provides a sustainable energy boost without the crash associated with caffeine or sugar.",
    category: "Wellness",
    date: "Mar 28, 2026",
    readTime: "5 min read",
    bg: "bg-[#EBF4F0]",
  },
  {
    slug: "immunity-booster-before-travel",
    title: "Boost Your Immunity Before International Travel",
    content: "Airports and airplanes are notorious for exposing travelers to a wide array of pathogens, while the stress of travel and jet lag can further suppress the immune system. Our Immunity IV drip is specifically formulated with high-dose Vitamin C, Zinc, and Glutathione to supercharge your body's natural defenses. We recommend booking a session 24 to 48 hours before your flight to ensure you stay healthy and enjoy your trip.",
    category: "Immunity",
    date: "Mar 18, 2026",
    readTime: "4 min read",
    bg: "bg-[#F8F0EB]",
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#F4F1E9]">
      <AIHeader />

      <div className="pt-[120px] pb-24">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] font-bold text-foreground/60 hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="inline-block bg-white rounded-full px-3 py-1.5 text-[12px] font-bold text-foreground mb-4">
              {post.category}
            </span>
            <h1 className="text-[36px] md:text-[48px] font-bold text-foreground leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className={`aspect-[2/1] rounded-[28px] ${post.bg} mb-12 relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-64 bg-gradient-to-b from-white/30 to-white/10 rounded-full blur-xl" />
            </div>
          </div>

          <article className="prose prose-lg prose-slate max-w-none text-foreground/80">
            <p className="lead text-[20px] font-medium leading-relaxed mb-8">
              {post.content.split('.')[0]}.
            </p>
            <p className="leading-relaxed mb-6">
              {post.content.split('.').slice(1).join('.')}
            </p>
            
            <div className="mt-12 p-8 bg-white rounded-2xl border border-border/30">
              <h3 className="text-xl font-bold mb-3">Ready to experience the benefits?</h3>
              <p className="text-foreground/70 mb-6">Book your next IV therapy session and get our nurses to visit you wherever you are.</p>
              <Link href="/contact" className="inline-flex bg-[#132B23] text-[#DBC297] px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-[#1a382e] transition-colors">
                Book an Appointment
              </Link>
            </div>
          </article>
        </div>
      </div>

      <AIFooter />
    </main>
  )
}
