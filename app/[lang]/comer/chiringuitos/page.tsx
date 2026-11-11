import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import Contenido from '../../../../components/Contenido';
import { EnPreparacion } from '../../../../components/Fichas';
import HeroPage from '../../../../components/HeroPage';
import Migas from '../../../../components/Migas';
import ListaPorZonas from '../../../../components/ListaPorZonas';
import NavZonas from '../../../../components/NavZonas';
import Seccion from '../../../../components/Seccion';
import { getLocales } from '../../../../lib/datos';
import { esIdioma } from '../../../../lib/i18n';
import { NOMBRE_ZONA, ORDEN_CHIRINGUITOS, agruparPorZona, ordenarZonas } from '../../../../lib/locales';
import { metaRuta } from '../../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = metaRuta('/comer/chiringuitos/');

export default function Chiringuitos({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const grupos = ordenarZonas(agruparPorZona(getLocales('chiringuitos')), ORDEN_CHIRINGUITOS);
  return (
    <>
      <HeroPage ruta="/comer/chiringuitos/" etiqueta="Comer" titulo="Chiringuitos" subtitulo="Con los pies cerca de la arena, por zona." />
      <Migas lang={lang} ruta="/comer/chiringuitos/" />
      <Contenido lang={lang} ruta="/comer/chiringuitos/" parte="intro" />
      <NavZonas zonas={grupos.map((g) => ({ id: g.zona, nombre: NOMBRE_ZONA[g.zona], n: g.locales.length }))} />
      {grupos.length ? (
        <ListaPorZonas
          grupos={grupos.map((g) => ({ id: g.zona, nombre: NOMBRE_ZONA[g.zona], locales: g.locales }))}
          pie={(g) => g.locales.some((l) => l.tambien_en.includes('diversion')) ? <p className="mt-3 text-sm text-gray-500">Algunos también salen en <Link href="/diversion/a-lanzada-san-vicente/" className="link-inline">Diversión</Link>: es la misma ficha.</p> : null}
        />
      ) : <Seccion ancho="estrecho"><EnPreparacion /></Seccion>}
      <Contenido lang={lang} ruta="/comer/chiringuitos/" parte="resto" />
      <BandaAgencia lang={lang} />
    </>
  );
}
