"use client";

import {
  CheckCircle2,
  ChevronLeft,
  Clock,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  UserRound
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { buildWhatsAppUrl, locations, menuItems, type MenuCategory } from "@los-aguachiles/shared";
import { assetPath } from "../lib/assets";

type CartState = Record<string, number>;
type PickupStep = "items" | "details";

const categoryLabels: Record<"todos" | MenuCategory, string> = {
  todos: "Todos",
  aguachiles: "Aguachiles",
  ceviches: "Ceviches",
  tostadas: "Tostadas",
  tacos: "Tacos",
  cocteles: "Cocteles"
};

const categories = Object.keys(categoryLabels) as Array<"todos" | MenuCategory>;

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0
});

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parseTodayTime(timeValue: string) {
  const [hours, minutes] = timeValue.split(":").map(Number);
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
}

function roundUpToMinutes(date: Date, intervalMinutes: number) {
  const interval = intervalMinutes * 60 * 1000;
  return new Date(Math.ceil(date.getTime() / interval) * interval);
}

function getTodayLabel() {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date());
}

function getLastPickupLabel(closeTime: string) {
  const close = parseTodayTime(closeTime);
  const lastPickup = new Date(close.getTime() - 30 * 60 * 1000);

  return formatTime(lastPickup);
}

function getPickupSlots(locationId: string) {
  const location = locations.find((item) => item.id === locationId);

  if (!location) {
    return [];
  }

  const now = new Date();
  const opensAt = parseTodayTime(location.openTime);
  const closesAt = parseTodayTime(location.closeTime);
  const lastPickup = new Date(closesAt.getTime() - 30 * 60 * 1000);
  const earliestToday = roundUpToMinutes(new Date(now.getTime() + 30 * 60 * 1000), 30);
  const firstSlot = earliestToday > opensAt ? earliestToday : opensAt;
  const slots: string[] = [];

  for (let slot = new Date(firstSlot); slot <= lastPickup; slot = new Date(slot.getTime() + 30 * 60 * 1000)) {
    slots.push(formatTime(slot));
  }

  return slots;
}

export function PickupOrder() {
  const [step, setStep] = useState<PickupStep>("items");
  const [activeCategory, setActiveCategory] = useState<"todos" | MenuCategory>("todos");
  const [cart, setCart] = useState<CartState>({});
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [locationId, setLocationId] = useState(locations[0]?.id ?? "");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");

  const filteredItems = useMemo(() => {
    if (activeCategory === "todos") {
      return menuItems;
    }

    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const selectedLocation = locations.find((item) => item.id === locationId);
  const pickupSlots = useMemo(() => getPickupSlots(locationId), [locationId]);

  useEffect(() => {
    if (!pickupTime || !pickupSlots.includes(pickupTime)) {
      setPickupTime(pickupSlots[0] ?? "");
    }
  }, [pickupSlots, pickupTime]);

  useEffect(() => {
    if (step === "details") {
      document.getElementById("datos-pedido")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const cartItems = useMemo(
    () =>
      menuItems
        .map((item) => ({
          ...item,
          quantity: cart[item.id] ?? 0,
          lineTotal: (cart[item.id] ?? 0) * item.priceMxn
        }))
        .filter((item) => item.quantity > 0),
    [cart]
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const canContinue = totalItems > 0;
  const canSendOrder = canContinue && customerName.trim() && customerPhone.trim() && selectedLocation && pickupTime;

  function setQuantity(itemId: string, quantity: number) {
    setCart((current) => {
      const next = { ...current };

      if (quantity <= 0) {
        delete next[itemId];
      } else {
        next[itemId] = quantity;
      }

      return next;
    });
  }

  function increment(itemId: string) {
    setQuantity(itemId, (cart[itemId] ?? 0) + 1);
  }

  function decrement(itemId: string) {
    setQuantity(itemId, (cart[itemId] ?? 0) - 1);
  }

  function continueToDetails() {
    if (canContinue) {
      setStep("details");
    }
  }

  function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSendOrder || !selectedLocation) {
      return;
    }

    const orderLines = cartItems.map((item) => `- ${item.quantity} x ${item.name}: ${formatCurrency(item.lineTotal)}`);

    const message = [
      `Hola soy ${customerName.trim()}, quiero hacer este pedido:`,
      "",
      ...orderLines,
      "",
      notes.trim() ? `Comentarios: ${notes.trim()}` : "Comentarios: Sin comentarios",
      `Horario a recoger: ${pickupTime}`,
      `Sucursal: ${selectedLocation.city}`,
      `Teléfono de contacto: ${customerPhone.trim()}`,
      `Total a pagar: ${formatCurrency(subtotal)}`
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
  }

  return (
    <section className="section-shell bg-gradient-to-b from-white via-sea/40 to-white" aria-labelledby="pickup-title">
      <div className="container-shell">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Pick-up de hoy</p>
            <h1 id="pickup-title" className="text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-tight text-navy">
              Haz tu pedido paso a paso
            </h1>
          </div>
          <p className="text-slate-600">
            Primero elige tus platillos. Después captura tus datos en un solo formulario y se abre WhatsApp con el pedido listo para enviar.
          </p>
        </div>

        <div className="mb-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-card sm:grid-cols-2">
          <button
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-black ${
              step === "items" ? "bg-brand-blue text-white" : "bg-sea text-navy"
            }`}
            type="button"
            onClick={() => setStep("items")}
          >
            <span className="grid size-6 place-items-center rounded-full bg-white/20">1</span>
            Elegir platillos
          </button>
          <button
            className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-black ${
              step === "details" ? "bg-brand-blue text-white" : "bg-sea text-navy"
            }`}
            type="button"
            disabled={!canContinue}
            onClick={continueToDetails}
          >
            <span className="grid size-6 place-items-center rounded-full bg-white/20">2</span>
            Datos y WhatsApp
          </button>
        </div>

        {step === "items" ? (
          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
            <div className="min-w-0">
              <div className="mb-5 flex max-w-full gap-2 overflow-x-auto pb-2" aria-label="Categorías del menú">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-extrabold transition ${
                      activeCategory === category
                        ? "border-brand-blue bg-brand-blue text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-brand-blue/40 hover:bg-sea"
                    }`}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                  >
                    {categoryLabels[category]}
                  </button>
                ))}
              </div>

              <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredItems.map((item) => {
                  const quantity = cart[item.id] ?? 0;

                  return (
                    <article className="card min-w-0 overflow-hidden" key={item.id}>
                      <div className="aspect-[4/3] overflow-hidden bg-sea">
                        <img className="h-full w-full object-cover transition duration-300 hover:scale-105" src={assetPath(item.image)} alt={item.imageAlt} loading="lazy" />
                      </div>
                      <div className="grid gap-4 p-5">
                        <div>
                          <p className="mb-2 text-xs font-black uppercase tracking-[0.08em] text-brand-blue-dark">{categoryLabels[item.category]}</p>
                          <h2 className="text-xl font-black text-navy">{item.name}</h2>
                          <p className="mt-2 min-h-20 text-sm text-slate-600">{item.description}</p>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-lg font-black text-aguachile">{formatCurrency(item.priceMxn)}</span>
                          {quantity > 0 ? (
                            <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white">
                              <button className="grid size-10 place-items-center text-navy hover:bg-sea" type="button" data-testid={`decrement-${item.id}`} aria-label={`Quitar ${item.name}`} onClick={() => decrement(item.id)}>
                                <Minus size={16} aria-hidden="true" />
                              </button>
                              <span className="min-w-9 text-center text-sm font-black text-navy">{quantity}</span>
                              <button className="grid size-10 place-items-center text-navy hover:bg-sea" type="button" data-testid={`increment-${item.id}`} aria-label={`Agregar ${item.name}`} onClick={() => increment(item.id)}>
                                <Plus size={16} aria-hidden="true" />
                              </button>
                            </div>
                          ) : (
                            <button className="btn btn-outline px-4" type="button" data-testid={`add-${item.id}`} onClick={() => increment(item.id)}>
                              <Plus size={16} aria-hidden="true" />
                              Agregar
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="card grid min-w-0 gap-5 p-5 lg:sticky lg:top-[calc(var(--header-height)+20px)] lg:self-start" aria-label="Resumen del pedido">
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                totalItems={totalItems}
                decrement={decrement}
                increment={increment}
                remove={(itemId) => setQuantity(itemId, 0)}
              />
              <button className="btn btn-primary w-full text-base" type="button" data-testid="continue-pickup" disabled={!canContinue} onClick={continueToDetails}>
                <CheckCircle2 size={18} aria-hidden="true" />
                Continuar con pedido
              </button>
            </aside>

            <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(9,45,92,0.12)] backdrop-blur lg:hidden">
              <button className="btn btn-primary w-full text-base" type="button" disabled={!canContinue} onClick={continueToDetails}>
                <ShoppingBag size={18} aria-hidden="true" />
                Continuar · {totalItems} items · {formatCurrency(subtotal)}
              </button>
            </div>
          </div>
        ) : (
          <form className="mx-auto max-w-3xl" id="datos-pedido" onSubmit={submitOrder}>
            <div className="card grid gap-6 p-5 md:p-7">
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="eyebrow mb-2">Datos del pedido</p>
                  <h2 className="text-3xl font-black text-navy">Enviar por WhatsApp</h2>
                  <p className="mt-2 text-sm font-bold text-slate-500">Pedido solo para hoy: {getTodayLabel()}.</p>
                </div>
                <button className="btn btn-secondary" type="button" onClick={() => setStep("items")}>
                  <ChevronLeft size={17} aria-hidden="true" />
                  Volver al menú
                </button>
              </div>

              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                totalItems={totalItems}
                decrement={decrement}
                increment={increment}
                remove={(itemId) => setQuantity(itemId, 0)}
              />

              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-extrabold text-navy">
                  <span className="inline-flex items-center gap-2">
                    <UserRound size={16} aria-hidden="true" />
                    Nombre
                  </span>
                  <input className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15" data-testid="pickup-name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Tu nombre" required />
                </label>

                <label className="grid gap-2 text-sm font-extrabold text-navy">
                  <span className="inline-flex items-center gap-2">
                    <Phone size={16} aria-hidden="true" />
                    Teléfono de contacto
                  </span>
                  <input className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15" data-testid="pickup-phone" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="984 123 4567" type="tel" required />
                </label>

                <label className="grid gap-2 text-sm font-extrabold text-navy">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} aria-hidden="true" />
                    Sucursal
                  </span>
                  <select className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15" data-testid="pickup-location" value={locationId} onChange={(event) => setLocationId(event.target.value)} required>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.city} · {location.hours}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-extrabold text-navy">
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} aria-hidden="true" />
                    Horario para recoger hoy
                  </span>
                  <select className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15" data-testid="pickup-time" value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} required disabled={pickupSlots.length === 0}>
                    {pickupSlots.length > 0 ? (
                      pickupSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))
                    ) : (
                      <option value="">Sin horarios disponibles hoy</option>
                    )}
                  </select>
                </label>

                {selectedLocation ? (
                  <p className="rounded-lg bg-sea px-3 py-2 text-xs font-bold text-slate-600">
                    {selectedLocation.city}: hoy puedes recoger hasta las {getLastPickupLabel(selectedLocation.closeTime)}. Cierre {selectedLocation.closeTime}.
                  </p>
                ) : null}

                <label className="grid gap-2 text-sm font-extrabold text-navy">
                  Comentarios del pedido
                  <textarea className="min-h-24 rounded-lg border border-slate-200 bg-white p-3 font-normal outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15" data-testid="pickup-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Ej. tostada sin cebolla, aguachile con extra limón..." />
                </label>
              </div>

              <button className="btn btn-primary w-full text-base" type="submit" data-testid="submit-pickup" disabled={!canSendOrder}>
                <MessageCircle size={18} aria-hidden="true" />
                Mandar pedido por WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

type OrderSummaryProps = {
  cartItems: Array<{
    id: string;
    name: string;
    priceMxn: number;
    quantity: number;
    lineTotal: number;
  }>;
  subtotal: number;
  totalItems: number;
  decrement: (itemId: string) => void;
  increment: (itemId: string) => void;
  remove: (itemId: string) => void;
};

function OrderSummary({ cartItems, subtotal, totalItems, decrement, increment, remove }: OrderSummaryProps) {
  return (
    <div className="grid gap-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Tu pedido</p>
          <h3 className="text-2xl font-black text-navy">Pick-up</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-aguachile px-3 py-1 text-sm font-black text-white" data-testid="cart-count">
          <ShoppingBag size={16} aria-hidden="true" />
          {totalItems}
        </span>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid gap-3">
          {cartItems.map((item) => (
            <div className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3" key={item.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-navy">{item.name}</p>
                  <p className="text-sm text-slate-500">
                    {item.quantity} x {formatCurrency(item.priceMxn)}
                  </p>
                </div>
                <p className="font-black text-navy">{formatCurrency(item.lineTotal)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white">
                  <button className="grid size-9 place-items-center text-navy hover:bg-sea" type="button" aria-label={`Quitar ${item.name}`} onClick={() => decrement(item.id)}>
                    <Minus size={15} aria-hidden="true" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-black text-navy">{item.quantity}</span>
                  <button className="grid size-9 place-items-center text-navy hover:bg-sea" type="button" aria-label={`Agregar ${item.name}`} onClick={() => increment(item.id)}>
                    <Plus size={15} aria-hidden="true" />
                  </button>
                </div>
                <button className="grid size-9 place-items-center rounded-lg text-aguachile hover:bg-aguachile/10" type="button" aria-label={`Eliminar ${item.name}`} onClick={() => remove(item.id)}>
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-brand-blue/30 bg-sea/60 p-5 text-sm font-bold text-slate-600">
          Selecciona uno o más platillos del menú para preparar tu pedido de pick-up.
        </div>
      )}

      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between text-lg font-black text-navy">
          <span>Total a pagar</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs font-bold text-slate-500">Precio de ejemplo. La sucursal confirma disponibilidad por WhatsApp.</p>
      </div>
    </div>
  );
}
