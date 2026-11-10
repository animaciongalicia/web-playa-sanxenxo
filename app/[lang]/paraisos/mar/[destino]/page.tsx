import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../../components/HeroPage';
import Migas from '../../../../../components/Migas';
import Contenido from '../../../../../components/Contenido';
import Seccion from '../../../../../components/Seccion';
import {Aviso, EnPreparacion, TarjetaPlaya} from '../../../../../components/Fichas';
import BandaAgencia from '../../../../../components/BandaAgencia';
import { getContenido } from '../../../../../lib/contenido';
import { getDestinos, getPlayas } from '../../../../../lib/datos';
import { IDIOMAS, esIdioma, href } from '../../../../../lib/i18n';
import { DESTINO_SLUG } from '../../../../../lib/paraisos';

type P = { lang: string; destino: string };
const SLUGS = Object.values(DESTINO_SLUG) as string[];
const idDe = (slug: string) => (Object.keys(DESTINO_SLUG) as (keyof typeof DESTINO_SLUG)[]).find((k) => DESTINO_SLUG[k] === slug);
const TITULOS: Record<string, string> = { ons: 'Isla de Ons', cies: 'Islas Cíes', aldan: 'Ría de Aldán, el Caribe gallego' };

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.flatMap((lang) => SLUGS.map((destino) => ({ lang, destino })));
export const generateMetadata = ({ params }: { params: P }): Metadata => ({ title: TITULOS[idDe(params.destino) ?? ''] });

export default function Destino({ params }: { params: P }) {
  const id = idDe(params.destino);
  if (!esIdioma(params.lang) || !id) notFound();
  const lang = params.lang;
  const destino = getDestinos().find((d) => d.id === id);
  const playas = getPlayas().filter((p) => destino?.playas.includes(p.id));
  const hayTexto = !!getContenido(lang, `/paraisos/mar/${params.destino}/`);
  const hayContenido = destino && (destino.descripcion || destino.como_se_llega || destino.cupos_permisos);
  return (
    <>
      <HeroPage ruta={`/paraisos/mar/${params.destino}/`} etiqueta={destino?.parque_nacional ? 'Parque Nacional de las Islas Atlánticas' : undefined} titulo={TITULOS[id]} />
      <Migas lang={lang} ruta={`/paraisos/mar/${params.destino}/`} titulo={TITULOS[id]} />
      <Contenido lang={lang} ruta={`/paraisos/mar/${params.destino}/`} />
      {(!hayTexto || !!hayContenido) && !hayTexto && <Seccion ancho="estrecho">
        {destino && <p className="mb-4"></p>}
        {destino?.descripcion && <p className="text-lg leading-relaxed text-gray-600">{destino.descripcion}</p>}
        {destino?.como_se_llega && <><h2 className="mt-8 text-xl font-bold text-gray-900">Cómo se llega</h2><p className="mt-2 text-gray-600">{destino.como_se_llega}</p></>}
        {destino?.cupos_permisos && <div className="mt-8"><Aviso><strong>Cupos y permisos:</strong> {destino.cupos_permisos}</Aviso></div>}
        {!hayContenido && <EnPreparacion />}
        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href={href(lang, '/barcos/')} className="link-inline">Barcos →</Link>
          <Link href={href(lang, '/barcos/traslados/')} className="link-inline">Traslados en lancha rápida →</Link>
        </p>
      </Seccion>}
      {playas.length > 0 && (
        <Seccion fondo="arena" etiqueta="En la zona" titulo="Playas de esta costa" centrado>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{playas.map((p) => <TarjetaPlaya key={p.id} playa={p} lang={lang} />)}</div>
        </Seccion>
      )}
      <BandaAgencia lang={lang} />
    </>
  );
}
