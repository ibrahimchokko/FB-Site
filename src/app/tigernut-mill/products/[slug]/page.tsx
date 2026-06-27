import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MENU_ITEMS, BRANDS } from "@/data/content";
import { getOperationalStatus } from "@/lib/hours";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import Button from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MENU_ITEMS.filter((i) => i.brand === "fresh-tigernut").map((i) => ({
    slug: i.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = MENU_ITEMS.find((i) => i.id === slug && i.brand === "fresh-tigernut");
  if (!item) return { title: "Product Not Found" };
  return {
    title: `${item.name} — Fresh Tigernut Mill`,
    description: item.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = MENU_ITEMS.find((i) => i.id === slug && i.brand === "fresh-tigernut");
  if (!item) notFound();

  const { isOpen } = getOperationalStatus();
  const brand = BRANDS.find((b) => b.id === "fresh-tigernut")!;
  const waLink = buildWhatsAppLink(
    brand.whatsapp,
    isOpen ? item.name : `Pre-order: ${item.name} (opens 9 AM WAT)`
  );

  return (
    <div className="content-container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full rounded-[var(--radius-image)] aspect-square object-cover"
        />

        {/* Details */}
        <div className="space-y-5">
          <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-[var(--radius-pill)] bg-[var(--color-ftm-primary)] text-white">
            Fresh Tigernut Mill
          </span>
          <h1 className="text-3xl font-bold text-(--foreground) leading-snug">{item.name}</h1>
          <p className="text-(--muted) leading-relaxed">{item.description}</p>
          <p className="font-mono text-3xl font-semibold text-(--foreground)">₦{item.price.toLocaleString()}</p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              brand="fresh-tigernut"
              as="a"
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 justify-center"
            >
              {isOpen ? "Order via WhatsApp" : "Pre-order via WhatsApp"}
            </Button>
            <Button
              brand="fresh-tigernut"
              variant="secondary"
              as="a"
              href={`tel:+${brand.whatsapp}`}
              className="flex-1 justify-center"
            >
              📞 Call to Order
            </Button>
          </div>

          {!isOpen && (
            <p className="text-xs text-(--muted) bg-(--surface) rounded-[var(--radius-btn)] px-3 py-2 border border-(--border)">
              We&rsquo;re currently closed. Your pre-order message will be sent and confirmed when we open at 9 AM WAT.
            </p>
          )}

          <div className="pt-2 border-t border-(--border) text-sm text-(--muted) space-y-1">
            <p>✓ Pressed fresh daily — no preservatives</p>
            <p>✓ Natural ingredients only</p>
            <p>✓ Delivery available in Kaduna</p>
          </div>
        </div>
      </div>

      {/* Related products */}
      <section className="mt-16">
        <h2 className="text-xl font-bold text-(--foreground) mb-4">You might also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MENU_ITEMS.filter((i) => i.brand === "fresh-tigernut" && i.id !== item.id)
            .slice(0, 4)
            .map((rel) => (
              <a
                key={rel.id}
                href={`/tigernut-mill/products/${rel.id}`}
                className="group rounded-[var(--radius-card)] border border-(--border) bg-(--surface) overflow-hidden hover:-translate-y-0.5 transition-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={rel.image} alt={rel.name} className="w-full aspect-square object-cover" loading="lazy" />
                <div className="p-3">
                  <p className="text-sm font-medium text-(--foreground) group-hover:text-[var(--color-ftm-primary)] transition-colors">
                    {rel.name}
                  </p>
                  <p className="text-xs font-mono text-(--muted)">₦{rel.price.toLocaleString()}</p>
                </div>
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}
