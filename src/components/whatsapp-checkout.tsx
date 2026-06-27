"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { buildCartLink, type CartLine } from "@/lib/whatsapp";
import { getOperationalStatus } from "@/lib/hours";
import type { MenuItem } from "@/types/business";

interface CartItem extends CartLine {
  id: string;
}

interface WhatsAppCheckoutProps {
  phone: string;
  /** Optional initial items to seed the cart with */
  initialItems?: MenuItem[];
  /** Display label on the trigger button */
  triggerLabel?: string;
}

export default function WhatsAppCheckout({
  phone,
  initialItems = [],
  triggerLabel = "🛒 View Cart",
}: WhatsAppCheckoutProps) {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() =>
    initialItems.map((m) => ({ id: m.id, name: m.name, price: m.price, qty: 1 }))
  );

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Move focus into drawer when it opens; restore on close
  useEffect(() => {
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  // Trap focus inside drawer while open
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const total  = cart.reduce((s, l) => s + l.price * l.qty, 0);
  const count  = cart.reduce((s, l) => s + l.qty, 0);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  }, []);

  function addItem(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((l) => l.id === item.id);
      if (existing) return prev.map((l) => l.id === item.id ? { ...l, qty: l.qty + 1 } : l);
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  }

  function checkout() {
    if (cart.length === 0) return;
    const { isOpen } = getOperationalStatus();
    window.open(buildCartLink(phone, cart, isOpen), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {/* ── Trigger button ───────────────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-btn)] bg-[var(--color-ftm-primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]"
        aria-label={`Open cart${count > 0 ? `, ${count} item${count !== 1 ? "s" : ""}` : ""}`}
      >
        {triggerLabel}
        {count > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-chops-primary)] text-white text-[10px] font-bold">
            {count}
          </span>
        )}
      </button>

      {/* ── Backdrop ─────────────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Drawer ───────────────────────────────────────────────── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-sm bg-(--background) shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-(--border)">
          <h2 className="font-semibold text-(--foreground)">Your Order</h2>
          <button
            ref={closeBtnRef}
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-(--muted) hover:text-(--foreground) transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Cart lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cart.length === 0 ? (
            <p className="text-sm text-(--muted) text-center pt-8">Your cart is empty.</p>
          ) : (
            cart.map((line) => (
              <div key={line.id} className="flex items-center gap-3 rounded-[var(--radius-btn)] border border-(--border) bg-(--surface) px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-(--foreground) truncate">{line.name}</p>
                  <p className="text-xs font-mono text-(--muted)">₦{line.price.toLocaleString()} each</p>
                </div>
                {/* Qty stepper */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setQty(line.id, line.qty - 1)}
                    aria-label={`Remove one ${line.name}`}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-(--border) text-(--foreground) hover:bg-(--border) transition-colors text-lg leading-none"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm font-semibold text-(--foreground)">{line.qty}</span>
                  <button
                    onClick={() => setQty(line.id, line.qty + 1)}
                    aria-label={`Add one more ${line.name}`}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-(--border) text-(--foreground) hover:bg-(--border) transition-colors text-lg leading-none"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-semibold text-(--foreground) w-20 text-right shrink-0">
                  ₦{(line.price * line.qty).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-(--border) px-5 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm font-semibold text-(--foreground)">
            <span>Total</span>
            <span className="font-mono text-base">₦{total.toLocaleString()}</span>
          </div>
          <button
            onClick={checkout}
            disabled={cart.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-[var(--radius-btn)] bg-[#25D366] text-white font-semibold text-sm hover:opacity-90 transition-opacity min-h-[52px] disabled:opacity-40 disabled:pointer-events-none"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            Checkout via WhatsApp
          </button>
          {cart.length > 0 && (
            <button
              onClick={() => setCart([])}
              className="w-full text-xs text-(--muted) hover:text-(--foreground) transition-colors py-1"
            >
              Clear cart
            </button>
          )}
        </div>
      </aside>

      {/* Public API for parent components to programmatically add items */}
      <span style={{ display: "none" }} data-add-item={JSON.stringify(addItem)} />
    </>
  );
}

/** Hook-friendly re-export so pages can build their own add-to-cart buttons */
export type { CartItem };
