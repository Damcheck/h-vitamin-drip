import { Header } from "@/components/boty/header"
import { Hero } from "@/components/boty/hero"
import { ProductGrid } from "@/components/boty/product-grid"
import { FeatureSection } from "@/components/boty/feature-section"
import { Testimonials } from "@/components/boty/testimonials"
import { CTABanner } from "@/components/boty/cta-banner"
import { Newsletter } from "@/components/boty/newsletter"
import { Footer } from "@/components/boty/footer"

export default function HomePage() {
  return (
    <main className="bg-[#F8F9F8]">
      <Header />
      {/* 1. Hero — headline + product bottles */}
      <Hero />
      {/* 2. Best Sellers — 4 product card grid */}
      <ProductGrid />
      {/* 3. Dark feature section + lime marquee bar */}
      <FeatureSection />
      {/* 4. Testimonials */}
      <Testimonials />
      {/* 5. Recent products + GlowRadiance CTA feature */}
      <CTABanner />
      {/* 6. Instagram grid + Newsletter */}
      <Newsletter />
      {/* 7. Footer */}
      <Footer />
    </main>
  )
}
