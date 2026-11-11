import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../components/BandaAgencia';
import Contenido from '../../../components/Contenido';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import TarjetaFoto from '../../../components/TarjetaFoto';
import { getActividades } from '../../../lib/datos';
import { esIdioma, href } from '../../../lib/i18n';
import { FAMILIAS_INFO } from '../../../lib/paraisos';
import { metaRuta } from '../../../lib/seo';
import Rejilla from '../../../components/Rejilla';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = metaRuta('/actividades/');

export default function Actividades({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const todas = getActividades();
  const familias = Object.keys(FAMILIAS_INFO) as (keyof typeof FAMILIAS_INFO)[];
  return (
    <>
      <HeroPage ruta="/actividades/" etiqueta="Mar y playa" titulo="Actividades" subtitulo="Qué hacer en el mar y en la playa con tu grupo." />
      <Migas lang={lang} ruta="/actividades/" />
      <Seccion etiqueta="Seis familias" titulo="Elige el tipo de plan" intro="Cada actividad dice dónde se hace." centrado>
        <Rejilla>
          {familias.map((f) => {
            const n = todas.filter((a) => a.familia === f).length;
            return <TarjetaFoto key={f} titulo={FAMILIAS_INFO[f].titulo} texto={FAMILIAS_INFO[f].texto} href={href(lang, `/actividades/${f}/`)} claves={[f, 'actividades']} datos={n ? [`${n} ${n === 1 ? 'actividad' : 'actividades'}`] : undefined} />;
          })}
        </Rejilla>
      </Seccion>
      <Contenido lang={lang} ruta="/actividades/" />
      <BandaAgencia lang={lang} />
    </>
  );
}
