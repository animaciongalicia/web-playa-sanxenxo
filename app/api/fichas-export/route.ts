import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getResumenFichas } from '../../../lib/datos';

export const dynamic = 'force-dynamic';

function tokenValido(recibido: string, esperado: string): boolean {
  const a = Buffer.from(recibido);
  const b = Buffer.from(esperado);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Solo lectura. Sin FICHAS_EXPORT_TOKEN configurado la ruta no existe (404).
export function GET(req: Request) {
  const esperado = process.env.FICHAS_EXPORT_TOKEN;
  if (!esperado) return new NextResponse('Not found', { status: 404 });
  const recibido = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  if (!recibido || !tokenValido(recibido, esperado)) return new NextResponse('Unauthorized', { status: 401 });
  return NextResponse.json({ generado: new Date().toISOString(), fichas: getResumenFichas() });
}
