import { ArrowRight, Clock, Fish, Flame, MapPin, Sparkles, Timer, Utensils } from "lucide-react";
import { buildMapUrl, featuredDishes, locations, reviews } from "@los-aguachiles/shared";
import { DishShowcase } from "../components/DishShowcase";
import { Header } from "../components/Header";
import { ReservationForm } from "../components/ReservationForm";
import { SiteFooter } from "../components/SiteFooter";
import { WhatsAppButton } from "../components/WhatsAppButton";

const promoMessage = "Hola, quiero preguntar disponibilidad de la promoción 2x1 en aguachiles seleccionados.";

const benefits = [
  {
    title: "Ingredientes frescos",
    description: "Mariscos, cítricos y vegetales seleccionados para lograr platillos ligeros y llenos de sabor.",
    icon: Fish
  },
  {
    title: "Sabor auténtico",
    description: "Recetas inspiradas en el Caribe mexicano, con el punto exacto de picante y acidez.",
    icon: Flame
  },
  {
    title: "Atención rápida",
    description: "Botones directos para reservar, pedir y llegar sin fricción desde cualquier celular.",
    icon: Timer
  }
];

const dishThumbClass = {
  green: "dish-thumb",
  red: "dish-thumb dish-thumb-red",
  ceviche: "dish-thumb dish-thumb-ceviche",
  tacos: "dish-thumb dish-thumb-tacos",
  tuna: "dish-thumb dish-thumb-tuna",
  cocktail: "dish-thumb dish-thumb-cocktail"
} as const;

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-bg relative min-h-[88svh] overflow-hidden pb-16 pt-[calc(var(--header-height)+46px)]" id="inicio">
          <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <p className="eyebrow">Mariscos frescos en el Caribe</p>
              <h1 className="mb-5 text-[clamp(2.5rem,6vw,4.8rem)] font-black leading-[1.02] text-navy">
                Mariscos frescos, aguachiles y sabor del Caribe
              </h1>
              <p className="mb-8 max-w-xl text-lg text-slate-500 md:text-xl">
                Disfruta aguachiles, ceviches, tacos de mariscos y cocteles en un ambiente fresco y casual.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a className="btn btn-primary" href="#menu">
                  <Utensils size={18} aria-hidden="true" />
                  Ver menú
                </a>
                <a className="btn btn-secondary" href="#sucursales">
                  <MapPin size={18} aria-hidden="true" />
                  Cómo llegar
                </a>
              </div>
            </div>

            <DishShowcase />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-2.5 bg-gradient-to-r from-aguachile via-lime to-coral" />
        </section>

        <section className="section-shell bg-white" aria-labelledby="benefits-title">
          <div className="container-shell">
            <div className="mb-8 max-w-2xl">
              <p className="eyebrow">Por qué visitarnos</p>
              <h2 id="benefits-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
                Una experiencia fresca, rápida y confiable
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <article className="card p-6" key={benefit.title}>
                    <span className="mb-5 inline-grid size-11 place-items-center rounded-full bg-sea font-black text-aguachile-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="mb-4 text-coral" size={24} aria-hidden="true" />
                    <h3 className="mb-2 text-xl font-black text-navy">{benefit.title}</h3>
                    <p className="text-slate-500">{benefit.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-shell bg-gradient-to-b from-shell to-white" id="menu" aria-labelledby="menu-title">
          <div className="container-shell">
            <div className="mb-9 max-w-2xl">
              <p className="eyebrow">Menú destacado</p>
              <h2 id="menu-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
                Favoritos para abrir el apetito
              </h2>
              <p className="text-slate-500">Precios de ejemplo para esta maqueta. Puedes cambiarlos en `packages/shared/index.ts`.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredDishes.map((dish) => (
                <article className="card overflow-hidden" key={dish.id}>
                  <div className={dishThumbClass[dish.accent]} />
                  <div className="grid gap-4 p-5">
                    <h3 className="text-xl font-black text-navy">{dish.name}</h3>
                    <p className="min-h-20 text-slate-500">{dish.description}</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="shrink-0 text-lg font-black text-navy">{dish.price}</span>
                      <WhatsAppButton
                        className="btn btn-outline w-full sm:w-auto"
                        message={[
                          "Hola, quiero pedir información para ordenar en Los Aguachiles.",
                          `Platillo: ${dish.name}`,
                          `Precio de referencia: ${dish.price}`,
                          "¿Me pueden confirmar disponibilidad y tiempo estimado?"
                        ].join("\n")}
                        size={16}
                      >
                        Pedir por WhatsApp
                      </WhatsAppButton>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14" aria-labelledby="promo-title">
          <div className="container-shell flex flex-col gap-6 rounded-lg bg-gradient-to-br from-aguachile to-navy p-7 text-white shadow-soft md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.08em] text-lime">Promoción de la semana</p>
              <h2 id="promo-title" className="max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-black leading-tight">
                2x1 en aguachiles seleccionados de lunes a jueves
              </h2>
            </div>
            <WhatsAppButton className="btn bg-white text-navy shadow-lg hover:bg-sea" message={promoMessage}>
              Preguntar disponibilidad
            </WhatsAppButton>
          </div>
        </section>

        <section className="section-shell bg-white" id="sucursales" aria-labelledby="locations-title">
          <div className="container-shell">
            <div className="mb-9 max-w-2xl">
              <p className="eyebrow">Sucursales</p>
              <h2 id="locations-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
                Elige tu punto más cercano
              </h2>
              <p className="text-slate-500">Direcciones de ejemplo para mostrar el flujo de ubicación en la propuesta.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {locations.map((location) => (
                <article className="card grid gap-4 p-6" key={location.id}>
                  <h3 className="text-xl font-black text-navy">{location.city}</h3>
                  <p className="text-slate-500">{location.address}</p>
                  <span className="inline-flex items-center gap-2 font-extrabold text-aguachile-dark">
                    <Clock size={17} aria-hidden="true" />
                    {location.hours}
                  </span>
                  <a className="btn btn-outline" href={buildMapUrl(location.mapQuery)} target="_blank" rel="noreferrer">
                    <MapPin size={17} aria-hidden="true" />
                    Cómo llegar
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell bg-gradient-to-b from-shell to-white" id="reservas" aria-labelledby="reservations-title">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1fr]">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+30px)] lg:self-start">
              <p className="eyebrow">Reservas</p>
              <h2 id="reservations-title" className="mb-4 text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
                Reserva tu mesa o pide información en segundos
              </h2>
              <p className="max-w-xl text-slate-500">
                Este formulario genera un mensaje listo para enviar por WhatsApp. Cambia el número en `packages/shared/index.ts` cuando tengas el contacto final.
              </p>
            </div>

            <ReservationForm />
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
                  <Sparkles className="mb-5 text-coral" size={24} aria-hidden="true" />
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
              <h2 className="text-3xl font-black text-navy">Botones directos para reservas, menú y ubicación.</h2>
            </div>
            <a className="btn btn-primary" href="#reservas">
              Ir a reservas
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
