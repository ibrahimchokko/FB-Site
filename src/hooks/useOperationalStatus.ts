"use client";

import { useState, useEffect } from "react";

const OPEN_HOUR  = 9;   // 09:00 WAT
const CLOSE_HOUR = 22;  // 22:00 WAT

interface OperationalStatus {
  isOpen: boolean;
  canOrder: boolean;
  statusMessage: string;
  /** Current WAT hour (0–23) */
  watHour: number;
}

function computeStatus(): OperationalStatus {
  const watHour = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" })
  ).getHours();

  const isOpen   = watHour >= OPEN_HOUR && watHour < CLOSE_HOUR;
  const canOrder = isOpen;

  let statusMessage: string;
  if (isOpen) {
    const closeIn = CLOSE_HOUR - watHour;
    statusMessage =
      closeIn <= 1
        ? "We close in less than an hour — order now!"
        : "We're open! Place your order via WhatsApp.";
  } else if (watHour < OPEN_HOUR) {
    statusMessage = `We open at ${OPEN_HOUR}:00 AM WAT today — leave a pre-order now.`;
  } else {
    statusMessage = `We're closed for today. We open at ${OPEN_HOUR}:00 AM WAT tomorrow — pre-orders welcome.`;
  }

  return { isOpen, canOrder, statusMessage, watHour };
}

/**
 * Polls WAT every 60 s to reflect live open/closed state.
 * Safe to call in any Client Component.
 */
export function useOperationalStatus(): OperationalStatus {
  const [status, setStatus] = useState<OperationalStatus>(computeStatus);

  useEffect(() => {
    const id = setInterval(() => setStatus(computeStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  return status;
}
