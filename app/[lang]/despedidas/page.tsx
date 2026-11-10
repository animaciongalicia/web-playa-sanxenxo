import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import PlanDespedida from '../../../components/PlanDespedida';
import { IDIOMAS, esIdioma } from '../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = { title: 'Despedidas', description: 'El plan en conjunto para tu despedida.' };

export default function Despedidas({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  return (
    <>
      <HeroPage titulo="Despedidas" subtitulo="El plan en conjunto para tu despedida." />
      <Migas lang={params.lang} ruta="/despedidas/" />
      <PlanDespedida lang={params.lang} />
    </>
  );
}
