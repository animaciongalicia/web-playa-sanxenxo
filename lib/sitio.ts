// Lista de URLs reales de la web (una sola fuente para sitemap y comprobaciones).
import { getLocales } from './datos';
import { RUTAS } from './rutas';

export const SITIO = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.despedidasplayasanxenxo.com';

/** Todas las rutas españolas que existen, con barra inicial y final. El portugués se añade con la Fase 7. */
export function todasLasRutas(): string[] {
  const rutas = new Set<string>(['/']);
  for (const r of RUTAS) rutas.add(r.ruta);
  for (const l of getLocales('restaurantes')) if (l.pagina_propia) rutas.add(`/comer/restaurantes/${l.slug}/`);
  for (const l of getLocales('diversion')) if (l.pagina_propia) rutas.add(`/diversion/${l.zona}/${l.slug}/`);
  return [...rutas].sort();
}
