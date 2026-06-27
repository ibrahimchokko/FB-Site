export type Brand = "city-chops" | "fresh-tigernut";

export type MenuCategory =
  // City Chops
  | "waina"
  | "catering"
  | "cakes"
  | "puff-puff"
  | "samosa"
  | "peppery-meat"
  // Fresh Tigernut Mill
  | "kunun-aya"
  | "kunun-zaki"
  | "yogo-fura"
  | "tigernut-mix"
  | "smoothies";

export interface MenuItem {
  id: string;
  brand: Brand;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;          // naira
  image: string;          // path under /public/images/
  featured?: boolean;
  available?: boolean;    // defaults true; set false for seasonal items
}

export interface BrandConfig {
  id: Brand;
  name: string;
  tagline: string;
  whatsapp: string;       // 234XXXXXXXXXX — no +
  href: string;
}

export interface OperationalStatus {
  isOpen: boolean;
  message: string;
}
