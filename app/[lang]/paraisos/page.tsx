import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import Tarjeta from '../../../components/Tarjeta';
import { IDIOMAS, esIdioma, href } from '../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = { title: 'Paraísos', description: 'Playas y mar de la ría de Aldán a O Grove.' };

export default function Paraisos({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  return (
    <>
      <HeroPage titulo="Paraísos" subtitulo="Playas y mar de la ría de Aldán a O Grove." />
      <Migas lang={lang} ruta="/paraisos/" />
      <Seccion titulo="Empieza por aquí" intro="Dos entradas: la arena y el agua.">
        <div className="grid gap-8 sm:grid-cols-2">
          <Tarjeta titulo="Playas" texto="39 playas por tramo de costa y las 8 imprescindibles. Todas se llegan en coche y en barco." href={href(lang, '/paraisos/playas/')} />
          <Tarjeta titulo="Mar" texto="Ons, Cíes y la ría de Aldán, el Caribe gallego." href={href(lang, '/paraisos/mar/')} />
        </div>
      </Seccion>
    </>
  );
}
