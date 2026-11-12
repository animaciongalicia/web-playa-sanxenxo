import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import { EnPreparacion } from '../../../../components/Fichas';
import { TarjetaLocal } from '../../../../components/Locales';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
import Galeria from '../../../../components/Galeria';
import BandaAgencia from '../../../../components/BandaAgencia';
import Seccion from '../../../../components/Seccion';
import { getLocales } from '../../../../lib/datos';
import { esIdioma } from '../../../../lib/i18n';
import { NOMBRE_ZONA, ZONAS_DIVERSION } from '../../../../lib/locales';
import { metaRuta } from '../../../../lib/seo';
import Rejilla from '../../../../components/Rejilla';

type P = { lang: string; zona: string };
const valida = (z: string): z is (typeof ZONAS_DIVERSION)[number] => (ZONAS_DIVERSION as readonly string[]).includes(z);
export const dynamicParams = false;
export const generateStaticParams = () => ZONAS_DIVERSION.map((zona) => ({ lang: 'es', zona }));
export const generateMetadata = ({ params }: { params: P }): Metadata => metaRuta(`/diversion/${params.zona}/`);

export default function ZonaDiversion({ params }: { params: P }) {
  if (!esIdioma(params.lang) || !valida(params.zona)) notFound();
  const zona = params.zona;
  const locales = getLocales('diversion').filter((l) => l.zona === zona);
  // Locales que viven en chiringuitos pero se recomiendan aquí (una sola ficha: se enlaza a ella).
  const referencias = zona === 'a-lanzada-san-vicente' ? getLocales('chiringuitos').filter((l) => l.tambien_en.includes('diversion')) : [];
  return (
    <>
      <HeroPage ruta={`/diversion/${params.zona}/`} etiqueta="Diversión" titulo={NOMBRE_ZONA[zona]} />
      <Migas lang={params.lang} ruta={`/diversion/${zona}/`} titulo={NOMBRE_ZONA[zona]} />
      <Contenido lang={params.lang} ruta={`/diversion/${zona}/`} parte="intro" />
      <Seccion fondo="arena" etiqueta="Los locales" titulo={`Qué hay en ${NOMBRE_ZONA[zona]}`} intro={locales.length ? `${locales.length} ${locales.length === 1 ? 'local' : 'locales'} en la guía.` : undefined} centrado>
        {locales.length || referencias.length ? (
          <Rejilla>
            {locales.map((l) => <TarjetaLocal key={l.id} local={l} href={l.pagina_propia ? `/diversion/${zona}/${l.slug}/` : undefined} />)}
          </Rejilla>
        ) : <EnPreparacion />}
        {referencias.length > 0 && (
          <div className="mt-12 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">También para tardear y ver la puesta de sol</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {referencias.map((l) => <li key={l.id}><Link href={`/comer/chiringuitos/#${l.slug}`} className="link-inline">{l.nombre}</Link></li>)}
            </ul>
          </div>
        )}
      </Seccion>
      <Contenido lang={params.lang} ruta={`/diversion/${zona}/`} parte="resto" />
      <Galeria prefijo={zona} etiqueta="Ambiente" titulo="Cómo se ve cuando cae el sol" />
      <BandaAgencia lang={params.lang} />
    </>
  );
}
