import type { OperationalStatus } from "@/types/business";

const OPEN_HOUR  = 9;
const CLOSE_HOUR = 22; // 10 PM

/** Returns current hour in WAT (Africa/Lagos, UTC+1). Safe on server + client. */
function watHour(): number {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" })
  ).getHours();
}

export function getOperationalStatus(): OperationalStatus {
  const h = watHour();
  const isOpen = h >= OPEN_HOUR && h < CLOSE_HOUR;
  return {
    isOpen,
    message: isOpen
      ? "We're open · Orders & bookings accepted now"
      : "Closed · Opens 9 AM WAT · You can still leave a pre-order",
  };
}

/** Auto-dark after 7 PM for late-night ordering comfort. */
export function getAutoTheme(): "light" | "dark" {
  const h = watHour();
  return h >= 19 || h < 7 ? "dark" : "light";
}
