import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getAutoTheme, getOperationalStatus } from "@/lib/hours";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "City Chops & Fresh Tigernut Mill — Kaduna",
    template: "%s | City Chops & Fresh Tigernut Mill",
  },
  description:
    "Kaduna's favourite family food hub — fresh tigernut drinks, small chops, waina, catering, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme  = getAutoTheme();
  const status = getOperationalStatus();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${theme} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-(--background) text-(--foreground)">
        {/* Hours strip */}
        <div
          className={`w-full py-1.5 px-4 text-center text-xs font-medium tracking-wide ${
            status.isOpen
              ? "bg-green-600 text-white"
              : "bg-amber-500 text-amber-950"
          }`}
        >
          <span className="mr-1.5">{status.isOpen ? "●" : "●"}</span>
          {status.message}
        </div>

        <Navbar />

        <main className="flex-1">{children}</main>

        <footer className="border-t border-(--border) py-10 mt-16">
          <div className="content-container grid grid-cols-1 gap-8 sm:grid-cols-3 text-sm text-(--muted)">
            <div>
              <p className="font-semibold text-(--foreground) mb-2">FB Family Hub</p>
              <p>Kaduna, Nigeria</p>
              <p className="mt-1">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div>
              <p className="font-semibold text-(--foreground) mb-2">City Chops</p>
              <ul className="space-y-1">
                <li><a href="/city-chops/menu" className="hover:text-(--foreground)">Menu</a></li>
                <li><a href="/city-chops/catering" className="hover:text-(--foreground)">Catering</a></li>
                <li><a href="/city-chops/order" className="hover:text-(--foreground)">Order</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-(--foreground) mb-2">Fresh Tigernut Mill</p>
              <ul className="space-y-1">
                <li><a href="/tigernut-mill/products" className="hover:text-(--foreground)">Products</a></li>
                <li><a href="/tigernut-mill/order" className="hover:text-(--foreground)">Order</a></li>
                <li><a href="/about" className="hover:text-(--foreground)">About</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
