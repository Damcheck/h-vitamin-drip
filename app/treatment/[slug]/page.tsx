import { getTreatmentBySlug } from "@/lib/products"
import { notFound } from "next/navigation"
import { AIHeader } from "@/components/ai-theme/ai-header"
import { AIFooter } from "@/components/ai-theme/ai-footer"
import { AIProductHero } from "@/components/ai-theme-product/ai-product-hero"
import { AIProductDetails } from "@/components/ai-theme-product/ai-product-details"
import { AIProductIngredients } from "@/components/ai-theme-product/ai-product-ingredients"
import { AIProductApplication } from "@/components/ai-theme-product/ai-product-application"
import { AIProductPathway } from "@/components/ai-theme-product/ai-product-pathway"
import { AIProductSynergy } from "@/components/ai-theme-product/ai-product-synergy"
import { AIProductTestimonials } from "@/components/ai-theme-product/ai-product-testimonials"
import { AIProductRelated } from "@/components/ai-theme-product/ai-product-related"

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params before using them as per Next.js 15+ best practices
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) notFound()

  return (
    <main className="min-h-screen bg-[#F4F1E9]">
      <AIHeader />
      
      {/* 1. Hero Section */}
      <AIProductHero treatment={treatment} />
      
      {/* 2. Details & Checkout */}
      <AIProductDetails treatment={treatment} />
      
      {/* 3. Ingredients Flatlay */}
      <AIProductIngredients treatment={treatment} />
      
      {/* 4. Application Steps */}
      <AIProductApplication />
      
      {/* 5. Pathway Timeline */}
      <AIProductPathway />
      
      {/* 6. Compound Synergy Picker */}
      <AIProductSynergy />
      
      {/* 7. Glass Testimonials */}
      <AIProductTestimonials />
      
      {/* 8. Explore Related Synergy */}
      <AIProductRelated currentTreatmentId={treatment.id} />
      
      <AIFooter />
    </main>
  )
}
