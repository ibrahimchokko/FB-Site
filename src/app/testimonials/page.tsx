import type { Metadata } from "next";
import { TESTIMONIALS } from "@/data/content";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What Kaduna customers say about City Chops and Fresh Tigernut Mill.",
};

const BRAND_STYLE = {
  "city-chops":     { dot: "bg-[var(--color-chops-primary)]", label: "City Chops" },
  "fresh-tigernut": { dot: "bg-[var(--color-ftm-primary)]",   label: "Tigernut Mill" },
} as const;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "text-amber-400" : "text-(--border)"}>★</span>
      ))}
    </div>
  );
}

const total     = TESTIMONIALS.length;
const avgRating = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / total).toFixed(1);
const fiveStars = TESTIMONIALS.filter((t) => t.rating === 5).length;

export default function TestimonialsPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="bg-(--surface) border-b border-(--border) py-12 px-4 text-center">
        <h1 className="heading-display text-3xl sm:text-4xl text-(--foreground)">Customer Reviews</h1>
        <p className="mt-2 text-sm text-(--muted)">Real feedback from Kaduna locals.</p>

        {/* ── Rating summary ───────────────────────────────────────── */}
        <div className="mt-8 inline-flex flex-wrap justify-center gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-(--foreground)">{avgRating}</p>
            <Stars rating={Math.round(Number(avgRating))} />
            <p className="text-xs text-(--muted) mt-1">Average rating</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-(--foreground)">{total}</p>
            <p className="text-xs text-(--muted) mt-1">Reviews</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-(--foreground)">{fiveStars}</p>
            <p className="text-xs text-(--muted) mt-1">5-star reviews</p>
          </div>
        </div>
      </section>

      {/* ── Reviews Grid ─────────────────────────────────────────── */}
      <section className="content-container py-[var(--spacing-section)]">
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {TESTIMONIALS.map((t) => {
            const s = BRAND_STYLE[t.brand];
            return (
              <article
                key={t.id}
                className="break-inside-avoid rounded-[var(--radius-card)] border border-(--border) bg-(--surface) p-5 space-y-3"
                itemScope
                itemType="https://schema.org/Review"
                itemProp="itemListElement"
              >
                <div className="flex items-center justify-between gap-2">
                  <Stars rating={t.rating} />
                  <span className="flex items-center gap-1.5 text-xs text-(--muted)">
                    <span className={`w-2 h-2 rounded-full ${s.dot}`} aria-hidden="true" />
                    {s.label}
                  </span>
                </div>

                <blockquote itemProp="reviewBody">
                  <p className="text-sm text-(--foreground) leading-relaxed">&ldquo;{t.body}&rdquo;</p>
                </blockquote>

                <footer className="flex items-center justify-between text-xs text-(--muted)">
                  <span itemProp="author" itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">— {t.author}</span>, {t.location}
                  </span>
                  <time dateTime={t.date} itemProp="datePublished">
                    {new Date(t.date).toLocaleDateString("en-NG", { month: "short", year: "numeric" })}
                  </time>
                </footer>

                <meta itemProp="reviewRating" content={String(t.rating)} />
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Leave a review CTA ───────────────────────────────────── */}
      <section className="border-t border-(--border) bg-(--surface)">
        <div className="content-container py-10 text-center space-y-3">
          <h2 className="font-semibold text-(--foreground)">Tried our food or drinks?</h2>
          <p className="text-sm text-(--muted)">Send us a WhatsApp message — we&apos;d love to hear from you.</p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-btn)] bg-[var(--color-brand-500)] text-white text-sm font-medium hover:opacity-90 transition-opacity min-h-[48px]"
          >
            Get in Touch →
          </a>
        </div>
      </section>
    </>
  );
}
