# CLAUDE.md — Playa Sanxenxo

Lee este archivo entero antes de tocar nada. Después lee `docs/04-plan-por-fases.md` y trabaja **solo la fase que se te pida**.

## Qué es este proyecto

Web informativa **Playa Sanxenxo** (dominio `despedidasplayasanxenxo.com`, el dominio conserva "despedidas"). Es una **guía de disfrute de Sanxenxo para despedidas**: playas, mar, barcos, actividades, dónde comer, diversión y fiesta en **Sanxenxo y alrededores** (Portonovo, Noalla, A Lanzada, O Grove / San Vicente hasta A Toja, y la ría de Aldán). **El foco es siempre Sanxenxo y las despedidas.** Sanxenxo es un pueblo pequeño cuya zona de influencia se extiende unos 10 km a la redonda: de Aldán a O Grove son las zonas donde la gente disfruta (playas, actividades, fiesta). Se entienden todas como "Sanxenxo y alrededores", nunca como una guía de la ría.

**Objetivo de negocio:** informar para las despedidas de soltero y de soltera. **Vender sin vender.** La guía ayuda a decidir; la venta ocurre en una única página: `/agencia/`.

Dueño: Pablo García Dacosta. Lo supervisa él. Trabaja en sesiones cortas, así que cada fase debe dejar el repo en estado desplegable.

## Stack (blueprint de Entiende Tu Sueño)

- **Next.js 14, App Router**, TypeScript, Tailwind CSS.
- Generación estática (SSG) siempre que se pueda.
- Repo en GitHub, despliegue automático en **Vercel** (framework preset: **Next.js**, no "Nest").
- Contenido en datos estructurados (JSON) + textos largos en Markdown leídos **en build** (`gray-matter` + `remark`). **No uses `next-mdx-remote` en runtime**: en DineroFuturo provocó timeouts de generación estática.
- Idiomas: español (raíz `/`) y portugués (`/pt/`, parcial).
- `trailingSlash: true` (las URLs antiguas del dominio llevan barra final).
- Dominio canónico: `https://www.despedidasplayasanxenxo.com`.

## Reglas que no se rompen

1. **No inventes datos.** Teléfonos, horarios, precios, capacidades, meses de apertura, si un local admite despedidas: si no está en `data-semilla/` o en un documento, se queda en `null` y la página muestra "pendiente de confirmar" solo en modo desarrollo (en producción se oculta el campo).
2. **Todo dato de local, actividad o barco lleva `verificado` y `ultima_verificacion`.** Los datos semilla vienen de fuentes web (algunas de 2021) y están en `verificado: false`; solo Pablo los marca como verificados. No hay flujo de aprobación: **la web enseña todo** salvo lo marcado `publicar: false`. No se publican teléfonos de locales. La web se indexa solo en el dominio canónico: en cualquier otro (por ejemplo `*.vercel.app`) el middleware envía `noindex`.
3. **Ningún formulario en toda la web.** `/agencia/` es una página de contacto directo: botón de correo (se abre el correo del cliente con el mensaje preparado), WhatsApp y llamada. El resto de páginas solo enlazan a la agencia con una llamada discreta (más el WhatsApp suave). Nada de `<form>`, pop-ups ni captación de email. Sin guías descargables a cambio de correo. Decisión de Pablo, 2026-11-10.
4. **Playas: sin filtro de "ambiente".** Todas valen para todos.
5. **Fichas de local:** centradas en el local (cómo es, qué se come). Al final, una línea sobre grupos y despedidas **solo si el dato es `si` o `segun-epoca`**. Nunca se publica un "no admite despedidas" sobre un local con nombre; esa información va agregada en `/condiciones-despedidas/`, sin señalar locales.
6. **Limusinas y Humor Amarillo** se describen como servicios que se hacen, con la marca "Pendiente de actualización 2027" controlada por el campo `estado_2027`.
7. **Playas y mar son lo primero.** La noche pura está en desuso: la sección se llama **Diversión** y habla de terraceo, tardeo, puestas de sol y copas. No hay "rutas de noche": son las mismas zonas, bien explicadas con horarios.
8. **Ningún secreto en el repo.** Ver `docs/05-github-vercel-seguridad.md`.
9. **Antes de cada commit:** `npm run lint`, `npm run typecheck`, `npm run check:datos`, `npm run check:contenido`, `npm run check:seo` y `npm run build`. Si el build falla, no se hace commit.
10. **Componentes con eventos o hooks** (`onClick`, `onChange`, `useState`, `useEffect`) llevan `'use client'` en la primera línea. Fue el primer error de build en DineroFuturo.
11. **No toques seagalicia.com.** Se enlaza desde barcos y traslados; no se importa su código.

## Voz de los textos

Directa, cercana, útil, sin humo, con algo de humor cuando ayuda. Segunda persona (tú). Frases cortas. Párrafos de 2-3 frases. Lo más importante, al principio. Evita "nosotros", "nuestro equipo", tecnicismos y adornos. Informa antes de empujar a nada. Para redactar fichas usa la skill `.claude/skills/redactar-ficha`.

## Comandos

```bash
npm run dev           # desarrollo
npm run build         # build de producción (obligatorio antes de commit)
npm run lint
npm run typecheck
npm run check:datos   # valida data/ contra los esquemas (zod) y avisa de fichas caducadas
npm run check:contenido  # textos Markdown: palabras, fuentes y voz
npm run check:seo     # redirecciones 301, páginas 410, enlaces internos (con texto de cola larga), títulos y descripciones
```

## Carpetas

```
app/                  rutas (App Router), con segmento [lang]
components/           componentes reutilizables
data/                 datos reales (copiados desde data-semilla/ en la Fase 2)
contenido/es|pt/      textos largos en Markdown
lib/                  esquemas zod, utilidades, i18n
public/img/           fotos propias (las pone Pablo)
docs/                 especificación (esto)
```

## Orden de lectura

1. `docs/01-vision-y-decisiones.md`
2. `docs/02-arquitectura-web.md`
3. `docs/03-modelo-de-datos.md`
4. `docs/04-plan-por-fases.md`
5. `docs/05-github-vercel-seguridad.md`
6. `docs/06-seo-redirecciones-i18n.md`
7. `docs/07-contenido-pendiente.md`
8. `docs/10-enlazado-interno-y-posicionamiento.md` (enlaces de cola larga y blog)
