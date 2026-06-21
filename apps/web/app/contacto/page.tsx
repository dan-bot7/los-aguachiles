import type { Metadata } from "next";
import { ContactSection } from "../../components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contacto"
};

export default function ContactoPage() {
  return (
    <main className="pt-[var(--header-height)]">
      <ContactSection />
    </main>
  );
}
