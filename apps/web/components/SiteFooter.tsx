import Link from "next/link";
import { navItems } from "@los-aguachiles/shared";

export function SiteFooter() {
  return (
    <footer className="bg-navy py-11 text-white/75" id="contacto">
      <div className="container-shell grid gap-8 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <Link className="mb-3 inline-flex text-lg font-black text-white" href="/">
            Los Aguachiles
          </Link>
          <p className="max-w-sm">Maqueta demo creada para propuesta de rediseño web.</p>
        </div>

        <nav className="grid gap-2 font-bold" aria-label="Enlaces de pie de página">
          {navItems.slice(1, 4).map((item) => (
            <Link key={item.href} className="hover:text-lime" href={item.href}>
              {item.label === "Sucursales" ? "Ubicación" : item.label}
            </Link>
          ))}
        </nav>

        <div className="grid gap-2 font-bold" aria-label="Redes sociales ficticias">
          <Link className="hover:text-lime" href="/contacto">
            Instagram
          </Link>
          <Link className="hover:text-lime" href="/contacto">
            Facebook
          </Link>
          <Link className="hover:text-lime" href="/contacto">
            TikTok
          </Link>
        </div>
      </div>
    </footer>
  );
}
