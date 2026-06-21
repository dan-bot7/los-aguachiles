import { assetPath } from "../lib/assets";

export function DishShowcase() {
  return (
    <div className="relative grid min-h-[430px] place-items-center md:min-h-[520px]" aria-label="Platillo destacado de demostración">
      <div className="absolute inset-x-0 bottom-8 top-12 rounded-lg border border-coral/15 bg-gradient-to-br from-white/85 to-sea/90 shadow-soft md:inset-x-6" />
      <div className="relative aspect-[4/5] w-[min(78vw,410px)] overflow-hidden rounded-lg border border-white bg-white shadow-[0_28px_62px_rgba(107,55,20,0.18)]">
        <img
          src={assetPath("menu/aguachile-verde.jpg")}
          alt="Aguachile verde especial servido con limón y tostadas"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </div>
      <div className="absolute bottom-4 w-[min(92%,318px)] rounded-lg border border-coral/15 bg-white/95 p-5 shadow-card md:right-0 md:bottom-10">
        <span className="mb-3 inline-flex rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-black uppercase text-brand-blue-dark">
          Especial de la casa
        </span>
        <h2 className="mb-2 text-2xl font-black leading-tight text-navy">Aguachile verde especial</h2>
        <p className="m-0 text-slate-500">Fresco · Picante · Preparado al momento</p>
      </div>
    </div>
  );
}
