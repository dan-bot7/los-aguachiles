import { ArrowRight, Clock, Fish, Flame, MapPin, ShoppingBag, Sparkles, Timer, Utensils } from "lucide-react";
import { buildMapUrl, locations, menuItems, reviews } from "@los-aguachiles/shared";
import { DishShowcase } from "../components/DishShowcase";
import { Header } from "../components/Header";
import { PickupOrder } from "../components/PickupOrder";
import { SiteFooter } from "../components/SiteFooter";

const benefits = [
  {
    title: "Ingredientes frescos",
    description: "Mariscos, cítricos y vegetales seleccionados para platillos frescos y llenos de sabor.",
    icon: Fish
  },
  {
    title: "Menú para pick-up",
    description: "El cliente arma su pedido, elige sucursal y agenda la hora en la que pasa a recoger.",
    icon: ShoppingBag
  },
  {
    title: "Confirmación rápida",
    description: "El pedido completo se envía por WhatsApp con datos de contacto, horario y total estimado.",
    icon: Timer
  }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}

function lastPickupLabel(closeTime: string) {
  const [hours, minutes] = closeTime.split(":").map(Number);
  const close = new Date(2026, 0, 1, hours, minutes);
  const lastPickup = new Date(close.getTime() - 30 * 60 * 1000);

  return `${String(lastPickup.getHours()).padStart(2, "0")}:${String(lastPickup.getMinutes()).padStart(2, "0")}`;
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-bg relative min-h-[88svh] overflow-hidden pb-16 pt-[calc(var(--header-height)+46px)]" id="inicio">
          <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <p className="eyebrow">Caguamería · Marisquería</p>
              <h1 className="mb-5 text-[clamp(2.5rem,6vw,4.8rem)] font-black leading-[1.02] text-navy">
                Aguachiles, tostadas y ceviches listos para pick-up
              </h1>
              <p className="mb-8 max-w-xl text-lg text-slate-600 md:text-xl">
                Un menú fresco con fotos reales generadas para demo, pedidos claros y confirmación directa por WhatsApp.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a className="btn btn-primary" href="#pickup">
                  <ShoppingBag size={18} aria-hidden="true" />
                  Armar pedido
                </a>
                <a className="btn btn-secondary" href="#menu">
                  <Utensils size={18} aria-hidden="true" />
                  Ver menú
                </a>
              </div>
            </div>

            <DishShowcase />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-2.5 bg-gradient-to-r from-brand-blue via-white to-aguachile" />
        </section>

        <section className="section-shell bg-white" aria-labelledby="benefits-title">
          <div className="container-shell">
            <div className="mb-8 max-w-2xl">
              <p className="eyebrow">Experiencia de compra</p>
              <h2 id="benefits-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
                Más antojo, menos fricción
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <article className="card p-6" key={benefit.title}>
                    <span className="mb-5 inline-grid size-11 place-items-center rounded-full bg-sea font-black text-brand-blue-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="mb-4 text-aguachile" size={24} aria-hidden="true" />
                    <h3 className="mb-2 text-xl font-black text-navy">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-shell bg-gradient-to-b from-shell to-white" id="menu" aria-labelledby="menu-title">
          <div className="container-shell">
            <div className="mb-9 grid gap-5 lg:grid-cols-[0.9fr_1fr] lg:items-end">
              <div>
                <p className="eyebrow">Menú inventado</p>
                <h2 id="menu-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
                  Fotos reales para vender el antojo
                </h2>
              </div>
              <p className="text-slate-600">
                Platillos ejemplo para mostrar cómo se vería un menú digital de aguachiles, ceviches, tostadas, tacos y cocteles.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {menuItems.map((item) => (
                <article className="card overflow-hidden" key={item.id}>
                  <div className="aspect-[4/3] overflow-hidden bg-sea">
                    <img className="h-full w-full object-cover transition duration-300 hover:scale-105" src={item.image} alt={item.imageAlt} loading="lazy" />
                  </div>
                  <div className="grid gap-4 p-5">
                    <div>
                      <p className="mb-2 text-xs font-black uppercase tracking-[0.08em] text-brand-blue-dark">{item.category}</p>
                      <h3 className="text-xl font-black text-navy">{item.name}</h3>
                      <p className="mt-2 min-h-20 text-sm text-slate-600">{item.description}</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-lg font-black text-aguachile">{formatCurrency(item.priceMxn)}</span>
                      <a className="btn btn-outline" href="#pickup">
                        Agregar en pick-up
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14" aria-labelledby="promo-title">
          <div className="container-shell flex flex-col gap-6 rounded-lg bg-gradient-to-br from-brand-blue to-aguachile p-7 text-white shadow-soft md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.08em] text-white/80">Pick-up sin vueltas</p>
              <h2 id="promo-title" className="max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-black leading-tight">
                Elige tus platillos y agenda la hora para pasar por ellos
              </h2>
            </div>
            <a className="btn bg-white text-navy shadow-lg hover:bg-sea" href="#pickup">
              Empezar pedido
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>

        <PickupOrder />

        <section className="section-shell bg-white" id="sucursales" aria-labelledby="locations-title">
          <div className="container-shell">
            <div className="mb-9 max-w-2xl">
              <p className="eyebrow">Sucursales</p>
              <h2 id="locations-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
                Escoge dónde recoger tu pedido
              </h2>
              <p className="text-slate-600">Horarios de ejemplo para controlar que el pick-up sea siempre antes del cierre.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {locations.map((location) => (
                <article className="card grid gap-4 p-6" key={location.id}>
                  <h3 className="text-xl font-black text-navy">{location.city}</h3>
                  <p className="text-slate-600">{location.address}</p>
                  <span className="inline-flex items-center gap-2 font-extrabold text-brand-blue-dark">
                    <Clock size={17} aria-hidden="true" />
                    {location.hours}
                  </span>
                  <p className="rounded-lg bg-sea px-3 py-2 text-sm font-bold text-slate-600">
                    Último pick-up: {lastPickupLabel(location.closeTime)}
                  </p>
                  <a className="btn btn-outline" href={buildMapUrl(location.mapQuery)} target="_blank" rel="noreferrer">
                    <MapPin size={17} aria-hidden="true" />
                    Cómo llegar
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell bg-white" aria-labelledby="reviews-title">
          <div className="container-shell">
            <div className="mb-8 max-w-2xl">
              <p className="eyebrow">Reseñas</p>
              <h2 id="reviews-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
                Comentarios que inspiran confianza
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {reviews.map((review) => (
                <blockquote className="card p-6" key={review.quote}>
                  <Sparkles className="mb-5 text-aguachile" size={24} aria-hidden="true" />
                  <p className="mb-4 text-lg font-black text-navy">“{review.quote}”</p>
                  <cite className="not-italic font-bold text-slate-500">{review.author}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-sea/70 py-12">
          <div className="container-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">Listo para convertir visitas</p>
              <h2 className="text-3xl font-black text-navy">Menú visual, carrito pick-up y WhatsApp con pedido completo.</h2>
            </div>
            <a className="btn btn-primary" href="#pickup">
              Armar pedido
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
