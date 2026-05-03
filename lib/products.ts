export interface Treatment {
  id: string
  name: string
  slug: string
  category: "iv-drip" | "booster" | "injection" | "therapy"
  tagline: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  packages?: { label: string; price: number }[]
  image: string
  images?: string[]
  keyIngredients: string[]
  benefits: string[]
  duration: string
  whoIsItFor: string
  disclaimer: string
  featured: boolean
}

export const treatments: Treatment[] = [
  {
    id: "energy-drip",
    slug: "energy-drip",
    name: "Energy Drip (Myers Cocktail)",
    category: "iv-drip",
    tagline: "Combat fatigue, boost stamina & enhance vitality",
    description: "The Myers Cocktail/Energy Drip is a powerful combination of essential vitamins, minerals, and amino acids designed to boost energy, improve mental clarity, and enhance overall well-being.",
    longDescription: "This treatment is designed to combat fatigue, boost stamina, and enhance overall vitality. In a fast-paced world where stress and fatigue are common, the Myers Cocktail offers a revitalising solution. The infusion combines Vitamin C, B vitamins, magnesium, and other essential nutrients directly into the bloodstream, bypassing the digestive system for maximum absorption and immediate results.",
    price: 170000,
    packages: [
      { label: "Single Session", price: 170000 },
      { label: "Course of 3 (Save ₦30)", price: 480000 },
    ],
    image: "/images/products/serum-bottles-1.png",
    keyIngredients: ["Vitamin C", "B-Complex Vitamins", "Vitamin B12", "Magnesium", "Calcium", "Zinc"],
    benefits: ["Boosts energy levels", "Reduces fatigue", "Enhances mental clarity", "Supports immune function", "Improves hydration", "Reduces stress"],
    duration: "45–60 minutes",
    whoIsItFor: "Ideal for those suffering from chronic fatigue, burnout, jet lag, or anyone looking to optimise their energy and performance.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: true
  },
  {
    id: "glutathione-detox",
    slug: "glutathione-detox",
    name: "Glutathione Detox",
    category: "iv-drip",
    tagline: "Powerful detox, skin brightening & antioxidant protection",
    description: "The Glutathione IV Drip delivers a potent dose of glutathione, a powerful antioxidant known for its ability to detoxify the body and brighten the skin.",
    longDescription: "Glutathione IV drips are a popular and effective treatment offered at our vitamin clinic, designed to deliver a concentrated dose of this master antioxidant directly into your bloodstream. Glutathione helps neutralise free radicals, detoxify the liver, and promote radiant, even-toned skin. It is widely regarded as one of the most effective treatments for skin brightening and anti-ageing.",
    price: 150000,
    packages: [
      { label: "Single Session", price: 150000 },
      { label: "Course of 3 (Save ₦30)", price: 420000 },
    ],
    image: "/images/products/amber-dropper-bottles.png",
    keyIngredients: ["Glutathione", "Vitamin C", "Alpha Lipoic Acid"],
    benefits: ["Brightens skin tone", "Detoxifies the liver", "Neutralises free radicals", "Anti-ageing properties", "Boosts immune system", "Reduces inflammation"],
    duration: "30–45 minutes",
    whoIsItFor: "Perfect for those seeking skin brightening, detoxification, or antioxidant protection.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: true
  },
  {
    id: "high-dose-vitamin-c",
    slug: "high-dose-vitamin-c",
    name: "High Dose Vitamin C",
    category: "iv-drip",
    tagline: "Protect cells, reduce inflammation & boost immunity",
    description: "This treatment harnesses the potent antioxidant properties of vitamin C, known for its ability to protect your cells from damage, reduce inflammation, and enhance your overall health.",
    longDescription: "The High Dose Vitamin C IV Drip provides a potent infusion of vitamin C, known for its powerful antioxidant properties. Whether you're looking to fend off seasonal illnesses, recover faster from strenuous activities, or simply maintain peak health, our High Dose Vitamin C treatment is tailored to meet your needs. Experience the revitalising effects and reclaim your vitality with this essential nutrient.",
    price: 130000,
    image: "/images/products/spray-bottles.png",
    keyIngredients: ["Ascorbic Acid (Vitamin C)", "Sodium Bicarbonate", "Sterile Water for Injection"],
    benefits: ["Powerful antioxidant protection", "Boosts immune system", "Supports collagen production", "Reduces inflammation", "Speeds up recovery", "Fights seasonal illness"],
    duration: "45–60 minutes",
    whoIsItFor: "Ideal for those looking to strengthen their immune system, recover from illness faster, or support overall cellular health.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: true
  },
  {
    id: "nad-therapy",
    slug: "nad-therapy",
    name: "NAD+ Therapy",
    category: "iv-drip",
    tagline: "Reverse cellular ageing & restore peak energy",
    description: "NAD+ (Nicotinamide Adenine Dinucleotide) is a vital coenzyme found in every cell of your body, playing a crucial role in energy production, cellular repair, and maintaining optimal function.",
    longDescription: "As we age, NAD+ levels naturally decline, leading to fatigue, cognitive decline, and a host of other health issues. Our NAD+ Therapy replenishes these essential levels, providing a comprehensive solution to combat the adverse effects of aging, stress, and lifestyle factors, helping you feel revitalised and energetic. The NAD+ IV Drip is designed to enhance cellular health, boost energy levels, support metabolism, and promote athletic performance.",
    price: 85000,
    image: "/images/products/eye-serum-bottles.png",
    keyIngredients: ["NAD+ (Nicotinamide Adenine Dinucleotide)", "Sterile Saline Solution"],
    benefits: ["Slows cellular ageing", "Boosts brain function", "Enhances energy production", "Supports DNA repair", "Improves metabolism", "Athletic performance support"],
    duration: "2–4 hours",
    whoIsItFor: "Suited for those experiencing age-related fatigue, cognitive decline, or anyone seeking to optimise cellular health and performance.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: true
  },
  {
    id: "skin-hair-drip",
    slug: "skin-hair-drip",
    name: "Skin & Hair Drip",
    category: "iv-drip",
    tagline: "Rejuvenate skin & promote healthy hair growth",
    description: "The Skin + Hair IV Drip is designed to rejuvenate your skin and promote healthier hair growth. Packed with essential vitamins, minerals, and antioxidants.",
    longDescription: "Our Skin & Hair Drip delivers a powerful blend of biotin, vitamins C and E, zinc, and silica directly into the bloodstream for maximum bioavailability. This treatment targets the root causes of dull skin and hair loss, nourishing follicles and skin cells from within. Convenient service delivered directly to your home or office.",
    price: 160000,
    packages: [
      { label: "Single Session", price: 160000 },
      { label: "Course of 3 (Save ₦30)", price: 450000 },
    ],
    image: "/images/products/pump-bottles-cream.png",
    keyIngredients: ["Biotin (Vitamin B7)", "Vitamin C", "Vitamin E", "Zinc", "Silica", "B-Complex Vitamins"],
    benefits: ["Promotes hair growth", "Strengthens hair follicles", "Brightens skin", "Reduces hair loss", "Improves skin elasticity", "Nourishes nails"],
    duration: "45–60 minutes",
    whoIsItFor: "Perfect for those experiencing hair thinning, dull skin, brittle nails, or anyone wanting to enhance their natural beauty from within.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: true
  },
  {
    id: "immunity-booster",
    slug: "immunity-booster",
    name: "Immunity Booster",
    category: "iv-drip",
    tagline: "Fortify your body's natural defences",
    description: "Immunity booster therapy is designed to enhance your body's natural defenses, promoting faster recovery and overall health.",
    longDescription: "The Immunity IV Drip is specially formulated to support and enhance your immune system. Packed with essential vitamins, minerals, and antioxidants, this IV therapy provides comprehensive immune support. It delivers high doses of Vitamin C, Zinc, B vitamins, and other immune-boosting nutrients directly to your cells for immediate effect.",
    price: 150000,
    image: "/images/products/jars-wooden-lid.png",
    keyIngredients: ["High-Dose Vitamin C", "Zinc", "B-Complex Vitamins", "Selenium", "Magnesium"],
    benefits: ["Strengthens immune system", "Faster illness recovery", "Reduces severity of cold & flu", "Anti-inflammatory", "Antioxidant protection", "Increases energy"],
    duration: "45–60 minutes",
    whoIsItFor: "Ideal during cold & flu season, after illness, before travel, or for anyone wanting to maintain a strong immune system.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "detox-therapy",
    slug: "detox-therapy",
    name: "Detox Therapy",
    category: "iv-drip",
    tagline: "Flush toxins, restore balance & refresh your body",
    description: "This powerful treatment is designed to help you combat the stresses and toxins of modern life, leaving you feeling refreshed and revitalised.",
    longDescription: "The Detox Drip is designed to support your body's natural detoxification processes. By infusing a blend of essential vitamins, minerals, and antioxidants directly into the bloodstream, this treatment helps flush out toxins, reduce oxidative stress, and restore your body's natural balance. Ideal after periods of excess or for general wellness maintenance.",
    price: 160000,
    image: "/images/products/tube-bottles.png",
    keyIngredients: ["Glutathione", "Vitamin C", "Alpha Lipoic Acid", "B-Complex Vitamins", "Magnesium"],
    benefits: ["Removes toxins", "Supports liver health", "Reduces oxidative stress", "Improves digestion", "Boosts energy", "Clearer skin"],
    duration: "45–60 minutes",
    whoIsItFor: "Perfect after holidays, festivities, periods of stress, or for anyone seeking a full body reset.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "hydration-drip",
    slug: "hydration-drip",
    name: "Hydration Drip",
    category: "iv-drip",
    tagline: "Rehydrate, replenish & revive your body",
    description: "Our Hydration Drip is the perfect solution to rehydrate your body, replenish vital nutrients, and revive your energy levels.",
    longDescription: "Whether you're recovering from intense exercise, a long flight, or a night out, the Hydration Drip rapidly restores optimal fluid balance and electrolytes. This IV infusion delivers saline, electrolytes, and essential vitamins directly into your bloodstream for immediate hydration and recovery. Faster and more effective than drinking water alone.",
    price: 120000,
    image: "/images/products/spray-bottles.png",
    keyIngredients: ["Sterile Saline Solution", "Electrolytes", "Vitamin C", "B-Complex Vitamins", "Magnesium"],
    benefits: ["Rapid rehydration", "Electrolyte replenishment", "Headache relief", "Fatigue recovery", "Post-exercise recovery", "Hangover relief"],
    duration: "30–45 minutes",
    whoIsItFor: "Perfect for athletes, travellers, those recovering from illness or a hangover, or anyone feeling dehydrated.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "anti-ageing-therapy",
    slug: "anti-ageing-therapy",
    name: "Anti-Ageing Therapy",
    category: "iv-drip",
    tagline: "Turn back the clock with targeted rejuvenation",
    description: "A powerful combination of B Vitamins, Glutathione and Amino Acids for anti-ageing and rejuvenating effects.",
    longDescription: "Our Anti-Ageing IV therapy delivers a potent cocktail of glutathione, B vitamins, amino acids, and antioxidants that work at a cellular level to reverse the signs of ageing. This treatment supports collagen production, reduces oxidative damage, and promotes cell renewal for a visibly younger, more radiant appearance.",
    price: 180000,
    image: "/images/products/pump-bottles-lavender.png",
    keyIngredients: ["Glutathione", "B-Complex Vitamins", "Amino Acids", "Vitamin C", "Coenzyme Q10"],
    benefits: ["Reduces fine lines", "Brightens complexion", "Promotes collagen", "Cellular regeneration", "Antioxidant protection", "Improved elasticity"],
    duration: "45–60 minutes",
    whoIsItFor: "Ideal for those wanting to maintain a youthful appearance, reduce signs of ageing, or support long-term skin health.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "fitness-drip",
    slug: "fitness-drip",
    name: "Fitness Drip",
    category: "iv-drip",
    tagline: "Recover faster, perform better & stay hydrated",
    description: "Designed to support recovery, boost energy, and restore hydration. Whether you're an athlete or a fitness enthusiast, this drip has you covered.",
    longDescription: "The Fitness Drip is specially formulated for those who push their limits. It delivers amino acids, electrolytes, and performance-enhancing vitamins directly to your muscles for rapid recovery, reduced soreness, and improved endurance. Get back to peak performance faster with this targeted sports recovery treatment.",
    price: 150000,
    image: "/images/products/serum-bottles-1.png",
    keyIngredients: ["Amino Acids", "Electrolytes", "Vitamin C", "B-Complex Vitamins", "Magnesium", "Zinc"],
    benefits: ["Accelerates recovery", "Reduces muscle soreness", "Boosts endurance", "Improves hydration", "Enhances performance", "Replenishes nutrients"],
    duration: "45–60 minutes",
    whoIsItFor: "Ideal for athletes, gym-goers, marathon runners, or anyone who engages in regular intense physical activity.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "alpha-lipoic-acid",
    slug: "alpha-lipoic-acid",
    name: "Alpha Lipoic Acid (ALA) Drip",
    category: "iv-drip",
    tagline: "Universal antioxidant for energy & protection",
    description: "ALA aids in the conversion of nutrients into energy, helping to combat fatigue and enhance physical and mental performance.",
    longDescription: "Alpha Lipoic Acid is a universal antioxidant that works in both fat and water-soluble environments, making it uniquely effective at combating oxidative stress throughout the body. This IV therapy supports nerve health, blood sugar balance, energy metabolism, and skin rejuvenation. ALA also regenerates other antioxidants including Vitamins C and E.",
    price: 140000,
    image: "/images/products/amber-dropper-bottles.png",
    keyIngredients: ["Alpha Lipoic Acid", "Vitamin C", "B-Complex Vitamins"],
    benefits: ["Universal antioxidant", "Supports nerve health", "Blood sugar balance", "Boosts energy metabolism", "Regenerates other antioxidants", "Anti-ageing"],
    duration: "45–60 minutes",
    whoIsItFor: "Recommended for those with diabetes, neuropathy, fatigue, or anyone wanting powerful antioxidant support.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "multivitamin-drip",
    slug: "multivitamin-drip",
    name: "Multi-Vitamin Drip",
    category: "iv-drip",
    tagline: "Comprehensive nutrient infusion for total wellbeing",
    description: "The MultiVit IV Drip provides a comprehensive blend of essential vitamins and minerals to support your overall health and wellness.",
    longDescription: "Our Multi-Vitamin Drip is the ultimate wellness maintenance treatment. It delivers a carefully formulated blend of over 20 essential vitamins, minerals, and trace elements directly into your bloodstream for 100% bioavailability. Perfect for those seeking a complete nutritional top-up to support energy, immunity, and overall health.",
    price: 140000,
    image: "/images/products/cream-jars-colored.png",
    keyIngredients: ["Vitamin A", "B-Complex Vitamins", "Vitamin C", "Vitamin D", "Vitamin E", "Zinc", "Magnesium", "Selenium"],
    benefits: ["Complete nutritional support", "Boosts energy", "Strengthens immunity", "Supports metabolism", "Improves skin health", "Reduces deficiency"],
    duration: "45–60 minutes",
    whoIsItFor: "Ideal for busy professionals, those with poor dietary habits, or anyone wanting comprehensive nutritional support.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "healthy-hair-drip",
    slug: "healthy-hair-drip",
    name: "Healthy Hair Drip",
    category: "iv-drip",
    tagline: "Luscious, vibrant hair from the inside out",
    description: "Struggling with dull, lifeless hair? Healthy Hair IV Therapy is your ultimate solution for achieving luscious, vibrant tresses.",
    longDescription: "This innovative treatment delivers a potent cocktail of biotin, silica, zinc, and essential amino acids directly to your hair follicles through your bloodstream. Unlike topical treatments, IV therapy ensures 100% absorption and targets hair loss and thinning at the root cause. Experience visibly thicker, stronger, and more lustrous hair.",
    price: 160000,
    image: "/images/products/pump-bottles-lavender.png",
    keyIngredients: ["Biotin (Vitamin B7)", "Silica", "Zinc", "Amino Acids", "Vitamin C", "Iron"],
    benefits: ["Thicker hair growth", "Reduces hair shedding", "Strengthens hair shafts", "Improves scalp health", "Adds shine & lustre", "Nourishes follicles"],
    duration: "45–60 minutes",
    whoIsItFor: "For those experiencing hair thinning, excessive shedding, or anyone wanting naturally thicker, healthier hair.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "iron-drip",
    slug: "iron-drip",
    name: "Iron Drip",
    category: "iv-drip",
    tagline: "Overcome iron deficiency & restore your vitality",
    description: "Iron drip therapy is an innovative solution designed to address iron deficiency and anaemia.",
    longDescription: "Many individuals struggle with iron deficiency anaemia, which can cause extreme fatigue, weakness, and cognitive impairment. Our Iron Drip delivers iron sucrose directly into the bloodstream, bypassing the digestive system for rapid and effective replenishment of iron stores. Results are often felt within 24-48 hours.",
    price: 180000,
    image: "/images/products/tube-bottles.png",
    keyIngredients: ["Iron Sucrose", "Sterile Saline Solution"],
    benefits: ["Corrects iron deficiency", "Reduces fatigue", "Improves energy levels", "Enhances cognitive function", "Supports red blood cell production", "Improves exercise tolerance"],
    duration: "1–2 hours",
    whoIsItFor: "Recommended for those with diagnosed iron deficiency anaemia, heavy periods, post-surgery patients, or vegetarians/vegans.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  // Boosters / Injections
  {
    id: "vitamin-b12-booster",
    slug: "vitamin-b12-booster",
    name: "Vitamin B12 Booster",
    category: "booster",
    tagline: "Essential energy vitamin for body & mind",
    description: "The Vitamin B12 Injection (Hydroxocobalamin) is an effective solution for replenishing B12 levels in individuals with a deficiency.",
    longDescription: "Vitamin B12 plays a critical role in energy production, red blood cell formation, and neurological function. Our Hydroxocobalamin injection is the most bioavailable form of B12, ensuring maximum absorption. Suitable for vegans, vegetarians, those with absorption issues, or anyone experiencing B12 deficiency symptoms such as fatigue, brain fog, or low mood.",
    price: 35000,
    packages: [
      { label: "Single Injection", price: 35000 },
      { label: "Course of 4 (Save ₦15)", price: 125000 },
    ],
    image: "/images/products/eye-serum-bottles.png",
    keyIngredients: ["Hydroxocobalamin (Vitamin B12)"],
    benefits: ["Boosts energy levels", "Improves mood", "Supports nerve health", "Enhances memory", "Promotes red blood cell production", "Reduces brain fog"],
    duration: "5–10 minutes",
    whoIsItFor: "Ideal for vegans, vegetarians, those with absorption issues, or anyone experiencing B12 deficiency.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: true
  },
  {
    id: "biotin-b7-booster",
    slug: "biotin-b7-booster",
    name: "Biotin / Vitamin B7 Booster",
    category: "booster",
    tagline: "Support hair, skin & nail health from within",
    description: "Biotin is renowned for its ability to support healthy hair, skin, and nails. It is involved in the metabolism of fats, carbohydrates, and proteins.",
    longDescription: "Our Biotin injection delivers a high concentration of Vitamin B7 directly into your bloodstream for maximum absorption. Biotin is essential for keratin production, which forms the structural basis of hair, skin, and nails. Regular biotin injections can significantly improve hair thickness, skin radiance, and nail strength.",
    price: 35000,
    packages: [
      { label: "Single Injection", price: 35000 },
      { label: "Course of 4 (Save ₦15)", price: 125000 },
    ],
    image: "/images/products/pump-bottles-cream.png",
    keyIngredients: ["Biotin (Vitamin B7)"],
    benefits: ["Promotes hair growth", "Strengthens nails", "Improves skin health", "Supports metabolism", "Enhances energy", "Reduces hair loss"],
    duration: "5–10 minutes",
    whoIsItFor: "Perfect for those experiencing hair thinning, brittle nails, or dull skin, or anyone wanting to enhance their appearance.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "vitamin-d3-booster",
    slug: "vitamin-d3-booster",
    name: "Vitamin D3 Booster",
    category: "booster",
    tagline: "The sunshine vitamin for bones, mood & immunity",
    description: "Vitamin D3, often referred to as the 'sunshine vitamin,' plays a crucial role in maintaining your bone health, immune system, and mood.",
    longDescription: "Vitamin D deficiency is extremely common in the Nigeria due to limited sunlight exposure. Our Vitamin D3 injection delivers a high therapeutic dose directly into the muscle for rapid and effective absorption. Vitamin D3 supports bone density, immune function, mood regulation, and cardiovascular health.",
    price: 50000,
    packages: [
      { label: "Single Injection (100,000IU)", price: 50000 },
      { label: "Single Injection (300,000IU)", price: 80000 },
    ],
    image: "/images/products/amber-dropper-bottles.png",
    keyIngredients: ["Cholecalciferol (Vitamin D3)"],
    benefits: ["Supports bone health", "Boosts immune system", "Improves mood", "Reduces fatigue", "Supports cardiovascular health", "Regulates calcium absorption"],
    duration: "5–10 minutes",
    whoIsItFor: "Recommended for those with vitamin D deficiency, limited sun exposure, or anyone wanting to support bone and immune health.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "magnesium-injection",
    slug: "magnesium-injection",
    name: "Magnesium Injection",
    category: "injection",
    tagline: "Essential mineral for over 300 body functions",
    description: "Magnesium is an essential mineral that supports over 300 biochemical reactions in the body.",
    longDescription: "The Magnesium Injection is a fast and effective way to increase magnesium levels, helping with muscle relaxation, nerve function, energy production, and overall well-being. This injection is ideal for individuals suffering from magnesium deficiency, muscle cramps, or those needing to reduce stress and anxiety.",
    price: 40000,
    packages: [
      { label: "1g Injection (Single)", price: 40000 },
      { label: "Course of 3 (Save ₦7.50)", price: 125000 },
      { label: "Course of 6 (Save ₦45)", price: 225000 },
    ],
    image: "/images/products/jars-wooden-lid.png",
    keyIngredients: ["Magnesium Sulphate"],
    benefits: ["Reduces muscle cramps", "Improves sleep quality", "Reduces anxiety & stress", "Supports heart health", "Boosts energy", "Supports bone health"],
    duration: "5–10 minutes",
    whoIsItFor: "Ideal for those with muscle cramps, sleep issues, high stress, or anyone wanting to support overall bodily function.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "b-cocktail",
    slug: "b-cocktail",
    name: "B Cocktail (B Complex + B12)",
    category: "injection",
    tagline: "Complete B vitamin boost for energy & brain health",
    description: "The B Cocktail injection combines a potent blend of B vitamins and Vitamin B12 to provide a comprehensive energy and neurological boost.",
    longDescription: "Our B Cocktail injection delivers the complete range of B vitamins in one powerful shot. B vitamins are essential for energy metabolism, nervous system health, hormone production, and cognitive function. Combined with high-dose B12, this cocktail provides an immediate and sustained energy lift along with long-term neurological support.",
    price: 40000,
    packages: [
      { label: "Single Injection", price: 40000 },
      { label: "Course of 4 (Save ₦15)", price: 145000 },
    ],
    image: "/images/products/spray-bottles.png",
    keyIngredients: ["B1 (Thiamine)", "B2 (Riboflavin)", "B3 (Niacin)", "B5 (Pantothenic Acid)", "B6 (Pyridoxine)", "B12 (Hydroxocobalamin)"],
    benefits: ["Boosts energy levels", "Supports brain function", "Improves mood", "Enhances metabolism", "Reduces fatigue", "Supports nervous system"],
    duration: "5–10 minutes",
    whoIsItFor: "Great for those needing an energy boost, experiencing brain fog, or wanting to support their overall metabolic health.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "vitamin-d-injection",
    slug: "vitamin-d-injection",
    name: "Vitamin D Injection",
    category: "injection",
    tagline: "Fast, effective vitamin D replenishment",
    description: "The Vitamin D Injection is an effective solution for individuals who need to boost their vitamin D levels quickly and effectively.",
    longDescription: "Vitamin D is crucial for bone health, immune system function, and overall well-being. This injection ensures optimal vitamin D levels for those who are deficient or unable to get enough through sunlight or diet. The injection offers a quick and effective way to boost vitamin D levels, especially for individuals with limited sun exposure or dietary intake.",
    price: 50000,
    image: "/images/products/eye-serum-bottles.png",
    keyIngredients: ["Vitamin D3 (Cholecalciferol)"],
    benefits: ["Improves bone density", "Boosts immune function", "Lifts mood", "Reduces fatigue", "Supports muscle function", "Heart health"],
    duration: "5–10 minutes",
    whoIsItFor: "Recommended for those with low vitamin D levels, especially during Nigeria winters or for those with limited outdoor activity.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment.",
    featured: false
  },
  {
    id: "hay-fever-injection",
    slug: "hay-fever-injection",
    name: "Hay Fever Injection",
    category: "injection",
    tagline: "Fast, long-lasting hay fever relief",
    description: "Feeling run down by hay fever symptoms? Our Hay Fever Injection provides fast and effective relief from seasonal allergies.",
    longDescription: "Our Hay Fever Injection delivers anti-inflammatory medication and vitamin C directly into the bloodstream for rapid relief from allergic rhinitis symptoms. This treatment can provide relief for the entire hay fever season with a single injection, making it far more convenient than daily antihistamines. Combined with our vitamin C boost, it also supports your immune system.",
    price: 80000,
    image: "/images/products/pump-bottles-lavender.png",
    keyIngredients: ["Kenalog (Triamcinolone)", "Vitamin C"],
    benefits: ["Rapid allergy relief", "Long-lasting effect", "Reduces inflammation", "Relieves sneezing & congestion", "Supports immune system", "Single treatment option"],
    duration: "10–15 minutes",
    whoIsItFor: "Ideal for hay fever sufferers who want fast, sustained relief without taking daily medication.",
    disclaimer: "Individual results may vary. Always consult with a healthcare professional before starting any new treatment. Not suitable for everyone.",
    featured: false
  }
]

export const featuredTreatments = treatments.filter(t => t.featured)

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find(t => t.slug === slug)
}

export function getTreatmentsByCategory(category: Treatment["category"]): Treatment[] {
  return treatments.filter(t => t.category === category)
}

export const categoryLabels: Record<Treatment["category"], string> = {
  "iv-drip": "IV Drips",
  "booster": "Vitamin Boosters",
  "injection": "Injections",
  "therapy": "Specialist Therapy"
}
