import type { MetadataRoute } from 'next';

// BLOQUEA TODO hasta la Fase 9 (lanzamiento). Entonces se abre y se añade el sitemap.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', disallow: '/' } };
}
