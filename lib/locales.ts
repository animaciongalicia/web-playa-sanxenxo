import type { Local } from './esquemas';

export const NOMBRE_ZONA: Record<Local['zona'], string> = {
  aldan: 'Aldán', bueu: 'Bueu', marin: 'Marín', 'combarro-raxo': 'Combarro y Raxó',
  'sanxenxo-portonovo': 'Sanxenxo y Portonovo', 'o-grove': 'O Grove',
  'poio-raxo': 'Poio y Raxó', 'noalla-lanzada': 'Noalla y A Lanzada', 'o-grove-san-vicente': 'O Grove y San Vicente',
  meano: 'Meaño', cambados: 'Cambados', 'ribadumia-vilanova': 'Ribadumia y Vilanova', 'bueu-marin': 'Bueu y Marín', 'sin-zona': 'Sin zona',
  'sanxenxo-puerto': 'Puerto de Sanxenxo', portonovo: 'Portonovo', 'a-lanzada-san-vicente': 'A Lanzada y San Vicente',
  'por-definir': 'Por definir',
};

export const TIPO_LOCAL: Record<Local['tipo'], string> = {
  restaurante: 'Restaurante', chiringuito: 'Chiringuito', furancho: 'Furancho', vinoteca: 'Vinoteca',
  copas: 'Copas', terraza: 'Terraza', discoteca: 'Discoteca', 'alta-cocina': 'Alta cocina',
};

/** Zonas de furanchos con página (las otras dos no se publican hasta tener datos). */
export const ZONAS_FURANCHOS = ['sanxenxo-portonovo', 'meano', 'cambados', 'ribadumia-vilanova'] as const;
export const ZONAS_DIVERSION = ['sanxenxo-puerto', 'portonovo', 'a-lanzada-san-vicente', 'o-grove'] as const;

export function agruparPorZona(locales: Local[]): { zona: Local['zona']; locales: Local[] }[] {
  const mapa = new Map<Local['zona'], Local[]>();
  for (const l of locales) mapa.set(l.zona, [...(mapa.get(l.zona) ?? []), l]);
  return [...mapa].map(([zona, locales]) => ({ zona, locales }));
}
