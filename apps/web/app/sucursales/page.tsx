import type { Metadata } from "next";
import { LocationsSection } from "../../components/sections/LocationsSection";
import { ConversionCta } from "../../components/sections/ConversionCta";

export const metadata: Metadata = {
  title: "Sucursales"
};

export default function SucursalesPage() {
  return (
    <main className="pt-[var(--header-height)]">
      <LocationsSection />
      <ConversionCta />
    </main>
  );
}
