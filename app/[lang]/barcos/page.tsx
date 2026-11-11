import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Contenido from '../../../components/Contenido';
import { EnPreparacion } from '../../../components/Fichas';
import HeroPage from '../../../components/HeroPage';
import BandaAgencia from '../../../components/BandaAgencia';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import TarjetaBarco, { ENLACE_BARCOS, tituloBarco } from '../../../components/TarjetaBarco';
import { getBarcos } from '../../../lib/datos';
import { CATEGORIAS_BARCO } from '../../../lib/esquemas';
import { esIdioma } from '../../../lib/i18n';
import { metaRuta } from '../../../lib/seo';
import Rejilla from '../../../components/Rejilla';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = metaRuta('/barcos/');

// Una sola página con todas las fichas, en 3 columnas (decisión de Pablo). El orden sigue CATEGORIAS_BARCO.
export default function Barcos({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const barcos = getBarcos();
  const ordenados = CATEGORIAS_BARCO.flatMap((c) => barcos.filter((b) => b.categoria === c));
  return (
    <>
      <HeroPage ruta="/barcos/" etiqueta="Mar" titulo="Barcos" subtitulo="Yates, veleros, pesquero y lancha rápida para tu grupo." />
      <Migas lang={params.lang} ruta="/barcos/" />
      <Contenido lang={params.lang} ruta="/barcos/" parte="intro" />
      <Seccion etiqueta="Flota" titulo="Elige tu barco" intro="Precio «desde» y capacidad máxima en cada ficha." fondo="gris" centrado>
        {ordenados.length ? (
          <Rejilla>
            {ordenados.map((b) => {
              const misma = barcos.filter((x) => x.categoria === b.categoria);
              return <TarjetaBarco key={b.id} b={b} titulo={tituloBarco(b, misma.indexOf(b) + 1, misma.length)} />;
            })}
          </Rejilla>
        ) : <EnPreparacion />}
        <p className="mt-10 text-sm text-gray-500">
          Los barcos son de <a href={ENLACE_BARCOS} target="_blank" rel="noopener noreferrer" className="link-inline">Sea Galicia</a>. ¿Prefieres un traslado a Ons, Cíes o Aldán?{' '}
          <Link href="/barcos/traslados/" className="link-inline">Mira los traslados</Link>.
        </p>
      </Seccion>
      <Contenido lang={params.lang} ruta="/barcos/" parte="resto" />
      <BandaAgencia lang={params.lang} />
    </>
  );
}
