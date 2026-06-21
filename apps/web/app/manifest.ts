import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Los Aguachiles Demo",
    short_name: "Aguachiles",
    description: "Maqueta demo con menú, pick-up, sucursales y WhatsApp.",
    start_url: ".",
    display: "standalone",
    background_color: "#EAF7FF",
    theme_color: "#092D5C",
    categories: ["food", "business"]
  };
}
