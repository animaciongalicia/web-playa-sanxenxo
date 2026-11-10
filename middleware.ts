import { NextResponse, type NextRequest } from 'next/server';

// Español sin prefijo (se reescribe internamente a /es/...), portugués bajo /pt/.
// /es/... directamente se redirige a la URL sin prefijo para no duplicar contenido.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/es' || pathname.startsWith('/es/')) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/es/, '') || '/';
    return NextResponse.redirect(url, 308);
  }
  if (pathname === '/pt' || pathname.startsWith('/pt/')) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/es${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Excluye /api, internos de Next y cualquier archivo con extensión (robots.txt, imágenes…).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
