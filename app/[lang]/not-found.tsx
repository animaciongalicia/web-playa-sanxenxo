import Link from 'next/link';
import HeroPage from '../../components/HeroPage';
import Seccion from '../../components/Seccion';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Página no encontrada', robots: { index: false, follow: true } };

const SECCIONES = [
  ['Paraísos', '/paraisos/', 'Playas y mar'],
  ['Barcos', '/barcos/', 'Yates, veleros y traslados'],
  ['Actividades', '/actividades/', 'Qué hacer con tu grupo'],
  ['Comer', '/comer/', 'Restaurantes, chiringuitos y furanchos'],
  ['Diversión', '/diversion/', 'Terraceo, copas y atardeceres'],
  ['Despedidas', '/despedidas/', 'El plan completo'],
  ['Cuándo ir', '/cuando-ir/', 'Mes a mes y condiciones'],
] as const;

export default function NotFound() {
  return (
    <>
      <HeroPage titulo="Esta página no existe" subtitulo="Vuelve al inicio o elige una sección.">
        <Link href="/" className="btn-claro">Ir al inicio</Link>
      </HeroPage>
      <Seccion titulo="Las siete secciones" centrado>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECCIONES.map(([t, h, d]) => (
            <Link key={h} href={h} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <span className="block font-semibold text-gray-900">{t}</span>
              <span className="mt-1 block text-sm text-gray-600">{d}</span>
            </Link>
          ))}
        </div>
      </Seccion>
    </>
  );
}
