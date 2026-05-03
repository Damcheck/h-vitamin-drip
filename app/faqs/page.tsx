"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const faqCategories = [
  {
    title: "General",
    faqs: [
      {
        q: "What is IV vitamin therapy?",
        a: "IV vitamin therapy involves delivering vitamins, minerals, and other nutrients directly into the bloodstream through an intravenous (IV) drip. This bypasses the digestive system, ensuring 100% absorption of nutrients for immediate and maximum benefit.",
      },
      {
        q: "Is IV therapy safe?",
        a: "Yes. All our treatments are administered by registered, fully qualified nurses with IV therapy experience. We use only pharmaceutical-grade ingredients from certified suppliers. A brief health assessment is conducted before every session.",
      },
      {
        q: "How long does a session take?",
        a: "The duration depends on the treatment. IV drips typically take 30–60 minutes, while boosters and injections take just 5–15 minutes. NAD+ therapy can take 2–4 hours due to the higher concentration required.",
      },
      {
        q: "Where do you cover?",
        a: "We currently serve Lagos, Abuja, and Port Harcourt. If you are in another city, please contact us and we will let you know if we can accommodate you.",
      },
    ],
  },
  {
    title: "Booking & Payment",
    faqs: [
      {
        q: "How do I book a session?",
        a: "You can book via our website (add to cart and proceed to checkout), via WhatsApp at +234 800 000 0000, or by using the Contact form. We typically respond within 1 hour during business hours.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfer, card payment online, and payment on the day of the session. WhatsApp bookings can be confirmed with a deposit.",
      },
      {
        q: "Can I cancel or reschedule?",
        a: "Yes. You can cancel or reschedule with at least 24 hours' notice. Cancellations within 24 hours may incur a fee to cover the nurse's travel costs.",
      },
      {
        q: "Do you offer corporate packages?",
        a: "Yes! We offer bespoke corporate wellness packages for offices, events, and teams. Contact us for a custom quote.",
      },
    ],
  },
  {
    title: "Treatments",
    faqs: [
      {
        q: "Which IV drip is best for energy?",
        a: "Our Energy Drip (Myers Cocktail) is specifically designed for energy, fatigue, and mental clarity. It combines Vitamin C, B vitamins, magnesium, and more for an immediate boost.",
      },
      {
        q: "Which treatment is best for skin?",
        a: "Our Glutathione Detox Drip is most popular for skin brightening and complexion improvement. The Skin & Hair Drip with Biotin is also excellent for overall skin health.",
      },
      {
        q: "Can I have multiple treatments at once?",
        a: "Some combinations are possible and beneficial. Our nurses will advise you on the safest and most effective combination based on your health assessment.",
      },
      {
        q: "How often should I have treatments?",
        a: "This depends on your goals. Many clients have a maintenance session once a month. Specific conditions may benefit from a course of treatments (e.g., 3–6 sessions). Your nurse will recommend a personalised schedule.",
      },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-5 text-left gap-4"
      >
        <span className="text-[15px] font-bold text-foreground leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-foreground/40 shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[14px] text-foreground/60 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("General")

  const current = faqCategories.find((c) => c.title === activeCategory) || faqCategories[0]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-[88px]">
        {/* Hero */}
        <div className="bg-background border-b border-border/30 py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-[13px] font-semibold uppercase tracking-widest text-foreground/40 mb-3">
                Support
              </p>
              <h1 className="text-[48px] md:text-[64px] font-bold text-foreground leading-tight mb-4">FAQs</h1>
              <p className="text-[15px] text-foreground/60 max-w-lg mx-auto">
                Everything you need to know about our IV therapy services, booking process, and treatments.
              </p>
            </motion.div>
          </div>
        </div>

        {/* FAQs Content */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-[260px_1fr] gap-10">
            {/* Left: Category Tabs */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {faqCategories.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(cat.title)}
                  className={`px-5 py-3 rounded-[14px] text-[14px] font-semibold text-left whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat.title
                      ? "bg-foreground text-white"
                      : "bg-white border border-border/40 text-foreground/60 hover:text-foreground hover:border-border"
                  }`}
                >
                  {cat.title}
                  <span className={`ml-2 text-[12px] ${activeCategory === cat.title ? "text-white/60" : "text-muted-foreground"}`}>
                    ({cat.faqs.length})
                  </span>
                </button>
              ))}
            </div>

            {/* Right: FAQ list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-[24px] border border-border/30 px-8 py-2"
              >
                {current.faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#F4F6F2] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-[32px] font-bold text-foreground mb-3">Still have questions?</h2>
            <p className="text-[15px] text-foreground/60 mb-7">
              Our team is here to help. Reach out via WhatsApp or our contact form.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full text-[14px] font-bold hover:bg-[#1dba58] transition-all"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-foreground text-white px-8 py-4 rounded-full text-[14px] font-bold hover:bg-foreground/80 transition-all"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
