import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Contenido from '../../../components/Contenido';
import Seccion from '../../../components/Seccion';
import Tarjeta from '../../../components/Tarjeta';
import { getActividades } from '../../../lib/datos';
import { esIdioma } from '../../../lib/i18n';
import { FAMILIAS_INFO } from '../../../lib/paraisos';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Actividades', description: 'Qué hacer en el mar y en la playa con tu grupo.' };

export default function Actividades({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const todas = getActividades();
  const familias = (Object.keys(FAMILIAS_INFO) as (keyof typeof FAMILIAS_INFO)[]).filter((f) => f !== 'kayak-areoso');
  return (
    <>
      <HeroPage titulo="Actividades" subtitulo="Qué hacer en el mar y en la playa con tu grupo." />
      <Migas lang={params.lang} ruta="/actividades/" />
      <Contenido lang={params.lang} ruta="/actividades/" />
      <Seccion titulo="Cinco familias" intro="Cada actividad dice dónde se hace.">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {familias.map((f) => (
            <Tarjeta key={f} titulo={FAMILIAS_INFO[f].titulo} texto={`${FAMILIAS_INFO[f].texto} (${todas.filter((a) => a.familia === f).length})`} href={`/actividades/${f}/`} />
          ))}
          <Tarjeta titulo={FAMILIAS_INFO['kayak-areoso'].titulo} texto="Página propia: es de lo más buscado." href="/actividades/kayak-areoso/" />
        </div>
      </Seccion>
    </>
  );
}
