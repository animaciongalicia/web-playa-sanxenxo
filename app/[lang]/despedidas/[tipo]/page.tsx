import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
import PlanDespedida from '../../../../components/PlanDespedida';
import { IDIOMAS, esIdioma } from '../../../../lib/i18n';

const TIPOS = { soltero: 'Despedida de soltero', soltera: 'Despedida de soltera' } as const;
type P = { lang: string; tipo: string };
export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.flatMap((lang) => Object.keys(TIPOS).map((tipo) => ({ lang, tipo })));
export const generateMetadata = ({ params }: { params: P }): Metadata => ({ title: TIPOS[params.tipo as keyof typeof TIPOS] });

export default function Despedida({ params }: { params: P }) {
  if (!esIdioma(params.lang) || !(params.tipo in TIPOS)) notFound();
  const titulo = TIPOS[params.tipo as keyof typeof TIPOS];
  return (
    <>
      <HeroPage ruta={`/despedidas/${params.tipo}/`} titulo={titulo} />
      <Migas lang={params.lang} ruta={`/despedidas/${params.tipo}/`} titulo={titulo} />
      <Contenido lang={params.lang} ruta={`/despedidas/${params.tipo}/`} />
      <PlanDespedida lang={params.lang} />
    </>
  );
}
