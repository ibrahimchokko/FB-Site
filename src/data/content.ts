import type { BrandConfig, BusinessHours, MenuItem, Testimonial } from "@/types/business";

export const BRANDS: BrandConfig[] = [
  {
    id: "city-chops",
    name: "City Chops",
    tagline: "Freshly made, perfectly seasoned — Kaduna's favourite bites.",
    whatsapp: "2348012345678",
    href: "/city-chops",
  },
  {
    id: "fresh-tigernut",
    name: "Fresh Tigernut Mill",
    tagline: "Nature's sweetness, pressed daily for you.",
    whatsapp: "2348012345678",
    href: "/tigernut-mill",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // ── City Chops ──────────────────────────────────────────────────────
  {
    id: "cc-waina-001",
    brand: "city-chops",
    category: "waina",
    name: "Waina",
    description: "Soft, steamed rice cakes served with spiced pepper sauce — a Kaduna morning staple.",
    price: 500,
    image: "/images/cc-waina.jpg",
    featured: true,
  },
  {
    id: "cc-puffpuff-001",
    brand: "city-chops",
    category: "puff-puff",
    name: "Puff Puff",
    description: "Golden, fluffy deep-fried dough — lightly sweetened and perfectly airy.",
    price: 300,
    image: "/images/cc-puffpuff.jpg",
    featured: true,
  },
  {
    id: "cc-samosa-001",
    brand: "city-chops",
    category: "samosa",
    name: "Samosa",
    description: "Crispy pastry parcels filled with well-seasoned minced meat and vegetables.",
    price: 400,
    image: "/images/cc-samosa.jpg",
    featured: true,
  },
  {
    id: "cc-meat-001",
    brand: "city-chops",
    category: "peppery-meat",
    name: "Peppery Meat",
    description: "Slow-cooked, deeply marinated beef chunks with a bold Northern pepper blend.",
    price: 1500,
    image: "/images/cc-peppery-meat.jpg",
    featured: true,
  },
  {
    id: "cc-cakes-001",
    brand: "city-chops",
    category: "cakes",
    name: "Celebration Cake",
    description: "Layered sponge cake decorated to order — birthdays, engagements, and namings.",
    price: 8000,
    image: "/images/cc-cake.jpg",
  },
  {
    id: "cc-catering-001",
    brand: "city-chops",
    category: "catering",
    name: "Small Event Package",
    description: "Full catering service for up to 30 guests — setup, serving, and clean-up included.",
    price: 45000,
    image: "/images/cc-catering-small.jpg",
  },
  {
    id: "cc-catering-002",
    brand: "city-chops",
    category: "catering",
    name: "Medium Event Package",
    description: "Full service for up to 80 guests with a choice of 3 main dishes.",
    price: 100000,
    image: "/images/cc-catering-medium.jpg",
  },

  // ── Fresh Tigernut Mill ──────────────────────────────────────────────
  {
    id: "ftm-kuaya-001",
    brand: "fresh-tigernut",
    category: "kunun-aya",
    name: "Kunun Aya",
    description: "Creamy tigernut drink pressed fresh daily — naturally sweet with a hint of ginger.",
    price: 600,
    image: "/images/ftm-kunun-aya.jpg",
    featured: true,
  },
  {
    id: "ftm-kuzaki-001",
    brand: "fresh-tigernut",
    category: "kunun-zaki",
    name: "Kunun Zaki",
    description: "Fermented grain drink, slightly tangy and refreshing — a Northern classic.",
    price: 400,
    image: "/images/ftm-kunun-zaki.jpg",
    featured: true,
  },
  {
    id: "ftm-fura-001",
    brand: "fresh-tigernut",
    category: "yogo-fura",
    name: "Yogo Fura",
    description: "Thick, chilled fura blended with yoghurt — protein-rich and filling.",
    price: 700,
    image: "/images/ftm-yogo-fura.jpg",
    featured: true,
  },
  {
    id: "ftm-mix-001",
    brand: "fresh-tigernut",
    category: "tigernut-mix",
    name: "Tigernut Mix",
    description: "A blend of tigernut, dates, and coconut milk — wellness in a cup.",
    price: 800,
    image: "/images/ftm-tigernut-mix.jpg",
    featured: true,
  },
  {
    id: "ftm-smoothie-001",
    brand: "fresh-tigernut",
    category: "smoothies",
    name: "Tigernut Smoothie",
    description: "Tigernut base blended with seasonal tropical fruits — thick and naturally energising.",
    price: 900,
    image: "/images/ftm-smoothie.jpg",
  },
];

export const FEATURED_ITEMS = MENU_ITEMS.filter((i) => i.featured);

export const BUSINESS_HOURS: BusinessHours = {
  openHour: 7,
  closeHour: 20,
  operatingDays: [1, 2, 3, 4, 5, 6], // Mon–Sat
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-001",
    brand: "city-chops",
    author: "Fatima A.",
    location: "Kaduna North",
    body: "The Waina here is better than anywhere I've tried in Kaduna. Soft, fresh, and that pepper sauce — incredible.",
    rating: 5,
    date: "2025-03-12",
  },
  {
    id: "t-002",
    brand: "city-chops",
    author: "Emeka O.",
    location: "Kaduna South",
    body: "We hired City Chops for our naming ceremony. 60 guests, everything was hot and perfectly seasoned. Highly recommend.",
    rating: 5,
    date: "2025-05-04",
  },
  {
    id: "t-003",
    brand: "fresh-tigernut",
    author: "Halima M.",
    location: "Ungwan Romi",
    body: "Kunun Aya every morning is now my routine. You can taste that it's pressed fresh — no artificial taste at all.",
    rating: 5,
    date: "2025-04-18",
  },
  {
    id: "t-004",
    brand: "fresh-tigernut",
    author: "Bashir K.",
    location: "Barnawa",
    body: "The Tigernut Mix with dates is something else. My whole family switched from fizzy drinks to this.",
    rating: 5,
    date: "2025-06-01",
  },
];
