import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Contenido from '../../../components/Contenido';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import PlanDespedida from '../../../components/PlanDespedida';
import Seccion from '../../../components/Seccion';
import TarjetaFoto from '../../../components/TarjetaFoto';
import { IDIOMAS, esIdioma, href } from '../../../lib/i18n';
import { metaRuta } from '../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = metaRuta('/despedidas/');

export default function Despedidas({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  return (
    <>
      <HeroPage ruta="/despedidas/" etiqueta="Sanxenxo" titulo="Despedidas" subtitulo="El plan en conjunto para tu despedida." />
      <Migas lang={lang} ruta="/despedidas/" />
      <Seccion etiqueta="Empieza por aquí" titulo="¿Soltero o soltera?" intro="Dos guías, con los planes que mejor funcionan en cada caso." centrado>
        <div className="grid gap-8 md:grid-cols-2">
          <TarjetaFoto alto="alto" titulo="Despedida de soltero" texto="Mar, barco, actividades y noche en el puerto." href={href(lang, '/despedidas/soltero/')} claves={['soltero', 'despedidas']} />
          <TarjetaFoto alto="alto" titulo="Despedida de soltera" texto="Día de playa y barco, planes con encanto y copas con vistas." href={href(lang, '/despedidas/soltera/')} claves={['soltera', 'despedidas']} />
        </div>
      </Seccion>
      <Contenido lang={lang} ruta="/despedidas/" />
      <PlanDespedida lang={lang} />
    </>
  );
}
