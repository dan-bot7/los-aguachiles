import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl } from "@los-aguachiles/shared";

const contactCards = [
  {
    title: "WhatsApp",
    description: "Pedidos, dudas y disponibilidad de sucursales.",
    value: "+52 984 123 4567",
    icon: MessageCircle
  },
  {
    title: "Teléfono",
    description: "Contacto de ejemplo para presentación.",
    value: "984 123 4567",
    icon: Phone
  },
  {
    title: "Correo",
    description: "Canal ficticio para propuesta comercial.",
    value: "hola@losaguachiles.demo",
    icon: Mail
  }
];

export function ContactSection() {
  const message = "Hola, quiero información sobre Los Aguachiles.";

  return (
    <section className="section-shell bg-gradient-to-b from-shell to-white" aria-labelledby="contact-title">
      <div className="container-shell">
        <div className="mb-9 grid gap-5 lg:grid-cols-[0.9fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Contacto</p>
            <h1 id="contact-title" className="text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-tight text-navy">
              Mensajes claros para convertir visitas
            </h1>
          </div>
          <p className="text-slate-600">
            Esta sección muestra cómo la maqueta puede concentrar WhatsApp, teléfonos, redes ficticias y ubicación en una pantalla simple.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <article className="card grid gap-4 p-6" key={card.title}>
                <span className="grid size-11 place-items-center rounded-full bg-sea text-brand-blue-dark">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-xl font-black text-navy">{card.title}</h2>
                  <p className="mt-2 text-slate-600">{card.description}</p>
                </div>
                <p className="font-black text-aguachile">{card.value}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-lg bg-navy p-7 text-white shadow-soft md:p-9">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.08em] text-white/70">
                <MapPin size={16} aria-hidden="true" />
                Redes sociales ficticias
              </p>
              <h2 className="text-3xl font-black">Instagram · Facebook · TikTok</h2>
            </div>
            <a className="btn bg-white text-navy hover:bg-sea" href={buildWhatsAppUrl(message)} target="_blank" rel="noreferrer">
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
