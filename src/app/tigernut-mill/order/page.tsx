import type { Metadata } from "next";
import { BRANDS, MENU_ITEMS } from "@/data/content";
import { getOperationalStatus } from "@/lib/hours";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Order — Fresh Tigernut Mill" };

export default function TigernutOrderPage() {
  const { isOpen, message } = getOperationalStatus();
  const brand = BRANDS.find((b) => b.id === "fresh-tigernut")!;
  const popular = MENU_ITEMS.filter((i) => i.brand === "fresh-tigernut" && i.featured);

  return (
    <div className="content-container py-14 max-w-2xl space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-(--foreground)">Order from Tigernut Mill</h1>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-pill)] text-xs font-medium ${
            isOpen
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
          }`}
        >
          <span className="text-[8px]">●</span> {message}
        </span>
      </div>

      {/* Freshness note */}
      <div className="bg-[var(--color-ftm-primary)] text-white rounded-[var(--radius-btn)] px-4 py-2.5 text-sm text-center">
        ✓ All drinks pressed fresh daily — order before 8 AM for same-morning delivery
      </div>

      {/* Primary CTA */}
      <div className="rounded-[var(--radius-card)] bg-[var(--color-ftm-bg)] border border-[var(--color-ftm-primary)]/20 p-8 text-center space-y-4">
        <p className="text-lg font-semibold text-[var(--color-ftm-dark)]">
          {isOpen ? "We're open — order your drinks now" : "We're closed — leave a pre-order for tomorrow"}
        </p>
        <p className="text-sm text-[var(--color-ftm-muted)]">
          {isOpen
            ? "WhatsApp us your order and preferred delivery time — we'll confirm within minutes."
            : "Send your order now and we'll confirm and deliver when we open at 9 AM WAT."}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={buildWhatsAppLink(brand.whatsapp, isOpen ? "I'd like to order drinks" : "Pre-order for tomorrow")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-ftm-primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]"
          >
            💬 {isOpen ? "Order via WhatsApp" : "Pre-order via WhatsApp"}
          </a>
          <a
            href={`tel:+${brand.whatsapp}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] border border-[var(--color-ftm-primary)] text-[var(--color-ftm-primary)] font-medium text-sm hover:bg-[var(--color-ftm-primary)] hover:text-white transition-colors min-h-[48px]"
          >
            📞 Call Us
          </a>
        </div>
      </div>

      {/* Quick-order items */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-(--foreground)">Quick Order — Our Drinks</h2>
        <p className="text-sm text-(--muted)">Tap any item to open a pre-filled WhatsApp order.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popular.map((item) => (
            <a
              key={item.id}
              href={buildWhatsAppLink(brand.whatsapp, item.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-[var(--radius-btn)] border border-(--border) bg-(--surface) px-4 py-3 hover:border-[var(--color-ftm-primary)] hover:shadow-[var(--shadow-cta-ftm)] transition-all"
            >
              <div>
                <p className="text-sm font-medium text-(--foreground)">{item.name}</p>
                <p className="text-xs font-mono text-(--muted)">₦{item.price.toLocaleString()}</p>
              </div>
              <span className="text-xs text-[var(--color-ftm-primary)] font-medium shrink-0">Order →</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
