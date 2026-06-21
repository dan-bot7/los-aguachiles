import Link from "next/link";
import { menuItems } from "@los-aguachiles/shared";
import { assetPath } from "../../lib/assets";
import { formatCurrency } from "../../lib/format";

export function MenuSection() {
  return (
    <section className="section-shell bg-gradient-to-b from-shell to-white" aria-labelledby="menu-title">
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
                <img className="h-full w-full object-cover transition duration-300 hover:scale-105" src={assetPath(item.image)} alt={item.imageAlt} loading="lazy" />
              </div>
              <div className="grid gap-4 p-5">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.08em] text-brand-blue-dark">{item.category}</p>
                  <h3 className="text-xl font-black text-navy">{item.name}</h3>
                  <p className="mt-2 min-h-20 text-sm text-slate-600">{item.description}</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-lg font-black text-aguachile">{formatCurrency(item.priceMxn)}</span>
                  <Link className="btn btn-outline" href="/pickup">
                    Agregar en pick-up
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
