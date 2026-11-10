# 01 · Visión y decisiones

## Visión en una frase

Una guía honesta de playas, mar, barcos, actividades, comida y diversión de **ría de Aldán a O Grove**, escrita por alguien con 15-20 años vendiendo en la zona, que ayuda a decidir cómo organizar una despedida y deja la venta a una página de agencia.

## Principio rector: informar para las despedidas, vender sin vender

- Cada página responde una duda real (dónde ir, cuándo, qué hacer, cómo está el ambiente).
- Ninguna página empuja a comprar. Como mucho, un enlace discreto a `/agencia/`.
- La ventaja competitiva es el **conocimiento no escrito en internet**: cuándo ir, qué pasa en julio y agosto, qué se puede y qué no con una despedida.

## Estructura de negocio (contexto)

- Esta web **informa y deriva**. Vende grupos y despedidas a través de la agencia.
- Hay otras dos webs de despedidas de Pablo en Sanxenxo (una propia que vende la actividad y un dominio comprado a un competidor). **No se toca nada de ellas**; esta web no compite por las mismas palabras de "reservar ya", se centra en "qué hacer según tu grupo y la época".
- El dominio actual tiene **muy poca autoridad** (4 sitios enlazan, uno parece basura). Solo se reaprovecha el dominio y 8 páginas con tráfico real.

## Decisiones cerradas

| Tema | Decisión |
|---|---|
| Nombre | **Playa Sanxenxo** (el dominio mantiene "despedidas") |
| Zona | De la ría de Aldán a O Grove y A Toja |
| Núcleo de la guía | Sanxenxo, Portonovo, Noalla–A Lanzada, O Grove–San Vicente |
| Más allá del núcleo | Aldán, Bueu, Marín, Poio, Combarro (menos peso) |
| Playas | 39 identificadas, "nos llegan de sobras". Todas se llegan en coche y en barco: **sin campo de acceso ni de ambiente** |
| Playas top | 8 imprescindibles, **como sección dentro de su tramo** (sin páginas sueltas). Decisión de Pablo, 2026-11-10 |
| Mar | Tres bloques propios: **Ons, Cíes (Parque Nacional de las Islas Atlánticas) y Aldán (el Caribe gallego)** |
| Barcos | 3-4 yates y 3-4 veleros de 11 plazas más patrón. Precios "desde". Se enlaza a seagalicia.com |
| Traslados | Lancha rápida a Ons, Cíes y Aldán |
| Actividades | Lista recortada (ver `data-semilla/actividades.json`). **Kayak en Areoso sí, solo kayak**, página propia por las búsquedas |
| Comer | Restaurantes (10-15 + A Vichona), chiringuitos, furanchos **agrupados por zona** (no una página por furancho) |
| Diversión | Sustituye a "copas y noche". Por zona. **Sin rutas** |
| Despedidas | Solo soltero y soltera. Sin página de "grupos" ni de "cenas de grupo" |
| A Vichona | Local de Pablo, asador de churrasco. **Caben 120 personas**, varios espacios y privados para shows. Se presenta dentro de despedidas |
| Cuándo ir | Mayo, junio, julio, agosto, septiembre y "resto del año" agrupado. Lo escribe Pablo (entrevista) |
| Condiciones de las despedidas | Página aparte, al pie. Explica las condiciones en la zona, sobre todo en julio y agosto |
| Limusinas | Pie de página. Servicio de paseos desde Sanxenxo, Combarro y O Grove. Posiciona. `estado_2027: pendiente` |
| Humor Amarillo | Pie de página. Posiciona muy bien y lo buscan las despedidas. Se mantiene la URL. `estado_2027: pendiente` |
| Agencia | Página en el pie. **Contacto directo: correo (abre el del cliente), WhatsApp o llamada. Sin formulario** |
| Idiomas | Español completo y portugués **parcial** |
| Captación | **Cero email.** Sin guía descargable |
| Contenido antiguo | Solo se mantienen 8 páginas (ver `docs/06`). Todo lo demás se retira |
| Locales antiguos que se mantienen | A Ferreira, A Curva, Gassho, Varadero, Buddha, Dux |
| Locales antiguos que se descartan | Zoo Club, Pirámide |

## Decisiones abiertas (con propuesta por defecto)

Claude Code **no debe resolver estas**: las deja con la propuesta por defecto y las marca `decision_pendiente`.

1. ~~Las 8 playas top~~ **Resuelta (Pablo, 2026-11-10): propuesta del núcleo.** Dos candidatas eran:
   - *Propuesta anterior (cubre ría de Pontevedra):* Silgar, Montalvo, Areas, Lourido, Lapamán, Portomaior, Aguete, Mogor.
   - *Propuesta del núcleo:* Silgar, Montalvo, Areas, A Lanzada, Areas Gordas, Pragueira, Pedras Negras, A Barrosa.
   - **Por defecto:** la propuesta del núcleo, porque 5 de las anteriores están fuera del núcleo. Los datos llevan ambas banderas (`top_propuesta_anterior`, `top_propuesta_nucleo`).
2. **Chiringuitos:** hay 20 candidatos. Propuesta: publicar 8-10. Por defecto, `publicar: null` en todos hasta que decida Pablo.
3. **Alta cocina** (Pepe Vieira, Culler de Pau, Solla): bloque aparte opcional. Por defecto, `publicar: false`.
4. **Galeón:** lo anuncia Sea Galicia, pero Pablo ya solo habla de yates y veleros. Por defecto, fuera.
5. **Cómo se muestra "admite despedidas":** por defecto solo se muestra `si` o `segun-epoca`; el `no` va agregado en `/condiciones-despedidas/`.
6. **Portugués:** qué secciones se traducen (propuesta: Paraísos, Cuándo ir, Condiciones, Despedidas, Agencia).
7. ~~Proveedor de envío del formulario~~ **Resuelta:** no hay formulario; contacto por correo, WhatsApp o llamada.
8. **Páginas de casas rurales / alojamientos y "beauty relax en O Grove":** tuvieron algo de tráfico en la web vieja y no encajan con este plan. Por defecto, se retiran.
9. **Restaurantes de la lista de reserva** (Pinela, Doade, Menduiña, O Farol…): por defecto fuera de la publicación inicial.

## Fuera de alcance (no se hace)

- Rutas de noche, "noche pura", strippers, tuppersex, discoteca Pirámide, Zoo Club.
- Bodyboard, vela, windsurf, lancha o motora de alquiler, aquakarts, buceo para titulados, avistamiento de cetáceos, snorkel/SUP/bicicleta acuática en Areoso.
- Flyboard, e-foil, wingfoil, kitesurf, coasteering, parque hinchable, hidropedales.
- Captación de email, newsletter, guía descargable.
- Llamadas a locales: **cero**. Pablo conoce a los dueños y rellena los datos él.
