"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@los-aguachiles/shared";
import { WhatsAppButton } from "./WhatsAppButton";

const reservationMessage = "Hola, quiero hacer una reserva en Los Aguachiles.";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 min-h-[var(--header-height)] border-b border-slate-200/90 bg-white/90 backdrop-blur-xl">
      <div className="container-shell flex min-h-[var(--header-height)] items-center justify-between gap-5">
        <a className="flex shrink-0 items-center gap-2.5 font-black text-navy" href="#inicio" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-aguachile to-lime text-xs font-black text-navy shadow-[0_8px_18px_rgba(18,168,107,0.24)]">
            LA
          </span>
          <span>Los Aguachiles</span>
        </a>

        <button
          className="grid size-11 place-items-center rounded-lg border border-slate-200 bg-white text-navy md:hidden"
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <nav
          className={`absolute left-4 right-4 top-[var(--header-height)] grid gap-1 rounded-lg border border-slate-200 bg-white p-3 text-sm font-bold text-slate-500 shadow-soft transition md:static md:flex md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100"
          }`}
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-lg px-3 py-3 hover:bg-aguachile/10 hover:text-navy md:p-0 md:hover:bg-transparent"
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <WhatsAppButton message={reservationMessage} className="btn btn-primary mt-2 w-full md:hidden">
            Reservar por WhatsApp
          </WhatsAppButton>
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton message={reservationMessage}>Reservar por WhatsApp</WhatsAppButton>
        </div>
      </div>
    </header>
  );
}
