import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../../components/HeroPage';
import LlamadaAgencia from '../../../../../components/LlamadaAgencia';
import { TarjetaLocal } from '../../../../../components/Locales';
import Migas from '../../../../../components/Migas';
import Contenido from '../../../../../components/Contenido';
import Seccion from '../../../../../components/Seccion';
import { getLocales } from '../../../../../lib/datos';
import { esIdioma } from '../../../../../lib/i18n';
import { NOMBRE_ZONA, TIPO_LOCAL } from '../../../../../lib/locales';

type P = { lang: string; zona: string; slug: string };
export const dynamicParams = false;
// Solo Gassho, Varadero, Buddha y Dux tienen página propia.
export const generateStaticParams = () => getLocales('diversion').filter((l) => l.pagina_propia).map((l) => ({ lang: 'es', zona: l.zona, slug: l.slug }));
export const generateMetadata = ({ params }: { params: P }): Metadata => ({ title: getLocales('diversion').find((l) => l.slug === params.slug)?.nombre });

export default function LocalDiversion({ params }: { params: P }) {
  const local = getLocales('diversion').find((l) => l.slug === params.slug && l.zona === params.zona && l.pagina_propia);
  if (!esIdioma(params.lang) || !local) notFound();
  return (
    <>
      <HeroPage etiqueta={TIPO_LOCAL[local.tipo]} titulo={local.nombre} />
      <Migas lang={params.lang} ruta={`/diversion/${local.zona}/${local.slug}/`} titulo={local.nombre} />
      <Contenido lang={params.lang} ruta={`/diversion/${local.zona}/${local.slug}/`} />
      <Seccion ancho="estrecho">
        <TarjetaLocal local={local} completo />
        <p className="mt-8"><Link href={`/diversion/${local.zona}/`} className="link-inline">← Más en {NOMBRE_ZONA[local.zona]}</Link></p>
      </Seccion>
      <Seccion ancho="estrecho" fondo="gris"><LlamadaAgencia lang={params.lang} /></Seccion>
    </>
  );
}
