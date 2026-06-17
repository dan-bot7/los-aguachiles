import { navItems } from "@los-aguachiles/shared";

export function SiteFooter() {
  return (
    <footer className="bg-navy py-11 text-white/75" id="contacto">
      <div className="container-shell grid gap-8 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <a className="mb-3 inline-flex text-lg font-black text-white" href="#inicio">
            Los Aguachiles
          </a>
          <p className="max-w-sm">Maqueta demo creada para propuesta de rediseño web.</p>
        </div>

        <nav className="grid gap-2 font-bold" aria-label="Enlaces de pie de página">
          {navItems.slice(1, 4).map((item) => (
            <a key={item.href} className="hover:text-lime" href={item.href}>
              {item.label === "Sucursales" ? "Ubicación" : item.label}
            </a>
          ))}
        </nav>

        <div className="grid gap-2 font-bold" aria-label="Redes sociales ficticias">
          <a className="hover:text-lime" href="#contacto">
            Instagram
          </a>
          <a className="hover:text-lime" href="#contacto">
            Facebook
          </a>
          <a className="hover:text-lime" href="#contacto">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
