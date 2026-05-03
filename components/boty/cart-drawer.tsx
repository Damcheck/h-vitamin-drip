"use client"

import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useCart } from "./cart-context"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, isOpen, setIsOpen, itemCount, subtotal } = useCart()

  const total = subtotal

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "2348000000000"
    const text = `Hello! I would like to book the following treatments:\n\n${items
      .map((item) => `- ${item.quantity}x ${item.name} (₦${(item.price * item.quantity).toLocaleString()})`)
      .join("\n")}\n\nTotal: ₦${total.toLocaleString()}`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-foreground/40 z-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/40">
              <div>
                <h2 className="text-[18px] font-bold text-foreground">Your Cart</h2>
                <p className="text-[13px] text-muted-foreground">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 bg-muted rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-muted/80 transition-all"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-7 h-7 text-foreground/30" />
                  </div>
                  <p className="text-[16px] font-bold text-foreground mb-1">No products inside your bag.</p>
                  <p className="text-[14px] text-muted-foreground mb-5">Add some treatments to get started</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 bg-foreground text-white px-6 py-3 rounded-full text-[14px] font-semibold hover:bg-foreground/80 transition-all"
                  >
                    Start shopping
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 pb-5 border-b border-border/30 last:border-0"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 rounded-[14px] overflow-hidden bg-[#F0F4EC] shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[14px] font-bold text-foreground leading-tight mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-[15px] font-bold text-foreground mb-3">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                          <div className="flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center bg-muted rounded-full overflow-hidden">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-border/50 transition-all"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-[13px] font-bold text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-border/50 transition-all"
                                aria-label="Increase"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            {/* Remove */}
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-[12px] font-medium text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                              aria-label="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border/40 px-6 py-5 flex flex-col gap-3 bg-white">
                {/* Totals */}
                <div className="flex flex-col gap-2 mb-1">
                  <div className="flex justify-between text-[14px] text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-muted-foreground">
                    <span>Travel / Visit Fee</span>
                    <span className="text-primary font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between text-[16px] font-bold text-foreground pt-2 border-t border-border/40">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-foreground text-white py-4 rounded-full font-bold text-[14px] hover:bg-foreground/80 transition-all flex items-center justify-center"
                >
                  Continue to checkout
                </Link>
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold text-[14px] hover:bg-[#1dba58] transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Checkout via WhatsApp
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors text-center"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
