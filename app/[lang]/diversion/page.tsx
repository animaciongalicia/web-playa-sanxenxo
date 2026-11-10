import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Contenido from '../../../components/Contenido';
import Seccion from '../../../components/Seccion';
import Tarjeta from '../../../components/Tarjeta';
import { getLocales } from '../../../lib/datos';
import { esIdioma } from '../../../lib/i18n';
import { NOMBRE_ZONA, ZONAS_DIVERSION } from '../../../lib/locales';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Diversión', description: 'Terraceo, tardeo, puestas de sol y copas.' };

export default function Diversion({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const todos = getLocales('diversion');
  return (
    <>
      <HeroPage titulo="Diversión" subtitulo="Terraceo, tardeo, puestas de sol y copas." />
      <Migas lang={params.lang} ruta="/diversion/" />
      <Contenido lang={params.lang} ruta="/diversion/" />
      <Seccion titulo="Elige zona" intro="Son las mismas zonas de la guía, con sus horarios y su ambiente.">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ZONAS_DIVERSION.map((z) => {
            const n = todos.filter((l) => l.zona === z).length;
            return <Tarjeta key={z} titulo={NOMBRE_ZONA[z]} texto={n ? `${n} locales` : undefined} href={`/diversion/${z}/`} />;
          })}
        </div>
      </Seccion>
    </>
  );
}
