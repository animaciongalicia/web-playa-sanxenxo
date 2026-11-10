---
name: redactar-ficha
description: Redacta la ficha de una playa, local, actividad, barco o mes de Playa Sanxenxo a partir de los datos reales del repo, con la voz de la web y sin inventar nada. Úsala siempre que haya que escribir o reescribir texto de una ficha.
---

# Redactar una ficha de Playa Sanxenxo

## Antes de escribir

1. Lee `CLAUDE.md` (reglas y voz) y `docs/03-modelo-de-datos.md` (campos).
2. Abre el JSON de la ficha en `data/`. **Solo puedes usar lo que está ahí** y lo que Pablo te haya dado en esta conversación.
3. Si falta un dato que el texto necesitaría, **no lo inventes**: deja el campo en `null` y lista lo que falta al final de tu respuesta.

## Cómo se escribe

- Segunda persona (tú). Frases cortas. Párrafos de 2-3 frases.
- Lo más importante, al principio.
- Directo, cercano, sin humo. Algo de humor cuando ayuda. Sin "nosotros", sin adjetivos vacíos ("increíble", "único", "espectacular").
- Informa para decidir. **No vendas.** Nada de "reserva ya" ni urgencias.
- Cifras y nombres, solo los que estén en los datos.

## Estructura según tipo

**Local (restaurante, chiringuito, furancho, diversión)**
1. Cómo es el sitio (ubicación, ambiente, qué lo distingue).
2. Qué se come (o qué se bebe).
3. Cuándo abre (si hay dato).
4. *Solo si `despedidas.admite` es `si` o `segun-epoca`:* una línea final con grupos y despedidas (cuándo y cómo). Si es `no` o `desconocido`, **no escribas nada sobre despedidas**.

**Playa**
1. Dónde está y cómo es.
2. Qué hay cerca (locales y actividades enlazables, solo de `data/`).
3. Qué se hace allí.

**Actividad**
1. Qué es y para quién.
2. **Dónde se hace** (obligatorio).
3. Duración, temporada y avisos operativos (ejemplo: "el tiempo se reparte entre el grupo").

**Barco**
1. Qué es, cuántas plazas, con patrón.
2. Puerto de salida.
3. Precio "desde" y enlace a seagalicia.com (solo si hay dato).

**Mes**
Solo con lo que Pablo cuente en la entrevista (`docs/07`). No completes con generalidades.

**Limusinas / Humor Amarillo**
Describe el servicio como algo que se hace. Si `estado_2027` es `pendiente`, añade la nota "Servicio de temporada. Pendiente de actualización 2027".

## Prohibido

- Inventar teléfonos, horarios, precios, capacidades, meses o si un local admite despedidas.
- Escribir "no admite despedidas" sobre un local con nombre.
- Pedir email, ofrecer guías descargables o incluir formularios.
- Filtros o descripciones de "ambiente" en playas.

## Al terminar

Devuelve: (1) el texto, (2) los campos que has dejado en `null` por falta de datos, (3) cualquier duda para Pablo.
