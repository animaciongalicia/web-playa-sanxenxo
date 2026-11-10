/** @type {import('next').NextConfig} */

// Cabeceras de seguridad (docs/05).
const seguridad = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

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
          // BLOQUEO TOTAL hasta la Fase 9 (lanzamiento). Se retira entonces.
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
  // Fase 8: aquí irán las redirecciones 301 de docs/06.
};

export default nextConfig;
