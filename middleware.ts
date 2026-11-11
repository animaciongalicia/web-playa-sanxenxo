import { NextResponse, type NextRequest } from 'next/server';
import redirecciones from './data/redirecciones.json';

// Español sin prefijo (se reescribe internamente a /es/...), portugués bajo /pt/.
// /es/... directamente se redirige a la URL sin prefijo para no duplicar contenido.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Páginas retiradas del dominio antiguo: 410 (ya no existen, y no se redirigen a la home).
  const norm = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if ((redirecciones.retiradas as string[]).some((r) => norm === r || norm.startsWith(r))) {
    return new NextResponse(
      '<!doctype html><html lang="es"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Página retirada</title><body style="font-family:system-ui;max-width:32rem;margin:4rem auto;padding:0 1rem"><h1>Esta página ya no existe</h1><p>Se retiró de la web. Encuentra lo que buscas en la <a href="/">guía de Sanxenxo para despedidas</a>.</p></body></html>',
      { status: 410, headers: { 'content-type': 'text/html; charset=utf-8' } },
    );
  }

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
