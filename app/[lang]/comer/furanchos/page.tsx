import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import { Aviso } from '../../../../components/Fichas';
import Migas from '../../../../components/Migas';
import Seccion from '../../../../components/Seccion';
import Tarjeta from '../../../../components/Tarjeta';
import { getLocales } from '../../../../lib/datos';
import { esIdioma } from '../../../../lib/i18n';
import { NOMBRE_ZONA, ZONAS_FURANCHOS } from '../../../../lib/locales';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Furanchos' };

export default function Furanchos({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const todos = getLocales('furanchos');
  return (
    <>
      <HeroPage titulo="Furanchos" subtitulo="Casas que venden su vino con algo para picar." />
      <Migas lang={params.lang} ruta="/comer/furanchos/" />
      <Seccion titulo="Cuatro zonas">
        <div className="mb-8"><Aviso>Los furanchos abren, más o menos, de diciembre a junio. Cada temporada cambia: mira siempre las fechas de cada uno.</Aviso></div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ZONAS_FURANCHOS.map((z) => {
            const n = todos.filter((f) => f.zona === z).length;
            return <Tarjeta key={z} titulo={NOMBRE_ZONA[z]} texto={n ? `${n} furanchos` : undefined} href={`/comer/furanchos/${z}/`} />;
          })}
        </div>
      </Seccion>
    </>
  );
}
