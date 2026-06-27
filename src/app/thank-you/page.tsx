import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — Booking Received",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70svh] text-center px-4 space-y-6">
      <span className="text-5xl">🎉</span>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-(--foreground)">Booking Received!</h1>
        <p className="text-(--muted) max-w-sm">
          Thanks for reaching out. We&rsquo;ll review your request and get back to you within 2–4 hours
          during operating hours (9 AM – 10 PM WAT).
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Link
          href="/city-chops"
          className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-btn)] bg-[var(--color-chops-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]"
        >
          Back to City Chops
        </Link>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-btn)] border border-(--border) text-(--foreground) text-sm font-medium hover:bg-(--surface) transition-colors min-h-[44px]"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
