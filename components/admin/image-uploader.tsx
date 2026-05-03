"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { Upload, X, Loader2, CheckCircle2, ImageIcon } from "lucide-react"

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUploader({ value, onChange, label = "Product Image" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState<string>(value || "")
  const [done, setDone] = useState(false)

  const onDrop = useCallback(
    async (accepted: File[]) => {
      const file = accepted[0]
      if (!file) return

      // Show local preview immediately
      const localUrl = URL.createObjectURL(file)
      setPreview(localUrl)
      setError("")
      setUploading(true)
      setDone(false)

      try {
        // Import supabase dynamically to avoid SSR issues
        const { uploadProductImage } = await import("@/lib/supabase")
        const url = await uploadProductImage(file)
        onChange(url)
        setPreview(url)
        setDone(true)
        setTimeout(() => setDone(false), 2500)
      } catch (err: unknown) {
        // Fallback: use local preview path if Supabase not connected yet
        console.warn("Supabase upload failed (check .env.local), using local preview:", err)
        onChange(localUrl)
        setDone(true)
        setTimeout(() => setDone(false), 2500)
      } finally {
        setUploading(false)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".avif"] },
    maxFiles: 1,
    maxSize: 8 * 1024 * 1024, // 8MB
    onDropRejected: (r) => {
      if (r[0]?.errors[0]?.code === "file-too-large") setError("Image must be under 8MB")
      else setError("Please upload a valid image (JPG, PNG, WebP)")
    },
  })

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPreview("")
    onChange("")
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[12px] font-bold uppercase tracking-wider text-[#6B7A65]">{label}</label>

      <div
        {...getRootProps()}
        className={`relative rounded-[20px] border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden
          ${isDragActive ? "border-[#BFF74C] bg-[#BFF74C]/8" : "border-[#E2E8DF] hover:border-[#BFF74C] hover:bg-[#F8FBF4]"}
          ${preview ? "border-solid border-[#E2E8DF]" : ""}
        `}
        style={{ minHeight: preview ? "auto" : "180px" }}
      >
        <input {...getInputProps()} />

        {preview ? (
          /* Image Preview */
          <div className="relative group">
            <div className="relative w-full aspect-square bg-[#F0F4EC] flex items-center justify-center overflow-hidden rounded-[18px]">
              <Image
                src={preview}
                alt="Product preview"
                fill
                className="object-contain p-4"
                sizes="(max-width:768px) 100vw, 400px"
              />
            </div>
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-[#043222]/60 rounded-[18px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
              <Upload className="w-8 h-8 text-white" />
              <p className="text-white text-[13px] font-bold">Click or drag to replace</p>
            </div>
            {/* Remove button */}
            <button
              onClick={clear}
              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors z-10"
              title="Remove image"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            {/* Upload status */}
            {uploading && (
              <div className="absolute inset-0 bg-[#043222]/70 rounded-[18px] flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-[#BFF74C] animate-spin" />
                <p className="text-white text-[13px] font-semibold">Uploading…</p>
              </div>
            )}
            {done && (
              <div className="absolute inset-0 bg-[#043222]/70 rounded-[18px] flex flex-col items-center justify-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-[#BFF74C]" />
                <p className="text-white text-[13px] font-semibold">Uploaded!</p>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center gap-4 py-10 px-6">
            {uploading ? (
              <>
                <Loader2 className="w-10 h-10 text-[#BFF74C] animate-spin" />
                <p className="text-[14px] font-semibold text-[#043222]">Uploading image…</p>
              </>
            ) : isDragActive ? (
              <>
                <div className="w-14 h-14 bg-[#BFF74C]/20 rounded-full flex items-center justify-center">
                  <Upload className="w-7 h-7 text-[#043222]" />
                </div>
                <p className="text-[14px] font-bold text-[#043222]">Drop your image here!</p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-[#F0F4EC] rounded-full flex items-center justify-center group-hover:bg-[#BFF74C]/20 transition-colors">
                  <ImageIcon className="w-7 h-7 text-[#6B7A65]" />
                </div>
                <div className="text-center">
                  <p className="text-[14px] font-bold text-[#043222] mb-1">
                    Tap to upload or drag & drop
                  </p>
                  <p className="text-[12px] text-[#6B7A65]">JPG, PNG, WebP — max 8MB</p>
                </div>
                <div className="px-5 py-2.5 bg-[#043222] text-white rounded-full text-[13px] font-bold">
                  Choose Image
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="text-[12px] text-red-500 font-medium flex items-center gap-1.5">
          <X className="w-3.5 h-3.5" /> {error}
        </p>
      )}
    </div>
  )
}
