import { Fish, ShoppingBag, Timer } from "lucide-react";

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

export function BenefitsSection() {
  return (
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
  );
}
