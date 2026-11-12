import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../../components/HeroPage';
import Migas from '../../../../../components/Migas';
import Contenido from '../../../../../components/Contenido';
import Galeria from '../../../../../components/Galeria';
import BandaAgencia from '../../../../../components/BandaAgencia';
import Seccion from '../../../../../components/Seccion';
import { EnPreparacion, TarjetaPlaya } from '../../../../../components/Fichas';
import { getPlayas } from '../../../../../lib/datos';
import { IDIOMAS, esIdioma } from '../../../../../lib/i18n';
import { NOMBRE_TRAMO, TRAMOS_RUTA, buscarTramoRuta, esTop } from '../../../../../lib/paraisos';
import { metaRuta } from '../../../../../lib/seo';
import { getContenido } from '../../../../../lib/contenido';
import Rejilla from '../../../../../components/Rejilla';
import GuiasRelacionadas from '../../../../../components/GuiasRelacionadas';

type P = { lang: string; tramo: string };
export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.flatMap((lang) => TRAMOS_RUTA.map((t) => ({ lang, tramo: t.slug })));
export const generateMetadata = ({ params }: { params: P }): Metadata => metaRuta(`/paraisos/playas/${params.tramo}/`);

const RESUMEN: Record<string, string> = {
  sanxenxo: 'Las urbanas, con paseo marítimo: de la playa al paseo, y del paseo a la terraza.',
  portonovo: 'Arena blanca, aguas tranquilas y calas con agua verde esmeralda.',
  'noalla-a-lanzada': 'Arenales largos y abiertos al Atlántico, con la luz del atardecer.',
  'o-grove-san-vicente': 'Calas, pasarelas de madera y vistas que no se olvidan.',
  'mas-alla': 'Aldán, Bueu, Marín, Poio y Combarro: la costa menos masificada.',
};

export default function Tramo({ params }: { params: P }) {
  const tramo = buscarTramoRuta(params.tramo);
  if (!esIdioma(params.lang) || !tramo) notFound();
  const lang = params.lang;
  const playas = getPlayas();
  // "Más allá" agrupa varios tramos de datos: una sección por cada uno.
  const html = getContenido(lang, `/paraisos/playas/${tramo.slug}/`)?.html ?? '';
  const titulosH2 = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)].map((m) => m[1].replace(/<[^>]+>/g, '').toLowerCase());
  const yaContada = (nombre: string) => titulosH2.some((t) => t.includes(nombre.toLowerCase()));
  const delTramo = playas.filter((p) => (tramo.tramos as readonly string[]).includes(p.tramo));
  const nBandera = delTramo.filter((p) => p.bandera_azul && p.verificado).length;
  const grupos = tramo.tramos
    .map((t) => ({ t, playas: playas.filter((p) => p.tramo === t && !(esTop(p) && yaContada(p.nombre))) }))
    .filter((g) => g.playas.length);
  return (
    <>
      <HeroPage ruta={`/paraisos/playas/${params.tramo}/`} etiqueta={`${delTramo.length} playas`} titulo={tramo.slug === 'mas-alla' ? 'Más allá: Aldán, Bueu, Marín, Poio y Combarro' : `Playas de ${tramo.titulo}`} subtitulo={RESUMEN[tramo.slug]} />
      <Migas lang={lang} ruta={`/paraisos/playas/${tramo.slug}/`} titulo={tramo.titulo} />
      <Contenido lang={lang} ruta={`/paraisos/playas/${tramo.slug}/`} />
      {grupos.length ? (
        grupos.map((g, i) => (
          <Seccion key={g.t} fondo={i % 2 ? 'blanco' : 'arena'} etiqueta="Y también" titulo={tramo.tramos.length > 1 ? NOMBRE_TRAMO[g.t] : `Más playas de ${tramo.titulo}`} intro={`${g.playas.length} ${g.playas.length === 1 ? 'playa' : 'playas'} más por descubrir.`} id={g.t} centrado>
            <Rejilla>
              {g.playas.map((p) => <TarjetaPlaya key={p.id} playa={p} lang={lang} />)}
            </Rejilla>
          </Seccion>
        ))
      ) : (
        <Seccion ancho="estrecho"><EnPreparacion /></Seccion>
      )}
      <Galeria prefijo={`playas-${params.tramo}`} etiqueta="Para ir abriendo boca" titulo="Un vistazo a la costa" />
      <GuiasRelacionadas ruta={`/paraisos/playas/${params.tramo}/`} />
      <BandaAgencia lang={lang} />
    </>
  );
}
