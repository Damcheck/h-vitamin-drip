"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProductEditor, type DBProduct } from "@/components/admin/product-editor"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function EditProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<DBProduct | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!id || typeof id !== "string") return
      const { data } = await supabase.from("products").select("*").eq("id", id).single()
      if (data) {
        setProduct({
          id: data.id,
          name: data.name,
          slug: data.slug,
          tagline: data.tagline,
          description: data.description,
          longDescription: data.long_description || "",
          price: Number(data.price),
          originalPrice: data.original_price ? Number(data.original_price) : undefined,
          category: data.category,
          duration: data.duration,
          image: data.image,
          images: data.images || [data.image].filter(Boolean),
          featured: data.featured,
          keyIngredients: data.ingredients || [],
          benefits: data.benefits || [],
          whoIsItFor: data.who_is_it_for || "",
          disclaimer: data.disclaimer || "",
        } as DBProduct)
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#DBC297] animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px] text-white">
        Product not found
      </div>
    )
  }

  return <ProductEditor initial={product} />
}
