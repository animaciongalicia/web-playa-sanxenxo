import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import Migas from '../../../../components/Migas';
import Seccion from '../../../../components/Seccion';
import Tarjeta from '../../../../components/Tarjeta';
import { IDIOMAS, esIdioma, href } from '../../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = { title: 'Mar', description: 'Ons, Cíes y la ría de Aldán.' };

export default function Mar({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  return (
    <>
      <HeroPage titulo="Mar" subtitulo="Ons, Cíes y la ría de Aldán." />
      <Migas lang={lang} ruta="/paraisos/mar/" />
      <Seccion titulo="Tres destinos">
        <div className="grid gap-8 md:grid-cols-3">
          <Tarjeta titulo="Isla de Ons" texto="Parque Nacional de las Islas Atlánticas." href={href(lang, '/paraisos/mar/islas-ons/')} />
          <Tarjeta titulo="Islas Cíes" texto="Parque Nacional de las Islas Atlánticas." href={href(lang, '/paraisos/mar/islas-cies/')} />
          <Tarjeta titulo="Ría de Aldán" texto="El Caribe gallego." href={href(lang, '/paraisos/mar/ria-de-aldan/')} />
        </div>
      </Seccion>
    </>
  );
}
