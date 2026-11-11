import { readFileSync } from 'node:fs';

/** @type {import('next').NextConfig} */

// Cabeceras de seguridad (docs/05).
const seguridad = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const lanzado = process.env.LANZADO === '1';

// Redirecciones 301 del dominio antiguo (data/redirecciones.json, docs/06).
const { redirecciones } = JSON.parse(readFileSync(new URL('./data/redirecciones.json', import.meta.url), 'utf8'));

const nextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...seguridad,
          // BLOQUEO TOTAL hasta el lanzamiento (Fase 9): se retira al poner LANZADO=1.
          ...(lanzado ? [] : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]),
        ],
      },
    ];
  },
  async redirects() {
    return redirecciones.map((r) => ({ source: r.de, destination: r.a, statusCode: 301 }));
  },
};

export default nextConfig;
