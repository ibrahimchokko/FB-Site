import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70svh] text-center px-4 space-y-6">
      <p className="text-8xl font-bold text-(--border)">404</p>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-(--foreground)">Page not found</h1>
        <p className="text-(--muted) max-w-sm">
          This page doesn&rsquo;t exist — but our food does. Head back and place an order.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/city-chops"
          className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-btn)] bg-[var(--color-chops-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]"
        >
          🍖 City Chops
        </Link>
        <Link
          href="/tigernut-mill"
          className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-pill)] bg-[var(--color-ftm-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]"
        >
          🥛 Tigernut Mill
        </Link>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 rounded-[var(--radius-btn)] border border-(--border) text-(--foreground) text-sm font-medium hover:bg-(--surface) transition-colors min-h-[44px]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
