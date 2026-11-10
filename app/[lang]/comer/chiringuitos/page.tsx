import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import Contenido from '../../../../components/Contenido';
import { EnPreparacion } from '../../../../components/Fichas';
import HeroPage from '../../../../components/HeroPage';
import { TarjetaLocal } from '../../../../components/Locales';
import Migas from '../../../../components/Migas';
import NavZonas from '../../../../components/NavZonas';
import Seccion from '../../../../components/Seccion';
import { getLocales } from '../../../../lib/datos';
import { esIdioma } from '../../../../lib/i18n';
import { NOMBRE_ZONA, ORDEN_CHIRINGUITOS, agruparPorZona, ordenarZonas } from '../../../../lib/locales';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Chiringuitos' };

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
      {grupos.length ? grupos.map((g, i) => (
        <Seccion key={g.zona} fondo={i % 2 ? 'gris' : 'blanco'} titulo={NOMBRE_ZONA[g.zona]} intro={`${g.locales.length} ${g.locales.length === 1 ? 'chiringuito' : 'chiringuitos'}`} id={g.zona}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {g.locales.map((l) => <TarjetaLocal key={l.id} local={l} />)}
          </div>
          {g.locales.some((l) => l.tambien_en.includes('diversion')) && (
            <p className="mt-6 text-sm text-gray-500">Algunos también salen en <Link href="/diversion/a-lanzada-san-vicente/" className="link-inline">Diversión</Link>: es la misma ficha.</p>
          )}
        </Seccion>
      )) : <Seccion ancho="estrecho"><EnPreparacion /></Seccion>}
      <Contenido lang={lang} ruta="/comer/chiringuitos/" parte="resto" />
      <BandaAgencia lang={lang} />
    </>
  );
}
