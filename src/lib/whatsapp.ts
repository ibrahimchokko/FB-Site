export function buildWhatsAppLink(
  phone: string,
  item: string,
  qty = "1"
): string {
  const msg = encodeURIComponent(
    `Hi! I'd like to order:\n\n🛒 ${item} × ${qty}\n\nPlease confirm availability and price. Thank you!`
  );
  return `https://wa.me/${phone}?text=${msg}`;
}

export interface CartLine {
  name: string;
  price: number;   // unit price in naira
  qty: number;
}

export function buildCartMessage(
  lines: CartLine[],
  isOpen: boolean
): string {
  const itemLines = lines
    .map((l) => `  🛒 ${l.name} × ${l.qty}  —  ₦${(l.price * l.qty).toLocaleString()}`)
    .join("\n");

  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  const header = isOpen
    ? "Hi! I'd like to place an order:"
    : "Hi! We're closed right now but I'd like to pre-order for when you open:";

  return (
    `${header}\n\n` +
    `${itemLines}\n\n` +
    `Total: ₦${total.toLocaleString()}\n\n` +
    `Please confirm availability and arrange delivery. Thank you!`
  );
}

export function buildCartLink(phone: string, lines: CartLine[], isOpen: boolean): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(buildCartMessage(lines, isOpen))}`;
}
