import type { Metadata } from "next";
import Link from "next/link";
import { MENU_ITEMS } from "@/data/content";

export const metadata: Metadata = { title: "Products — Fresh Tigernut Mill" };

export default function ProductsPage() {
  const items = MENU_ITEMS.filter((i) => i.brand === "fresh-tigernut");

  return (
    <>
      <section className="bg-[var(--color-ftm-bg)] py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-ftm-dark)]">Our Products</h1>
        <p className="mt-2 text-sm text-[var(--color-ftm-muted)]">Pressed fresh every morning — no preservatives, no shortcuts.</p>
      </section>

      <div className="content-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/tigernut-mill/products/${item.id}`}
              className="group rounded-[var(--radius-card)] border border-(--border) bg-(--surface) overflow-hidden hover:-translate-y-0.5 transition-transform shadow-[var(--shadow-card)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />
              <div className="p-4">
                <h2 className="font-semibold text-(--foreground) group-hover:text-[var(--color-ftm-primary)] transition-colors">
                  {item.name}
                </h2>
                <p className="mt-1 text-sm text-(--muted) line-clamp-2">{item.description}</p>
                <p className="mt-3 font-mono font-medium text-(--foreground)">₦{item.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
