export function DishShowcase() {
  return (
    <div className="relative grid min-h-[430px] place-items-center md:min-h-[520px]" aria-label="Platillo destacado de demostración">
      <div className="absolute inset-x-0 bottom-8 top-12 rounded-lg border border-aguachile/20 bg-gradient-to-br from-white/80 to-sea/80 shadow-soft md:inset-x-6" />
      <div className="dish-plate">
        <span className="plate-ring" />
        <span className="aguachile-sauce" />
        <span className="shrimp shrimp-one" />
        <span className="shrimp shrimp-two" />
        <span className="shrimp shrimp-three" />
        <span className="lime-piece lime-one" />
        <span className="lime-piece lime-two" />
      </div>
      <div className="absolute bottom-4 w-[min(92%,318px)] rounded-lg border border-slate-200 bg-white/95 p-5 shadow-card md:right-0 md:bottom-10">
        <span className="mb-3 inline-flex rounded-full bg-aguachile/10 px-3 py-1 text-xs font-black uppercase text-aguachile-dark">
          Especial de la casa
        </span>
        <h2 className="mb-2 text-2xl font-black leading-tight text-navy">Aguachile verde especial</h2>
        <p className="m-0 text-slate-500">Fresco · Picante · Preparado al momento</p>
      </div>
    </div>
  );
}
