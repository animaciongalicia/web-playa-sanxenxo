import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Contenido from '../../../../components/Contenido';
import Galeria from '../../../../components/Galeria';
import IdeasDespedida from '../../../../components/IdeasDespedida';
import { IDEAS_SOLTERA, IDEAS_SOLTERO } from '../../../../lib/ideas';
import HeroPage from '../../../../components/HeroPage';
import Migas from '../../../../components/Migas';
import PlanDespedida from '../../../../components/PlanDespedida';
import { IDIOMAS, esIdioma } from '../../../../lib/i18n';
import { metaRuta } from '../../../../lib/seo';

const TIPOS = {
  soltero: { titulo: 'Despedida de soltero', galeria: 'Planes que funcionan con el grupo' },
  soltera: { titulo: 'Despedida de soltera', galeria: 'Ideas para tu despedida' },
} as const;
type P = { lang: string; tipo: string };
export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.flatMap((lang) => Object.keys(TIPOS).map((tipo) => ({ lang, tipo })));
export const generateMetadata = ({ params }: { params: P }): Metadata => metaRuta(`/despedidas/${params.tipo}/`);

export default function Despedida({ params }: { params: P }) {
  if (!esIdioma(params.lang) || !(params.tipo in TIPOS)) notFound();
  const t = TIPOS[params.tipo as keyof typeof TIPOS];
  const ruta = `/despedidas/${params.tipo}/`;
  return (
    <>
      <HeroPage ruta={ruta} etiqueta="Despedidas" titulo={t.titulo} />
      <Migas lang={params.lang} ruta={ruta} titulo={t.titulo} />
      <Contenido lang={params.lang} ruta={ruta} parte="intro" />
      <Galeria prefijo={params.tipo} etiqueta="Ambiente" titulo={t.galeria} />
      <Contenido lang={params.lang} ruta={ruta} parte="resto" />
      <IdeasDespedida
        ideas={params.tipo === 'soltero' ? IDEAS_SOLTERO : IDEAS_SOLTERA}
        titulo={params.tipo === 'soltero' ? 'Planes para el grupo, con ficha o sin ella' : 'Cosas de chicas, y alguna más'}
        intro="Ideas que funcionan en una despedida en Sanxenxo y alrededores. Algunas tienen página propia; otras se organizan a medida."
      />
      <PlanDespedida lang={params.lang} />
    </>
  );
}
