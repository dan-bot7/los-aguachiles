export type MenuCategory = "aguachiles" | "ceviches" | "tostadas" | "tacos" | "cocteles";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceMxn: number;
  category: MenuCategory;
  image: string;
  imageAlt: string;
};

export type Location = {
  id: string;
  city: string;
  address: string;
  hours: string;
  openTime: string;
  closeTime: string;
  mapQuery: string;
};

export type Review = {
  quote: string;
  author: string;
};

// Cambia este número ficticio por el WhatsApp real del restaurante.
export const whatsappNumber = "529841234567";

export const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Menú", href: "#menu" },
  { label: "Pick-up", href: "#pickup" },
  { label: "Sucursales", href: "#sucursales" },
  { label: "Contacto", href: "#contacto" }
] as const;

// Edita aquí nombres, descripciones, precios e imágenes del menú inventado.
export const menuItems: MenuItem[] = [
  {
    id: "aguachile-verde",
    name: "Aguachile verde",
    description: "Camarón fresco, pepino, cebolla morada, cilantro, chile verde y limón.",
    priceMxn: 185,
    category: "aguachiles",
    image: "menu/aguachile-verde.jpg",
    imageAlt: "Aguachile verde con camarón, pepino, limón y tostadas"
  },
  {
    id: "aguachile-rojo",
    name: "Aguachile rojo",
    description: "Camarón marinado con salsa roja, limón, pepino y un toque más picante.",
    priceMxn: 190,
    category: "aguachiles",
    image: "menu/aguachile-rojo.jpg",
    imageAlt: "Aguachile rojo de camarón con salsa de chile y limón"
  },
  {
    id: "ceviche-mixto",
    name: "Ceviche mixto",
    description: "Pescado, camarón, jitomate, cilantro, aguacate y limón fresco.",
    priceMxn: 175,
    category: "ceviches",
    image: "menu/ceviche-mixto.jpg",
    imageAlt: "Ceviche mixto de pescado y camarón con aguacate y tostadas"
  },
  {
    id: "tostada-atun",
    name: "Tostada de atún",
    description: "Atún sellado, aguacate, ajonjolí, salsa cítrica y tostada crujiente.",
    priceMxn: 165,
    category: "tostadas",
    image: "menu/tostada-atun.jpg",
    imageAlt: "Tostada de atún con aguacate, ajonjolí y salsa cítrica"
  },
  {
    id: "tostada-pulpo",
    name: "Tostada de pulpo",
    description: "Pulpo a la plancha, pico de gallo, crema de aguacate, cilantro y limón.",
    priceMxn: 178,
    category: "tostadas",
    image: "menu/tostada-pulpo.jpg",
    imageAlt: "Tostada de pulpo con pico de gallo y crema de aguacate"
  },
  {
    id: "tacos-camaron",
    name: "Tacos de camarón",
    description: "Tortilla suave, camarón crujiente, col fresca y aderezo de la casa.",
    priceMxn: 155,
    category: "tacos",
    image: "menu/tacos-camaron.jpg",
    imageAlt: "Tacos de camarón crujiente con col fresca y salsa"
  },
  {
    id: "coctel-camaron",
    name: "Coctel de camarón",
    description: "Camarón, salsa coctelera, aguacate, cebolla, cilantro y galletas.",
    priceMxn: 170,
    category: "cocteles",
    image: "menu/coctel-camaron.jpg",
    imageAlt: "Coctel de camarón con aguacate, salsa coctelera y tostadas"
  }
];

export const featuredDishes = menuItems;

export const locations: Location[] = [
  {
    id: "playa-del-carmen",
    city: "Playa del Carmen",
    address: "Av. Constituyentes 123, Centro, Playa del Carmen, Q. Roo.",
    hours: "Lun a dom · 12:00 a 22:00",
    openTime: "12:00",
    closeTime: "22:00",
    mapQuery: "Av. Constituyentes 123 Playa del Carmen Quintana Roo"
  },
  {
    id: "cancun",
    city: "Cancún",
    address: "Av. Bonampak 456, Zona Hotelera, Cancún, Q. Roo.",
    hours: "Lun a dom · 12:00 a 23:00",
    openTime: "12:00",
    closeTime: "23:00",
    mapQuery: "Av. Bonampak 456 Cancun Quintana Roo"
  },
  {
    id: "tulum",
    city: "Tulum",
    address: "Carretera Tulum-Boca Paila km 5, Tulum, Q. Roo.",
    hours: "Lun a sáb · 13:00 a 22:00",
    openTime: "13:00",
    closeTime: "22:00",
    mapQuery: "Carretera Tulum Boca Paila km 5 Tulum Quintana Roo"
  }
];

export const reviews: Review[] = [
  {
    quote: "El aguachile más fresco que he probado.",
    author: "Cliente frecuente"
  },
  {
    quote: "Excelente servicio y ambiente.",
    author: "Visitante local"
  },
  {
    quote: "Perfecto para comer mariscos después de la playa.",
    author: "Turista nacional"
  }
];

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMapUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
