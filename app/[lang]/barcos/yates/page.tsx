import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import LlamadaAgencia from '../../../../components/LlamadaAgencia';
import ListaBarcos from '../../../../components/ListaBarcos';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
import Seccion from '../../../../components/Seccion';
import { esIdioma } from '../../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Yates' };

export default function Pagina({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  return (
    <>
      <HeroPage titulo="Yates" />
      <Migas lang={params.lang} ruta="/barcos/yates/" />
      <Contenido lang={params.lang} ruta="/barcos/yates/" />
      <Seccion ancho="estrecho">
        <p className="text-lg text-gray-600">Barcos a motor para tu grupo. Precio «desde» y puerto de salida en cada ficha.</p>
        <div className="mt-8"><ListaBarcos categoria="yate" /></div>
      </Seccion>
      <Seccion ancho="estrecho" fondo="gris"><LlamadaAgencia lang={params.lang} /></Seccion>
    </>
  );
}
