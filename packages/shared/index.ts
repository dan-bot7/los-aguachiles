export type Dish = {
  id: string;
  name: string;
  description: string;
  price: string;
  accent: "green" | "red" | "ceviche" | "tacos" | "tuna" | "cocktail";
};

export type Location = {
  id: string;
  city: string;
  address: string;
  hours: string;
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
  { label: "Sucursales", href: "#sucursales" },
  { label: "Reservas", href: "#reservas" },
  { label: "Contacto", href: "#contacto" }
] as const;

// Edita aquí nombres, descripciones y precios del menú.
export const featuredDishes: Dish[] = [
  {
    id: "aguachile-verde",
    name: "Aguachile verde",
    description: "Camarón fresco, pepino, cebolla morada, chile verde y limón.",
    price: "$185 MXN",
    accent: "green"
  },
  {
    id: "aguachile-rojo",
    name: "Aguachile rojo",
    description: "Camarón marinado con salsa roja, limón, pepino y toque picante.",
    price: "$190 MXN",
    accent: "red"
  },
  {
    id: "ceviche-mixto",
    name: "Ceviche mixto",
    description: "Pescado, camarón, jitomate, cilantro, aguacate y limón fresco.",
    price: "$175 MXN",
    accent: "ceviche"
  },
  {
    id: "tacos-camaron",
    name: "Tacos de camarón",
    description: "Tortilla suave, camarón crujiente, col fresca y aderezo de la casa.",
    price: "$155 MXN",
    accent: "tacos"
  },
  {
    id: "tostada-atun",
    name: "Tostada de atún",
    description: "Atún sellado, aguacate, ajonjolí, salsa cítrica y tostada crujiente.",
    price: "$165 MXN",
    accent: "tuna"
  },
  {
    id: "coctel-camaron",
    name: "Coctel de camarón",
    description: "Camarón, salsa coctelera, aguacate, cebolla, cilantro y galletas.",
    price: "$170 MXN",
    accent: "cocktail"
  }
];

export const locations: Location[] = [
  {
    id: "playa-del-carmen",
    city: "Playa del Carmen",
    address: "Av. Constituyentes 123, Centro, Playa del Carmen, Q. Roo.",
    hours: "Lun a dom · 12:00 a 22:00",
    mapQuery: "Av. Constituyentes 123 Playa del Carmen Quintana Roo"
  },
  {
    id: "cancun",
    city: "Cancún",
    address: "Av. Bonampak 456, Zona Hotelera, Cancún, Q. Roo.",
    hours: "Lun a dom · 12:00 a 23:00",
    mapQuery: "Av. Bonampak 456 Cancun Quintana Roo"
  },
  {
    id: "tulum",
    city: "Tulum",
    address: "Carretera Tulum-Boca Paila km 5, Tulum, Q. Roo.",
    hours: "Lun a sáb · 13:00 a 22:00",
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
