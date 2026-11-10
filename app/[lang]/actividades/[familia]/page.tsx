import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import LlamadaAgencia from '../../../../components/LlamadaAgencia';
import { Aviso, EnPreparacion, TarjetaActividad } from '../../../../components/Fichas';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
import Seccion from '../../../../components/Seccion';
import { getActividades } from '../../../../lib/datos';
import { FAMILIAS } from '../../../../lib/esquemas';
import { esIdioma } from '../../../../lib/i18n';
import { FAMILIAS_INFO } from '../../../../lib/paraisos';

type P = { lang: string; familia: string };
export const dynamicParams = false;
export const generateStaticParams = () => FAMILIAS.map((familia) => ({ lang: 'es', familia }));
export const generateMetadata = ({ params }: { params: P }): Metadata => ({
  title: FAMILIAS_INFO[params.familia as keyof typeof FAMILIAS_INFO]?.titulo,
  description: FAMILIAS_INFO[params.familia as keyof typeof FAMILIAS_INFO]?.texto,
});

export default function Familia({ params }: { params: P }) {
  const info = FAMILIAS_INFO[params.familia as keyof typeof FAMILIAS_INFO];
  if (!esIdioma(params.lang) || !info) notFound();
  const actividades = getActividades().filter((a) => a.familia === params.familia);
  const kayak = params.familia === 'kayak-areoso';
  return (
    <>
      <HeroPage titulo={info.titulo} subtitulo={info.texto} />
      <Migas lang={params.lang} ruta={`/actividades/${params.familia}/`} titulo={info.titulo} />
      <Contenido lang={params.lang} ruta={`/actividades/${params.familia}/`} />
      <Seccion>
        {kayak && <div className="mb-8"><Aviso>El desembarco en Areoso requiere autorización: no podemos prometerte una parada garantizada.</Aviso></div>}
        {actividades.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{actividades.map((a) => <TarjetaActividad key={a.id} a={a} />)}</div>
        ) : <EnPreparacion />}
      </Seccion>
      <Seccion ancho="estrecho" fondo="gris"><LlamadaAgencia lang={params.lang} /></Seccion>
    </>
  );
}
