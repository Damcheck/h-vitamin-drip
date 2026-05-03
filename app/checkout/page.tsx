"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ShieldCheck, Lock, ChevronDown, ChevronUp, Minus, Plus, Trash2, ArrowRight } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"

type Step = "details" | "confirm" | "success"

const WHATSAPP_NUMBER = "2348000000000"

const productImages: Record<string, string> = {
  "energy-drip": "/images/products/serum-bottles-1.png",
  "glutathione-detox": "/images/products/amber-dropper-bottles.png",
  "high-dose-vitamin-c": "/images/products/spray-bottles.png",
  "nad-therapy": "/images/products/eye-serum-bottles.png",
  "skin-hair-drip": "/images/products/pump-bottles-cream.png",
  "immunity-booster": "/images/products/jars-wooden-lid.png",
  "detox-therapy": "/images/products/tube-bottles.png",
  "hydration-drip": "/images/products/spray-bottles.png",
  "anti-ageing-therapy": "/images/products/pump-bottles-lavender.png",
  "fitness-drip": "/images/products/serum-bottles-1.png",
  "alpha-lipoic-acid": "/images/products/amber-dropper-bottles.png",
  "multivitamin-drip": "/images/products/cream-jars-colored.png",
  "healthy-hair-drip": "/images/products/pump-bottles-lavender.png",
  "iron-drip": "/images/products/tube-bottles.png",
  "vitamin-b12-booster": "/images/products/eye-serum-bottles.png",
  "biotin-b7-booster": "/images/products/pump-bottles-cream.png",
  "vitamin-d3-booster": "/images/products/amber-dropper-bottles.png",
  "magnesium-injection": "/images/products/jars-wooden-lid.png",
  "b-cocktail": "/images/products/spray-bottles.png",
  "vitamin-d-injection": "/images/products/eye-serum-bottles.png",
  "hay-fever-injection": "/images/products/pump-bottles-lavender.png",
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postcode: string
  preferredDate: string
  preferredTime: string
  notes: string
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postcode: "",
  preferredDate: "",
  preferredTime: "",
  notes: "",
}

const timeSlots = [
  "8:00am – 10:00am",
  "10:00am – 12:00pm",
  "12:00pm – 2:00pm",
  "2:00pm – 4:00pm",
  "4:00pm – 6:00pm",
  "6:00pm – 8:00pm",
]

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [step, setStep] = useState<Step>("details")
  const [form, setForm] = useState<FormData>(initialForm)
  const [summaryOpen, setSummaryOpen] = useState(true)
  const [checkoutMethod, setCheckoutMethod] = useState<"online" | "whatsapp">("online")

  const total = subtotal

  const buildWhatsAppMessage = () => {
    const itemList = items
      .map((item) => `• ${item.name} x${item.quantity} — ₦${(item.price * item.quantity).toLocaleString()}`)
      .join("\n")
    return encodeURIComponent(
      `Hi H Vitamin Drip,\n\nI'd like to book the following treatments:\n\n${itemList}\n\nTotal: ₦${total.toLocaleString()}\n\nMy details:\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.city}, ${form.postcode}\nPreferred date: ${form.preferredDate}\nPreferred time: ${form.preferredTime}\nNotes: ${form.notes || "None"}\n\nPlease confirm availability. Thank you!`
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkoutMethod === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, "_blank")
    } else {
      setStep("success")
      clearCart()
    }
  }

  if (items.length === 0 && step !== "success") {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-36 pb-24 flex flex-col items-center justify-center text-center px-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-3xl text-foreground mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground text-sm mb-8">Add a treatment before proceeding to checkout.</p>
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-primary/90 boty-transition boty-shadow"
          >
            Browse Treatments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  if (step === "success") {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-36 pb-24 flex flex-col items-center justify-center text-center px-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-serif text-4xl text-foreground mb-4">Booking Request Sent!</h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md mb-8">
            Thank you, <strong>{form.firstName}</strong>. Your booking request has been received. A member of our team will
            contact you within 2 hours to confirm your appointment.
          </p>
          <div className="bg-card rounded-2xl p-6 border border-border mb-8 text-left max-w-sm w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium text-foreground">{form.firstName} {form.lastName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium text-foreground">{form.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Preferred date</span>
              <span className="font-medium text-foreground">{form.preferredDate || "TBC"}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#1db956] boty-transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-muted boty-transition"
            >
              Browse More Treatments
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link href="/treatments" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 boty-transition">
            <ArrowLeft className="w-4 h-4" /> Back to Treatments
          </Link>

          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-10">Checkout</h1>

          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
            {/* Left — form */}
            <div className="space-y-6">
              {/* Checkout method toggle */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-semibold text-foreground mb-4 text-sm">How would you like to complete your booking?</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutMethod("online")}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left boty-transition ${
                      checkoutMethod === "online" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Book Online</p>
                      <p className="text-xs text-muted-foreground">Submit your request directly</p>
                    </div>
                    {checkoutMethod === "online" && <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutMethod("whatsapp")}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left boty-transition ${
                      checkoutMethod === "whatsapp" ? "border-[#25D366] bg-[#25D366]/5" : "border-border hover:border-[#25D366]/40"
                    }`}
                  >
                    <div className="w-9 h-9 bg-[#25D366]/15 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Book via WhatsApp</p>
                      <p className="text-xs text-muted-foreground">Chat directly with our team</p>
                    </div>
                    {checkoutMethod === "whatsapp" && <CheckCircle2 className="w-4 h-4 text-[#25D366] ml-auto shrink-0" />}
                  </button>
                </div>
              </div>

              {/* Form */}
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Personal details */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="font-semibold text-foreground mb-5">Personal Details</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5" htmlFor="firstName">
                          First Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          required
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          placeholder="Jane"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary boty-transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5" htmlFor="lastName">
                          Last Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          required
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          placeholder="Smith"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary boty-transition"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5" htmlFor="co-email">
                          Email <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="co-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary boty-transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5" htmlFor="co-phone">
                          Phone / WhatsApp <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="co-phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+44 7700 900000"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary boty-transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="font-semibold text-foreground mb-5">Appointment Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5" htmlFor="address">
                        Street Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="address"
                        type="text"
                        required
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="123 High Street"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary boty-transition"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5" htmlFor="city">
                          City / Town <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          required
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          placeholder="Canterbury"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary boty-transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5" htmlFor="postcode">
                          Postcode <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="postcode"
                          type="text"
                          required
                          value={form.postcode}
                          onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                          placeholder="CT1 1AA"
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary boty-transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scheduling */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="font-semibold text-foreground mb-5">Preferred Schedule</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5" htmlFor="preferredDate">
                        Preferred Date
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary boty-transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-2">Preferred Time Slot</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setForm({ ...form, preferredTime: slot })}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-medium boty-transition ${
                              form.preferredTime === slot
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border text-foreground/70 hover:border-primary/40"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5" htmlFor="notes">
                        Additional Notes (optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Any health conditions, allergies, or special requests..."
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary boty-transition resize-none"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Right — order summary */}
            <div className="space-y-4">
              {/* Order summary card */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden sticky top-28">
                {/* Header */}
                <button
                  type="button"
                  onClick={() => setSummaryOpen(!summaryOpen)}
                  className="w-full flex items-center justify-between p-5 border-b border-border"
                >
                  <span className="font-semibold text-foreground text-sm">
                    Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
                  </span>
                  {summaryOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </button>

                {summaryOpen && (
                  <div className="p-5 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                          <Image
                            src={productImages[item.id] || "/images/products/serum-bottles-1.png"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground leading-tight truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-border rounded-full">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-muted boty-transition rounded-l-full"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-medium">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-muted boty-transition rounded-r-full"
                                aria-label="Increase"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="p-1 text-muted-foreground hover:text-destructive boty-transition"
                              aria-label="Remove"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-foreground whitespace-nowrap">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Totals */}
                <div className="p-5 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Travel</span>
                    <span className="text-primary font-medium">Included</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="p-5 space-y-3 border-t border-border">
                  {checkoutMethod === "online" ? (
                    <button
                      type="submit"
                      form="checkout-form"
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-full font-semibold text-sm hover:bg-primary/90 boty-transition boty-shadow"
                    >
                      <Lock className="w-4 h-4" />
                      Confirm Booking — ₦{total.toLocaleString()}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="checkout-form"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-full font-semibold text-sm hover:bg-[#1db956] boty-transition boty-shadow"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Complete via WhatsApp — ₦{total.toLocaleString()}
                    </button>
                  )}
                  <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Secure booking · Nurse-led treatments
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
                {[
                  "Registered nurses only",
                  "Full health screening before every treatment",
                  "Flexible rescheduling up to 24hrs before",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-xs text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
