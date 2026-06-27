import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Fresh Tigernut Mill — Kunun Aya & Natural Drinks Kaduna",
    template: "%s | Fresh Tigernut Mill",
  },
  description:
    "Daily-pressed Kunun Aya, Kunun Zaki, Yogo Fura, Tigernut Mix, and smoothies in Kaduna. Order via WhatsApp.",
};

export default function TigernutMillLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={
        {
          "--brand-primary": "var(--color-ftm-primary)",
          "--brand-surface": "var(--color-ftm-milk)",
          "--brand-bg":      "var(--color-ftm-bg)",
          "--brand-amber":   "var(--color-ftm-amber)",
        } as React.CSSProperties
      }
    >
      {/* Brand identity bar */}
      <div className="bg-[var(--color-ftm-bg)] border-b border-[var(--color-ftm-primary)]/20">
        <div className="content-container flex items-center gap-3 py-3">
          <span className="text-lg">🥛</span>
          <span className="font-bold text-[var(--color-ftm-dark)] tracking-tight">Fresh Tigernut Mill</span>
          <span className="text-[var(--color-ftm-muted)] text-sm hidden sm:inline">
            · Nature&rsquo;s sweetness, pressed daily
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
