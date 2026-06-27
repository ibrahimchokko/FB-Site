import type { Metadata } from "next";
import { BRANDS, MENU_ITEMS } from "@/data/content";
import { getOperationalStatus } from "@/lib/hours";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Order — City Chops" };

export default function CityChopsOrderPage() {
  const { isOpen, message } = getOperationalStatus();
  const brand = BRANDS.find((b) => b.id === "city-chops")!;

  const popular = MENU_ITEMS.filter((i) => i.brand === "city-chops" && i.featured);

  return (
    <div className="content-container py-14 max-w-2xl space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-(--foreground)">Order from City Chops</h1>
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

      {/* Primary order CTA */}
      <div className="rounded-[var(--radius-card)] bg-[var(--color-chops-bg)] text-[var(--color-chops-light)] p-8 text-center space-y-4">
        <p className="text-lg font-semibold">
          {isOpen ? "We're open — place your order now" : "We're closed right now — leave a pre-order"}
        </p>
        <p className="text-sm text-[var(--color-chops-muted)]">
          {isOpen
            ? "Send us a WhatsApp message with what you'd like and we'll confirm and arrange delivery."
            : "Send us your order on WhatsApp and we'll confirm it as soon as we open at 9 AM WAT."}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a
            href={buildWhatsAppLink(brand.whatsapp, isOpen ? "I'd like to place an order" : "Pre-order request")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] bg-[var(--color-chops-primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]"
          >
            💬 {isOpen ? "Order via WhatsApp" : "Pre-order via WhatsApp"}
          </a>
          <a
            href={`tel:+${brand.whatsapp}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] border border-[var(--color-chops-primary)] text-[var(--color-chops-primary)] font-medium text-sm hover:bg-[var(--color-chops-primary)] hover:text-white transition-colors min-h-[48px]"
          >
            📞 Call Us
          </a>
        </div>
      </div>

      {/* Quick-order popular items */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-(--foreground)">Quick Order — Popular Items</h2>
        <p className="text-sm text-(--muted)">Tap any item to open a pre-filled WhatsApp order.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popular.map((item) => (
            <a
              key={item.id}
              href={buildWhatsAppLink(brand.whatsapp, item.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 rounded-[var(--radius-btn)] border border-(--border) bg-(--surface) px-4 py-3 hover:border-[var(--color-chops-primary)] hover:shadow-[var(--shadow-cta-chops)] transition-all"
            >
              <div>
                <p className="text-sm font-medium text-(--foreground)">{item.name}</p>
                <p className="text-xs font-mono text-(--muted)">₦{item.price.toLocaleString()}</p>
              </div>
              <span className="text-xs text-[var(--color-chops-primary)] font-medium shrink-0">Order →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Catering link */}
      <div className="rounded-[var(--radius-btn)] border border-(--border) bg-(--surface) px-5 py-4 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-(--foreground) text-sm">Need catering for an event?</p>
          <p className="text-xs text-(--muted) mt-0.5">Book a package for 30–300+ guests.</p>
        </div>
        <a
          href="/city-chops/catering"
          className="shrink-0 text-sm font-medium text-[var(--color-chops-primary)] hover:opacity-80 transition-opacity"
        >
          Book now →
        </a>
      </div>
    </div>
  );
}
