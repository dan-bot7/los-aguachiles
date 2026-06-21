# Los Aguachiles

Maqueta demo para presentar una landing page moderna de restaurante de mariscos enfocada en reservas, pedidos por WhatsApp, menú y sucursales.

## Estado actual

- Web: Next.js + React + TypeScript + Tailwind.
- API: Express + Prisma preparada para Postgres y pedidos de pick-up.
- Mobile: base Expo/React Native preparada para una app futura.
- Contenido editable: `packages/shared`.
- Node recomendado: 24.x.

## Estructura

```txt
apps/
  api/        Express + Prisma + Postgres para pedidos y futura operación
  mobile/     Expo + React Native como base de app móvil
  web/        Next.js + React + TypeScript + Tailwind para landing/app web
packages/
  shared/     Contrato común: menú, sucursales, reseñas, WhatsApp y tipos
```

## Arranque rápido

```bash
npm install
npm run dev
```

Web: http://localhost:3000
API: http://localhost:4000/api

## Comandos útiles

```bash
npm run dev:api
npm run dev:web
npm run build
npm run build:api
npm run build:web
npm run db:push
npm run db:seed
npm run start
```

## Base de datos local

```bash
docker compose up db
npm run db:push
```

## Deploy

- Vercel y GitHub Pages construyen la web con `npm run build:web`.
- Railway queda configurado para la API con `npm run build:api:deploy`, healthcheck en `/api/health` y Postgres mediante `DATABASE_URL`.

## Editar contenido

- Platillos, precios, sucursales y reseñas: `packages/shared/index.ts`
- Número de WhatsApp ficticio: `packages/shared/index.ts`
- Estilos globales y colores: `apps/web/app/globals.css` y `apps/web/tailwind.config.ts`

Esta es una maqueta de presentación, no una página oficial.
