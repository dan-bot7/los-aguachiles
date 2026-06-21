"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@los-aguachiles/shared";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const activePath = basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) || "/" : pathname;

  return (
    <header className="fixed inset-x-0 top-0 z-30 min-h-[var(--header-height)] border-b border-coral/15 bg-shell/90 backdrop-blur-xl">
      <div className="container-shell flex min-h-[var(--header-height)] items-center justify-between gap-5">
        <Link className="flex shrink-0 items-center gap-2.5 font-black text-navy" href="/" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-blue via-coral to-aguachile text-xs font-black text-white shadow-[0_8px_18px_rgba(244,123,32,0.24)]">
            LA
          </span>
          <span>Los Aguachiles</span>
        </Link>

        <button
          className="grid size-11 place-items-center rounded-lg border border-coral/20 bg-white/90 text-navy md:hidden"
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>

        <nav
          className={`absolute left-4 right-4 top-[var(--header-height)] grid gap-1 rounded-lg border border-coral/15 bg-shell p-3 text-sm font-bold text-slate-500 shadow-soft transition md:static md:flex md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100"
          }`}
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`rounded-lg px-3 py-3 hover:bg-sea hover:text-navy md:p-0 md:hover:bg-transparent ${
                activePath === item.href ? "bg-sea text-navy md:bg-transparent md:text-aguachile" : ""
              }`}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link className="btn btn-primary mt-2 w-full md:hidden" href="/pickup" onClick={() => setOpen(false)}>
            Ordenar pick-up
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link className="btn btn-primary" href="/pickup">
            Ordenar pick-up
          </Link>
        </div>
      </div>
    </header>
  );
}
