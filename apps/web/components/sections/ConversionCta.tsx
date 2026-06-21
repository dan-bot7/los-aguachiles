import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ConversionCta() {
  return (
    <section className="bg-sea/70 py-12">
      <div className="container-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="eyebrow">Listo para convertir visitas</p>
          <h2 className="text-3xl font-black text-navy">Menú visual, carrito pick-up y WhatsApp con pedido completo.</h2>
        </div>
        <Link className="btn btn-primary" href="/pickup">
          Armar pedido
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
