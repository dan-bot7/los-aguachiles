import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Los Aguachiles Demo",
    short_name: "Aguachiles",
    description: "Maqueta demo con menú, pick-up, sucursales y WhatsApp.",
    start_url: ".",
    display: "standalone",
    background_color: "#FFE3C4",
    theme_color: "#F47B20",
    categories: ["food", "business"]
  };
}
