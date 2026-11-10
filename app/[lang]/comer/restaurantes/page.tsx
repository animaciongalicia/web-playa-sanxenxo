import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import { EnPreparacion } from '../../../../components/Fichas';
import { TarjetaLocal } from '../../../../components/Locales';
import Migas from '../../../../components/Migas';
import Seccion from '../../../../components/Seccion';
import { getLocales } from '../../../../lib/datos';
import { esIdioma } from '../../../../lib/i18n';
import { NOMBRE_ZONA, agruparPorZona } from '../../../../lib/locales';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Restaurantes' };

export default function Restaurantes({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const locales = getLocales('restaurantes');
  // Los que tienen página propia enlazan a su ficha; el resto vive como tarjeta en su zona.
  const href = (l: { slug: string; pagina_propia: boolean }) => (l.pagina_propia ? `/comer/restaurantes/${l.slug}/` : undefined);
  const grupos = agruparPorZona(locales);
  return (
    <>
      <HeroPage titulo="Restaurantes" subtitulo="Agrupados por zona." />
      <Migas lang={params.lang} ruta="/comer/restaurantes/" />
      {grupos.length ? grupos.map((g, i) => (
        <Seccion key={g.zona} fondo={i % 2 ? 'gris' : 'blanco'} titulo={g.zona === 'por-definir' ? 'Para despedidas' : NOMBRE_ZONA[g.zona]} id={g.zona}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{g.locales.map((l) => <TarjetaLocal key={l.id} local={l} href={href(l)} />)}</div>
        </Seccion>
      )) : <Seccion ancho="estrecho"><EnPreparacion /></Seccion>}
    </>
  );
}
