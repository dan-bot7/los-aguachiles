import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function PromoSection() {
  return (
    <section className="bg-sea/70 py-14" aria-labelledby="promo-title">
      <div className="container-shell flex flex-col gap-6 rounded-lg bg-gradient-to-br from-navy via-brand-blue to-aguachile p-7 text-white shadow-soft md:flex-row md:items-center md:justify-between md:p-9">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.08em] text-white/80">Pick-up sin vueltas</p>
          <h2 id="promo-title" className="max-w-3xl text-[clamp(1.8rem,4vw,3rem)] font-black leading-tight">
            Elige tus platillos y agenda la hora para pasar por ellos
          </h2>
        </div>
        <Link className="btn bg-white text-navy shadow-lg hover:bg-sea" href="/pickup">
          Empezar pedido
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
