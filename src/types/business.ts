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

export interface BusinessHours {
  /** 24-h open time, e.g. 7 = 07:00 */
  openHour: number;
  /** 24-h close time, e.g. 20 = 20:00 */
  closeHour: number;
  /** 0 = Sunday … 6 = Saturday */
  operatingDays: number[];
}

export interface Testimonial {
  id: string;
  brand: Brand;
  author: string;
  location: string;       // e.g. "Kaduna North"
  body: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;           // ISO date string
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
