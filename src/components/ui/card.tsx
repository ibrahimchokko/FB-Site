import type { Brand } from "@/types/business";

interface CardProps {
  brand?: Brand;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const BRAND_ACCENT: Record<Brand, string> = {
  "city-chops":    "border-t-[3px] border-t-[var(--color-chops-primary)]",
  "fresh-tigernut":"border-t-[3px] border-t-[var(--color-ftm-primary)]",
};

export function Card({ brand, className = "", onClick, children }: CardProps) {
  const accent = brand ? BRAND_ACCENT[brand] : "";
  const interactive = onClick
    ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-500)]"
    : "";
  return (
    <div
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`bg-(--surface) rounded-[var(--radius-card)] shadow-[var(--shadow-card)] dark:shadow-[var(--shadow-card-dark)] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 ${accent} ${interactive} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
}

export function CardImage({ src, alt }: CardImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={400}
      height={300}
      className="w-full aspect-[4/3] object-cover"
      loading="lazy"
    />
  );
}

export function CardBody({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

interface BrandBadgeProps {
  brand: Brand;
}

const BADGE_STYLE: Record<Brand, string> = {
  "city-chops":    "bg-[var(--color-chops-primary)] text-white",
  "fresh-tigernut":"bg-[var(--color-ftm-primary)] text-white",
};

const BADGE_LABEL: Record<Brand, string> = {
  "city-chops":    "City Chops",
  "fresh-tigernut":"Tigernut Mill",
};

export function BrandBadge({ brand }: BrandBadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest rounded-[var(--radius-pill)] ${BADGE_STYLE[brand]}`}
    >
      {BADGE_LABEL[brand]}
    </span>
  );
}
