import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind City Chops and Fresh Tigernut Mill — a Kaduna family business built on fresh food and community.",
};

export default function AboutPage() {
  return (
    <div className="content-container py-14 max-w-3xl space-y-16">
      {/* Parent story */}
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand-500)]">Our Story</p>
        <h1 className="text-4xl font-bold text-(--foreground) leading-tight">
          One Family,<br />Two Flavours.
        </h1>
        <p className="text-(--muted) leading-relaxed">
          What started as a passion for honest, home-cooked food in Kaduna grew into two distinct
          businesses — each serving its own community, each guided by the same belief: fresh
          ingredients, careful preparation, and food that brings people together.
        </p>
        <p className="text-(--muted) leading-relaxed">
          We operate every day from 9 AM to 10 PM WAT, serving Kaduna and surrounding areas
          through WhatsApp orders, local delivery, and on-site catering.
        </p>
      </section>

      {/* Brand split */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* City Chops */}
        <div className="rounded-[var(--radius-card)] bg-[var(--color-chops-bg)] text-[var(--color-chops-light)] p-6 space-y-3">
          <p className="text-xl font-bold">🍖 City Chops</p>
          <p className="text-sm text-[var(--color-chops-muted)] leading-relaxed">
            City Chops is our food production and catering brand. We make waina, puff puff, samosa,
            peppery meat, cakes, and small chops for everyday orders and events of any scale — from
            family gatherings to corporate functions.
          </p>
          <Link
            href="/city-chops"
            className="inline-block text-sm font-medium text-[var(--color-chops-gold)] hover:opacity-80 transition-opacity"
          >
            Explore City Chops →
          </Link>
        </div>

        {/* Fresh Tigernut Mill */}
        <div className="rounded-[var(--radius-card)] bg-[var(--color-ftm-bg)] text-[var(--color-ftm-dark)] p-6 space-y-3 border border-[var(--color-ftm-primary)]/15">
          <p className="text-xl font-bold">🥛 Fresh Tigernut Mill</p>
          <p className="text-sm text-[var(--color-ftm-muted)] leading-relaxed">
            Fresh Tigernut Mill is our natural drinks brand. We press Kunun Aya, Kunun Zaki,
            Yogo Fura, and Tigernut Mix fresh every morning using no preservatives and no
            concentrates — just real ingredients, real flavour.
          </p>
          <Link
            href="/tigernut-mill"
            className="inline-block text-sm font-medium text-[var(--color-ftm-primary)] hover:opacity-80 transition-opacity"
          >
            Explore Tigernut Mill →
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-(--foreground)">What We Stand For</h2>
        <ul className="space-y-3 text-(--muted)">
          {[
            ["Fresh, always", "We don't use concentrates or preservatives. Everything is made or pressed on the day."],
            ["Community first", "We are a Kaduna business, for Kaduna people. Local sourcing, local service."],
            ["Honest pricing", "Good food shouldn't be a luxury. Our prices reflect quality without the premium markup."],
          ].map(([title, desc]) => (
            <li key={title} className="flex gap-3">
              <span className="text-[var(--color-brand-500)] mt-0.5">✓</span>
              <span><strong className="text-(--foreground)">{title}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
