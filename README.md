# Los Aguachiles

Maqueta demo para presentar una landing page moderna de restaurante de mariscos enfocada en reservas, pedidos por WhatsApp, menú y sucursales.

## Estado actual

- Web: Next.js + React + TypeScript + Tailwind.
- Contenido editable: `packages/shared`.
- Node recomendado: 24.x.

## Estructura

```txt
apps/
  web/        Next.js + React + TypeScript + Tailwind
packages/
  shared/     Datos editables: menú, sucursales, reseñas y WhatsApp
```

## Arranque rápido

```bash
npm install
npm run dev
```

Web: http://localhost:3000

## Comandos útiles

```bash
npm run dev:web
npm run build
npm run start
```

## Editar contenido

- Platillos, precios, sucursales y reseñas: `packages/shared/index.ts`
- Número de WhatsApp ficticio: `packages/shared/index.ts`
- Estilos globales y colores: `apps/web/app/globals.css` y `apps/web/tailwind.config.ts`

Esta es una maqueta de presentación, no una página oficial.
