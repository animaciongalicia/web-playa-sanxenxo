import type { Playa } from './esquemas';

// Los 5 tramos de la guía (rutas de docs/02) y los tramos de datos que agrupa cada uno.
export const TRAMOS_RUTA = [
  { slug: 'sanxenxo', titulo: 'Sanxenxo', tramos: ['sanxenxo'] },
  { slug: 'portonovo', titulo: 'Portonovo', tramos: ['portonovo'] },
  { slug: 'noalla-a-lanzada', titulo: 'Noalla y A Lanzada', tramos: ['noalla-lanzada'] },
  { slug: 'o-grove-san-vicente', titulo: 'O Grove y San Vicente', tramos: ['o-grove-san-vicente'] },
  { slug: 'mas-alla', titulo: 'Más allá del núcleo', tramos: ['aldan', 'bueu', 'marin', 'poio-combarro'] },
] as const;

export const NOMBRE_TRAMO: Record<Playa['tramo'], string> = {
  aldan: 'Aldán', bueu: 'Bueu', marin: 'Marín', 'poio-combarro': 'Poio y Combarro',
  sanxenxo: 'Sanxenxo', portonovo: 'Portonovo', 'noalla-lanzada': 'Noalla y A Lanzada', 'o-grove-san-vicente': 'O Grove y San Vicente',
};

export const buscarTramoRuta = (slug: string) => TRAMOS_RUTA.find((t) => t.slug === slug);
export const slugTramoDe = (tramo: Playa['tramo']) => TRAMOS_RUTA.find((r) => (r.tramos as readonly string[]).includes(tramo))!.slug;

/** Las 8 top. Decisión abierta nº 1: mientras `top` sea null manda la propuesta del núcleo. */
export const esTop = (p: Playa): boolean => p.top ?? p.top_propuesta_nucleo;

export const DESTINO_SLUG = { ons: 'islas-ons', cies: 'islas-cies', aldan: 'ria-de-aldan' } as const;

export const FAMILIAS_INFO = {
  'mar-con-motor': { titulo: 'Mar con motor', texto: 'Motos de agua, parascending y sesión acuática desde barco.' },
  'playa-y-tabla': { titulo: 'Playa y tabla', texto: 'Surf, paddle surf, Big SUP y kayak.' },
  'pesca': { titulo: 'Pesca', texto: 'Pesca recreativa y pesca-turismo, con quien conoce el mar.' },
  'mar-y-mesa': { titulo: 'Mar y mesa', texto: 'Bateas, mariscada en barco y churrascada.' },
  'dias-a-medida': { titulo: 'Días a medida', texto: 'Días producidos casi a medida: olimpiadas, gymkana, fiesta con DJ…' },
  'kayak-areoso': { titulo: 'Kayak en Areoso', texto: 'Rutas a un islote protegido: formatos, precios orientativos y permiso.' },
} as const;
