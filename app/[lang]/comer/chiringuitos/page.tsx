import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import {EnPreparacion} from '../../../../components/Fichas';
import { TarjetaLocal } from '../../../../components/Locales';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
import Seccion from '../../../../components/Seccion';
import { getLocales } from '../../../../lib/datos';
import { esIdioma } from '../../../../lib/i18n';
import { NOMBRE_ZONA, agruparPorZona } from '../../../../lib/locales';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Chiringuitos' };

export default function Chiringuitos({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const grupos = agruparPorZona(getLocales('chiringuitos'));
  return (
    <>
      <HeroPage ruta="/comer/chiringuitos/" titulo="Chiringuitos" subtitulo="Por zona." />
      <Migas lang={params.lang} ruta="/comer/chiringuitos/" />
      <Contenido lang={params.lang} ruta="/comer/chiringuitos/" />
      {grupos.length ? grupos.map((g, i) => (
        <Seccion key={g.zona} fondo={i % 2 ? 'gris' : 'blanco'} titulo={NOMBRE_ZONA[g.zona]} id={g.zona}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {g.locales.map((l) => (
              <div key={l.id} className="contents">
                <TarjetaLocal local={l} />
              </div>
            ))}
          </div>
          {g.locales.some((l) => l.tambien_en.includes('diversion')) && (
            <p className="mt-6 text-sm text-gray-500">Algunos también salen en <Link href="/diversion/a-lanzada-san-vicente/" className="link-inline">Diversión</Link>: es la misma ficha.</p>
          )}
        </Seccion>
      )) : <Seccion ancho="estrecho"><EnPreparacion /></Seccion>}
    </>
  );
}
