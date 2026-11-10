import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import { Aviso, EnPreparacion } from '../../../../components/Fichas';
import { TarjetaLocal } from '../../../../components/Locales';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
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
  const todos = getLocales('furanchos');
  const grupos = ZONAS_FURANCHOS.map((z) => ({ zona: z, locales: todos.filter((f) => f.zona === z) })).filter((g) => g.locales.length);
  return (
    <>
      <HeroPage titulo="Furanchos" subtitulo="Casas que venden su vino con algo para picar." />
      <Migas lang={params.lang} ruta="/comer/furanchos/" />
      <Contenido lang={params.lang} ruta="/comer/furanchos/" />
      <Seccion ancho="estrecho">
        <Aviso>Los furanchos abren, más o menos, de diciembre a junio. Cada temporada cambia: confirma siempre las fechas antes de ir.</Aviso>
      </Seccion>
      {grupos.length ? grupos.map((g, i) => (
        <Seccion key={g.zona} fondo={i % 2 ? 'gris' : 'blanco'} titulo={NOMBRE_ZONA[g.zona]} id={g.zona}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{g.locales.map((l) => <TarjetaLocal key={l.id} local={l} />)}</div>
        </Seccion>
      )) : <Seccion ancho="estrecho"><EnPreparacion /></Seccion>}
    </>
  );
}
