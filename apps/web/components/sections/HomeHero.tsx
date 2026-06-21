import { ShoppingBag, Utensils } from "lucide-react";
import Link from "next/link";
import { DishShowcase } from "../DishShowcase";

export function HomeHero() {
  return (
    <section className="hero-bg relative min-h-[88svh] overflow-hidden pb-16 pt-[calc(var(--header-height)+46px)]">
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
            <Link className="btn btn-primary" href="/pickup">
              <ShoppingBag size={18} aria-hidden="true" />
              Armar pedido
            </Link>
            <Link className="btn btn-secondary" href="/menu">
              <Utensils size={18} aria-hidden="true" />
              Ver menú
            </Link>
          </div>
        </div>

        <DishShowcase />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-2.5 bg-gradient-to-r from-brand-blue via-white to-aguachile" />
    </section>
  );
}
