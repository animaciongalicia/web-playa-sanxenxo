import Link from 'next/link';
import type { ReactNode } from 'react';
import HeroPage from '../../components/HeroPage';
import Seccion from '../../components/Seccion';
import Tarjeta from '../../components/Tarjeta';
import LlamadaAgencia from '../../components/LlamadaAgencia';
import Contenido from '../../components/Contenido';
import { esIdioma, href, textos } from '../../lib/i18n';
import { notFound } from 'next/navigation';

const icono = (d: string): ReactNode => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

// Trazos simples, uno por sección.
const ICONOS = {
  paraisos: 'M3 17c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 3 2M12 3v6m0 0l-3-3m3 3l3-3',
  barcos: 'M3 17l2 3h14l2-3H3zM12 3v10M12 5l6 8H12',
  actividades: 'M13 10V3L4 14h7v7l9-11h-7z',
  comer: 'M6 3v8a3 3 0 003 3v7M10 3v6M14 3c2 0 4 2 4 6s-2 5-4 5v7',
  diversion: 'M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z',
  despedidas: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.5 5.5L21 10l-5.5 2.5L13 18l-2.5-5.5L5 10l5.5-2.5L13 2z',
  cuandoIr: 'M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
};

export default function Home({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const t = textos(lang);
  const h = (r: string) => href(lang, r);

  const entradas = [
    { clave: 'paraisos', titulo: t.paraisos, texto: 'Playas y mar: Ons, Cíes y la ría de Aldán.', ruta: '/paraisos/' },
    { clave: 'barcos', titulo: t.barcos, texto: 'Yates, veleros y traslados en lancha rápida.', ruta: '/barcos/' },
    { clave: 'actividades', titulo: t.actividades, texto: 'Qué hacer en el mar y en la playa con tu grupo.', ruta: '/actividades/' },
    { clave: 'comer', titulo: t.comer, texto: 'Restaurantes, chiringuitos y furanchos por zona.', ruta: '/comer/' },
    { clave: 'diversion', titulo: t.diversion, texto: 'Terraceo, tardeo, puestas de sol y copas.', ruta: '/diversion/' },
    { clave: 'despedidas', titulo: t.despedidas, texto: 'El plan completo para despedidas de soltero y de soltera.', ruta: '/despedidas/' },
    { clave: 'cuandoIr', titulo: t.cuandoIr, texto: 'Mes a mes: qué te encuentras y qué te conviene.', ruta: '/cuando-ir/' },
  ] as const;

  const zonas = [
    ['Sanxenxo', '/paraisos/playas/sanxenxo/'],
    ['Portonovo', '/paraisos/playas/portonovo/'],
    ['Noalla – A Lanzada', '/paraisos/playas/noalla-a-lanzada/'],
    ['O Grove – San Vicente', '/paraisos/playas/o-grove-san-vicente/'],
  ] as const;

  return (
    <>
      <HeroPage etiqueta="Sanxenxo · Despedidas" titulo="Tu despedida en Sanxenxo: playas, mar y fiesta" subtitulo={t.tagline}>
        <Link href={h('/paraisos/')} className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-ria-800 transition-all hover:bg-ria-50 hover:shadow-lg">
          {t.paraisos}
        </Link>
        <Link href={h('/despedidas/')} className="btn-claro !px-8 !py-4">{t.despedidas}</Link>
      </HeroPage>

      <Seccion titulo="Elige por dónde empezar" intro="Siete entradas. Cada una responde una duda real de tu despedida.">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {entradas.map((e) => (
            <Tarjeta key={e.clave} titulo={e.titulo} texto={e.texto} href={h(e.ruta)} icono={icono(ICONOS[e.clave])} />
          ))}
        </div>
      </Seccion>

      <Contenido lang={lang} ruta="/" />

      <Seccion fondo="gris" titulo="Cuatro tramos de costa" intro="El núcleo de la guía. Empieza por el que te pille más cerca.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {zonas.map(([nombre, ruta]) => (
            <Link key={ruta} href={h(ruta)} className="card-elegant stagger-child block !p-6 text-center">
              <span className="text-lg font-semibold text-ria-800">{nombre}</span>
            </Link>
          ))}
        </div>
      </Seccion>

      <Seccion ancho="estrecho">
        <div className="text-center">
          <h2 className="heading-section">¿Ya sabes lo que quieres?</h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">La guía te ayuda a decidir. Cuando lo tengas claro, la agencia te lo organiza.</p>
          <LlamadaAgencia lang={lang} className="mt-6 !text-base" />
        </div>
      </Seccion>
    </>
  );
}
