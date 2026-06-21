import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "../components/Header";
import { PwaRegistration } from "../components/PwaRegistration";
import { SiteFooter } from "../components/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = {
  applicationName: "Los Aguachiles Demo",
  title: {
    default: "Los Aguachiles | Maqueta demo",
    template: "%s | Los Aguachiles"
  },
  description:
    "Maqueta demo para Los Aguachiles: landing page moderna para reservas, menú, sucursales y pedidos por WhatsApp.",
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Los Aguachiles Demo",
    title: "Los Aguachiles | Maqueta demo",
    description: "Landing page demo para mostrar una experiencia comercial moderna para restaurante de mariscos."
  }
};

export const viewport: Viewport = {
  themeColor: "#F47B20"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        {children}
        <SiteFooter />
        <PwaRegistration />
      </body>
    </html>
  );
}
