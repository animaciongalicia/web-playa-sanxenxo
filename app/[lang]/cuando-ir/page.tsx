import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Contenido from '../../../components/Contenido';
import Seccion from '../../../components/Seccion';
import Tarjeta from '../../../components/Tarjeta';
import { IDIOMAS, esIdioma, href } from '../../../lib/i18n';
import { MESES } from '../../../lib/meses';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = { title: 'Cuándo ir', description: 'Mes a mes: qué te encuentras y qué te conviene.' };

export default function CuandoIr({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  return (
    <>
      <HeroPage titulo="Cuándo ir" subtitulo="Mes a mes: qué te encuentras y qué te conviene." />
      <Migas lang={lang} ruta="/cuando-ir/" />
      <Contenido lang={lang} ruta="/cuando-ir/" />
      <Seccion titulo="Elige mes">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MESES.map((m) => <Tarjeta key={m.id} titulo={m.titulo} href={href(lang, `/cuando-ir/${m.id}/`)} />)}
        </div>
      </Seccion>
    </>
  );
}
