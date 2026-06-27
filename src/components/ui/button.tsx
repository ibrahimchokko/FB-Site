import type { Brand } from "@/types/business";

type Variant = "primary" | "secondary" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  brand?: Brand;
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const SIZE_CLASS: Record<Size, string> = {
  sm: "min-h-[44px] px-3 text-xs",
  md: "min-h-[44px] px-5 text-sm",
  lg: "min-h-[52px] px-7 text-base",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

const BRAND_PRIMARY: Record<Brand, string> = {
  "city-chops":
    "bg-[var(--color-chops-primary)] text-white hover:opacity-90 shadow-[var(--shadow-cta-chops)] rounded-[var(--radius-btn)]",
  "fresh-tigernut":
    "bg-[var(--color-ftm-primary)] text-white hover:opacity-90 shadow-[var(--shadow-cta-ftm)] rounded-[var(--radius-pill)]",
};

const BRAND_SECONDARY: Record<Brand, string> = {
  "city-chops":
    "border border-[var(--color-chops-primary)] text-[var(--color-chops-primary)] hover:bg-[var(--color-chops-primary)] hover:text-white rounded-[var(--radius-btn)]",
  "fresh-tigernut":
    "border border-[var(--color-ftm-primary)] text-[var(--color-ftm-primary)] hover:bg-[var(--color-ftm-primary)] hover:text-white rounded-[var(--radius-pill)]",
};

const BRAND_GHOST: Record<Brand, string> = {
  "city-chops":
    "text-[var(--color-chops-primary)] hover:bg-[var(--color-chops-light)] rounded-[var(--radius-btn)]",
  "fresh-tigernut":
    "text-[var(--color-ftm-primary)] hover:bg-[var(--color-ftm-bg)] rounded-[var(--radius-pill)]",
};

const FALLBACK: Record<Variant, string> = {
  primary:   "bg-[var(--color-brand-500)] text-white hover:opacity-90 rounded-[var(--radius-btn)]",
  secondary: "border border-[var(--color-brand-500)] text-[var(--color-brand-500)] hover:bg-[var(--color-brand-500)] hover:text-white rounded-[var(--radius-btn)]",
  ghost:     "text-[var(--color-brand-500)] hover:bg-[var(--color-brand-100)] rounded-[var(--radius-btn)]",
};

function resolveClass(brand: Brand | undefined, variant: Variant): string {
  if (!brand) return FALLBACK[variant];
  if (variant === "primary")   return BRAND_PRIMARY[brand];
  if (variant === "secondary") return BRAND_SECONDARY[brand];
  return BRAND_GHOST[brand];
}

export default function Button({
  brand,
  variant = "primary",
  size = "md",
  as = "button",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const cls = `${BASE} ${SIZE_CLASS[size]} ${resolveClass(brand, variant)} ${className}`;

  if (as === "a" && href) {
    return (
      <a href={href} className={cls} role="button" target={props.target} rel={props.rel}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
