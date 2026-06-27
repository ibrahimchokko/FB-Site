import { Card, CardImage, CardBody, BrandBadge } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { getOperationalStatus } from "@/lib/hours";
import type { MenuItem } from "@/types/business";
import { BRANDS } from "@/data/content";

interface Props {
  item: MenuItem;
}

export default function MenuItemCard({ item }: Props) {
  const { isOpen } = getOperationalStatus();
  const brand = BRANDS.find((b) => b.id === item.brand)!;
  const waLink = buildWhatsAppLink(
    brand.whatsapp,
    isOpen ? item.name : `Pre-order: ${item.name} (opening 9 AM WAT)`
  );

  return (
    <Card brand={item.brand}>
      <CardImage src={item.image} alt={item.name} />
      <CardBody>
        <BrandBadge brand={item.brand} />
        <h3 className="mt-2 font-semibold text-(--foreground) leading-snug">{item.name}</h3>
        <p className="mt-1 text-sm text-(--muted) line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-mono text-base font-medium text-(--foreground)">
            ₦{item.price.toLocaleString()}
          </span>
          <Button
            brand={item.brand}
            as="a"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 min-h-[36px]"
          >
            {isOpen ? "Order →" : "Pre-order →"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
