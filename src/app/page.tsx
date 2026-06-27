import type { Metadata } from "next";
import Link from "next/link";
import { BRANDS, FEATURED_ITEMS } from "@/data/content";
import { getOperationalStatus } from "@/lib/hours";
import MenuItemCard from "@/components/menu-item-card";

export const metadata: Metadata = {
  title: "Kaduna's Kitchen — City Chops & Fresh Tigernut Mill",
  description:
    "One family, two flavours. Order fresh tigernut drinks, waina, samosa, puff puff, and catering in Kaduna.",
};

const BRAND_CARD_STYLES = {
  "city-chops": {
    bg:      "bg-[var(--color-chops-bg)]",
    text:    "text-[var(--color-chops-light)]",
    muted:   "text-[var(--color-chops-muted)]",
    border:  "border-[var(--color-chops-primary)]",
    cta:     "bg-[var(--color-chops-primary)] text-white hover:opacity-90",
    accent:  "text-[var(--color-chops-gold)]",
  },
  "fresh-tigernut": {
    bg:      "bg-[var(--color-ftm-bg)]",
    text:    "text-[var(--color-ftm-dark)]",
    muted:   "text-[var(--color-ftm-muted)]",
    border:  "border-[var(--color-ftm-primary)]",
    cta:     "bg-[var(--color-ftm-primary)] text-white hover:opacity-90 rounded-[var(--radius-pill)]",
    accent:  "text-[var(--color-ftm-amber)]",
  },
} as const;

const BRAND_HIGHLIGHTS = {
  "city-chops":    ["Waina & Puff Puff", "Samosa & Small Chops", "Catering Packages", "Celebration Cakes"],
  "fresh-tigernut":["Kunun Aya (daily-pressed)", "Kunun Zaki", "Yogo Fura", "Tigernut Mix & Smoothies"],
} as const;

export default function HomePage() {
  const { isOpen } = getOperationalStatus();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center min-h-[88svh] bg-[var(--color-brand-900)] text-[var(--color-brand-100)] text-center px-4">
        <div className="max-w-2xl space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand-500)]">
            Kaduna&rsquo;s Kitchen
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            One Family,<br />Two Flavours.
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-brand-100)]/70 max-w-lg mx-auto">
            Fresh tigernut drinks pressed daily. Small chops, waina, and full catering — made with love in Kaduna.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/city-chops"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] bg-[var(--color-chops-primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]"
            >
              🍖 Explore City Chops
            </Link>
            <Link
              href="/tigernut-mill"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-ftm-primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity min-h-[48px]"
            >
              🥛 Explore Tigernut Mill
            </Link>
          </div>
          {!isOpen && (
            <p className="text-xs text-[var(--color-brand-100)]/50">
              Currently closed · Opens 9 AM WAT — you can still pre-order
            </p>
          )}
        </div>
      </section>

      {/* ── Brand Portal Cards ────────────────────────────────────────── */}
      <section className="content-container py-[var(--spacing-section)] space-y-4">
        <h2 className="text-2xl font-bold text-(--foreground)">Our Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRANDS.map((brand) => {
            const s = BRAND_CARD_STYLES[brand.id];
            const highlights = BRAND_HIGHLIGHTS[brand.id];
            return (
              <div
                key={brand.id}
                className={`${s.bg} ${s.text} rounded-[var(--radius-card)] border ${s.border}/30 p-6 flex flex-col gap-4`}
              >
                <div>
                  <h3 className="text-xl font-bold">{brand.name}</h3>
                  <p className={`mt-1 text-sm ${s.muted}`}>{brand.tagline}</p>
                </div>
                <ul className="space-y-1 text-sm">
                  {highlights.map((h) => (
                    <li key={h} className={`${s.accent} font-medium`}>· {h}</li>
                  ))}
                </ul>
                <Link
                  href={brand.href}
                  className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium transition-opacity min-h-[48px] rounded-[var(--radius-btn)] ${s.cta} mt-auto`}
                >
                  Enter {brand.name} →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Featured Items ────────────────────────────────────────────── */}
      <section className="content-container pb-[var(--spacing-section)]">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold text-(--foreground)">Customer Favourites</h2>
          <Link href="/city-chops/menu" className="text-sm text-(--muted) hover:text-(--foreground) transition-colors">
            See all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_ITEMS.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── Trust Bar ────────────────────────────────────────────────── */}
      <section className="border-t border-(--border) bg-(--surface)">
        <div className="content-container py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm">
          {[
            { icon: "📍", label: "Kaduna Based",     sub: "Serving Kaduna & environs" },
            { icon: "🚚", label: "Delivery Available", sub: "Call or WhatsApp to arrange" },
            { icon: "📞", label: "WhatsApp Orders",   sub: "Fast, direct, no app needed" },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="space-y-1">
              <span className="text-2xl">{icon}</span>
              <p className="font-semibold text-(--foreground)">{label}</p>
              <p className="text-(--muted)">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
