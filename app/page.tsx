import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIHero } from "@/components/ai-theme/ai-hero"
import { AICollection } from "@/components/ai-theme/ai-collection"
import { AIScience } from "@/components/ai-theme/ai-science"
import { AITestimonials } from "@/components/ai-theme/ai-testimonials"
import { AIInnovations } from "@/components/ai-theme/ai-innovations"
import { AIDeepDive } from "@/components/ai-theme/ai-deep-dive"
import { AIFooter } from "@/components/ai-theme/ai-footer"

export default function HomePage() {
  return (
    <main className="bg-[#F4F1E9]">
      <AIHeader />
      <AIHero />
      <AICollection />
      <AIScience />
      <AITestimonials />
      <AIInnovations />
      <AIDeepDive />
      <AIFooter />
    </main>
  )
}
