# 11 · Lista de lanzamiento (Fase 9)

Estado a 2026-11-11. Lo que ya está hecho y lo que falta, en orden.

## Ya hecho (no depende de nadie)
- Web completa en español, 55 páginas, sin errores en la auditoría automática (HTTP, h1, desbordes, imágenes, consola, enlaces).
- SEO técnico: 39 redirecciones 301 y 10 páginas 410 desde el dominio antiguo, sitemap, robots, canónicas, Open Graph, datos estructurados y títulos/descripciones. `npm run check:seo`.
- Analítica (GA4) con aviso de cookies: se activa al definir `NEXT_PUBLIC_GA_ID`.
- Accesibilidad: contraste y regiones desplazables corregidos (axe, WCAG A y AA), 404 con cabecera y pie.
- Rendimiento medido en local: sin saltos de diseño (CLS 0) y LCP < 150 ms.
- Blog con 6 entradas programadas (hasta el 16-12-2026).
- GitHub Actions: comprobaciones en cada push y aviso anual el 1 de abril.

## Antes de lanzar (Pablo)
1. Fotos propias y revisar las portadas (`public/img/LEEME.md`).
2. Verificar fichas (hoy 13 de 176) y datos pendientes de barcos.
3. `NEXT_PUBLIC_GA_ID` en Vercel (Producción).
4. Confirmar las páginas que se retiran (410) y la lista de redirecciones (`data/redirecciones.json`).
5. Revisión jurídica del aviso legal y la privacidad; confirmar el titular.
6. Decidir si el blog sale vacío o con las 6 entradas.

## Día del lanzamiento
1. **48 h antes:** bajar el TTL del DNS del dominio.
2. Añadir `despedidasplayasanxenxo.com` y `www` al proyecto de Vercel y cambiar el DNS (el canónico es `www`).
3. En Vercel (Producción): `LANZADO=1` y `NEXT_PUBLIC_SITE_URL=https://www.despedidasplayasanxenxo.com`. Redesplegar.
4. Comprobar: `/robots.txt` (permite todo y apunta al sitemap), `/sitemap.xml`, la cabecera `X-Robots-Tag` ausente, y una URL antigua (debe dar 301).
5. Search Console: enviar el sitemap y vigilar la cobertura (la web vieja tenía 83 URLs sin indexar).
6. Dos semanas: revisar redirecciones, 404 y analítica.

Plan B: el WordPress sigue disponible las primeras 48 h.

## Después
- Portugués (Fase 7), con sitemap multiidioma y `hreflang`.
- Seguimiento de las ocho búsquedas objetivo (`docs/10`).
