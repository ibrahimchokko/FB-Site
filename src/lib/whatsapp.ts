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
