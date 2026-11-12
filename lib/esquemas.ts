// Esquemas zod de docs/03. Un campo sin dato es `null`: nunca texto inventado.
import { z } from 'zod';

const fecha = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'fecha AAAA-MM-DD');
const idKebab = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'minúsculas y guiones');

/** Campos de control de toda ficha. */
export const Control = z.object({
  publicar: z.boolean().nullable(), // null = pendiente de decisión de Pablo
  verificado: z.boolean(),
  ultima_verificacion: fecha.nullable(),
  origen: z.string(),
  datos_fuente: z.array(z.string()),
  notas_internas: z.string().nullable(),
});

const base = { id: idKebab, slug: idKebab };

// ── Playa ──────────────────────────────────────────────
export const TRAMOS = ['aldan', 'bueu', 'marin', 'poio-combarro', 'sanxenxo', 'portonovo', 'noalla-lanzada', 'o-grove-san-vicente'] as const;

export const Playa = z
  .object({
    ...base,
    nombre: z.string().min(1),
    municipio: z.string().nullable(),
    tramo: z.enum(TRAMOS),
    nucleo: z.boolean(),
    top: z.boolean().nullable(),
    top_propuesta_anterior: z.boolean(),
    top_propuesta_nucleo: z.boolean(),
    naturista: z.boolean(),
    descripcion: z.string().nullable(),
    coordenadas: z.object({ lat: z.number(), lng: z.number() }).nullable(),
    bandera_azul: z.object({ anio: z.number().int(), fuente: z.string() }).nullable(),
    fotos: z.array(z.string()),
  })
  .merge(Control)
  .strict();

// ── Local ──────────────────────────────────────────────
export const TIPOS_LOCAL = ['restaurante', 'chiringuito', 'furancho', 'vinoteca', 'copas', 'terraza', 'discoteca', 'alta-cocina'] as const;
export const ZONAS_LOCAL = [
  // restaurantes
  'aldan', 'bueu', 'marin', 'combarro-raxo', 'sanxenxo-portonovo', 'o-grove',
  // chiringuitos
  'poio-raxo', 'noalla-lanzada', 'o-grove-san-vicente',
  // furanchos
  'meano', 'cambados', 'ribadumia-vilanova', 'bueu-marin', 'sin-zona',
  // diversión
  'sanxenxo-puerto', 'portonovo', 'a-lanzada-san-vicente',
  // pendiente: Pablo aún no ha dado la dirección (A Vichona). No se inventa la zona.
  'por-definir',
] as const;

export const Local = z
  .object({
    ...base,
    nombre: z.string().min(1),
    tipo: z.enum(TIPOS_LOCAL),
    zona: z.enum(ZONAS_LOCAL),
    municipio: z.string().nullable(),
    direccion: z.string().nullable(),
    playa_cercana: z.string().nullable(),
    como_es: z.string().nullable(),
    que_se_come: z.string().nullable(), // en diversión equivale a "qué se bebe"
    que_se_bebe: z.string().nullable().optional(),
    contacto: z.object({ telefono: z.string().nullable(), web: z.string().nullable(), email: z.string().nullable() }),
    meses_apertura: z.string().nullable(),
    horario_tipico: z.string().nullable(),
    despedidas: z.object({
      admite: z.enum(['si', 'segun-epoca', 'no', 'desconocido']),
      cuando: z.string().nullable(),
      como: z.string().nullable(),
    }),
    pagina_propia: z.boolean(),
    // Listas donde el local aparece además de la suya (una sola ficha; las listas enlazan a ella).
    tambien_en: z.array(z.enum(['restaurantes', 'chiringuitos', 'furanchos', 'diversion'])),
    tipo_dudoso: z.boolean(),
    decision_pendiente: z.string().nullable(),
  })
  .merge(Control)
  .strict();

export const DiversionReferencia = z.object({ zona: z.string(), ref: idKebab, nota: z.string().nullable().optional() }).strict();

// ── Actividad ──────────────────────────────────────────
export const FAMILIAS = ['mar-con-motor', 'playa-y-tabla', 'pesca', 'mar-y-mesa', 'kayak-areoso', 'dias-a-medida'] as const;

export const Actividad = z
  .object({
    ...base,
    nombre: z.string().min(1),
    familia: z.enum(FAMILIAS),
    descripcion: z.string().nullable(),
    // OBLIGATORIO: toda actividad dice dónde se hace.
    donde: z.array(z.object({ tipo: z.enum(['puerto', 'playa', 'zona']), nombre: z.string() })).min(1, 'toda actividad necesita "donde"'),
    duracion: z.string().nullable(),
    grupo_minimo: z.number().int().nullable(),
    temporada: z.string().nullable(),
    notas_operativas: z.array(z.string()),
    a_medida: z.boolean(),
  })
  .merge(Control)
  .strict();

// ── Barco, traslado, destino ───────────────────────────
export const CATEGORIAS_BARCO = ['yate', 'velero', 'yate-motora', 'pesquero', 'lancha-rapida'] as const;

/** Un precio de un barco. `desde` = "desde X €". `importe_max` para rangos (650-700). */
export const PrecioBarco = z.object({
  concepto: z.string(), // "Medio día (4 h)", "Día entero (8 h)"…
  importe: z.number(),
  importe_max: z.number().nullable(),
  desde: z.boolean(),
});

export const Barco = z
  .object({
    ...base,
    categoria: z.enum(CATEGORIAS_BARCO),
    nombre: z.string().nullable(),
    modelo: z.string().nullable(), // p. ej. "Bavaria 42"
    eslora: z.string().nullable(), // texto libre: "Entre 21 y 40 pies"
    plazas: z.number().int().nullable(), // máximo de personas
    plazas_opciones: z.array(z.number().int()), // si hay varias versiones (11, 16 o 21)
    patron: z.enum(['siempre', 'opcional']).nullable(),
    puerto_salida: z.string().nullable(),
    zona: z.string().nullable(), // p. ej. "Solo en la ría de Aldán"
    duracion: z.string().nullable(),
    descripcion: z.string().nullable(),
    precios: z.array(PrecioBarco),
    incluye: z.array(z.string()), // lo que incluye el precio
    consultar: z.string().nullable(), // lo que cambia según el barco (p. ej. combustible en yates)
    fotos: z.array(z.string()), // nombres de archivo en public/img/ (los pone Pablo)
    enlace_reserva: z.string().url(),
  })
  .merge(Control)
  .strict();

export const Traslado = z
  .object({
    id: idKebab,
    slug: idKebab,
    destino: z.enum(['ons', 'cies', 'aldan']),
    tipo: z.literal('lancha-rapida'),
    puerto_salida: z.string().nullable(),
    duracion: z.string().nullable(),
    precio_desde: z.object({ importe: z.number(), moneda: z.literal('EUR'), unidad: z.string() }).nullable(),
    enlace_reserva: z.string().url(),
  })
  .merge(Control)
  .strict();

export const Destino = z
  .object({
    id: z.enum(['ons', 'cies', 'aldan']),
    slug: idKebab,
    nombre: z.string().min(1),
    parque_nacional: z.boolean(),
    descripcion: z.string().nullable(),
    como_se_llega: z.string().nullable(),
    cupos_permisos: z.string().nullable(), // a confirmar con Pablo
    playas: z.array(idKebab),
  })
  .merge(Control)
  .strict();

// ── Mes (cuándo ir) ────────────────────────────────────
export const Mes = z
  .object({
    id: z.enum(['mayo', 'junio', 'julio', 'agosto', 'septiembre', 'resto-del-ano']),
    ambiente: z.string().nullable(),
    abre_y_cierra: z.string().nullable(),
    despedidas: z.string().nullable(),
    cupos_ons_cies: z.string().nullable(),
    mar_y_playa: z.string().nullable(),
    recomendacion: z.string().nullable(),
  })
  .merge(Control)
  .strict();

// ── Servicio de pie ────────────────────────────────────
export const Servicio = z
  .object({
    id: z.enum(['limusinas', 'humor-amarillo']),
    descripcion: z.string().nullable(),
    salidas: z.array(z.string()),
    estado_2027: z.enum(['pendiente', 'confirmado', 'no-se-ofrece']),
  })
  .merge(Control)
  .strict();

export type Playa = z.infer<typeof Playa>;
export type Local = z.infer<typeof Local>;
export type Actividad = z.infer<typeof Actividad>;
export type Barco = z.infer<typeof Barco>;
export type Traslado = z.infer<typeof Traslado>;
export type Destino = z.infer<typeof Destino>;
export type Mes = z.infer<typeof Mes>;
export type Servicio = z.infer<typeof Servicio>;

/** Forma de cada archivo de data/. Las claves `_nota` y similares se ignoran. */
export const ArchivoPlayas = z.object({ playas: z.array(Playa) }).passthrough();
export const ArchivoActividades = z.object({ actividades: z.array(Actividad) }).passthrough();
export const ArchivoMar = z.object({ destinos: z.array(Destino), barcos: z.array(Barco), traslados: z.array(Traslado) }).passthrough();
export const ArchivoServicios = z.object({ servicios: z.array(Servicio), meses: z.array(Mes) }).passthrough();
export const ArchivoLocales = z
  .object({
    restaurantes: z.array(Local),
    alta_cocina: z.array(Local),
    reserva: z.array(Local),
    candidatos: z.array(Local),
    chiringuitos: z.array(Local),
    furanchos: z.array(Local),
    diversion: z.array(Local),
    diversion_referencias: z.array(DiversionReferencia),
  })
  .passthrough();
