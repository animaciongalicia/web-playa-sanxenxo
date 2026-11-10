import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Contenido from '../../../components/Contenido';
import Seccion from '../../../components/Seccion';
import Tarjeta from '../../../components/Tarjeta';
import { esIdioma } from '../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Comer', description: 'Restaurantes, chiringuitos y furanchos por zona.' };

export default function Comer({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  return (
    <>
      <HeroPage titulo="Comer" subtitulo="Restaurantes, chiringuitos y furanchos por zona." />
      <Migas lang={params.lang} ruta="/comer/" />
      <Contenido lang={params.lang} ruta="/comer/" />
      <Seccion titulo="Tres formas de sentarse a la mesa">
        <div className="grid gap-8 md:grid-cols-3">
          <Tarjeta titulo="Restaurantes" texto="Agrupados por zona." href="/comer/restaurantes/" />
          <Tarjeta titulo="Chiringuitos" texto="Con los pies cerca de la arena." href="/comer/chiringuitos/" />
          <Tarjeta titulo="Furanchos" texto="De temporada: abren, más o menos, de diciembre a junio." href="/comer/furanchos/" />
        </div>
      </Seccion>
    </>
  );
}
