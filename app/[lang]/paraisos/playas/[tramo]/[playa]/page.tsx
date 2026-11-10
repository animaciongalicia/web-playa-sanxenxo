import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../../../components/HeroPage';
import Migas from '../../../../../../components/Migas';
import Seccion from '../../../../../../components/Seccion';
import { Insignia, NotaRevision, TarjetaActividad } from '../../../../../../components/Fichas';
import LlamadaAgencia from '../../../../../../components/LlamadaAgencia';
import { getActividades, getPlayas } from '../../../../../../lib/datos';
import { IDIOMAS, esIdioma, href } from '../../../../../../lib/i18n';
import { NOMBRE_TRAMO, buscarTramoRuta, esTop, slugTramoDe } from '../../../../../../lib/paraisos';

type P = { lang: string; tramo: string; playa: string };
export const dynamicParams = false;

// Solo las playas top tienen página propia; las demás viven como tarjeta en su tramo.
export function generateStaticParams() {
  return IDIOMAS.flatMap((lang) => getPlayas().filter(esTop).map((p) => ({ lang, tramo: slugTramoDe(p.tramo), playa: p.slug })));
}
export const generateMetadata = ({ params }: { params: P }): Metadata => ({
  title: getPlayas().find((p) => p.slug === params.playa)?.nombre ?? 'Playa',
});

export default function PaginaPlaya({ params }: { params: P }) {
  const playa = getPlayas().find((p) => p.slug === params.playa);
  const tramo = buscarTramoRuta(params.tramo);
  if (!esIdioma(params.lang) || !playa || !tramo || !esTop(playa) || slugTramoDe(playa.tramo) !== tramo.slug) notFound();
  const lang = params.lang;
  // Actividades que se hacen en esta playa (campo "donde" de actividades).
  const actividades = getActividades().filter((a) => a.donde.some((d) => d.tipo === 'playa' && d.nombre.toLowerCase() === playa.nombre.toLowerCase()));
  return (
    <>
      <HeroPage etiqueta={NOMBRE_TRAMO[playa.tramo]} titulo={playa.nombre} />
      <Migas lang={lang} ruta={`/paraisos/playas/${tramo.slug}/${playa.slug}/`} titulo={playa.nombre} />
      <Seccion ancho="estrecho">
        <NotaRevision>Playa top según la propuesta del núcleo. <Insignia f={playa} /></NotaRevision>
        {playa.descripcion && <p className="text-lg leading-relaxed text-gray-600">{playa.descripcion}</p>}
        <dl className="mt-6 space-y-2 text-gray-600">
          {playa.municipio && <div><dt className="inline font-semibold text-gray-900">Municipio: </dt><dd className="inline">{playa.municipio}</dd></div>}
          {playa.bandera_azul && playa.verificado && <div><dt className="inline font-semibold text-gray-900">Bandera azul: </dt><dd className="inline">{playa.bandera_azul.anio}</dd></div>}
        </dl>
        <p className="mt-8"><Link href={href(lang, `/paraisos/playas/${tramo.slug}/`)} className="link-inline">← Más playas de {tramo.titulo}</Link></p>
      </Seccion>
      {actividades.length > 0 && (
        <Seccion fondo="gris" titulo="Qué se hace aquí">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{actividades.map((a) => <TarjetaActividad key={a.id} a={a} />)}</div>
        </Seccion>
      )}
      <Seccion ancho="estrecho"><LlamadaAgencia lang={lang} /></Seccion>
    </>
  );
}
