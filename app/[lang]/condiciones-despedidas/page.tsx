import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroPage from '../../../components/HeroPage';
import { EnPreparacion, NotaRevision } from '../../../components/Fichas';
import LlamadaAgencia from '../../../components/LlamadaAgencia';
import Migas from '../../../components/Migas';
import Contenido from '../../../components/Contenido';
import Seccion from '../../../components/Seccion';
import { IDIOMAS, esIdioma } from '../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = { title: 'Condiciones de las despedidas' };

// Texto agregado, sin señalar locales (regla 5). Lo escribe Pablo (docs/07).
export default function Condiciones({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  return (
    <>
      <HeroPage titulo="Condiciones de las despedidas" subtitulo="Qué se puede y qué no en la zona, sobre todo en julio y agosto." />
      <Migas lang={params.lang} ruta="/condiciones-despedidas/" />
      <Contenido lang={params.lang} ruta="/condiciones-despedidas/" />
      <Seccion ancho="estrecho">
        <NotaRevision>Texto pendiente de Pablo: condiciones de la zona, agregadas y sin señalar locales. Referencia previa suya: despedidas aceptadas en mayo y junio, casi nadie las quiere en julio y agosto, y algo en septiembre. Falta que lo confirme y lo desarrolle.</NotaRevision>
        <EnPreparacion />
      </Seccion>
      <Seccion ancho="estrecho" fondo="gris"><LlamadaAgencia lang={params.lang} /></Seccion>
    </>
  );
}
