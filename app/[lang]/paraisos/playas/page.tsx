import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import Contenido from '../../../../components/Contenido';
import { EnPreparacion, TarjetaPlaya } from '../../../../components/Fichas';
import HeroPage from '../../../../components/HeroPage';
import Migas from '../../../../components/Migas';
import Seccion from '../../../../components/Seccion';
import TarjetaFoto from '../../../../components/TarjetaFoto';
import { getPlayas } from '../../../../lib/datos';
import { IDIOMAS, esIdioma, href } from '../../../../lib/i18n';
import { TRAMOS_RUTA, esTop } from '../../../../lib/paraisos';
import { metaRuta } from '../../../../lib/seo';
import Rejilla from '../../../../components/Rejilla';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = metaRuta('/paraisos/playas/');

const RESUMEN: Record<string, string> = {
  sanxenxo: 'Las urbanas, con paseo marítimo: Silgar, Areas, Panadeira.',
  portonovo: 'Baltar, Montalvo, Caneliñas y alguna cala escondida.',
  'noalla-a-lanzada': 'Arenales largos y abiertos al Atlántico.',
  'o-grove-san-vicente': 'Calas, pasarelas de madera y buenas vistas.',
  'mas-alla': 'Aldán, Bueu, Marín, Poio y Combarro.',
};

export default function Playas({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const playas = getPlayas();
  const top = playas.filter(esTop);
  return (
    <>
      <HeroPage ruta="/paraisos/playas/" etiqueta="Paraísos" titulo="Playas" subtitulo="Cinco tramos de costa y nueve imprescindibles para empezar." />
      <Migas lang={lang} ruta="/paraisos/playas/" />
      <Seccion etiqueta="De sur a norte" titulo="Cinco tramos de costa" intro="Elige el tramo que te quede cerca y verás todas sus playas." centrado>
        <Rejilla>
          {TRAMOS_RUTA.map((t) => {
            const n = playas.filter((p) => (t.tramos as readonly string[]).includes(p.tramo)).length;
            return <TarjetaFoto key={t.slug} titulo={t.titulo} texto={RESUMEN[t.slug]} href={href(lang, `/paraisos/playas/${t.slug}/`)} claves={[`playas-${t.slug}`, 'paraisos']} datos={n ? [`${n} playas`] : undefined} />;
          })}
        </Rejilla>
      </Seccion>
      <Seccion fondo="arena" etiqueta="Las que no fallan" titulo="Las nueve imprescindibles" centrado>
        {top.length ? (
          <Rejilla>
            {top.map((p) => <TarjetaPlaya key={p.id} playa={p} lang={lang} etiquetaTramo />)}
          </Rejilla>
        ) : <EnPreparacion />}
      </Seccion>
      <Contenido lang={lang} ruta="/paraisos/playas/" />
      <BandaAgencia lang={lang} />
    </>
  );
}
