import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../../components/HeroPage';
import LlamadaAgencia from '../../../../../components/LlamadaAgencia';
import { TarjetaLocal } from '../../../../../components/Locales';
import Migas from '../../../../../components/Migas';
import Seccion from '../../../../../components/Seccion';
import { getLocales } from '../../../../../lib/datos';
import { esIdioma } from '../../../../../lib/i18n';

type P = { lang: string; slug: string };
export const dynamicParams = false;
// Solo A Ferreira, A Curva y A Vichona (pagina_propia): el resto vive en la lista por zona.
export const generateStaticParams = () => getLocales('restaurantes').filter((l) => l.pagina_propia).map((l) => ({ lang: 'es', slug: l.slug }));
export const generateMetadata = ({ params }: { params: P }): Metadata => ({ title: getLocales('restaurantes').find((l) => l.slug === params.slug)?.nombre });

export default function Restaurante({ params }: { params: P }) {
  const local = getLocales('restaurantes').find((l) => l.slug === params.slug && l.pagina_propia);
  if (!esIdioma(params.lang) || !local) notFound();
  return (
    <>
      <HeroPage titulo={local.nombre} etiqueta="Restaurante" />
      <Migas lang={params.lang} ruta={`/comer/restaurantes/${local.slug}/`} titulo={local.nombre} />
      <Seccion ancho="estrecho">
        <TarjetaLocal local={local} completo />
        <p className="mt-8"><Link href="/comer/restaurantes/" className="link-inline">← Más restaurantes</Link></p>
      </Seccion>
      <Seccion ancho="estrecho" fondo="gris"><LlamadaAgencia lang={params.lang} /></Seccion>
    </>
  );
}
