import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import Contenido from '../../../../components/Contenido';
import { EnPreparacion } from '../../../../components/Fichas';
import HeroPage from '../../../../components/HeroPage';
import Migas from '../../../../components/Migas';
import ListaPorZonas from '../../../../components/ListaPorZonas';
import NavZonas from '../../../../components/NavZonas';
import Seccion from '../../../../components/Seccion';
import { getLocales } from '../../../../lib/datos';
import { esIdioma } from '../../../../lib/i18n';
import { NOMBRE_ZONA, ORDEN_RESTAURANTES, agruparPorZona, ordenarZonas } from '../../../../lib/locales';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Restaurantes' };

export default function Restaurantes({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const locales = getLocales('restaurantes');
  // Los que tienen página propia enlazan a su ficha; el resto vive como tarjeta en su zona.
  const href = (l: { slug: string; pagina_propia: boolean }) => (l.pagina_propia ? `/comer/restaurantes/${l.slug}/` : undefined);
  // Los destacados salen arriba; en su zona solo el resto, para no repetirlos.
  const grupos = ordenarZonas(agruparPorZona(locales), ORDEN_RESTAURANTES);
  const nombre = (z: string) => (z === 'por-definir' ? 'Para despedidas' : NOMBRE_ZONA[z as keyof typeof NOMBRE_ZONA]);
  return (
    <>
      <HeroPage ruta="/comer/restaurantes/" etiqueta="Comer" titulo="Restaurantes" subtitulo="Agrupados por zona." />
      <Migas lang={lang} ruta="/comer/restaurantes/" />
      <Contenido lang={lang} ruta="/comer/restaurantes/" parte="intro" />
      <NavZonas zonas={grupos.map((g) => ({ id: g.zona, nombre: nombre(g.zona), n: g.locales.length }))} />
      {grupos.length ? <ListaPorZonas grupos={grupos.map((g) => ({ id: g.zona, nombre: nombre(g.zona), locales: g.locales }))} href={href} /> : <Seccion ancho="estrecho"><EnPreparacion /></Seccion>}
      <Contenido lang={lang} ruta="/comer/restaurantes/" parte="resto" />
      <BandaAgencia lang={lang} />
    </>
  );
}
