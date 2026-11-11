# 10 · Enlazado interno y posicionamiento (cola larga)

## Punto de partida (Semrush, web WordPress actual, 2026-11-11)

La web actual ya está en la página 2 de Google con las páginas de despedidas. Posiciones el 11 de noviembre:

| Búsqueda | Posición | Volumen mensual |
|---|---:|---:|
| despedidas soltera sanxenxo | 15 | 50 |
| despedidas de soltera en sanxenxo | 18 | 320 |
| despedidas soltero sanxenxo | 15 | 50 |
| despedidas sanxenxo | 19 | 480 |

(El aviso no indica el sentido de los cambios.) Idea de Pablo: con las páginas de despedidas, entradas de blog que apunten a ellas y enlaces internos, se puede subir de la página 2 a la 1.

## Páginas que queremos posicionar

| Página | Búsquedas objetivo (cola larga) |
|---|---|
| `/despedidas/` | despedidas en sanxenxo · organizar una despedida en sanxenxo |
| `/despedidas/soltera/` | despedida de soltera en sanxenxo · planes para una despedida de soltera |
| `/despedidas/soltero/` | despedida de soltero en sanxenxo · planes para una despedida de soltero |
| `/paraisos/playas/portonovo/` | despedidas en portonovo · playas de portonovo para una despedida |
| `/barcos/` | alquiler de barcos para despedidas en sanxenxo |
| `/limusinas/` | limusina para despedidas en sanxenxo |
| `/actividades/mar-con-motor/` | motos de agua en sanxenxo y portonovo |
| `/cuando-ir/` | cuándo ir a sanxenxo para una despedida |

## Reglas del enlazado

1. **Texto del enlace de cola larga**: 3 palabras o más, nunca una palabra suelta ("barcos", "despedidas", "plan"). `npm run check:seo` lo comprueba en los textos y falla si no se cumple.
2. **Variar la redacción.** Cada página clave tiene varias formas de enlazarla; el aviso de `check:seo` salta si el mismo texto se repite más de 4 veces.
3. **Natural.** El enlace debe leerse bien dentro de la frase. Sin relleno de palabras clave.
4. **Los textos del menú y de las tarjetas** pueden ser cortos (son navegación). La regla es para los enlaces dentro de los textos.
5. Cada ficha de local, playa o actividad enlaza hacia arriba: a su sección y al plan completo de la despedida.

## Blog

- Cada entrada es de cola larga y apunta a las páginas clave. En la cabecera, `paginas:` lista las páginas a las que apunta.
- Esas páginas muestran un bloque "Guías relacionadas" con el **título de la entrada** como texto del enlace (cola larga por construcción).
- Cada entrada muestra un bloque "Sigue con la guía" hacia sus páginas, con el título SEO de la página como texto.
- Entradas publicadas: despedida de soltera (plan de un sábado), despedida de soltero (planes de día y de noche), cuándo ir, alquiler de barcos para despedidas, despedidas en Portonovo y errores al organizar una despedida.
- Ideas siguientes: motos de agua para despedidas, qué hacer en Sanxenxo con un grupo si llueve, ruta de furanchos para una despedida, Ons y Cíes con un grupo (permisos), despedidas en O Grove y A Lanzada.

## Cómo medir

Search Console y Semrush: seguir las ocho búsquedas de la tabla cada semana durante dos meses tras el lanzamiento.
