import Link from "next/link";
import { BRANDS } from "@/data/content";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const MAPS_URL =
  "https://www.google.com/maps/search/Kaduna+Nigeria/@10.5105,7.4165,13z";

const CITY_CHOPS_WA  = buildWhatsAppLink(BRANDS[0].whatsapp, "Catering enquiry");
const FTM_WA         = buildWhatsAppLink(BRANDS[1].whatsapp, "Drink order");

export default function Footer() {
  return (
    <footer className="border-t border-(--border) mt-16 bg-(--surface)">
      <div className="content-container py-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm">

        {/* ── Brand column ─────────────────────────────────────── */}
        <div className="space-y-3">
          <p className="font-semibold text-base text-(--foreground)">FB Family Hub</p>
          <p className="text-(--muted) leading-relaxed">
            A family-owned food and drinks business proudly serving Kaduna since 2018.
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-(--muted) hover:text-(--foreground) transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
            </svg>
            Kaduna, Nigeria — View on Maps
          </a>
          {/* Social */}
          <div className="flex items-center gap-4 pt-1">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-(--muted) hover:text-(--foreground) transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-(--muted) hover:text-(--foreground) transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href={CITY_CHOPS_WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-(--muted) hover:text-(--foreground) transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
          </div>
        </div>

        {/* ── City Chops column ─────────────────────────────────── */}
        <div className="space-y-3">
          <p className="font-semibold text-base text-(--foreground)">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-chops-primary)] mr-2 align-middle" />
            City Chops
          </p>
          <ul className="space-y-2 text-(--muted)">
            <li><Link href="/city-chops" className="hover:text-(--foreground) transition-colors">Overview</Link></li>
            <li><Link href="/city-chops/menu" className="hover:text-(--foreground) transition-colors">Full Menu</Link></li>
            <li><Link href="/city-chops/catering" className="hover:text-(--foreground) transition-colors">Catering & Events</Link></li>
            <li><Link href="/city-chops/menu/cakes" className="hover:text-(--foreground) transition-colors">Cakes & Pastries</Link></li>
            <li><Link href="/city-chops/order" className="hover:text-(--foreground) transition-colors">Order Now</Link></li>
            <li>
              <a href={CITY_CHOPS_WA} target="_blank" rel="noopener noreferrer" className="hover:text-(--foreground) transition-colors">
                WhatsApp Order ↗
              </a>
            </li>
          </ul>
        </div>

        {/* ── Tigernut Mill column ──────────────────────────────── */}
        <div className="space-y-3">
          <p className="font-semibold text-base text-(--foreground)">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-ftm-primary)] mr-2 align-middle" />
            Fresh Tigernut Mill
          </p>
          <ul className="space-y-2 text-(--muted)">
            <li><Link href="/tigernut-mill" className="hover:text-(--foreground) transition-colors">Overview</Link></li>
            <li><Link href="/tigernut-mill/products" className="hover:text-(--foreground) transition-colors">All Products</Link></li>
            <li><Link href="/tigernut-mill/order" className="hover:text-(--foreground) transition-colors">Order Now</Link></li>
            <li>
              <a href={FTM_WA} target="_blank" rel="noopener noreferrer" className="hover:text-(--foreground) transition-colors">
                WhatsApp Order ↗
              </a>
            </li>
          </ul>
        </div>

        {/* ── Hours & info column ───────────────────────────────── */}
        <div className="space-y-3">
          <p className="font-semibold text-base text-(--foreground)">Hours & Info</p>
          <ul className="space-y-1.5 text-(--muted)">
            <li className="flex justify-between gap-4">
              <span>Mon – Sat</span><span className="text-(--foreground)">9 AM – 10 PM</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Sunday</span><span>Closed</span>
            </li>
          </ul>
          <p className="text-(--muted) pt-1">
            Pre-orders accepted outside hours via WhatsApp.
          </p>
          <div className="pt-2 space-y-1.5 text-(--muted)">
            <Link href="/about" className="block hover:text-(--foreground) transition-colors">About Us</Link>
            <Link href="/contact" className="block hover:text-(--foreground) transition-colors">Contact</Link>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div className="border-t border-(--border)">
        <div className="content-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-(--muted)">
          <span>© {new Date().getFullYear()} FB Family Hub, Kaduna. All rights reserved.</span>
          <span>Made with care in Nigeria 🇳🇬</span>
        </div>
      </div>
    </footer>
  );
}
