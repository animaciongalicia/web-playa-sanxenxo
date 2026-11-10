# 04 · Plan por fases

**Método:** una rama por fase (`fase-N-nombre`), un Pull Request por fase, vista previa en Vercel, Pablo revisa y fusiona. Cada fase deja el repo **desplegable** y con `npm run build` en verde. Sesiones cortas: ninguna fase debería pasar de 3-4 horas de trabajo de Pablo.

Cómo arrancar cada fase con Claude Code:

```
Lee CLAUDE.md y docs/04-plan-por-fases.md. Ejecuta solo la Fase N.
Al terminar: npm run lint && npm run typecheck && npm run check:datos && npm run build.
Abre un PR con el resumen y la lista de decisiones que dejas pendientes.
```

---

## Fase 0 · Preparación

**Objetivo:** repo, proyecto Vercel y reglas listas. Sin código de producto.

Tareas:
- Crear repo **privado** `playa-sanxenxo` en GitHub y subir este paquete (`CLAUDE.md`, `docs/`, `data-semilla/`, `.claude/`).
- Activar **Secret Scanning** y protección de la rama `main` (PR obligatorio).
- Crear el proyecto en Vercel conectado al repo. **Framework preset: Next.js.** Sin dominio todavía (solo la URL `*.vercel.app`).
- Hacer una copia de seguridad del WordPress actual (XML exportado + base de datos, si el hosting lo permite).
- Tomar nota de las propiedades existentes: Search Console y Analytics.

Criterio de salida: el repo existe, Vercel despliega un "Hola mundo", `main` protegida.

Necesita de Pablo: acceso a GitHub y Vercel; ID de medición de GA4.

---

## Fase 1 · Esqueleto

**Objetivo:** proyecto Next.js 14 funcionando con diseño base, menú, pie e idiomas, sin contenido real.

Tareas:
- `create-next-app` (App Router, TypeScript, Tailwind). `trailingSlash: true`.
- Segmento `[lang]` con `es` (sin prefijo, vía middleware que reescribe) y `pt` (`/pt/`).
- Layout: cabecera con los 7 elementos del menú, pie con los enlaces de `docs/02`, selector ES/PT.
- Componentes base: `Tarjeta`, `Seccion`, `Migas`, `AvisoPendiente2027`, `LlamadaAgencia` (enlace discreto).
- Diseño: limpio y profesional, estilo Suunia.com (Pablo lo tiene como referencia); azules de mar y arena, mucho aire, tipografía legible, **móvil primero**.
- `robots.txt` que **bloquea todo** mientras no esté el dominio (se abre en la Fase 9).
- Scripts: `lint`, `typecheck`, `check:datos` (vacío por ahora), `build`.
- Todas las rutas de `docs/02` existen como páginas vacías con su título (sin 404 internos).
- Página de agencia (se rellena en la Fase 6).

Criterio de salida: navegación completa en la vista previa, build en verde, Lighthouse móvil > 90 en la home.

Atención: componentes con eventos llevan `'use client'`.

---

## Fase 2 · Modelo de datos y datos semilla

**Objetivo:** datos validados y cargados.

Tareas:
- `lib/esquemas.ts` con los esquemas zod de `docs/03`.
- Copiar `data-semilla/*.json` a `data/`.
- `npm run check:datos`: valida esquemas, detecta `slug` duplicados, referencias rotas (`tambien_en`, `playas` de destinos) y **avisa de fichas con más de 12 meses sin verificar**.
- Funciones de lectura en `lib/datos.ts` (filtrar por `publicar === true`).
- Ruta `app/api/fichas-export/route.ts` protegida con token.

Criterio de salida: `check:datos` pasa con los 5 archivos; ninguna página pinta datos con `publicar` ≠ `true`.

---

## Fase 3 · Paraísos (playas y mar)

**Objetivo:** el corazón de la guía.

Tareas:
- Hub de playas con mapa/lista por tramo y las 8 top.
- 5 páginas de tramo, con las 8 playas imprescindibles como sección dentro de su tramo (sin páginas sueltas, decisión de Pablo).
- Hub de mar y 3 destinos: Ons, Cíes, Aldán.
- Textos: Pablo aporta el material; Claude Code redacta con la skill `redactar-ficha`, **sin inventar**.

Criterio de salida: las 5 páginas de tramo muestran todas sus playas; las páginas de destino enlazan a barcos y traslados.

Necesita de Pablo: confirmar las 8 top; fotos; descripciones de Ons, Cíes y Aldán; cupos y permisos.

---

## Fase 4 · Barcos y actividades

**Objetivo:** la oferta, presentada como información.

Tareas:
- `/barcos/`, `/barcos/yates/`, `/barcos/veleros/`, `/barcos/traslados/` con precios "desde" (los pone Pablo) y puerto de salida.
- Hub de actividades, 5 páginas de familia, `/actividades/kayak-areoso/`.
- Cada actividad muestra **dónde se hace** (puertos, playas o zonas).
- Avisos operativos reales: "el tiempo de la sesión se reparte entre el grupo", "el desembarco en Areoso requiere autorización", "bateas: mínimo de 10 personas".

Criterio de salida: ninguna actividad sin campo `donde`; ningún precio inventado.

Necesita de Pablo: precios "desde", puertos de salida, plazas de los yates, si va el galeón.

---

## Fase 5 · Comer y Diversión

**Objetivo:** listas de locales por zona.

Tareas:
- `/comer/restaurantes/` agrupado por zona; fichas propias para A Ferreira, A Curva y A Vichona.
- `/comer/chiringuitos/` (los publicados).
- `/comer/furanchos/` + 4 zonas con datos (`sanxenxo-portonovo`, `meano`, `cambados`, `ribadumia-vilanova`). Las zonas `o-grove` y `bueu-marin` quedan sin publicar.
- `/diversion/` + 4 zonas; fichas propias para Gassho, Varadero, Buddha y Dux.
- Una sola ficha por local aunque aparezca en dos listas.
- Línea final de grupos y despedidas solo con `si` / `segun-epoca`.

Criterio de salida: `check:datos` sin referencias rotas; ninguna ficha publicada con teléfono sin verificar.

Necesita de Pablo: marcar `publicar`, datos verificados, `como_es` y `que_se_come` de cada local; zonas de furanchos de O Grove y Bueu–Marín.

---

## Fase 6 · Despedidas, Cuándo ir, Condiciones, pie y Agencia

**Objetivo:** lo que da sentido a la web.

Tareas:
- `/despedidas/`, `/despedidas/soltero/`, `/despedidas/soltera/` con el plan (actividades, comida, diversión, cuándo) y A Vichona (120 personas, espacios privados para shows).
- `/cuando-ir/` y 6 páginas de mes (contenido de Pablo, ver `docs/07`).
- `/condiciones-despedidas/`.
- `/limusinas/` y `/humor-amarillo-en-sanxenxo/` con `estado_2027`.
- `/agencia/` con contacto directo: correo (`mailto:` con mensaje preparado), WhatsApp y llamada. **Sin formulario ni servidor.**
- Páginas legales (a partir de las del WordPress actual, revisadas).

Criterio de salida: los tres botones de `/agencia/` funcionan en móvil y escritorio; `rg "<form"` no encuentra nada en toda la web.

Necesita de Pablo: texto de cuándo ir (entrevista), condiciones, descripción de limusinas y humor, correo de la agencia y número de llamada.

---

## Fase 7 · Portugués

Tareas: espejo bajo `/pt/` del alcance acordado, `hreflang`, selector de idioma, revisión humana. Fichas de locales solo en español.

Criterio de salida: cada página con versión `pt` enlaza a la `es` y viceversa con `hreflang` correcto.

---

## Fase 8 · SEO técnico, redirecciones y analítica

Tareas (detalle en `docs/06`):
- Redirecciones 301 desde las URLs antiguas con tráfico.
- `sitemap.xml` multiidioma, `robots.txt` (aún bloqueado), canónicas.
- Datos estructurados (`Restaurant`, `BarOrPub`, `TouristAttraction`, `Organization`) **solo en fichas verificadas**.
- GA4 con aviso de cookies.
- Revisión de títulos y descripciones.

Criterio de salida: todas las URLs del `redirects` apuntan a una página 200; sitemap válido.

---

## Fase 9 · Lanzamiento

Tareas (detalle en `docs/05`):
1. Revisión final y QA en la vista previa.
2. **48 h antes:** bajar el TTL del DNS.
3. Añadir `despedidasplayasanxenxo.com` y `www` al proyecto de Vercel y cambiar DNS.
4. Abrir `robots.txt`.
5. Enviar el sitemap a Search Console y vigilar el informe de cobertura (la web vieja tenía 83 URLs sin indexar).
6. Revisar los 301 y la analítica durante dos semanas.

Plan B: el WordPress sigue disponible por si hay que volver atrás durante las primeras 48 h.

---

## Fase 10 · Mantenimiento y automatización (opcional)

- **GitHub Action** que cada 1 de abril abre un issue "Revisar fichas de locales" con la lista de fichas caducadas (más de 12 meses sin verificar) y los furanchos de temporada.
- Aviso anual de "Pendiente de actualización 2027" → cambiar `estado_2027`.
- Renovar cupos y condiciones de Ons y Cíes cada temporada.
- Actualizar precios "desde" de barcos.
- **Skill de contenido** reutilizable para nuevas fichas (`.claude/skills/redactar-ficha`).

---

## Resumen de dependencias

| Fase | Bloquea | Necesita de Pablo |
|---|---|---|
| 0 | todo | Accesos |
| 1 | 3-7 | Referencia visual |
| 2 | 3-6 | — |
| 3 | 6 | 8 top, fotos, textos de mar |
| 4 | 6 | Precios, puertos, plazas |
| 5 | 6 | Datos de locales |
| 6 | 7-8 | Cuándo ir, condiciones, servicios |
| 7 | 8 | Alcance del PT |
| 8 | 9 | GA4, Search Console |
| 9 | — | Acceso al DNS |
