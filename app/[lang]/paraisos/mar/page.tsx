import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import Contenido from '../../../../components/Contenido';
import HeroPage from '../../../../components/HeroPage';
import Migas from '../../../../components/Migas';
import Seccion from '../../../../components/Seccion';
import TarjetaFoto from '../../../../components/TarjetaFoto';
import { IDIOMAS, esIdioma, href } from '../../../../lib/i18n';
import { metaRuta } from '../../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = metaRuta('/paraisos/mar/');

export default function Mar({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  return (
    <>
      <HeroPage ruta="/paraisos/mar/" etiqueta="Paraísos" titulo="Mar" subtitulo="Ons, Cíes y la ría de Aldán: tres destinos, tres planes distintos." />
      <Migas lang={lang} ruta="/paraisos/mar/" />
      <Contenido lang={lang} ruta="/paraisos/mar/" parte="intro" />
      <Seccion etiqueta="Tres destinos" titulo="Elige tu día de mar" centrado>
        <div className="grid gap-8 md:grid-cols-3">
          <TarjetaFoto alto="alto" etiqueta="Parque Nacional" titulo="Isla de Ons" texto="Pequeña, habitada y sin coches. Playas, senderos y faro. Barco regular desde Sanxenxo, Portonovo, Bueu y Marín." href={href(lang, '/paraisos/mar/islas-ons/')} claves={['islas-ons', 'mar']} datos={['Autorización previa']} />
          <TarjetaFoto alto="alto" etiqueta="Parque Nacional" titulo="Islas Cíes" texto="El archipiélago más famoso, frente a Vigo: arena blanca y tres faros. Barcos desde Vigo, Baiona y Cangas." href={href(lang, '/paraisos/mar/islas-cies/')} claves={['islas-cies', 'mar']} datos={['Autorización previa']} />
          <TarjetaFoto alto="alto" titulo="Ría de Aldán" texto="Una bahía recogida entre Cangas y Bueu, con agua tranquila. El plan fácil: poca distancia, poco tiempo de barco." href={href(lang, '/paraisos/mar/ria-de-aldan/')} claves={['ria-de-aldan', 'mar']} datos={['El plan fácil']} />
        </div>
      </Seccion>
      <Contenido lang={lang} ruta="/paraisos/mar/" parte="resto" />
      <BandaAgencia lang={lang} />
    </>
  );
}
