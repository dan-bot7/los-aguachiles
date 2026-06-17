"use client";

import { CalendarCheck } from "lucide-react";
import { buildWhatsAppUrl } from "@los-aguachiles/shared";

export function ReservationForm() {
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "Por confirmar");
    const people = String(form.get("people") || "Por confirmar");
    const date = String(form.get("date") || "Por confirmar");
    const time = String(form.get("time") || "Por confirmar");

    const message = [
      "Hola, quiero reservar una mesa en Los Aguachiles.",
      `Nombre: ${name}`,
      `Personas: ${people}`,
      `Fecha: ${date}`,
      `Hora: ${time}`,
      "¿Me pueden confirmar disponibilidad?"
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
  }

  return (
    <form className="card grid gap-4 p-6 md:p-7" onSubmit={submit}>
      <label className="grid gap-2 font-extrabold text-navy">
        Nombre
        <input className="min-h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 font-normal outline-none focus:border-aguachile focus:ring-4 focus:ring-aguachile/15" name="name" placeholder="Tu nombre" required />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 font-extrabold text-navy">
          Número de personas
          <input className="min-h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 font-normal outline-none focus:border-aguachile focus:ring-4 focus:ring-aguachile/15" name="people" type="number" min="1" max="20" placeholder="4" required />
        </label>

        <label className="grid gap-2 font-extrabold text-navy">
          Fecha
          <input className="min-h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 font-normal outline-none focus:border-aguachile focus:ring-4 focus:ring-aguachile/15" name="date" type="date" required />
        </label>
      </div>

      <label className="grid gap-2 font-extrabold text-navy">
        Hora
        <input className="min-h-12 rounded-lg border border-slate-200 bg-slate-50 px-4 font-normal outline-none focus:border-aguachile focus:ring-4 focus:ring-aguachile/15" name="time" type="time" required />
      </label>

      <button className="btn btn-primary w-full" type="submit">
        <CalendarCheck size={18} aria-hidden="true" />
        Enviar por WhatsApp
      </button>
    </form>
  );
}
