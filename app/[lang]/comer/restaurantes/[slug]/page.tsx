import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../../components/HeroPage';
import BandaAgencia from '../../../../../components/BandaAgencia';
import { TarjetaLocal } from '../../../../../components/Locales';
import Migas from '../../../../../components/Migas';
import Contenido from '../../../../../components/Contenido';
import Seccion from '../../../../../components/Seccion';
import { getLocales } from '../../../../../lib/datos';
import { esIdioma } from '../../../../../lib/i18n';
import JsonLd from '../../../../../components/JsonLd';
import { jsonLdLocal } from '../../../../../lib/jsonld';
import { metaRuta } from '../../../../../lib/seo';

type P = { lang: string; slug: string };
export const dynamicParams = false;
// Solo A Ferreira, A Curva y A Vichona (pagina_propia): el resto vive en la lista por zona.
export const generateStaticParams = () => getLocales('restaurantes').filter((l) => l.pagina_propia).map((l) => ({ lang: 'es', slug: l.slug }));
export const generateMetadata = ({ params }: { params: P }): Metadata => metaRuta(`/comer/restaurantes/${params.slug}/`);

export default function Restaurante({ params }: { params: P }) {
  const local = getLocales('restaurantes').find((l) => l.slug === params.slug && l.pagina_propia);
  if (!esIdioma(params.lang) || !local) notFound();
  const ld = jsonLdLocal(local, `/comer/restaurantes/${local.slug}/`);
  return (
    <>
      {ld && <JsonLd datos={ld} />}
      <HeroPage ruta={`/comer/restaurantes/${params.slug}/`} titulo={local.nombre} etiqueta="Restaurante" />
      <Migas lang={params.lang} ruta={`/comer/restaurantes/${local.slug}/`} titulo={local.nombre} />
      <Seccion fondo="arena" etiqueta="Ficha rápida" ancho="estrecho">
        <TarjetaLocal local={local} completo />
      </Seccion>
      <Contenido lang={params.lang} ruta={`/comer/restaurantes/${local.slug}/`} />
      <Seccion ancho="estrecho"><p className="text-center"><Link href="/comer/restaurantes/" className="link-inline">← Más restaurantes</Link></p></Seccion>
      <BandaAgencia lang={params.lang} />
    </>
  );
}
