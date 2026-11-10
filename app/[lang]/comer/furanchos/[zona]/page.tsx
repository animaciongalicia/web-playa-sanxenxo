import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../../components/HeroPage';
import { Aviso, EnPreparacion } from '../../../../../components/Fichas';
import { TarjetaLocal } from '../../../../../components/Locales';
import Migas from '../../../../../components/Migas';
import Seccion from '../../../../../components/Seccion';
import { getLocales } from '../../../../../lib/datos';
import { esIdioma } from '../../../../../lib/i18n';
import { NOMBRE_ZONA, ZONAS_FURANCHOS } from '../../../../../lib/locales';

type P = { lang: string; zona: string };
const valida = (z: string): z is (typeof ZONAS_FURANCHOS)[number] => (ZONAS_FURANCHOS as readonly string[]).includes(z);
export const dynamicParams = false;
export const generateStaticParams = () => ZONAS_FURANCHOS.map((zona) => ({ lang: 'es', zona }));
export const generateMetadata = ({ params }: { params: P }): Metadata => ({ title: valida(params.zona) ? `Furanchos en ${NOMBRE_ZONA[params.zona]}` : undefined });

export default function ZonaFuranchos({ params }: { params: P }) {
  if (!esIdioma(params.lang) || !valida(params.zona)) notFound();
  const locales = getLocales('furanchos').filter((f) => f.zona === params.zona);
  const titulo = `Furanchos en ${NOMBRE_ZONA[params.zona]}`;
  return (
    <>
      <HeroPage titulo={titulo} />
      <Migas lang={params.lang} ruta={`/comer/furanchos/${params.zona}/`} titulo={titulo} />
      <Seccion>
        <div className="mb-8"><Aviso>Abren, más o menos, de diciembre a junio. Confirma las fechas de la temporada.</Aviso></div>
        {locales.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{locales.map((l) => <TarjetaLocal key={l.id} local={l} />)}</div> : <EnPreparacion />}
      </Seccion>
    </>
  );
}
