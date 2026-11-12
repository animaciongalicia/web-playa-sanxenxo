# 03 · Modelo de datos

Los datos viven en `data/*.json` (copiados desde `data-semilla/` en la Fase 2) y se validan con **zod** (`lib/esquemas.ts`). El comando `npm run check:datos` debe fallar si un archivo no cumple el esquema.

## Campos de control (en toda ficha)

| Campo | Tipo | Significado |
|---|---|---|
| `id` | string | Identificador estable, en minúsculas y con guiones |
| `slug` | string | Parte de la URL |
| `publicar` | `true \| false \| null` | `null` = pendiente de decisión de Pablo. Solo `true` se publica |
| `verificado` | boolean | `false` por defecto. Solo Pablo lo cambia a `true` |
| `ultima_verificacion` | `"AAAA-MM-DD" \| null` | Fecha en que Pablo confirmó la ficha |
| `origen` | string | De dónde salió el dato (`"lista de Pablo"`, `"búsqueda web 2026"`, `"propio"`…) |
| `datos_fuente` | string[] | Datos tal como salieron de la fuente web. **No se publican** hasta que Pablo los confirme; sirven de base para redactar con él |
| `notas_internas` | string \| null | Nunca se muestra |

**Regla:** un campo sin dato es `null`. Nunca se rellena con texto inventado.

## Esquemas

```ts
// Playa
type Playa = {
  id: string; slug: string; nombre: string;
  municipio: string | null;
  tramo: 'aldan' | 'bueu' | 'marin' | 'poio-combarro' | 'sanxenxo' | 'portonovo' | 'noalla-lanzada' | 'o-grove-san-vicente';
  nucleo: boolean;                       // Sanxenxo, Portonovo, Noalla–A Lanzada, O Grove–San Vicente
  top: boolean | null;                   // decisión pendiente (ver docs/01)
  top_propuesta_anterior: boolean;
  top_propuesta_nucleo: boolean;
  naturista: boolean;
  descripcion: string | null;
  coordenadas: { lat: number; lng: number } | null;
  bandera_azul: { anio: number; fuente: string } | null;
  fotos: string[];
} & Control;

// Local (restaurante, chiringuito, furancho, vinoteca, diversión)
type Local = {
  id: string; slug: string; nombre: string;
  tipo: 'restaurante' | 'chiringuito' | 'furancho' | 'vinoteca' | 'copas' | 'terraza' | 'discoteca' | 'alta-cocina';
  zona: string;                          // ver zonas abajo
  municipio: string | null;
  direccion: string | null;
  playa_cercana: string | null;
  como_es: string | null;                // lo escribe Pablo o se redacta desde datos reales
  que_se_come: string | null;            // o "que_se_bebe" en diversión
  contacto: { telefono: string | null; web: string | null; email: string | null };
  meses_apertura: string | null;         // furanchos: "dic–jun aprox."
  horario_tipico: string | null;
  despedidas: {
    admite: 'si' | 'segun-epoca' | 'no' | 'desconocido';
    cuando: string | null;
    como: string | null;
  };
  pagina_propia: boolean;
  tambien_en: string[];                  // ids de otras listas donde aparece (una sola ficha)
  tipo_dudoso: boolean;                  // p. ej. "estilo furancho"
  decision_pendiente: string | null;
} & Control;

// Actividad
type Actividad = {
  id: string; slug: string; nombre: string;
  familia: 'mar-con-motor' | 'playa-y-tabla' | 'pesca' | 'mar-y-mesa' | 'kayak-areoso' | 'dias-a-medida';
  descripcion: string | null;
  donde: { tipo: 'puerto' | 'playa' | 'zona'; nombre: string }[];   // OBLIGATORIO mostrarlo
  duracion: string | null;
  grupo_minimo: number | null;
  temporada: string | null;
  notas_operativas: string[];            // p. ej. "el tiempo se reparte entre el grupo"
  a_medida: boolean;                     // día producido a medida (no hay proveedor cerrado)
} & Control;

// Barco
type Barco = {
  id: string; slug: string;
  categoria: 'yate' | 'velero';
  nombre: string | null;
  plazas: number | null;
  patron: 'siempre' | 'opcional' | null;
  puerto_salida: string | null;
  precio_desde: { importe: number; moneda: 'EUR'; unidad: string } | null;
  enlace_reserva: string;                // seagalicia.com
} & Control;

// Destino de mar
type Destino = {
  id: 'ons' | 'cies' | 'aldan'; slug: string; nombre: string;
  parque_nacional: boolean;
  descripcion: string | null;
  como_se_llega: string | null;
  cupos_permisos: string | null;         // a confirmar con Pablo
  playas: string[];                      // ids de playas
} & Control;

// Mes (cuándo ir)
type Mes = {
  id: 'mayo' | 'junio' | 'julio' | 'agosto' | 'septiembre' | 'resto-del-ano';
  ambiente: string | null;
  abre_y_cierra: string | null;
  despedidas: string | null;
  cupos_ons_cies: string | null;
  mar_y_playa: string | null;
  recomendacion: string | null;
} & Control;

// Servicio de pie
type Servicio = {
  id: 'limusinas' | 'humor-amarillo';
  descripcion: string | null;
  salidas: string[];                     // limusinas: Sanxenxo, Combarro, O Grove
  estado_2027: 'pendiente' | 'confirmado' | 'no-se-ofrece';
} & Control;
```

## Zonas de locales

| Tipo | Zonas permitidas |
|---|---|
| Restaurantes | `aldan`, `bueu`, `marin`, `combarro-raxo`, `sanxenxo-portonovo`, `o-grove` |
| Chiringuitos | `aldan`, `bueu`, `poio-raxo`, `sanxenxo-portonovo`, `noalla-lanzada`, `o-grove-san-vicente` |
| Furanchos | `sanxenxo-portonovo`, `meano`, `cambados`, `ribadumia-vilanova`, `o-grove`, `bueu-marin`, `sin-zona` |
| Diversión | `sanxenxo-puerto`, `portonovo`, `a-lanzada-san-vicente`, `o-grove` |

## Archivos semilla (`data-semilla/`)

| Archivo | Contenido |
|---|---|
| `playas.json` | 39 playas, con tramo, núcleo y banderas de "top" |
| `locales.json` | Restaurantes (15 + A Vichona), alta cocina, reserva y candidatos (sin publicar), 20 chiringuitos, 17 furanchos y 22 locales de diversión (18 fichas + 4 referencias en `diversion_referencias`, porque esos cuatro viven en chiringuitos) |
| `actividades.json` | Actividades por familia, con "dónde se hace" |
| `mar-y-barcos.json` | Ons, Cíes, Aldán, yates, veleros y traslados |
| `servicios-y-meses.json` | Limusinas, Humor Amarillo y esqueleto de los 6 meses |

Todo está en `verificado: false`. Los teléfonos y direcciones vienen de fuentes web (algunas de 2021); no se publican hasta que Pablo los confirme.

## Qué se muestra en producción y qué no

- No se publica nada con `publicar` distinto de `true`.
- No se muestran teléfonos con `verificado: false`.
- Los campos `null` no se pintan (sin "N/D" ni textos de relleno).
- `notas_internas` y `decision_pendiente` nunca salen en producción.

## Exportación (herencia del blueprint de Entiende Tu Sueño)

Ruta `app/api/fichas-export/route.ts` (solo lectura, protegida con un token en variable de entorno) que expone en JSON las fichas y su fecha de verificación, para automatizaciones posteriores.
