import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import BandaAgencia from '../../../../components/BandaAgencia';
import { Aviso, EnPreparacion, TarjetaActividad } from '../../../../components/Fichas';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
import Seccion from '../../../../components/Seccion';
import { getContenido } from '../../../../lib/contenido';
import { getActividades } from '../../../../lib/datos';
import { FAMILIAS } from '../../../../lib/esquemas';
import { esIdioma } from '../../../../lib/i18n';
import { FAMILIAS_INFO } from '../../../../lib/paraisos';
import { metaRuta } from '../../../../lib/seo';
import Rejilla from '../../../../components/Rejilla';
import GuiasRelacionadas from '../../../../components/GuiasRelacionadas';

type P = { lang: string; familia: string };
export const dynamicParams = false;
export const generateStaticParams = () => FAMILIAS.map((familia) => ({ lang: 'es', familia }));
export const generateMetadata = ({ params }: { params: P }): Metadata => metaRuta(`/actividades/${params.familia}/`);

export default function Familia({ params }: { params: P }) {
  const info = FAMILIAS_INFO[params.familia as keyof typeof FAMILIAS_INFO];
  if (!esIdioma(params.lang) || !info) notFound();
  const actividades = getActividades().filter((a) => a.familia === params.familia);
  const conTexto = !!getContenido(params.lang, `/actividades/${params.familia}/`);
  const kayak = params.familia === 'kayak-areoso';
  return (
    <>
      <HeroPage ruta={`/actividades/${params.familia}/`} titulo={info.titulo} subtitulo={info.texto} />
      <Migas lang={params.lang} ruta={`/actividades/${params.familia}/`} titulo={info.titulo} />
      <Seccion fondo="gris" etiqueta="Qué se puede hacer" titulo={info.titulo} intro={info.texto}>
        {kayak && <div className="mb-8"><Aviso>El desembarco en Areoso requiere autorización, así que la parada no está garantizada.</Aviso></div>}
        {actividades.length ? (
          <Rejilla>{actividades.map((a) => <TarjetaActividad key={a.id} a={a} compacta={conTexto} />)}</Rejilla>
        ) : <EnPreparacion />}
      </Seccion>
      <Contenido lang={params.lang} ruta={`/actividades/${params.familia}/`} />
      <GuiasRelacionadas ruta={`/actividades/${params.familia}/`} />
      <BandaAgencia lang={params.lang} />
    </>
  );
}
