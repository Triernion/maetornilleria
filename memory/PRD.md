# MAE Tornillería · PRD

## Original Problem Statement
> "Tengo una página en https://maetornilleria.com.mx/ pero no he terminado de construirla. Está creada con wordpress, tengo el backup de los archivos y la base de datos. ¿Puedes analizarla y ayudarme a mejorarla y terminarla?"

User chose to **migrate from WordPress to a modern React + FastAPI + MongoDB stack**, rebuilt from scratch, as an informational corporate site with contact + quote form (email via Hostinger SMTP) for an industrial bolt/fastener workshop specialized in mining & cement industries.

## Architecture
- **Frontend**: React 19 (CRA + craco), Tailwind 3, framer-motion, lucide-react, axios. Single-page landing with anchored sections.
- **Backend**: FastAPI + Motor (async MongoDB) + smtplib (Hostinger SMTP via BackgroundTasks).
- **DB**: MongoDB · collection `contact_submissions`.
- **Hosting**: Emergent Kubernetes preview (`https://ferreteria-build.preview.emergentagent.com`).

## Brand Identity (from official Manual_Identidad_MAE.pdf)
- Colores: Naranja primario `#F58220`, Azul petróleo `#3A4C5C`, Naranja claro `#FC9F4F`
- Tipografía web: Barlow Condensed (display), Chivo (body), JetBrains Mono (mono) – fallbacks de Metropolis
- Logo: hexagonal, versión negativa servido desde `/assets/mae/logo.png`
- Valores: Honestidad, Responsabilidad, Disciplina, Puntualidad, Dignidad

## User Personas
- **Comprador / ingeniero de mantenimiento** en minería/cementeras buscando proveedor confiable de pernos críticos.
- **Área de compras** que solicita cotizaciones bajo plano o muestra.
- **Operación 24/7** que necesita emergencia para paradas no programadas.

## Core Requirements (static)
1. Sitio informativo en español con branding MAE.
2. Formulario de cotización + contacto que guarda lead en DB y envía email a `ventas@maetornilleria.com.mx`.
3. SMTP configurable vía `.env` (Hostinger).
4. Imágenes reales reutilizadas del backup.
5. Diseño industrial pesado (no SaaS look).

## What's been implemented (2026-01)
- ✅ Backend `/api/health`, `/api/`, `POST /api/contact` (con validación Pydantic v2), `GET /api/submissions`.
- ✅ Persistencia en MongoDB + envío SMTP en BackgroundTasks (skip silencioso si SMTP_USER/PASSWORD vacíos).
- ✅ Email HTML branded con tabla de campos + reply-to del prospect.
- ✅ Frontend landing con secciones: Hero, About + 5 valores, Services bento grid (5 servicios), Industries (5 industrias con hover reveal), Process (4 pasos), QuoteForm completo, Footer con WhatsApp flotante.
- ✅ Imágenes reales del backup copiadas a `/app/frontend/public/assets/mae/`.
- ✅ Branding MAE: colores oficiales, hexágonos, tipografía industrial.
- ✅ `data-testid` en todos los elementos interactivos clave.
- ✅ Testing 100% pass (11/11 backend + flujos críticos frontend).

## P0 / pending blocking
- ⚠️ Cargar credenciales reales SMTP de Hostinger en `/app/backend/.env` (`SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`) para activar envío de emails.
- ⚠️ Reemplazar placeholders de teléfono, WhatsApp y dirección en `/app/frontend/src/constants/content.js`.

## P1 backlog
- Catálogo visual de productos (galería filtrable) usando imágenes del backup (project-1/2/3).
- Subida de archivos adjuntos en el formulario (plano PDF/imagen) – endpoint ya casi listo.
- Mapa interactivo en sección contacto (Google Maps embed).
- Multi-idioma ES/EN.
- Blog/casos de éxito.

## P2 / Future
- Panel admin para gestionar leads (`/api/submissions` ya expone los datos).
- Integración con CRM (HubSpot, Pipedrive).
- Captcha (hCaptcha/Turnstile) anti-spam.
- SEO técnico avanzado: sitemap.xml, robots.txt, schema.org LocalBusiness, OG image personalizada.
- Migración a producción en `maetornilleria.com.mx` (DNS + SSL).

## Next Tasks
1. Recibir credenciales Hostinger SMTP del usuario y configurarlas en `.env`.
2. Recibir teléfono, WhatsApp y dirección reales.
3. Probar envío real de email y revisar SPF/DKIM en DNS Hostinger.
4. Decidir si se conserva la URL `/wp-admin` o se redirige.
