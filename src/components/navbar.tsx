"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Brand } from "@/types/business";

const BRAND_LINKS: {
  id: Brand | "parent";
  label: string;
  href: string;
  activePrefix: string;
}[] = [
  { id: "parent",        label: "Home",               href: "/",               activePrefix: "/" },
  { id: "city-chops",    label: "🍖 City Chops",      href: "/city-chops",     activePrefix: "/city-chops" },
  { id: "fresh-tigernut",label: "🥛 Tigernut Mill",   href: "/tigernut-mill",  activePrefix: "/tigernut-mill" },
];

const BRAND_NAV: Record<string, { label: string; href: string }[]> = {
  "city-chops": [
    { label: "Menu",     href: "/city-chops/menu" },
    { label: "Catering", href: "/city-chops/catering" },
    { label: "Order",    href: "/city-chops/order" },
  ],
  "fresh-tigernut": [
    { label: "Products", href: "/tigernut-mill/products" },
    { label: "Order",    href: "/tigernut-mill/order" },
  ],
};

function activeBrand(pathname: string): Brand | "parent" {
  if (pathname.startsWith("/city-chops"))   return "city-chops";
  if (pathname.startsWith("/tigernut-mill")) return "fresh-tigernut";
  return "parent";
}

const PILL_STYLE: Record<string, string> = {
  "city-chops":     "bg-[var(--color-chops-primary)] text-white",
  "fresh-tigernut": "bg-[var(--color-ftm-primary)] text-white",
  parent:           "bg-[var(--color-brand-500)] text-white",
};

export default function Navbar() {
  const pathname = usePathname();
  const current  = activeBrand(pathname);
  const [open, setOpen] = useState(false);

  const subLinks = current !== "parent" ? BRAND_NAV[current] ?? [] : [];

  return (
    <header className="sticky top-0 z-40 border-b border-(--border) bg-(--background)/95 backdrop-blur-sm">
      <div className="content-container flex h-14 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="font-semibold text-base shrink-0 text-(--foreground)">
          FB Family Hub
        </Link>

        {/* Brand pills — desktop */}
        <nav className="hidden sm:flex items-center gap-2">
          {BRAND_LINKS.map((b) => {
            const isActive = current === b.id;
            return (
              <Link
                key={b.id}
                href={b.href}
                className={`px-3 py-1 rounded-[var(--radius-pill)] text-sm font-medium transition-colors ${
                  isActive
                    ? PILL_STYLE[b.id]
                    : "text-(--muted) hover:text-(--foreground)"
                }`}
              >
                {b.label}
              </Link>
            );
          })}
        </nav>

        {/* Sub-brand contextual links — desktop */}
        {subLinks.length > 0 && (
          <nav className="hidden lg:flex items-center gap-4 text-sm text-(--muted)">
            {subLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`hover:text-(--foreground) transition-colors ${
                  pathname === l.href ? "text-(--foreground) font-medium" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Utility links — desktop */}
        <div className="hidden sm:flex items-center gap-3 text-sm text-(--muted)">
          <Link href="/about" className="hover:text-(--foreground) transition-colors">About</Link>
          <Link href="/contact" className="hover:text-(--foreground) transition-colors">Contact</Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          aria-label="Toggle menu"
          className="sm:hidden p-2 text-(--foreground)"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="sm:hidden border-t border-(--border) bg-(--background) px-4 pb-4 pt-3 space-y-3">
          {BRAND_LINKS.map((b) => (
            <Link
              key={b.id}
              href={b.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-[var(--radius-btn)] text-sm font-medium ${
                current === b.id
                  ? PILL_STYLE[b.id]
                  : "text-(--foreground) hover:bg-(--surface)"
              }`}
            >
              {b.label}
            </Link>
          ))}
          {subLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-(--muted) hover:text-(--foreground)"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/about"   onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-(--muted)">About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-(--muted)">Contact</Link>
        </div>
      )}
    </header>
  );
}
