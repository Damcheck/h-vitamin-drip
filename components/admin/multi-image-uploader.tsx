"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Upload, X, Loader2, CheckCircle2, ImageIcon, Plus } from "lucide-react"

interface MultiImageUploaderProps {
  values: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
  label?: string
}

export function MultiImageUploader({
  values = [],
  onChange,
  maxImages = 5,
  label = "Product Images",
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const onDrop = useCallback(
    async (accepted: File[]) => {
      const remaining = maxImages - values.length
      const toUpload = accepted.slice(0, remaining)
      if (toUpload.length === 0) return

      setError("")
      setUploading(true)

      try {
        const { uploadProductImage } = await import("@/lib/supabase")
        const uploaded: string[] = []
        for (const file of toUpload) {
          const url = await uploadProductImage(file)
          uploaded.push(url)
        }
        onChange([...values, ...uploaded])
      } catch (err) {
        // fallback: use object URLs
        const localUrls = toUpload.map(f => URL.createObjectURL(f))
        onChange([...values, ...localUrls])
      } finally {
        setUploading(false)
      }
    },
    [values, onChange, maxImages]
  )

  const remove = (idx: number) => {
    const next = [...values]
    next.splice(idx, 1)
    onChange(next)
  }

  const moveFirst = (idx: number) => {
    if (idx === 0) return
    const next = [...values]
    const [item] = next.splice(idx, 1)
    next.unshift(item)
    onChange(next)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".avif"] },
    maxFiles: maxImages - values.length,
    maxSize: 8 * 1024 * 1024,
    disabled: values.length >= maxImages || uploading,
    onDropRejected: (r) => {
      if (r[0]?.errors[0]?.code === "file-too-large") setError("Image must be under 8MB")
      else setError("Please upload a valid image (JPG, PNG, WebP)")
    },
  })

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold uppercase tracking-widest text-[#606864]">{label}</label>
        <span className="text-[10px] text-[#606864]">{values.length}/{maxImages} images — first is main</span>
      </div>

      {/* Image grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {values.map((url, i) => (
            <div key={url + i} className="relative group aspect-square rounded-xl overflow-hidden bg-[#F4F1E9] border border-[#C4A67B]/20">
              <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" sizes="150px" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#132B23]/70 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => moveFirst(i)}
                    className="text-[9px] font-bold uppercase tracking-widest text-[#DBC297] border border-[#DBC297]/50 px-2 py-1 rounded-full hover:bg-[#DBC297]/20 transition-colors"
                  >
                    Set Main
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="w-7 h-7 bg-red-500/90 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[8px] font-bold uppercase tracking-widest bg-[#132B23] text-[#DBC297] px-1.5 py-0.5 rounded-full">
                  Main
                </span>
              )}
            </div>
          ))}

          {/* Add more slot */}
          {values.length < maxImages && (
            <div
              {...getRootProps()}
              className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
                ${isDragActive ? "border-[#C4A67B] bg-[#C4A67B]/10" : "border-[#C4A67B]/30 hover:border-[#C4A67B] hover:bg-[#C4A67B]/5"}
                ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input {...getInputProps()} />
              {uploading ? (
                <Loader2 className="w-5 h-5 text-[#C4A67B] animate-spin" />
              ) : (
                <>
                  <Plus className="w-5 h-5 text-[#C4A67B] mb-1" />
                  <span className="text-[9px] font-bold text-[#606864] uppercase tracking-widest text-center px-1">Add Photo</span>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty state dropzone */}
      {values.length === 0 && (
        <div
          {...getRootProps()}
          className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer
            ${isDragActive ? "border-[#C4A67B] bg-[#C4A67B]/10" : "border-[#C4A67B]/30 hover:border-[#C4A67B] hover:bg-[#C4A67B]/5"}
            ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
          style={{ minHeight: 160 }}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            {uploading ? (
              <>
                <Loader2 className="w-9 h-9 text-[#C4A67B] animate-spin" />
                <p className="text-sm font-semibold text-[#132B23]">Uploading…</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-[#C4A67B]/10 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-[#C4A67B]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#132B23] mb-1">
                    {isDragActive ? "Drop images here!" : "Drag & drop or click to upload"}
                  </p>
                  <p className="text-[11px] text-[#606864]">Up to {maxImages} images · JPG, PNG, WebP · max 8MB each</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1"><X className="w-3 h-3" />{error}</p>}
    </div>
  )
}
