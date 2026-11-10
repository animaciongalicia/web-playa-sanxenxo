import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../../components/HeroPage';
import Migas from '../../../../../components/Migas';
import Seccion from '../../../../../components/Seccion';
import { EnPreparacion, TarjetaPlaya } from '../../../../../components/Fichas';
import { getPlayas } from '../../../../../lib/datos';
import { IDIOMAS, esIdioma } from '../../../../../lib/i18n';
import { NOMBRE_TRAMO, TRAMOS_RUTA, buscarTramoRuta } from '../../../../../lib/paraisos';

type P = { lang: string; tramo: string };
export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.flatMap((lang) => TRAMOS_RUTA.map((t) => ({ lang, tramo: t.slug })));
export const generateMetadata = ({ params }: { params: P }): Metadata => ({ title: `Playas de ${buscarTramoRuta(params.tramo)?.titulo ?? ''}` });

export default function Tramo({ params }: { params: P }) {
  const tramo = buscarTramoRuta(params.tramo);
  if (!esIdioma(params.lang) || !tramo) notFound();
  const lang = params.lang;
  const playas = getPlayas();
  // "Más allá" agrupa varios tramos de datos: una sección por cada uno.
  const grupos = tramo.tramos
    .map((t) => ({ t, playas: playas.filter((p) => p.tramo === t) }))
    .filter((g) => g.playas.length);
  return (
    <>
      <HeroPage titulo={tramo.slug === 'mas-alla' ? 'Más allá: Aldán, Bueu, Marín, Poio y Combarro' : `Playas de ${tramo.titulo}`} />
      <Migas lang={lang} ruta={`/paraisos/playas/${tramo.slug}/`} titulo={tramo.titulo} />
      {grupos.length ? (
        grupos.map((g, i) => (
          <Seccion key={g.t} fondo={i % 2 ? 'gris' : 'blanco'} titulo={tramo.tramos.length > 1 ? NOMBRE_TRAMO[g.t] : undefined} id={g.t}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.playas.map((p) => <TarjetaPlaya key={p.id} playa={p} lang={lang} />)}
            </div>
          </Seccion>
        ))
      ) : (
        <Seccion ancho="estrecho"><EnPreparacion /></Seccion>
      )}
    </>
  );
}
