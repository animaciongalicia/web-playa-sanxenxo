import type { MetadataRoute } from 'next';
import { SITIO } from '../lib/sitio';

// BLOQUEA TODO hasta el lanzamiento (Fase 9). Con LANZADO=1 se abre y apunta al sitemap.
export default function robots(): MetadataRoute.Robots {
  if (process.env.LANZADO === '1') return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITIO}/sitemap.xml`, host: SITIO };
  return { rules: { userAgent: '*', disallow: '/' } };
}
