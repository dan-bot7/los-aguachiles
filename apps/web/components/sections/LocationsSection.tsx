import { Clock, MapPin } from "lucide-react";
import { buildMapUrl, locations } from "@los-aguachiles/shared";
import { lastPickupLabel } from "../../lib/format";

export function LocationsSection() {
  return (
    <section className="section-shell bg-shell" aria-labelledby="locations-title">
      <div className="container-shell">
        <div className="mb-9 max-w-2xl">
          <p className="eyebrow">Sucursales</p>
          <h1 id="locations-title" className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-tight text-navy">
            Escoge dónde recoger tu pedido
          </h1>
          <p className="text-slate-600">Horarios de ejemplo para controlar que el pick-up sea siempre antes del cierre.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {locations.map((location) => (
            <article className="card grid gap-4 p-6" key={location.id}>
              <h2 className="text-xl font-black text-navy">{location.city}</h2>
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
  );
}
