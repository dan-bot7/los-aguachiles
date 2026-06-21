import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Los Aguachiles Demo",
    short_name: "Aguachiles",
    description: "Maqueta demo con menú, pick-up, sucursales y WhatsApp.",
    start_url: ".",
    display: "standalone",
    background_color: "#FFF4E2",
    theme_color: "#064B78",
    categories: ["food", "business"]
  };
}
