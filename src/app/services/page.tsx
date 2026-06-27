"use client";

import { useState } from "react";
import { MENU_ITEMS } from "@/data/content";
import MenuItemCard from "@/components/menu-item-card";
import type { Brand } from "@/types/business";

type Filter = "all" | Brand;

const TABS: { id: Filter; label: string }[] = [
  { id: "all",            label: "All Items" },
  { id: "city-chops",     label: "🍖 City Chops" },
  { id: "fresh-tigernut", label: "🥛 Tigernut Mill" },
];

const TAB_ACTIVE: Record<Filter, string> = {
  "all":            "bg-[var(--color-brand-500)] text-white",
  "city-chops":     "bg-[var(--color-chops-primary)] text-white",
  "fresh-tigernut": "bg-[var(--color-ftm-primary)] text-white",
};

export default function ServicesPage() {
  const [active, setActive] = useState<Filter>("all");

  const items = active === "all"
    ? MENU_ITEMS
    : MENU_ITEMS.filter((i) => i.brand === active);

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="bg-(--surface) border-b border-(--border) py-10 px-4 text-center">
        <h1 className="heading-display text-3xl sm:text-4xl text-(--foreground)">Menu & Services</h1>
        <p className="mt-2 text-sm text-(--muted) max-w-md mx-auto">
          Food, drinks, catering, and cakes — everything we offer across both brands.
        </p>
      </section>

      <div className="content-container py-10 space-y-8">

        {/* ── Filter Tabs ──────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by brand">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-4 py-2 rounded-[var(--radius-pill)] text-sm font-medium transition-colors min-h-[40px] ${
                active === tab.id
                  ? TAB_ACTIVE[tab.id]
                  : "border border-(--border) text-(--muted) hover:text-(--foreground)"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-(--muted) self-center">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <div
          role="tabpanel"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* ── Catering CTA ─────────────────────────────────────────── */}
        {(active === "all" || active === "city-chops") && (
          <aside className="rounded-[var(--radius-card)] bg-[var(--color-chops-bg)] text-[var(--color-chops-light)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-lg">Planning an Event?</h2>
              <p className="text-sm text-[var(--color-chops-muted)] mt-1">
                City Chops handles full catering for weddings, namings, birthdays, and corporate functions across Kaduna.
              </p>
            </div>
            <a
              href="/city-chops/catering"
              className="shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-btn)] bg-[var(--color-chops-primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity min-h-[48px]"
            >
              View Catering Packages →
            </a>
          </aside>
        )}

      </div>
    </>
  );
}
