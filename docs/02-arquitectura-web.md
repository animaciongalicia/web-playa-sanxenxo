# 02 · Arquitectura de la web

## Menú y pie

**Menú principal (7):** Paraísos · Barcos · Actividades · Comer · Diversión · Despedidas · Cuándo ir

**Pie:** Limusinas · Humor Amarillo · Condiciones de las despedidas · Agencia · legales (Aviso legal, Privacidad, Cookies, Términos) · selector ES/PT

"Paraísos" agrupa **playas y mar** (el nombre es "Paraísos", ojo con la ortografía).

## Mapa de rutas (español; el portugués es el mismo árbol bajo `/pt/`)

| Ruta | Plantilla | Datos | Notas |
|---|---|---|---|
| `/` | Home | todos | Mensaje: guía de la ría de Aldán a O Grove. Entradas a las 7 secciones |
| `/paraisos/` | Hub | — | Playas + mar |
| `/paraisos/playas/` | HubPlayas | playas | Mapa y las 8 top. Los 5 tramos |
| `/paraisos/playas/sanxenxo/` | Tramo | playas | Tramo `sanxenxo` |
| `/paraisos/playas/portonovo/` | Tramo | playas | Incluye Paxariñas, Montalvo, Bascuas |
| `/paraisos/playas/noalla-a-lanzada/` | Tramo | playas | |
| `/paraisos/playas/o-grove-san-vicente/` | Tramo | playas | Incluye Reboredo y Moreiras |
| `/paraisos/playas/mas-alla/` | Tramo | playas | Aldán, Bueu, Marín, Poio, Combarro (secciones dentro de la página) |
| `/paraisos/playas/[tramo]/[playa]/` | Playa | playas | **Solo las 8 top.** Las otras viven como tarjeta/ancla en su tramo |
| `/paraisos/mar/` | Hub | mar | Tres bloques |
| `/paraisos/mar/islas-ons/` | Destino | mar, barcos | Parque Nacional de las Islas Atlánticas |
| `/paraisos/mar/islas-cies/` | Destino | mar, barcos | Parque Nacional de las Islas Atlánticas |
| `/paraisos/mar/ria-de-aldan/` | Destino | mar, playas | El Caribe gallego |
| `/barcos/` | Hub | barcos | |
| `/barcos/yates/` | Barcos | barcos | 3-4 yates, precio "desde", **puerto de salida** |
| `/barcos/veleros/` | Barcos | barcos | 3-4 veleros, 11 plazas + patrón, **puerto de salida** |
| `/barcos/traslados/` | Traslados | mar, barcos | Lancha rápida a Ons, Cíes y Aldán |
| `/actividades/` | Hub | actividades | |
| `/actividades/mar-con-motor/` | Familia | actividades | Motos de agua, parascending, sesión acuática desde barco |
| `/actividades/playa-y-tabla/` | Familia | actividades | Surf, paddle surf, Big SUP, kayak |
| `/actividades/buceo-y-pesca/` | Familia | actividades | Bautismo, snorkel, pesca recreativa, pesca-turismo |
| `/actividades/mar-y-mesa/` | Familia | actividades | Bateas, mariscada en barco, churrascada |
| `/actividades/dias-a-medida/` | Familia | actividades | Días producidos casi a medida: olimpiadas, gymkana, fiesta con DJ… |
| `/actividades/kayak-areoso/` | Actividad | actividades | Página propia por las búsquedas. Desembarco con autorización |
| `/comer/` | Hub | locales | |
| `/comer/restaurantes/` | Lista | locales | Agrupada por zona (anclas). Páginas propias solo donde `pagina_propia` |
| `/comer/restaurantes/[slug]/` | Local | locales | A Ferreira, A Curva, A Vichona |
| `/comer/chiringuitos/` | Lista | locales | Por zona |
| `/comer/furanchos/` | Hub | furanchos | Aviso: abren de diciembre a junio, más o menos |
| `/comer/furanchos/[zona]/` | Zona | furanchos | `sanxenxo-portonovo`, `meano`, `cambados`, `ribadumia-vilanova`, `o-grove`, `bueu-marin` (las dos últimas no se publican hasta tener datos) |
| `/diversion/` | Hub | diversion | Terraceo, tardeo, puestas de sol, copas |
| `/diversion/[zona]/` | Zona | diversion | `sanxenxo-puerto`, `portonovo`, `a-lanzada-san-vicente`, `o-grove` |
| `/diversion/[zona]/[slug]/` | Local | diversion | Gassho, Varadero, Buddha, Dux |
| `/despedidas/` | Hub | todos | El plan en conjunto |
| `/despedidas/soltero/` | Despedida | todos | |
| `/despedidas/soltera/` | Despedida | todos | |
| `/cuando-ir/` | Hub | meses | Visión general |
| `/cuando-ir/[mes]/` | Mes | meses | `mayo`, `junio`, `julio`, `agosto`, `septiembre`, `resto-del-ano` |
| `/condiciones-despedidas/` | Texto | contenido | **Pie.** Condiciones en la zona, sobre todo julio y agosto |
| `/limusinas/` | Servicio | servicios | **Pie.** Paseos desde Sanxenxo, Combarro, O Grove |
| `/humor-amarillo-en-sanxenxo/` | Servicio | servicios | **Pie.** Se conserva esta URL exacta |
| `/agencia/` | Agencia | — | **Pie. Contacto directo: correo, WhatsApp o llamada. Sin formulario** |
| `/aviso-legal/`, `/politica-de-cookies/`, `/privacidad/`, `/terminos-y-condiciones/` | Legal | contenido | |

## Plantillas: qué lleva cada una

**Playa (tramo y top):** nombre, tramo/municipio, descripción, servicios, locales cercanos, actividades que se hacen allí, fotos, mapa, aviso "bandera azul" solo si el dato está verificado.

**Local:** nombre, tipo, zona, playa cercana, **cómo es**, **qué se come**, contacto, meses de apertura. Al final, línea de grupos y despedidas (solo `si` / `segun-epoca`). A Vichona: 120 personas, espacios diversos y privados para shows.

**Actividad:** familia, qué es, tipo de grupo, duración, **dónde se hace (puertos, playas o zonas)**, temporada, notas operativas.

**Barco:** categoría, plazas, patrón, **puerto de salida**, precio "desde", enlace a seagalicia.com.

**Destino de mar (Ons, Cíes, Aldán):** qué es, cómo se llega, cupos y permisos (Parque Nacional: a confirmar), barcos y traslados, playas.

**Mes:** ambiente, qué abre y qué cierra, cuándo se admiten despedidas, cupos de Ons y Cíes, estado del mar y la playa, qué recomiendas ese mes. Lo escribe Pablo.

**Servicio de pie (limusinas, humor):** qué es el servicio, cómo funciona, estado 2027. Si `estado_2027 = pendiente`, se muestra la nota "Servicio de temporada. Pendiente de actualización 2027".

## Reglas de enlazado

- Playa → locales cercanos → actividades de esa zona.
- Destino de mar → barcos y traslados → playas de esa costa.
- Actividad → playas/puertos donde se hace.
- Despedidas (soltero/soltera) → todo lo anterior + A Vichona.
- Cuándo ir → todas las secciones.
- **Llamada a la agencia:** un enlace discreto ("Hablar con la agencia") en el pie de cada página y en las páginas de despedidas. **Ningún formulario en la web.**
- Un local que está en chiringuitos y en diversión tiene **una sola ficha**; las dos listas enlazan a ella.

## Contacto de la agencia (`/agencia/`)

**Sin formulario y sin servidor.** Tres vías, con botones grandes y pensados para móvil:

- **Correo:** enlace `mailto:` que abre el correo del cliente con asunto y mensaje preparados (tipo de despedida, fecha aproximada, número de personas, ciudad de origen, qué os interesa). La dirección también se muestra en texto, para quien no tenga cliente de correo.
- **WhatsApp:** enlace `wa.me` con el mismo mensaje preparado.
- **Llamada:** enlace `tel:`.

Cada botón solo se pinta si su variable de entorno existe (`NEXT_PUBLIC_AGENCIA_EMAIL`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_AGENCIA_TELEFONO`). La web no recoge ni guarda datos: no hay proveedor de envío, ni antispam, ni casilla RGPD de formulario. **No se añade a ninguna lista de correo.**

## Portugués

Árbol espejo bajo `/pt/`. Fase 7. Alcance propuesto: Paraísos, Cuándo ir, Condiciones, Despedidas, Agencia. Las fichas de locales quedan en español. Etiquetas `hreflang` y revisión humana de la traducción.
