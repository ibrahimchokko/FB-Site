import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind City Chops and Fresh Tigernut Mill — a Kaduna family business built on fresh food and community.",
};

const TIMELINE = [
  { year: "2018", title: "The Beginning", body: "Started selling waina and small chops from home in Kaduna North, driven by family recipes and community demand." },
  { year: "2020", title: "City Chops Launched", body: "Formalised the food brand. Added samosa, puff puff, peppery meat, and began taking catering orders for local events." },
  { year: "2022", title: "Fresh Tigernut Mill Opens", body: "Launched a dedicated natural drinks line pressing Kunun Aya, Kunun Zaki, and Yogo Fura fresh daily — no preservatives, ever." },
  { year: "2024", title: "Full-Service Hub", body: "Unified under FB Family Hub. Now serving hundreds of customers weekly across Kaduna North, South, and Central." },
];

const TEAM = [
  { name: "Mama FB", role: "Founder & Head Chef", brand: "City Chops", note: "25 years of Kaduna kitchen mastery behind every recipe." },
  { name: "Aisha", role: "Tigernut Mill Lead", brand: "Fresh Tigernut Mill", note: "Oversees daily pressing, quality control, and ingredient sourcing." },
  { name: "Ibrahim", role: "Catering & Events", brand: "City Chops", note: "Coordinates logistics for weddings, namings, and corporate events." },
  { name: "Zainab", role: "Orders & Customer Care", brand: "Both Brands", note: "Handles all WhatsApp orders and makes sure every customer is satisfied." },
];

const VALUES = [
  ["Fresh, always", "We don't use concentrates or preservatives. Everything is made or pressed on the day."],
  ["Community first", "We are a Kaduna business, for Kaduna people. Local sourcing, local service."],
  ["Honest pricing", "Good food shouldn't be a luxury. Our prices reflect quality without the premium markup."],
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-brand-900)] text-[var(--color-brand-100)] py-20 px-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand-500)] mb-4">Our Story</p>
        <h1 className="heading-display text-4xl sm:text-5xl max-w-2xl mx-auto">
          One Family,<br />Two Flavours.
        </h1>
        <p className="mt-4 text-base text-[var(--color-brand-100)]/70 max-w-xl mx-auto">
          From a home kitchen in Kaduna to two distinct brands — built on fresh ingredients, family recipes, and community love.
        </p>
      </section>

      <div className="content-container py-[var(--spacing-section)] space-y-20 max-w-4xl">

        {/* ── Brand Split ──────────────────────────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-[var(--radius-card)] bg-[var(--color-chops-bg)] text-[var(--color-chops-light)] p-6 space-y-3">
            <p className="text-xl font-bold">🍖 City Chops</p>
            <p className="text-sm text-[var(--color-chops-muted)] leading-relaxed">
              Our food production and catering brand. Waina, puff puff, samosa, peppery meat, cakes, and small chops — for everyday orders and events of any scale.
            </p>
            <Link href="/city-chops" className="inline-block text-sm font-medium text-[var(--color-chops-gold)] hover:opacity-80 transition-opacity">
              Explore City Chops →
            </Link>
          </div>
          <div className="rounded-[var(--radius-card)] bg-[var(--color-ftm-bg)] text-[var(--color-ftm-dark)] p-6 space-y-3 border border-[var(--color-ftm-primary)]/15">
            <p className="text-xl font-bold">🥛 Fresh Tigernut Mill</p>
            <p className="text-sm text-[var(--color-ftm-muted)] leading-relaxed">
              Our natural drinks brand. Kunun Aya, Kunun Zaki, Yogo Fura, and Tigernut Mix — pressed fresh every morning with no preservatives and no concentrates.
            </p>
            <Link href="/tigernut-mill" className="inline-block text-sm font-medium text-[var(--color-ftm-primary)] hover:opacity-80 transition-opacity">
              Explore Tigernut Mill →
            </Link>
          </div>
        </section>

        {/* ── Timeline ─────────────────────────────────────────────── */}
        <section>
          <h2 className="heading-section text-2xl text-(--foreground) mb-8">Our Journey</h2>
          <ol className="relative border-l border-(--border) space-y-10 pl-6">
            {TIMELINE.map(({ year, title, body }) => (
              <li key={year} className="relative">
                <span className="absolute -left-[1.8rem] flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-brand-500)] text-white text-xs font-bold ring-4 ring-(--background)">
                  {year.slice(2)}
                </span>
                <p className="text-xs font-mono text-(--muted) mb-0.5">{year}</p>
                <h3 className="font-semibold text-(--foreground)">{title}</h3>
                <p className="mt-1 text-sm text-(--muted) leading-relaxed">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Values ───────────────────────────────────────────────── */}
        <section>
          <h2 className="heading-section text-2xl text-(--foreground) mb-6">What We Stand For</h2>
          <ul className="space-y-4">
            {VALUES.map(([title, desc]) => (
              <li key={title} className="flex gap-3 text-sm">
                <span className="text-[var(--color-brand-500)] mt-0.5 shrink-0">✓</span>
                <span className="text-(--muted)"><strong className="text-(--foreground)">{title}</strong> — {desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Team ─────────────────────────────────────────────────── */}
        <section>
          <h2 className="heading-section text-2xl text-(--foreground) mb-2">Meet the Team</h2>
          <p className="text-sm text-(--muted) mb-8">The family behind the food and the drinks.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map(({ name, role, brand, note }) => (
              <article key={name} className="rounded-[var(--radius-card)] border border-(--border) bg-(--surface) p-5 space-y-2">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-(--border) flex items-center justify-center text-xl" aria-hidden="true">
                  👤
                </div>
                <h3 className="font-semibold text-(--foreground)">{name}</h3>
                <p className="text-xs font-medium text-[var(--color-brand-500)]">{role}</p>
                <p className="text-xs text-(--muted)">{brand}</p>
                <p className="text-xs text-(--muted) leading-relaxed">{note}</p>
              </article>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
