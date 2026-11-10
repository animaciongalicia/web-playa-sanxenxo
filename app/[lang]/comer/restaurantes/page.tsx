import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import Contenido from '../../../../components/Contenido';
import { EnPreparacion } from '../../../../components/Fichas';
import HeroPage from '../../../../components/HeroPage';
import { TarjetaLocal } from '../../../../components/Locales';
import Migas from '../../../../components/Migas';
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
  const destacados = locales.filter((l) => l.pagina_propia);
  // Los destacados salen arriba; en su zona solo el resto, para no repetirlos.
  const grupos = ordenarZonas(agruparPorZona(locales.filter((l) => !l.pagina_propia)), ORDEN_RESTAURANTES);
  const nombre = (z: string) => (z === 'por-definir' ? 'Para despedidas' : NOMBRE_ZONA[z as keyof typeof NOMBRE_ZONA]);
  return (
    <>
      <HeroPage ruta="/comer/restaurantes/" etiqueta="Comer" titulo="Restaurantes" subtitulo="Agrupados por zona." />
      <Migas lang={lang} ruta="/comer/restaurantes/" />
      <Contenido lang={lang} ruta="/comer/restaurantes/" parte="intro" />
      {destacados.length > 0 && (
        <Seccion fondo="arena" etiqueta="Con ficha propia" titulo="Para empezar" intro="Tres sitios con página completa." centrado>
          <div className="grid gap-6 md:grid-cols-3">{destacados.map((l) => <TarjetaLocal key={l.id} local={l} href={href(l)} />)}</div>
        </Seccion>
      )}
      <NavZonas zonas={grupos.map((g) => ({ id: g.zona, nombre: nombre(g.zona), n: g.locales.length }))} />
      {grupos.length ? grupos.map((g, i) => (
        <Seccion key={g.zona} fondo={i % 2 ? 'gris' : 'blanco'} titulo={nombre(g.zona)} intro={`${g.locales.length} ${g.locales.length === 1 ? 'sitio' : 'sitios'}`} id={g.zona}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{g.locales.map((l) => <TarjetaLocal key={l.id} local={l} href={href(l)} />)}</div>
        </Seccion>
      )) : <Seccion ancho="estrecho"><EnPreparacion /></Seccion>}
      <Contenido lang={lang} ruta="/comer/restaurantes/" parte="resto" />
      <BandaAgencia lang={lang} />
    </>
  );
}
