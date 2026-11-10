# 06 · SEO, redirecciones e idiomas

## Punto de partida (Search Console, exportación de 2026-11-10)

- 97 páginas con datos: **445 clics y casi 99.000 impresiones** (0,45 % de clics). El periodo no viene en el archivo.
- 774 consultas. Búsquedas de "despedidas sanxenxo" en posiciones **17-54, casi sin clics**.
- **83 URLs sin indexar** (63 descubiertas y 20 rastreadas, sin indexar) y 4 páginas con redirección.
- Solo **4 sitios enlazan** al dominio (uno parece spam, otro puede ser un dominio propio de Pablo). Conclusión: el dominio vale por la antigüedad, no por la autoridad.

Estrategia: **web nueva, pocas páginas, buenas**. Se redirige solo lo que tiene tráfico real.

## URLs antiguas con tráfico y su destino

`trailingSlash: true`. Redirecciones 301 permanentes en `next.config.js` (`redirects()`).

| URL antigua | Dato de Search Console | Destino |
|---|---|---|
| `/humor-amarillo-en-sanxenxo/` | 89 clics, pos. 19,2 | **Se conserva la URL** |
| `/limusinas/` | 31 clics, pos. 10,2 | **Se conserva la URL** |
| `/` | 38 clics, 3.471 impr. | `/` |
| `/barcos/` | 1.274 impr. | **Se conserva la URL** |
| `/los-mejores-pubs-de-sanxenxo/` | 26 clics, 3.389 impr. | `/diversion/sanxenxo-puerto/` |
| `/los-mejores-pubs-de-sanxenxo-para-despedidas-inolvidables/` | 2.014 impr. | `/diversion/sanxenxo-puerto/` |
| `/pub-varadero-paseo-sanxenxo/` | 7.519 impr., pos. 9,2 | `/diversion/sanxenxo-puerto/varadero/` |
| `/el-buddha-puerto-sanxenxo/` | 8.614 impr., pos. 13,3 | `/diversion/sanxenxo-puerto/buddha/` |
| `/gassho-sanxenxo-cocteleria/` | 2.783 impr., pos. 11,2 | `/diversion/sanxenxo-puerto/gassho/` |
| `/dux-puerto-sanxenxo/` | 2.650 impr., pos. 19,7 | `/diversion/sanxenxo-puerto/dux/` |
| `/restaurante-a-ferreira-sanxenxo/` | 14.306 impr., pos. 10,3 | `/comer/restaurantes/a-ferreira/` |
| `/vinoteca-a-curva-portonovo/` | 2.708 impr., pos. 11,7 | `/comer/restaurantes/a-curva/` |
| `/despedidas-en-sanxenxo/` | 2.748 impr. | `/despedidas/` |
| `/despedidas-de-soltero-en-sanxenxo/` | 1.848 impr. | `/despedidas/soltero/` |
| `/despedidas-de-soltera-en-sanxenxo/` | 2.502 impr. | `/despedidas/soltera/` |
| `/ideas-originales-y-divertidas-para-despedidas-en-sanxenxo/` | 23 clics, 2.562 impr. | `/despedidas/` |
| `/ideas/`, `/ideas/page/2/` | 2.850 / 315 impr. | `/despedidas/` |
| `/packs-para-despedidas-de-soltero/` | 3.121 impr. | `/despedidas/soltero/` |
| `/como-elegir-el-pack-de-despedida-perfecto-en-sanxenxo/` | 2.039 impr. | `/despedidas/` |
| `/como-evitar-errores-al-organizar-tu-despedida-en-sanxenxo/` | 154 impr. | `/despedidas/` |
| `/guia-para-organizar-una-despedida-low-cost-en-sanxenxo/` | 220 impr. | `/despedidas/` |
| `/despedidas-en-barco-en-sanxenxo/` | 2.665 impr. | `/barcos/` |
| `/alquiler-de-barcos-para-despedidas-en/` | 312 impr. | `/barcos/` |
| `/packs-y-ofertas-de-alquiler-de-barcos/` | 159 impr. | `/barcos/` |
| `/despedida-en-motos-de-agua/` | 632 impr. | `/actividades/mar-con-motor/` |
| `/actividades-para-despedidas/banana-acuatica/` | 145 impr. | `/actividades/mar-con-motor/` |
| `/actividades-para-despedidas/` | 2.542 impr. | `/actividades/` |
| `/top-5-actividades-acuaticas-para-despedidas/` | 875 impr. | `/actividades/` |
| `/aventuras/` | 1.886 impr. | `/actividades/` |
| `/karts-de-agua-en-sanxenxo-portonovo/` | 1.249 impr. | `/actividades/` (aquakarts quedan fuera) |
| `/xo-xtreme-actividad-acuatica/` | 40 impr. | `/actividades/` |
| `/gymkanas-en-sanxenxo/` | 5 clics, pos. 10,3 | `/actividades/dias-a-medida/` |
| `/restaurantes-para-despedidas-en-sanxenxo/` | 177 impr. | `/comer/restaurantes/` |
| `/despedidas-en-limusina-en-sanxenxo/` | 184 impr. | `/limusinas/` |
| `/las-playas-de-sanxenxo/` | 1.711 impr. | `/paraisos/playas/sanxenxo/` |
| `/playas-de-sanxenxo-ideales-para-despedidas-al-aire-libre/` | 215 impr. | `/paraisos/playas/sanxenxo/` |
| `/buceando-en-las-islas-cies/` | 63 impr. | `/paraisos/mar/islas-cies/` |
| `/local-para-despedidas-conjuntas/` | 9 clics, 1.304 impr. | `/despedidas/` *(Pablo confirma si debe apuntar a la ficha de A Vichona)* |
| `/tarifas/`, `/ofertas-para-despedidas/`, `/extras-para-despedidas/` | impresiones sin clics | `/agencia/` |
| `/contacto/` | 133 impr. | `/agencia/` |

### Páginas que se retiran (responden 410)

Fuera de alcance, sin encaje o decisión de Pablo:

- `/shows/`, `/shows/strippers/`, `/shows/boy/`, `/shows/comicos/` y sus subpáginas.
- `/reuniones-tuppersex/`
- `/discoteca/`, `/las-fiestas-discoteca-zoo-club/`, `/adelanto-video-despedidas-piramide/`
- `/casas-rurales-en-sanxenxo-para-despedidas/`, `/alojamientos-para-despedidas/`, `/despedida-beauty-relax-grove/` *(decisión abierta 8 de `docs/01`)*
- `/local-despedidas-sanxenxo-2015/`, `/tarifas-y-precios-de-despedidas/`

Implementación: `middleware.ts` devuelve **410** para estos patrones. Cualquier otra URL antigua no listada devuelve **404** con una página útil (enlaces a las 7 secciones). **No se redirige en masa a la home** (Google lo trata como soft 404).

## Palabras objetivo (de las búsquedas reales)

| Página | Consultas de referencia (impresiones, posición) |
|---|---|
| `/despedidas/` | "despedidas en sanxenxo" (596, 40,9) · "despedida en sanxenxo" (446, 17,5) · "despedidas sanxenxo" (282, 50,4) |
| `/despedidas/soltero/` | "despedidas de soltero sanxenxo" (442, 24,0) · "despedida de soltero sanxenxo" (221, 22,6) |
| `/despedidas/soltera/` | "despedidas de soltera sanxenxo" (479, 23,5) · "despedida de soltera sanxenxo" (227, 23,2) |
| `/paraisos/playas/portonovo/` | "despedidas en portonovo" (516, 39,3) · "despedidas portonovo" (312, 43,8) |
| `/barcos/` | "alquiler barcos sanxenxo despedidas" (236, 52,3) |
| `/actividades/mar-con-motor/` | "alquiler motos de agua sanxenxo" (54, 30,4) · "motos de agua sanxenxo" (52, 26,4) |
| `/limusinas/` | "limusinas sanxenxo" (81, 10,6) |
| `/humor-amarillo-en-sanxenxo/` | "humor amarillo sanxenxo" (44 clics, 128 impr., pos. 1,5) |
| Fichas de diversión | "varadero sanxenxo" (3.689, 9,2) · "buddha sanxenxo" (4.262, 9,8) · "la ola sanxenxo" (926, 10,9) · "pubs sanxenxo" (559, 12,6) |
| Fichas de comer | "restaurante a ferreira" (603, 9,9) · "vinoteca en portonovo" (189, 4,7) |

Son una muestra (Search Console anonimiza parte de las consultas). Sirven de guía, no de promesa.

## Metadatos

- `title` ≤ 60 caracteres, con el tema + "Playa Sanxenxo" al final. `description` ≤ 155, redactada para informar, sin promesas.
- Una sola `h1` por página. Jerarquía limpia.
- Texto alternativo en todas las imágenes, con lo que realmente se ve.
- Imágenes con `next/image`, propias (las pone Pablo). Sin hotlinking.

## Datos estructurados

Solo en fichas **verificadas** y con datos reales:
- `Restaurant` / `BarOrPub` / `FoodEstablishment` para locales.
- `TouristAttraction` para playas top y destinos de mar.
- `Organization` y `ContactPage` en `/agencia/`.
- `BreadcrumbList` en todas las páginas con migas.

## Rastreo e indexación

- `sitemap.xml` con todas las páginas `publicar: true` en ES y PT, con `alternates` de idioma.
- `robots.txt`: **bloquea todo hasta la Fase 9**, luego permite todo y apunta al sitemap.
- Canónica en cada página. Dominio canónico: `https://www.despedidasplayasanxenxo.com`.
- Páginas con `publicar: false` o sin datos: no se generan y no entran en el sitemap.

## Idiomas

- Español en la raíz, portugués en `/pt/`.
- `hreflang` recíproco entre cada página y su traducción, más `x-default` apuntando al español.
- Las páginas sin versión portuguesa **no** declaran `hreflang` a una ruta que no existe.
- La traducción la revisa una persona. No se publica traducción automática sin revisión.

## Analítica

- GA4 con el ID existente (`NEXT_PUBLIC_GA_ID`), cargado solo tras el consentimiento de cookies.
- Eventos: clic al enlace de agencia, clic en correo / WhatsApp / llamada, clic a seagalicia.com, cambio de idioma.
- Search Console: reutilizar la propiedad actual del dominio, enviar el nuevo sitemap y vigilar cobertura.
