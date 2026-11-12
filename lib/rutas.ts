// Mapa de rutas (docs/02). Cada ruta existe como página desde la Fase 1.
// `pt: true` = tiene versión portuguesa (alcance propuesto, decisión abierta nº 6).
// Las páginas dinámicas por ficha (playa top, local) se añaden con su fase.

export type Ruta = {
  ruta: string; // con barra inicial y final
  titulo: string;
  descripcion?: string;
  fase: number; // fase del plan en la que se rellena de verdad
  pt?: boolean;
  servicio?: 'limusinas' | 'humor-amarillo';
  /** true = sin página propia: la sirve la plantilla genérica de app/[lang]/[...slug]. Si una ruta tiene página propia NO debe llevarlo (dos rutas no pueden generar la misma URL). */
  generica?: boolean;
};

export const RUTAS: Ruta[] = [
  // Paraísos (fase 3)
  { ruta: '/paraisos/', titulo: 'Paraísos', descripcion: 'Playas y mar de Sanxenxo y alrededores.', fase: 3, pt: true },
  { ruta: '/paraisos/playas/', titulo: 'Playas', descripcion: 'Las playas por tramo de costa y las 9 imprescindibles.', fase: 3, pt: true },
  { ruta: '/paraisos/playas/sanxenxo/', titulo: 'Playas de Sanxenxo', fase: 3, pt: true },
  { ruta: '/paraisos/playas/portonovo/', titulo: 'Playas de Portonovo', fase: 3, pt: true },
  { ruta: '/paraisos/playas/noalla-a-lanzada/', titulo: 'Playas de Noalla y A Lanzada', fase: 3, pt: true },
  { ruta: '/paraisos/playas/o-grove-san-vicente/', titulo: 'Playas de O Grove y San Vicente', fase: 3, pt: true },
  { ruta: '/paraisos/playas/mas-alla/', titulo: 'Más allá: Aldán, Bueu, Marín, Poio y Combarro', fase: 3, pt: true },
  { ruta: '/paraisos/mar/', titulo: 'Mar', descripcion: 'Ons, Cíes y la ría de Aldán.', fase: 3, pt: true },
  { ruta: '/paraisos/mar/islas-ons/', titulo: 'Isla de Ons', descripcion: 'Parque Nacional de las Islas Atlánticas.', fase: 3, pt: true },
  { ruta: '/paraisos/mar/islas-cies/', titulo: 'Islas Cíes', descripcion: 'Parque Nacional de las Islas Atlánticas.', fase: 3, pt: true },
  { ruta: '/paraisos/mar/ria-de-aldan/', titulo: 'Ría de Aldán, el Caribe gallego', fase: 3, pt: true },

  // Barcos (fase 4)
  { ruta: '/barcos/', titulo: 'Barcos', descripcion: 'Yates, veleros, pesquero y lancha rápida.', fase: 4 },
  { ruta: '/barcos/traslados/', titulo: 'Traslados a Ons, Cíes y Aldán', fase: 4 },

  // Actividades (fase 4)
  { ruta: '/actividades/', titulo: 'Actividades', descripcion: 'Qué hacer en el mar y en la playa con tu grupo.', fase: 4 },
  { ruta: '/actividades/mar-con-motor/', titulo: 'Mar con motor', fase: 4 },
  { ruta: '/actividades/playa-y-tabla/', titulo: 'Playa y tabla', fase: 4 },
  { ruta: '/actividades/pesca/', titulo: 'Pesca', fase: 4 },
  { ruta: '/actividades/mar-y-mesa/', titulo: 'Mar y mesa', fase: 4 },
  { ruta: '/actividades/dias-a-medida/', titulo: 'Días a medida', fase: 4 },
  { ruta: '/actividades/kayak-areoso/', titulo: 'Kayak en Areoso', fase: 4 },

  // Comer (fase 5)
  { ruta: '/comer/', titulo: 'Comer', descripcion: 'Restaurantes, chiringuitos y furanchos por zona.', fase: 5 },
  { ruta: '/comer/restaurantes/', titulo: 'Restaurantes', fase: 5 },
  { ruta: '/comer/chiringuitos/', titulo: 'Chiringuitos', fase: 5 },
  { ruta: '/comer/furanchos/', titulo: 'Furanchos', descripcion: 'Abren, más o menos, de diciembre a junio.', fase: 5 },

  // Diversión (fase 5)
  { ruta: '/diversion/', titulo: 'Diversión', descripcion: 'Terraceo, tardeo, puestas de sol y copas.', fase: 5 },
  { ruta: '/diversion/sanxenxo-puerto/', titulo: 'Diversión en el puerto de Sanxenxo', fase: 5 },
  { ruta: '/diversion/portonovo/', titulo: 'Diversión en Portonovo', fase: 5 },
  { ruta: '/diversion/a-lanzada-san-vicente/', titulo: 'Diversión en A Lanzada y San Vicente', fase: 5 },
  { ruta: '/diversion/o-grove/', titulo: 'Diversión en O Grove', fase: 5 },

  // Despedidas, cuándo ir, condiciones (fase 6)
  { ruta: '/despedidas/', titulo: 'Despedidas', descripcion: 'El plan en conjunto para tu despedida.', fase: 6, pt: true },
  { ruta: '/despedidas/soltero/', titulo: 'Despedida de soltero', fase: 6, pt: true },
  { ruta: '/despedidas/soltera/', titulo: 'Despedida de soltera', fase: 6, pt: true },
  { ruta: '/cuando-ir/', titulo: 'Cuándo ir y condiciones', descripcion: 'Mes a mes: qué te encuentras, qué te conviene y qué condiciones tienen las despedidas.', fase: 6, pt: true },

  // Pie (fase 6)
  { ruta: '/limusinas/', titulo: 'Limusinas', descripcion: 'Paseos en limusina desde Sanxenxo, Combarro y O Grove.', fase: 6, servicio: 'limusinas' },
  { ruta: '/humor-amarillo-en-sanxenxo/', titulo: 'Humor Amarillo', fase: 6, servicio: 'humor-amarillo' },
  { ruta: '/agencia/', titulo: 'Agencia', descripcion: 'Cuéntanos tu despedida.', fase: 6, pt: true },

  // Blog (fase 8)
  { ruta: '/blog/', titulo: 'Blog', descripcion: 'Novedades y consejos para tu despedida en Sanxenxo.', fase: 8 },

  // Legales (fase 6)
  { ruta: '/aviso-legal/', titulo: 'Aviso legal', fase: 6, generica: true },
  { ruta: '/privacidad/', titulo: 'Política de privacidad', fase: 6, generica: true },
  { ruta: '/politica-de-cookies/', titulo: 'Política de cookies', fase: 6, generica: true },
  { ruta: '/terminos-y-condiciones/', titulo: 'Términos y condiciones', fase: 6, generica: true },
];

export function buscarRuta(ruta: string): Ruta | undefined {
  return RUTAS.find((r) => r.ruta === ruta);
}

/** Migas de pan: padres que existen en el mapa + la propia página. */
export function migasDe(ruta: string): { titulo: string; ruta: string }[] {
  const partes = ruta.split('/').filter(Boolean);
  const migas: { titulo: string; ruta: string }[] = [];
  for (let i = 1; i <= partes.length; i++) {
    const r = buscarRuta('/' + partes.slice(0, i).join('/') + '/');
    if (r) migas.push({ titulo: r.titulo, ruta: r.ruta });
  }
  return migas;
}
