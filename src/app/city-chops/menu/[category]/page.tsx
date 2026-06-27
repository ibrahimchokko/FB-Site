import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MENU_ITEMS } from "@/data/content";
import MenuItemCard from "@/components/menu-item-card";
import type { MenuCategory } from "@/types/business";

interface Props {
  params: Promise<{ category: string }>;
}

const CC_CATEGORIES: { slug: MenuCategory; label: string }[] = [
  { slug: "waina",        label: "Waina" },
  { slug: "puff-puff",    label: "Puff Puff" },
  { slug: "samosa",       label: "Samosa" },
  { slug: "peppery-meat", label: "Peppery Meat" },
  { slug: "cakes",        label: "Cakes" },
  { slug: "catering",     label: "Catering Packages" },
];

export function generateStaticParams() {
  return CC_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CC_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return { title: "Not Found" };
  return { title: `${cat.label} — City Chops` };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CC_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const items = MENU_ITEMS.filter(
    (i) => i.brand === "city-chops" && i.category === cat.slug
  );

  return (
    <>
      {/* Header */}
      <section className="bg-[var(--color-chops-bg)] py-12 px-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-chops-muted)] mb-2">City Chops</p>
        <h1 className="text-3xl font-bold text-[var(--color-chops-light)]">{cat.label}</h1>
      </section>

      {/* Category strip — other categories */}
      <nav className="sticky top-14 z-30 bg-(--background)/95 backdrop-blur-sm border-b border-(--border)">
        <div className="content-container flex gap-1 overflow-x-auto py-2 no-scrollbar">
          {CC_CATEGORIES.map((c) => (
            <a
              key={c.slug}
              href={`/city-chops/menu/${c.slug}`}
              className={`shrink-0 px-3 py-1.5 text-sm rounded-[var(--radius-pill)] transition-colors ${
                c.slug === cat.slug
                  ? "bg-[var(--color-chops-primary)] text-white"
                  : "text-(--muted) hover:text-(--foreground) hover:bg-(--surface)"
              }`}
            >
              {c.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="content-container py-14">
        {items.length === 0 ? (
          <p className="text-(--muted) text-center py-10">No items in this category yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <a href="/city-chops/menu" className="text-sm text-(--muted) hover:text-(--foreground) transition-colors">
            ← View full menu
          </a>
        </div>
      </div>
    </>
  );
}
