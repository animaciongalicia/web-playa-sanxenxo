import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import Contenido from '../../../../components/Contenido';
import HeroPage from '../../../../components/HeroPage';
import Migas from '../../../../components/Migas';
import Seccion from '../../../../components/Seccion';
import TarjetaFoto from '../../../../components/TarjetaFoto';
import Galeria from '../../../../components/Galeria';
import Preguntas from '../../../../components/Preguntas';
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
      <HeroPage ruta="/paraisos/mar/" etiqueta="Paraísos" titulo="Mar" subtitulo="Ons, Cíes y la ría de Aldán. Un día entero sin horarios ajenos." />
      <Migas lang={lang} ruta="/paraisos/mar/" />
      <Contenido lang={lang} ruta="/paraisos/mar/" parte="intro" />
      <section className="bg-gradient-to-br from-ria-900 to-ria-700 px-6 py-8 text-white">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[['3', 'destinos de mar'], ['1 h', 'hasta Ons'], ['90 min', 'hasta las Cíes'], ['~6 h', 'en Ons, si conceden el permiso']].map(([n, t]) => (
            <div key={t}><dt className="text-3xl font-bold text-arena-200 md:text-4xl">{n}</dt><dd className="mt-1 text-sm text-ria-100">{t}</dd></div>
          ))}
        </dl>
      </section>
      <Seccion etiqueta="Tres destinos" titulo="Elige tu día de mar" centrado>
        <div className="grid gap-8 md:grid-cols-3">
          <TarjetaFoto alto="alto" etiqueta="Parque Nacional" titulo="Isla de Ons" texto="Pequeña, habitada y sin coches. Playas, senderos y faro. Barco regular desde Sanxenxo, Portonovo, Bueu y Marín." href={href(lang, '/paraisos/mar/islas-ons/')} claves={['islas-ons', 'mar']} datos={['Autorización previa']} />
          <TarjetaFoto alto="alto" etiqueta="Parque Nacional" titulo="Islas Cíes" texto="El archipiélago más famoso, frente a Vigo: arena blanca y tres faros. Barcos desde Vigo, Baiona y Cangas." href={href(lang, '/paraisos/mar/islas-cies/')} claves={['islas-cies', 'mar']} datos={['Autorización previa']} />
          <TarjetaFoto alto="alto" titulo="Ría de Aldán" texto="Una bahía recogida entre Cangas y Bueu, con agua tranquila. El plan fácil: poca distancia, poco tiempo de barco." href={href(lang, '/paraisos/mar/ria-de-aldan/')} claves={['ria-de-aldan', 'mar']} datos={['El plan fácil']} />
        </div>
      </Seccion>
      <Seccion fondo="arena" etiqueta="Cómo ir" titulo="Tres formas de salir al mar" intro="Elige cómo quieres vivir el trayecto: el barco ya es parte del plan." centrado>
        <div className="grid gap-8 md:grid-cols-3">
          <TarjetaFoto titulo="Barco privado" texto="Solo tu grupo, con música a bordo y paradas para el baño. Veleros y yates." href={href(lang, '/barcos/')} claves={['barco-yate-1', 'barcos']} datos={['4 u 8 horas']} />
          <TarjetaFoto titulo="Pesquero de la ría de Aldán" texto="Para 11, 16 o 21 personas: la capacidad más grande de la flota." href={href(lang, '/paraisos/mar/ria-de-aldan/')} claves={['barco-pesquero-aldan']} datos={['Solo en la ría de Aldán']} />
          <TarjetaFoto titulo="Lancha rápida y traslados" texto="Llegar a Ons, Cíes o Aldán sin esperar al barco regular." href={href(lang, '/barcos/traslados/')} claves={['barco-lancha-rapida']} datos={['Experiencia de 1 hora']} />
        </div>
      </Seccion>
      <Galeria prefijo="mar" etiqueta="En el agua" titulo="Así se ve desde el mar" />
      <Contenido lang={lang} ruta="/paraisos/mar/" parte="resto" />
      <Preguntas ruta="/paraisos/mar/" />
      <BandaAgencia lang={lang} />
    </>
  );
}
