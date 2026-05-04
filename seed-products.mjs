import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const products = [
  {
    name: "Radiance Drip / Skin Glow",
    slug: "radiance-drip",
    tagline: "Unveil Your Natural Glow",
    description: "Formulated to brighten your skin, reduce blemishes, and provide a radiant, youthful complexion.",
    long_description: "The Radiance Drip is a specialized blend of vitamins and antioxidants designed to detoxify the body and promote healthier, glowing skin from within. It helps in reducing pigmentation, evening out skin tone, and providing a luminous glow.",
    price: 150000,
    original_price: 180000,
    category: "iv-drip",
    duration: "45–60 minutes",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"],
    featured: true,
    ingredients: ["Vitamin C", "Glutathione", "B-Complex Vitamins"],
    benefits: ["Brightens skin tone", "Reduces blemishes and pigmentation", "Powerful antioxidant support"],
    who_is_it_for: "Ideal for anyone looking to achieve a brighter, more even skin tone and combat the signs of aging.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment."
  },
  {
    name: "Myer's Cocktail",
    slug: "myers-cocktail",
    tagline: "The Gold Standard of Wellness",
    description: "The classic IV drip that helps maintain optimal health, boost immunity, and increase energy levels.",
    long_description: "The Myer's Cocktail is a widely popular intravenous nutrient therapy invented by Dr. John Myers. It combines a synergistic blend of vitamins and minerals to treat a variety of clinical conditions, including chronic fatigue, asthma, and migraines, while boosting the immune system.",
    price: 130000,
    original_price: 150000,
    category: "iv-drip",
    duration: "45 minutes",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800"],
    featured: true,
    ingredients: ["Magnesium", "Calcium", "B-Complex", "Vitamin C"],
    benefits: ["Boosts immunity", "Alleviates stress and fatigue", "Improves overall wellness"],
    who_is_it_for: "Perfect for individuals seeking an all-around health boost, recovering from illness, or managing chronic fatigue.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment."
  },
  {
    name: "Revitalise / Energy Drip",
    slug: "energy-drip",
    tagline: "Fuel Your Day",
    description: "A potent mix of B-Vitamins and amino acids to combat fatigue and restore your natural energy levels.",
    long_description: "When coffee isn't enough, the Revitalise Drip steps in. This infusion delivers high doses of B-Vitamins and essential amino acids directly into your bloodstream, providing an immediate and sustained energy boost without the crash associated with caffeine.",
    price: 120000,
    original_price: null,
    category: "iv-drip",
    duration: "30–45 minutes",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"],
    featured: true,
    ingredients: ["B12", "B-Complex", "Taurine", "Folic Acid"],
    benefits: ["Increases energy levels", "Improves mental clarity and focus", "Combats chronic fatigue"],
    who_is_it_for: "Professionals, athletes, or anyone feeling run-down and in need of a quick energy restoration.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment."
  },
  {
    name: "Anti-Ageing Therapy",
    slug: "anti-ageing-therapy",
    tagline: "Turn Back The Clock",
    description: "Rejuvenate your cells with NAD+ and premium antioxidants for cellular repair and longevity.",
    long_description: "Our Anti-Ageing Therapy utilizes NAD+ (Nicotinamide Adenine Dinucleotide), a crucial coenzyme found in every cell of your body. It promotes cellular regeneration, slows cognitive decline, and combats the physical signs of aging from the inside out.",
    price: 250000,
    original_price: 300000,
    category: "therapy",
    duration: "90–120 minutes",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"],
    featured: false,
    ingredients: ["NAD+", "Glutathione", "Vitamin C"],
    benefits: ["Promotes cellular regeneration", "Improves cognitive function", "Reduces fine lines and wrinkles"],
    who_is_it_for: "Individuals seeking premium longevity treatments, cognitive enhancement, and cellular repair.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment."
  }
]

async function seed() {
  console.log("Seeding products into Supabase...")
  
  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'slug' })
      
    if (error) {
      console.error(`Error inserting ${product.name}:`, error.message)
    } else {
      console.log(`Successfully inserted/updated ${product.name}`)
    }
  }
  
  console.log("Seeding complete.")
}

seed()
