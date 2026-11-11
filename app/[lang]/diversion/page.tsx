import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../components/BandaAgencia';
import Contenido from '../../../components/Contenido';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import TarjetaFoto from '../../../components/TarjetaFoto';
import { getLocales } from '../../../lib/datos';
import { esIdioma, href } from '../../../lib/i18n';
import { NOMBRE_ZONA, ZONAS_DIVERSION } from '../../../lib/locales';
import { metaRuta } from '../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = metaRuta('/diversion/');

const RESUMEN: Record<(typeof ZONAS_DIVERSION)[number], string> = {
  'sanxenxo-puerto': 'El punto de partida: pubs con terraza, locales con música y todo a pie.',
  portonovo: 'Más recogido, con su propio ambiente y menos masificado que el puerto.',
  'a-lanzada-san-vicente': 'La zona de los atardeceres: terrazas y chiringuitos con vistas.',
  'o-grove': 'Copas y terrazas para quien se aloja por esa zona.',
};

export default function Diversion({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const todos = getLocales('diversion');
  return (
    <>
      <HeroPage ruta="/diversion/" etiqueta="Cuando cae el sol" titulo="Diversión" subtitulo="Terraceo, tardeo, puestas de sol y copas." />
      <Migas lang={lang} ruta="/diversion/" />
      <Seccion etiqueta="Cuatro zonas" titulo="Elige dónde" intro="Son las mismas zonas de la guía, cada una con su ritmo y su horario." centrado>
        <div className="grid gap-6 sm:grid-cols-2">
          {ZONAS_DIVERSION.map((z) => {
            const n = todos.filter((l) => l.zona === z).length;
            return <TarjetaFoto key={z} alto="alto" titulo={NOMBRE_ZONA[z]} texto={RESUMEN[z]} href={href(lang, `/diversion/${z}/`)} claves={[`diversion-${z}`, z, 'diversion']} datos={n ? [`${n} locales`] : undefined} />;
          })}
        </div>
      </Seccion>
      <Contenido lang={lang} ruta="/diversion/" />
      <BandaAgencia lang={lang} />
    </>
  );
}
