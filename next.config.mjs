/** @type {import('next').NextConfig} */

// Cabeceras de seguridad (docs/05).
const seguridad = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const lanzado = process.env.LANZADO === '1';

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
  // Fase 8: aquí irán las redirecciones 301 de docs/06.
};

export default nextConfig;
