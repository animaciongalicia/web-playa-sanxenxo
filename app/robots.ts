import type { MetadataRoute } from 'next';

// BLOQUEA TODO hasta el lanzamiento (Fase 9). Con LANZADO=1 se abre; el sitemap llega en la Fase 8.
export default function robots(): MetadataRoute.Robots {
  if (process.env.LANZADO === '1') return { rules: { userAgent: '*', allow: '/' } };
  return { rules: { userAgent: '*', disallow: '/' } };
}
