import type { Metadata } from "next";
import Link from "next/link";
import { MENU_ITEMS, BRANDS } from "@/data/content";
import { getOperationalStatus } from "@/lib/hours";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import MenuItemCard from "@/components/menu-item-card";
import Button from "@/components/ui/button";

export const metadata: Metadata = { title: "City Chops" };

const CATEGORIES = [
  { slug: "waina",        label: "Waina" },
  { slug: "puff-puff",    label: "Puff Puff" },
  { slug: "samosa",       label: "Samosa" },
  { slug: "peppery-meat", label: "Peppery Meat" },
  { slug: "cakes",        label: "Cakes" },
  { slug: "catering",     label: "Catering" },
] as const;

export default function CityChopsPage() {
  const { isOpen } = getOperationalStatus();
  const brand = BRANDS.find((b) => b.id === "city-chops")!;
  const items = MENU_ITEMS.filter((i) => i.brand === "city-chops");
  const cateringWa = buildWhatsAppLink(brand.whatsapp, "Catering Package Enquiry");

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-chops-bg)] text-[var(--color-chops-light)] py-20 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Fresh Bites,<br />
          <span className="text-[var(--color-chops-gold)]">Made in Kaduna.</span>
        </h1>
        <p className="mt-4 text-[var(--color-chops-muted)] max-w-md mx-auto text-base">
          Small chops, waina, puff puff, peppery meat — and full catering for any occasion.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button brand="city-chops" as="a" href="#menu">Browse Menu</Button>
          <Button brand="city-chops" variant="secondary" as="a" href="/city-chops/catering">
            Book Catering
          </Button>
        </div>
      </section>

      {/* Category filter strip */}
      <nav
        id="menu"
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

      {/* Menu sections by category */}
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

      {/* Catering CTA strip */}
      <section className="bg-[var(--color-chops-bg)] text-[var(--color-chops-light)] py-14 text-center px-4">
        <h2 className="text-2xl font-bold mb-2">Planning an Event?</h2>
        <p className="text-[var(--color-chops-muted)] mb-6 max-w-sm mx-auto text-sm">
          We handle full-service catering from 30 to 300+ guests. Let&rsquo;s talk.
        </p>
        <Button brand="city-chops" as="a" href={cateringWa} target="_blank" rel="noopener noreferrer">
          {isOpen ? "Book via WhatsApp" : "Pre-book via WhatsApp"}
        </Button>
      </section>

      {/* Sticky mobile order bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-(--border) bg-(--background)">
        <Link
          href={buildWhatsAppLink(brand.whatsapp, "Order from City Chops")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium bg-[var(--color-chops-primary)] text-white"
        >
          🛒 {isOpen ? "Order via WhatsApp" : "Pre-order"}
        </Link>
        <a
          href={`tel:+${brand.whatsapp}`}
          className="w-16 flex items-center justify-center border-l border-[var(--color-chops-primary)]/40 text-(--foreground)"
        >
          📞
        </a>
      </div>
    </>
  );
}
