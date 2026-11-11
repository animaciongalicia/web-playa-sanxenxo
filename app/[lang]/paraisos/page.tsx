import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../components/BandaAgencia';
import Contenido from '../../../components/Contenido';
import { TarjetaPlaya } from '../../../components/Fichas';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import TarjetaFoto from '../../../components/TarjetaFoto';
import { getPlayas } from '../../../lib/datos';
import { IDIOMAS, esIdioma, href } from '../../../lib/i18n';
import { esTop } from '../../../lib/paraisos';
import { metaRuta } from '../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = metaRuta('/paraisos/');

export default function Paraisos({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const playas = getPlayas();
  const top = playas.filter(esTop);
  return (
    <>
      <HeroPage ruta="/paraisos/" etiqueta="Playas y mar" titulo="Paraísos" subtitulo="La arena y el agua de Sanxenxo y alrededores, de Aldán a O Grove." />
      <Migas lang={lang} ruta="/paraisos/" />
      <Seccion etiqueta="Dos entradas" titulo="Elige: arena o mar" centrado>
        <div className="grid gap-8 md:grid-cols-2">
          <TarjetaFoto alto="alto" titulo="Playas" texto="Ordenadas por tramos de costa, de Sanxenxo a O Grove, con las ocho imprescindibles." href={href(lang, '/paraisos/playas/')} claves={['playas', 'paraisos']} datos={[`${playas.length} playas`, '5 tramos']} />
          <TarjetaFoto alto="alto" titulo="Mar" texto="Ons, Cíes y la ría de Aldán: el Caribe gallego a un paseo en barco." href={href(lang, '/paraisos/mar/')} claves={['mar']} datos={['Ons', 'Cíes', 'Aldán']} />
        </div>
      </Seccion>
      <Contenido lang={lang} ruta="/paraisos/" />
      <Seccion fondo="arena" etiqueta="Las que no fallan" titulo="Ocho playas imprescindibles" intro="Si solo tienes un día, empieza por aquí." centrado>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((x) => <TarjetaPlaya key={x.id} playa={x} lang={lang} etiquetaTramo />)}
        </div>
      </Seccion>
      <BandaAgencia lang={lang} />
    </>
  );
}
