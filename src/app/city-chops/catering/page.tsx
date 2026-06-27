"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/input";
import Button from "@/components/ui/button";

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

export default function CateringPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });
    if (res.ok) setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-chops-bg)] text-[var(--color-chops-light)] py-16 px-4 text-center">
        <h1 className="text-4xl font-bold">
          Catering That <span className="text-[var(--color-chops-gold)]">Impresses.</span>
        </h1>
        <p className="mt-3 text-[var(--color-chops-muted)] max-w-md mx-auto text-sm">
          From intimate family dinners to large celebrations — we handle the food so you enjoy the moment.
        </p>
      </section>

      {/* Package cards */}
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
              <button
                onClick={() => document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-auto w-full py-2.5 text-sm font-medium rounded-[var(--radius-btn)] border border-[var(--color-chops-primary)] text-[var(--color-chops-primary)] hover:bg-[var(--color-chops-primary)] hover:text-white transition-colors min-h-[44px]"
              >
                Book This Package
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking form */}
      <section id="booking-form" className="content-container pb-16 max-w-2xl">
        <h2 className="text-2xl font-bold text-(--foreground) mb-6">Book a Package</h2>

        {submitted ? (
          <div className="rounded-[var(--radius-card)] bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-8 text-center space-y-2">
            <p className="text-2xl">🎉</p>
            <p className="font-semibold text-green-700 dark:text-green-300">Booking received!</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              We&rsquo;ll contact you within a few hours to confirm your package.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ""} />
            <input type="hidden" name="subject" value="New Catering Booking — City Chops" />
            <input type="hidden" name="from_name" value="City Chops Website" />
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Your name" name="name" type="text" placeholder="Amina Suleiman" required />
              <Input label="Phone number" name="phone" type="tel" placeholder="+234 800 000 0000" required />
            </div>
            <Input label="Email address" name="email" type="email" placeholder="you@example.com" required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Event date" name="event_date" type="date" required />
              <Input label="Approx. guest count" name="guest_count" type="number" min="1" placeholder="50" required />
            </div>
            <Select label="Package interest" name="package">
              <option value="">Select a package</option>
              {PACKAGES.map((p) => (
                <option key={p.name} value={p.name}>{p.name} — {p.guests}</option>
              ))}
              <option value="Custom">Custom / Not sure yet</option>
            </Select>
            <Textarea label="Additional notes" name="message" placeholder="Event type, location, dietary requirements…" />

            <Button brand="city-chops" type="submit" className="w-full">
              Send Booking Request
            </Button>
            <p className="text-xs text-center text-(--muted)">
              We typically respond within 2–4 hours during operating hours (9 AM – 10 PM WAT).
            </p>
          </form>
        )}
      </section>
    </>
  );
}
