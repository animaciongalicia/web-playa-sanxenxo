import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import Contenido from '../../../../components/Contenido';
import { Aviso, EnPreparacion } from '../../../../components/Fichas';
import HeroPage from '../../../../components/HeroPage';
import { TarjetaLocal } from '../../../../components/Locales';
import Migas from '../../../../components/Migas';
import NavZonas from '../../../../components/NavZonas';
import Seccion from '../../../../components/Seccion';
import { getLocales } from '../../../../lib/datos';
import { esIdioma } from '../../../../lib/i18n';
import { NOMBRE_ZONA, ZONAS_FURANCHOS } from '../../../../lib/locales';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Furanchos' };

// Una sola página: los furanchos agrupados por zona (decisión de Pablo). Las zonas sin datos no se publican.
export default function Furanchos({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const todos = getLocales('furanchos');
  const grupos = ZONAS_FURANCHOS.map((z) => ({ zona: z, locales: todos.filter((f) => f.zona === z) })).filter((g) => g.locales.length);
  return (
    <>
      <HeroPage ruta="/comer/furanchos/" etiqueta="Comer" titulo="Furanchos" subtitulo="Casas que venden su vino con algo para picar." />
      <Migas lang={lang} ruta="/comer/furanchos/" />
      <Contenido lang={lang} ruta="/comer/furanchos/" parte="intro" />
      <Seccion ancho="estrecho" fondo="arena">
        <Aviso>Los furanchos abren, más o menos, de diciembre a junio. Cada temporada cambia: confirma siempre las fechas antes de ir.</Aviso>
      </Seccion>
      <NavZonas zonas={grupos.map((g) => ({ id: g.zona, nombre: NOMBRE_ZONA[g.zona], n: g.locales.length }))} />
      {grupos.length ? grupos.map((g, i) => (
        <Seccion key={g.zona} fondo={i % 2 ? 'gris' : 'blanco'} titulo={NOMBRE_ZONA[g.zona]} intro={`${g.locales.length} ${g.locales.length === 1 ? 'furancho' : 'furanchos'}`} id={g.zona}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{g.locales.map((l) => <TarjetaLocal key={l.id} local={l} />)}</div>
        </Seccion>
      )) : <Seccion ancho="estrecho"><EnPreparacion /></Seccion>}
      <Contenido lang={lang} ruta="/comer/furanchos/" parte="resto" />
      <BandaAgencia lang={lang} />
    </>
  );
}
