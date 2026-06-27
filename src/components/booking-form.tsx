"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/input";
import Button from "@/components/ui/button";
import type { Brand } from "@/types/business";

interface BookingFormProps {
  brand?: Brand;
  /** Web3Forms access key — pass process.env.NEXT_PUBLIC_WEB3FORMS_KEY */
  accessKey: string;
  subject?: string;
  serviceOptions: { label: string; value: string }[];
}

export default function BookingForm({
  brand = "city-chops",
  accessKey,
  subject = "New Booking Request",
  serviceOptions,
}: BookingFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-8 text-center space-y-2">
        <p className="text-2xl">🎉</p>
        <p className="font-semibold text-green-700 dark:text-green-300">Booking received!</p>
        <p className="text-sm text-green-600 dark:text-green-400">
          We&rsquo;ll contact you within a few hours to confirm your booking.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Web3Forms hidden fields */}
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="subject"    value={subject} />
      <input type="hidden" name="from_name"  value="FB Family Hub Website" />
      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Full name"    name="name"  type="text" placeholder="Amina Suleiman" required />
        <Input label="Phone number" name="phone" type="tel"  placeholder="+234 800 000 0000" required />
      </div>

      <Input label="Email address" name="email" type="email" placeholder="you@example.com" required />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Event date"          name="event_date"   type="date"   required />
        <Input label="Approx. guest count" name="guest_count"  type="number" min="1" placeholder="50" required />
      </div>

      <Select label="Service required" name="service" required>
        <option value="">Select a service…</option>
        {serviceOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </Select>

      <Textarea label="Special requests" name="message" placeholder="Event location, dietary requirements, theme, delivery preferences…" />

      {status === "error" && (
        <p className="text-sm text-red-500 text-center">
          Something went wrong — please try again or contact us via WhatsApp.
        </p>
      )}

      <Button
        brand={brand}
        type="submit"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send Booking Request"}
      </Button>

      <p className="text-xs text-center text-(--muted)">
        We typically respond within 2–4 hours during operating hours (9 AM – 10 PM WAT).
      </p>
    </form>
  );
}
