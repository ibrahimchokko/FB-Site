import type { Metadata } from "next";
import { BRANDS } from "@/data/content";
import { getOperationalStatus } from "@/lib/hours";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with City Chops and Fresh Tigernut Mill in Kaduna — WhatsApp orders, phone, and location.",
};

export default function ContactPage() {
  const { isOpen, message } = getOperationalStatus();

  return (
    <div className="content-container py-14 max-w-2xl space-y-12">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand-500)] mb-2">Get In Touch</p>
        <h1 className="text-4xl font-bold text-(--foreground)">Contact Us</h1>
        <p className="mt-3 text-(--muted)">
          We&rsquo;re based in Kaduna and available 9 AM – 10 PM daily. The fastest way to reach us is WhatsApp.
        </p>

        {/* Status pill */}
        <span
          className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-pill)] text-xs font-medium ${
            isOpen
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
          }`}
        >
          <span className="text-[8px]">●</span> {message}
        </span>
      </div>

      {/* Brand contact cards */}
      <section className="space-y-4">
        {BRANDS.map((brand) => {
          const isChops = brand.id === "city-chops";
          const waLink = buildWhatsAppLink(brand.whatsapp, `Hello ${brand.name}!`);
          return (
            <div
              key={brand.id}
              className={`rounded-[var(--radius-card)] border p-6 space-y-4 ${
                isChops
                  ? "bg-[var(--color-chops-bg)] border-[var(--color-chops-primary)]/30"
                  : "bg-[var(--color-ftm-bg)] border-[var(--color-ftm-primary)]/20"
              }`}
            >
              <div>
                <p className={`font-bold text-lg ${isChops ? "text-[var(--color-chops-light)]" : "text-[var(--color-ftm-dark)]"}`}>
                  {isChops ? "🍖" : "🥛"} {brand.name}
                </p>
                <p className={`text-sm ${isChops ? "text-[var(--color-chops-muted)]" : "text-[var(--color-ftm-muted)]"}`}>
                  {brand.tagline}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-[var(--radius-pill)] text-white min-h-[44px] transition-opacity hover:opacity-90 ${
                    isChops ? "bg-[var(--color-chops-primary)]" : "bg-[var(--color-ftm-primary)]"
                  }`}
                >
                  💬 WhatsApp
                </a>
                <a
                  href={`tel:+${brand.whatsapp}`}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-[var(--radius-pill)] min-h-[44px] border transition-colors ${
                    isChops
                      ? "border-[var(--color-chops-primary)] text-[var(--color-chops-primary)] hover:bg-[var(--color-chops-primary)] hover:text-white"
                      : "border-[var(--color-ftm-primary)] text-[var(--color-ftm-primary)] hover:bg-[var(--color-ftm-primary)] hover:text-white"
                  }`}
                >
                  📞 Call Us
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* Location & Hours */}
      <section className="rounded-[var(--radius-card)] border border-(--border) bg-(--surface) p-6 space-y-4">
        <h2 className="font-bold text-lg text-(--foreground)">📍 Location & Hours</h2>
        <div className="text-sm text-(--muted) space-y-2">
          <p><strong className="text-(--foreground)">Location:</strong> Kaduna, Kaduna State, Nigeria</p>
          <p><strong className="text-(--foreground)">Operating hours:</strong> Daily, 9:00 AM – 10:00 PM WAT</p>
          <p><strong className="text-(--foreground)">Delivery:</strong> Available within Kaduna — confirm via WhatsApp</p>
          <p><strong className="text-(--foreground)">Catering:</strong> Available citywide and beyond with advance booking</p>
        </div>
      </section>
    </div>
  );
}
