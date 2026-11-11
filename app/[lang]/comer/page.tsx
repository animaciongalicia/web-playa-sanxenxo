import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../components/BandaAgencia';
import Contenido from '../../../components/Contenido';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import TarjetaFoto from '../../../components/TarjetaFoto';
import { getLocales } from '../../../lib/datos';
import { esIdioma, href } from '../../../lib/i18n';
import { metaRuta } from '../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = metaRuta('/comer/');

export default function Comer({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const n = (l: 'restaurantes' | 'chiringuitos' | 'furanchos') => getLocales(l).length;
  return (
    <>
      <HeroPage ruta="/comer/" etiqueta="De la ría a la mesa" titulo="Comer" subtitulo="Restaurantes, chiringuitos y furanchos por zona." />
      <Migas lang={lang} ruta="/comer/" />
      <Seccion etiqueta="Tres formas de sentarse" titulo="¿Mantel, arena o bodega?" centrado>
        <div className="grid gap-8 md:grid-cols-3">
          <TarjetaFoto alto="alto" titulo="Restaurantes" texto="Asadores, tabernas, marisquerías y alta cocina, agrupados por zona." href={href(lang, '/comer/restaurantes/')} claves={['restaurantes', 'comer']} datos={[`${n('restaurantes')} sitios`]} />
          <TarjetaFoto alto="alto" titulo="Chiringuitos" texto="Con los pies cerca de la arena: caña, bocadillo o marisco." href={href(lang, '/comer/chiringuitos/')} claves={['chiringuitos', 'comer']} datos={[`${n('chiringuitos')} chiringuitos`]} />
          <TarjetaFoto alto="alto" titulo="Furanchos" texto="Casas que venden su vino con algo para picar. De temporada: más o menos, de diciembre a junio." href={href(lang, '/comer/furanchos/')} claves={['furanchos', 'comer']} datos={[`${n('furanchos')} furanchos`]} />
        </div>
      </Seccion>
      <Contenido lang={lang} ruta="/comer/" />
      <BandaAgencia lang={lang} />
    </>
  );
}
