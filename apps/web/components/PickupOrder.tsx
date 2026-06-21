"use client";

import { Clock, MapPin, MessageCircle, Minus, Phone, Plus, ShoppingBag, Trash2, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { buildWhatsAppUrl, locations, menuItems, type MenuCategory } from "@los-aguachiles/shared";

type CartState = Record<string, number>;

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

function toDateInput(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDateTime(dateValue: string, timeValue: string) {
  const [hours, minutes] = timeValue.split(":").map(Number);
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function roundUpToMinutes(date: Date, intervalMinutes: number) {
  const interval = intervalMinutes * 60 * 1000;
  return new Date(Math.ceil(date.getTime() / interval) * interval);
}

function formatDateForMessage(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function getLastPickupLabel(closeTime: string) {
  const [hours, minutes] = closeTime.split(":").map(Number);
  const close = new Date(2026, 0, 1, hours, minutes);
  const lastPickup = new Date(close.getTime() - 30 * 60 * 1000);

  return formatTime(lastPickup);
}

function getPickupSlots(locationId: string, dateValue: string) {
  const location = locations.find((item) => item.id === locationId);

  if (!location || !dateValue) {
    return [];
  }

  const now = new Date();
  const today = toDateInput(now);

  if (dateValue < today) {
    return [];
  }

  const opensAt = parseDateTime(dateValue, location.openTime);
  const closesAt = parseDateTime(dateValue, location.closeTime);
  const lastPickup = new Date(closesAt.getTime() - 30 * 60 * 1000);
  const earliestToday = roundUpToMinutes(new Date(now.getTime() + 30 * 60 * 1000), 30);
  const firstSlot = dateValue === today && earliestToday > opensAt ? earliestToday : opensAt;

  const slots: string[] = [];

  for (let slot = new Date(firstSlot); slot <= lastPickup; slot = new Date(slot.getTime() + 30 * 60 * 1000)) {
    slots.push(formatTime(slot));
  }

  return slots;
}

export function PickupOrder() {
  const [activeCategory, setActiveCategory] = useState<"todos" | MenuCategory>("todos");
  const [cart, setCart] = useState<CartState>({});
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [locationId, setLocationId] = useState(locations[0]?.id ?? "");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [todayInput, setTodayInput] = useState("");

  useEffect(() => {
    const today = toDateInput(new Date());
    setTodayInput(today);
    setPickupDate(today);
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "todos") {
      return menuItems;
    }

    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const selectedLocation = locations.find((item) => item.id === locationId);
  const pickupSlots = useMemo(() => getPickupSlots(locationId, pickupDate), [locationId, pickupDate]);

  useEffect(() => {
    if (!pickupTime || !pickupSlots.includes(pickupTime)) {
      setPickupTime(pickupSlots[0] ?? "");
    }
  }, [pickupSlots, pickupTime]);

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
  const canSendOrder = totalItems > 0 && customerName.trim() && customerPhone.trim() && selectedLocation && pickupDate && pickupTime;

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

  function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSendOrder || !selectedLocation) {
      return;
    }

    const orderLines = cartItems.map(
      (item) => `- ${item.quantity} x ${item.name} (${formatCurrency(item.priceMxn)} c/u): ${formatCurrency(item.lineTotal)}`
    );

    const message = [
      "Hola, quiero hacer un pedido para pick-up en Los Aguachiles.",
      "",
      `Nombre: ${customerName.trim()}`,
      `Teléfono de contacto: ${customerPhone.trim()}`,
      `Sucursal: ${selectedLocation.city}`,
      `Fecha de recolección: ${formatDateForMessage(pickupDate)}`,
      `Hora de recolección: ${pickupTime}`,
      "",
      "Pedido:",
      ...orderLines,
      "",
      `Total estimado: ${formatCurrency(subtotal)}`,
      notes.trim() ? `Notas: ${notes.trim()}` : "Notas: Sin notas adicionales",
      "",
      "¿Me pueden confirmar disponibilidad y tiempo de preparación?"
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
  }

  return (
    <section className="section-shell bg-gradient-to-b from-white via-sea/40 to-white" id="pickup" aria-labelledby="pickup-title">
      <div className="container-shell">
        <div className="mb-9 grid gap-5 lg:grid-cols-[0.9fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Menú y pick-up</p>
            <h2 id="pickup-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
              Arma tu pedido y envíalo por WhatsApp
            </h2>
          </div>
          <p className="text-slate-600">
            El cliente selecciona platillos, elige sucursal, deja nombre y teléfono, y escoge un horario disponible. El último horario siempre es 30 minutos antes del cierre de la sucursal.
          </p>
        </div>

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
                      <img className="h-full w-full object-cover transition duration-300 hover:scale-105" src={item.image} alt={item.imageAlt} loading="lazy" />
                    </div>
                    <div className="grid gap-4 p-5">
                      <div>
                        <p className="mb-2 text-xs font-black uppercase tracking-[0.08em] text-brand-blue-dark">{categoryLabels[item.category]}</p>
                        <h3 className="text-xl font-black text-navy">{item.name}</h3>
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

          <form className="card grid min-w-0 gap-5 overflow-auto p-5 lg:sticky lg:top-[calc(var(--header-height)+20px)] lg:max-h-[calc(100svh-var(--header-height)-40px)] lg:self-start" onSubmit={submitOrder}>
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
                      <button className="grid size-9 place-items-center rounded-lg text-aguachile hover:bg-aguachile/10" type="button" aria-label={`Eliminar ${item.name}`} onClick={() => setQuantity(item.id, 0)}>
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
                <span>Total estimado</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-slate-500">Precio de ejemplo. La sucursal confirma disponibilidad por WhatsApp.</p>
            </div>

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

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-extrabold text-navy">
                  Fecha
                  <input className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15" data-testid="pickup-date" value={pickupDate} min={todayInput} onChange={(event) => setPickupDate(event.target.value)} type="date" required />
                </label>

                <label className="grid gap-2 text-sm font-extrabold text-navy">
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} aria-hidden="true" />
                    Hora
                  </span>
                  <select className="min-h-11 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15" data-testid="pickup-time" value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} required disabled={pickupSlots.length === 0}>
                    {pickupSlots.length > 0 ? (
                      pickupSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))
                    ) : (
                      <option value="">Sin horarios disponibles</option>
                    )}
                  </select>
                </label>
              </div>

              {selectedLocation ? (
                <p className="rounded-lg bg-sea px-3 py-2 text-xs font-bold text-slate-600">
                  {selectedLocation.city}: último pick-up {getLastPickupLabel(selectedLocation.closeTime)} · cierre {selectedLocation.closeTime}.
                </p>
              ) : null}

              <label className="grid gap-2 text-sm font-extrabold text-navy">
                Notas opcionales
                <textarea className="min-h-20 rounded-lg border border-slate-200 bg-white p-3 font-normal outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/15" data-testid="pickup-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Ej. sin cebolla, extra limón..." />
              </label>
            </div>

            <button className="btn btn-primary w-full" type="submit" data-testid="submit-pickup" disabled={!canSendOrder}>
              <MessageCircle size={18} aria-hidden="true" />
              Enviar pedido por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
