# 07 · Contenido pendiente (lo que solo Pablo puede aportar)

Claude Code **no rellena nada de esto por su cuenta**. Cada punto se marca como hecho cuando Pablo lo entrega.

## Checklist por fase

### Antes de la Fase 3 (Paraísos)
- [ ] Decidir las **8 playas top** (ver `docs/01`, decisión 1).
- [ ] Resto de playas de la ría de Aldán, y playas de A Toja.
- [ ] Descripción de **Ons, Cíes y Aldán** (el Caribe gallego), con cupos y permisos del Parque Nacional.
- [ ] Fotos propias (nombre de archivo: `playa-silgar-01.jpg`; con el permiso de uso que corresponda).

### Antes de la Fase 4 (Barcos y actividades)
- [ ] **Yates** (3-4): nombre, plazas, puerto de salida, precio "desde".
- [ ] **Veleros** (3-4, 11 plazas más patrón): nombre, puerto de salida, precio "desde".
- [ ] **Traslados** en lancha rápida a Ons, Cíes y Aldán: puertos de salida, duración, precio "desde".
- [ ] Confirmar si el **galeón** se queda fuera.
- [ ] Revisar `data-semilla/actividades.json`: dónde se hace cada una (puertos, playas o zonas) y notas operativas.

### Antes de la Fase 5 (Comer y Diversión)
- [ ] Marcar `publicar: true/false` en restaurantes, chiringuitos y diversión.
- [ ] Decidir cuántos **chiringuitos** se publican (propuesta: 8-10) y si entran los de Aldán.
- [ ] Para cada local publicado: `como_es`, `que_se_come` (o `que_se_bebe`), contacto verificado y `despedidas` (admite, cuándo, cómo).
- [ ] **Furanchos:** meses de apertura reales; zonas **O Grove** y **Bueu–Marín** (aún sin datos); ubicación de A de Pastora y Bouzabella; aclarar si A Casa Pequena es furancho o casa de comidas; municipio de O Outeiro (Dorrón).
- [ ] **Diversión:** más locales si faltan (Pablo avisó de que faltaban cosas), horarios típicos, qué ponen cada día.
- [ ] **A Vichona:** dirección, cómo es, qué se come, fotos de los espacios, qué espacios privados tiene para shows.

### Antes de la Fase 6 (Despedidas, Cuándo ir, Condiciones)
- [ ] **Cuándo ir**: entrevista mes a mes (guion abajo).
- [ ] **Condiciones de las despedidas**: qué se puede y qué no en la zona, sobre todo en julio y agosto (texto agregado, sin señalar locales).
- [ ] **Limusinas**: descripción del servicio, salidas (Sanxenxo, Combarro, O Grove), capacidad, precios si se publican.
- [ ] **Humor Amarillo**: descripción del servicio como se hacía cada verano (confirmar la redacción).
- [ ] Texto de la página de agencia.
- [ ] **Correo de la agencia** y **número para llamadas** (WhatsApp ya dado: 678 288 284). Sin formulario: no hace falta proveedor de envío.
- [ ] Textos legales: partir de los del WordPress actual (Aviso legal, Términos, Cookies), revisados.

### Antes de la Fase 7 (Portugués)
- [ ] Confirmar el alcance de la traducción.
- [ ] Persona que revisa el portugués.

### Antes de la Fase 8-9
- [ ] ID de GA4.
- [ ] Acceso a Search Console.
- [ ] Acceso al DNS.
- [ ] Aviso a quien gestione el hosting actual.

## Guion de entrevista para "Cuándo ir"

Se hace **una entrevista por mes** (mayo, junio, julio, agosto, septiembre y resto del año). Claude escribe solo lo que Pablo cuente, sin añadir.

1. ¿Cómo está el ambiente en la zona este mes? ¿Quién viene?
2. ¿Qué abre y qué cierra (furanchos, chiringuitos, locales de diversión)?
3. ¿Cómo está el mar y la playa (temperatura, viento, gente)?
4. ¿Se admiten despedidas? ¿Dónde sí, bajo qué condiciones, cuánto hay que anticipar?
5. ¿Hay cupos o limitaciones para Ons y Cíes? ¿Hay que reservar con antelación?
6. ¿Qué no se debería hacer este mes (errores típicos)?
7. ¿Qué actividades funcionan mejor?
8. ¿Qué barco o salida recomiendas ese mes?
9. ¿Qué plan recomiendas para un sábado de despedida?
10. ¿Qué le dirías a alguien que te llama preguntando "¿cuándo vengo?"?

**Para junio, julio, agosto y septiembre** se añade: ¿qué diferencia hay entre la primera y la segunda quincena?

Para **resto del año**: ¿qué se puede hacer fuera de temporada? ¿Qué está abierto? ¿Para quién tiene sentido?

## Cómo se transforma una entrevista en página

1. Pablo contesta (voz o texto, en bruto).
2. Claude ordena las respuestas en los campos del esquema `Mes`, **sin añadir hechos**.
3. Claude redacta el texto con la voz de la web (ver `CLAUDE.md`).
4. Pablo revisa y corrige. Solo entonces `verificado: true`.

## Lo que no se pide

- Llamadas a locales: cero (Pablo ya conoce a los dueños).
- Datos que se puedan consultar fácilmente en la web de cada local.
- Contenido de la web vieja, salvo los 8 elementos de `docs/06`.
