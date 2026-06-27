import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { getAutoTheme, getOperationalStatus } from "@/lib/hours";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fbfamilyhub.com.ng"),
  title: {
    default: "City Chops & Fresh Tigernut Mill — Kaduna",
    template: "%s | FB Family Hub Kaduna",
  },
  description:
    "Kaduna's favourite family food hub — fresh tigernut drinks, small chops, waina, catering, and more. Serving Kaduna North, South & Central.",
  keywords: [
    "small chops Kaduna",
    "tigernut drink Kaduna",
    "catering Kaduna",
    "waina Kaduna",
    "food delivery Kaduna",
    "City Chops",
    "Fresh Tigernut Mill",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "FB Family Hub",
    title: "City Chops & Fresh Tigernut Mill — Kaduna",
    description:
      "Fresh tigernut drinks, small chops, waina & catering across Kaduna.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme  = getAutoTheme();
  const status = getOperationalStatus();

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} ${theme} h-full antialiased`}
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
          <span className="mr-1.5">●</span>
          {status.message}
        </div>

        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
