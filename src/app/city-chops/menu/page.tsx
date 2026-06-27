import type { Metadata } from "next";
import { MENU_ITEMS } from "@/data/content";
import MenuItemCard from "@/components/menu-item-card";

export const metadata: Metadata = { title: "Menu — City Chops" };

const CATEGORIES = [
  { slug: "waina",        label: "Waina" },
  { slug: "puff-puff",    label: "Puff Puff" },
  { slug: "samosa",       label: "Samosa" },
  { slug: "peppery-meat", label: "Peppery Meat" },
  { slug: "cakes",        label: "Cakes" },
  { slug: "catering",     label: "Catering Packages" },
] as const;

export default function CityChopsMenuPage() {
  const items = MENU_ITEMS.filter((i) => i.brand === "city-chops");

  return (
    <>
      <section className="bg-[var(--color-chops-bg)] py-12 px-4 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-chops-light)]">Our Menu</h1>
        <p className="mt-2 text-sm text-[var(--color-chops-muted)]">Fresh, made to order — Kaduna&rsquo;s best bites.</p>
      </section>

      {/* Sticky category nav */}
      <nav className="sticky top-14 z-30 bg-(--background)/95 backdrop-blur-sm border-b border-(--border)">
        <div className="content-container flex gap-1 overflow-x-auto py-2 no-scrollbar">
          {CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="shrink-0 px-3 py-1.5 text-sm rounded-[var(--radius-pill)] text-(--muted) hover:text-(--foreground) hover:bg-(--surface) transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="content-container py-14 space-y-14">
        {CATEGORIES.map((cat) => {
          const catItems = items.filter((i) => i.category === cat.slug);
          if (!catItems.length) return null;
          return (
            <section key={cat.slug} id={cat.slug}>
              <h2 className="text-xl font-bold text-(--foreground) mb-4 border-l-4 border-[var(--color-chops-primary)] pl-3">
                {cat.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
