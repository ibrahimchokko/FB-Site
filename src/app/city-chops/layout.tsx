import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "City Chops — Small Chops & Catering Kaduna",
    template: "%s | City Chops",
  },
  description:
    "Waina, puff puff, samosa, peppery meat, cakes, and full catering services in Kaduna. Order via WhatsApp.",
};

export default function CityChopsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={
        {
          "--brand-primary": "var(--color-chops-primary)",
          "--brand-gold":    "var(--color-chops-gold)",
          "--brand-surface": "var(--color-chops-surface)",
          "--brand-light":   "var(--color-chops-light)",
        } as React.CSSProperties
      }
    >
      {/* Brand identity bar */}
      <div className="bg-[var(--color-chops-bg)] border-b border-[var(--color-chops-primary)]/20">
        <div className="content-container flex items-center gap-3 py-3">
          <span className="text-lg">🍖</span>
          <span className="font-bold text-[var(--color-chops-light)] tracking-tight">City Chops</span>
          <span className="text-[var(--color-chops-muted)] text-sm hidden sm:inline">
            · Small chops, waina & catering
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
