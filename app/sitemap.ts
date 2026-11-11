import type { MetadataRoute } from 'next';
import { SITIO, todasLasRutas } from '../lib/sitio';

// Todas las páginas que existen, en español (el portugués llega con la Fase 7). Las legales, sin prioridad.
export default function sitemap(): MetadataRoute.Sitemap {
  const legales = ['/aviso-legal/', '/privacidad/', '/politica-de-cookies/', '/terminos-y-condiciones/'];
  return todasLasRutas().map((ruta) => ({
    url: `${SITIO}${ruta === '/' ? '/' : ruta}`,
    priority: ruta === '/' ? 1 : legales.includes(ruta) ? 0.2 : ruta.split('/').filter(Boolean).length <= 1 ? 0.8 : 0.6,
    changeFrequency: legales.includes(ruta) ? 'yearly' : 'monthly',
  }));
}
