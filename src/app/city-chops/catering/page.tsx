import type { Metadata } from "next";
import BookingForm from "@/components/booking-form";

export const metadata: Metadata = { title: "Catering — City Chops" };

const PACKAGES = [
  {
    name: "Small Event",
    guests: "Up to 30 guests",
    price: "₦45,000",
    features: ["Waina & puff puff", "Samosa & small chops", "2 drink options", "Setup & serve"],
  },
  {
    name: "Medium Event",
    guests: "Up to 80 guests",
    price: "₦100,000",
    features: ["3 main dishes", "Salads & sides", "3 drink options", "Full setup & clean-up"],
    highlight: true,
  },
  {
    name: "Large Event",
    guests: "100+ guests",
    price: "Custom quote",
    features: ["Bespoke menu", "Full equipment", "Dedicated staff", "Pre & post event support"],
  },
];

const SERVICE_OPTIONS = [
  ...PACKAGES.map((p) => ({ label: `${p.name} — ${p.guests}`, value: p.name })),
  { label: "Custom Bulk Cakes",  value: "Custom Bulk Cakes" },
  { label: "Custom / Not sure yet", value: "Custom" },
];

export default function CateringPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-chops-bg)] text-[var(--color-chops-light)] py-16 px-4 text-center">
        <h1 className="text-4xl font-bold">
          Catering That <span className="text-[var(--color-chops-gold)]">Impresses.</span>
        </h1>
        <p className="mt-3 text-[var(--color-chops-muted)] max-w-md mx-auto text-sm">
          From intimate family dinners to large celebrations — we handle the food so you enjoy the moment.
        </p>
      </section>

      {/* ── Packages ─────────────────────────────────────────────── */}
      <section className="content-container py-14">
        <h2 className="text-2xl font-bold text-(--foreground) mb-6">Our Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-[var(--radius-card)] border p-6 flex flex-col gap-4 ${
                pkg.highlight
                  ? "border-[var(--color-chops-primary)] bg-(--surface) shadow-[var(--shadow-cta-chops)]"
                  : "border-(--border) bg-(--surface)"
              }`}
            >
              {pkg.highlight && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-chops-primary)]">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-bold text-(--foreground)">{pkg.name}</h3>
                <p className="text-sm text-(--muted)">{pkg.guests}</p>
              </div>
              <p className="font-mono text-2xl font-semibold text-(--foreground)">{pkg.price}</p>
              <ul className="space-y-1.5 text-sm text-(--muted) flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[var(--color-chops-primary)]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#booking-form"
                className="mt-auto w-full py-2.5 text-sm font-medium rounded-[var(--radius-btn)] border border-[var(--color-chops-primary)] text-[var(--color-chops-primary)] hover:bg-[var(--color-chops-primary)] hover:text-white transition-colors min-h-[44px] flex items-center justify-center"
              >
                Book This Package
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking form ─────────────────────────────────────────── */}
      <section id="booking-form" className="content-container pb-16 max-w-2xl scroll-mt-20">
        <h2 className="text-2xl font-bold text-(--foreground) mb-6">Book a Package</h2>
        <BookingForm
          brand="city-chops"
          accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ""}
          subject="New Catering Booking — City Chops"
          serviceOptions={SERVICE_OPTIONS}
        />
      </section>
    </>
  );
}
