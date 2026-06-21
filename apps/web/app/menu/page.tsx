import type { Metadata } from "next";
import { MenuSection } from "../../components/sections/MenuSection";
import { PromoSection } from "../../components/sections/PromoSection";

export const metadata: Metadata = {
  title: "Menú"
};

export default function MenuPage() {
  return (
    <main className="pt-[var(--header-height)]">
      <MenuSection />
      <PromoSection />
    </main>
  );
}
