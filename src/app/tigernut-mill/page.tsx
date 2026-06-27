import type { Metadata } from "next";
import Link from "next/link";
import { MENU_ITEMS, BRANDS } from "@/data/content";
import { getOperationalStatus } from "@/lib/hours";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import MenuItemCard from "@/components/menu-item-card";
import Button from "@/components/ui/button";

export const metadata: Metadata = { title: "Fresh Tigernut Mill" };

const CATEGORIES = [
  { slug: "kunun-aya",    label: "Kunun Aya" },
  { slug: "kunun-zaki",   label: "Kunun Zaki" },
  { slug: "yogo-fura",    label: "Yogo Fura" },
  { slug: "tigernut-mix", label: "Tigernut Mix" },
  { slug: "smoothies",    label: "Smoothies" },
] as const;

export default function TigernutMillPage() {
  const { isOpen } = getOperationalStatus();
  const brand = BRANDS.find((b) => b.id === "fresh-tigernut")!;
  const items = MENU_ITEMS.filter((i) => i.brand === "fresh-tigernut");
  const orderWa = buildWhatsAppLink(brand.whatsapp, "Fresh Tigernut Mill Order");

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-ftm-bg)] py-20 px-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ftm-amber)] mb-3">
          Pressed Fresh Daily
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-ftm-dark)] leading-tight">
          Nature&rsquo;s Sweetness<br />
          <span className="text-[var(--color-ftm-primary)]">in Every Cup.</span>
        </h1>
        <p className="mt-4 text-[var(--color-ftm-muted)] max-w-md mx-auto text-base">
          Kunun Aya, Kunun Zaki, Yogo Fura and more — made from natural ingredients, no preservatives.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button brand="fresh-tigernut" as="a" href="#products">Shop Products</Button>
          <Button brand="fresh-tigernut" variant="secondary" as="a" href={orderWa} target="_blank" rel="noopener noreferrer">
            Order via WhatsApp
          </Button>
        </div>
      </section>

      {/* Freshness badge strip */}
      <div className="bg-[var(--color-ftm-primary)] text-white text-xs text-center py-2 tracking-wide">
        ✓ No preservatives &nbsp;·&nbsp; ✓ Made fresh daily &nbsp;·&nbsp; ✓ Natural ingredients
      </div>

      {/* Category filter */}
      <nav
        id="products"
        className="sticky top-14 z-30 bg-(--background)/95 backdrop-blur-sm border-b border-(--border)"
      >
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

      {/* Product sections */}
      <div className="content-container py-[var(--spacing-section)] space-y-14">
        {CATEGORIES.map((cat) => {
          const catItems = items.filter((i) => i.category === cat.slug);
          if (!catItems.length) return null;
          return (
            <section key={cat.slug} id={cat.slug}>
              <h2 className="text-xl font-bold text-(--foreground) mb-4">{cat.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Story strip */}
      <section className="bg-[var(--color-ftm-bg)] border-t border-[var(--color-ftm-primary)]/15 py-14 px-4 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-ftm-dark)] mb-3">Why Fresh Tigernut Mill?</h2>
        <p className="text-[var(--color-ftm-muted)] max-w-lg mx-auto text-sm leading-relaxed">
          We press our tigernuts fresh every morning in Kaduna — no concentrates, no additives.
          What you taste is exactly what nature intended, delivered straight to your door.
        </p>
      </section>

      {/* Sticky mobile order bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-(--border) bg-(--background)">
        <Link
          href={orderWa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium bg-[var(--color-ftm-primary)] text-white"
        >
          🥛 {isOpen ? "Order via WhatsApp" : "Pre-order"}
        </Link>
        <a
          href={`tel:+${brand.whatsapp}`}
          className="w-16 flex items-center justify-center border-l border-[var(--color-ftm-primary)]/40 text-(--foreground)"
        >
          📞
        </a>
      </div>
    </>
  );
}
