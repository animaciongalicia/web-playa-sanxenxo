import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../components/HeroPage';
import { ENLACE_BARCOS } from '../../../components/ListaBarcos';
import Migas from '../../../components/Migas';
import Contenido from '../../../components/Contenido';
import Seccion from '../../../components/Seccion';
import Tarjeta from '../../../components/Tarjeta';
import { esIdioma } from '../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Barcos', description: 'Yates, veleros y traslados en lancha rápida.' };

export default function Barcos({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  return (
    <>
      <HeroPage titulo="Barcos" subtitulo="Yates, veleros y traslados en lancha rápida." />
      <Migas lang={lang} ruta="/barcos/" />
      <Contenido lang={lang} ruta="/barcos/" />
      <Seccion titulo="Elige cómo salir al mar">
        <div className="grid gap-8 md:grid-cols-3">
          <Tarjeta titulo="Yates" texto="Barcos a motor para tu grupo." href="/barcos/yates/" />
          <Tarjeta titulo="Veleros" texto="11 plazas más patrón." href="/barcos/veleros/" />
          <Tarjeta titulo="Traslados" texto="Lancha rápida a Ons, Cíes y Aldán." href="/barcos/traslados/" />
        </div>
        <p className="mt-10 text-sm text-gray-500">La flota es de <a href={ENLACE_BARCOS} target="_blank" rel="noopener noreferrer" className="link-inline">Sea Galicia</a>.</p>
      </Seccion>
    </>
  );
}
