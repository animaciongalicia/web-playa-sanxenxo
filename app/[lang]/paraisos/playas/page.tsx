import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import Link from 'next/link';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
import Seccion from '../../../../components/Seccion';
import Tarjeta from '../../../../components/Tarjeta';
import {EnPreparacion, TarjetaPlaya} from '../../../../components/Fichas';
import { getPlayas } from '../../../../lib/datos';
import { IDIOMAS, esIdioma, href } from '../../../../lib/i18n';
import { TRAMOS_RUTA, esTop, slugTramoDe } from '../../../../lib/paraisos';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = { title: 'Playas', description: 'Las playas por tramo de costa y las 8 imprescindibles.' };

export default function Playas({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const playas = getPlayas();
  const top = playas.filter(esTop);
  return (
    <>
      <HeroPage ruta="/paraisos/playas/" titulo="Playas" subtitulo="Las playas por tramo de costa y las 8 imprescindibles." />
      <Migas lang={lang} ruta="/paraisos/playas/" />
      <Contenido lang={lang} ruta="/paraisos/playas/" />
      <Seccion titulo="Cinco tramos de costa" intro="Elige el tramo y verás todas sus playas.">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TRAMOS_RUTA.map((t) => {
            const n = playas.filter((p) => (t.tramos as readonly string[]).includes(p.tramo)).length;
            return <Tarjeta key={t.slug} titulo={t.titulo} texto={n ? `${n} playas` : undefined} href={href(lang, `/paraisos/playas/${t.slug}/`)} />;
          })}
        </div>
      </Seccion>
      <Seccion fondo="gris" titulo="Las 8 imprescindibles">
        {top.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {top.map((p) => (
              <Link key={p.id} href={`${href(lang, `/paraisos/playas/${slugTramoDe(p.tramo)}/`)}#${p.slug}`} className="block">
                <TarjetaPlaya playa={p} lang={lang} etiquetaTramo />
              </Link>
            ))}
          </div>
        ) : <EnPreparacion />}
      </Seccion>
    </>
  );
}
