import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Galeria from '../../../../components/Galeria';
import BandaAgencia from '../../../../components/BandaAgencia';
import Contenido from '../../../../components/Contenido';
import { Aviso, EnPreparacion } from '../../../../components/Fichas';
import HeroPage from '../../../../components/HeroPage';
import Migas from '../../../../components/Migas';
import Seccion from '../../../../components/Seccion';
import { getTraslados } from '../../../../lib/datos';
import { foto } from '../../../../lib/fotos';
import { esIdioma, href } from '../../../../lib/i18n';
import { DESTINO_SLUG } from '../../../../lib/paraisos';
import Image from 'next/image';
import { metaRuta } from '../../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = metaRuta('/barcos/traslados/');
const NOMBRE = { ons: 'Isla de Ons', cies: 'Islas Cíes', aldan: 'Ría de Aldán' } as const;
const CLAVES = { ons: ['islas-ons', 'mar'], cies: ['islas-cies', 'mar'], aldan: ['ria-de-aldan', 'mar'] } as const;
const eur = (n: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export default function Traslados({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const traslados = getTraslados();
  return (
    <>
      <HeroPage ruta="/barcos/traslados/" etiqueta="Barcos" titulo="Traslados a Ons, Cíes y Aldán" subtitulo="En lancha rápida, sin esperar al barco regular." />
      <Migas lang={lang} ruta="/barcos/traslados/" />
      <Contenido lang={lang} ruta="/barcos/traslados/" parte="intro" />
      <Seccion fondo="gris" etiqueta="Tres destinos" titulo="Elige a dónde" intro="Puerto de salida, duración y precio: pregúntalos a la agencia, porque cambian según el día y el grupo." centrado>
        {traslados.length ? (
          <div className="grid gap-8 md:grid-cols-3">
            {traslados.map((t) => {
              const img = foto(...CLAVES[t.destino]);
              return (
                <article key={t.id} className="stagger-child flex flex-col overflow-hidden rounded-3xl bg-white shadow-md">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-ria-300 to-ria-700">
                    {img && <Image src={img} alt={NOMBRE[t.destino]} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />}
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ria-800">Lancha rápida</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-gray-900">{NOMBRE[t.destino]}</h3>
                    <dl className="mt-3 space-y-1 text-sm text-gray-600">
                      {t.puerto_salida && <div><dt className="inline font-semibold text-gray-900">Puerto de salida: </dt><dd className="inline">{t.puerto_salida}</dd></div>}
                      {t.duracion && <div><dt className="inline font-semibold text-gray-900">Duración: </dt><dd className="inline">{t.duracion}</dd></div>}
                      {t.precio_desde && <div><dt className="inline font-semibold text-gray-900">Desde: </dt><dd className="inline">{eur(t.precio_desde.importe)} {t.precio_desde.unidad}</dd></div>}
                    </dl>
                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      <a href={t.enlace_reserva} target="_blank" rel="noopener noreferrer" className="btn-primary !px-5 !py-2.5 text-sm">Reservar en Sea Galicia</a>
                      <Link href={href(lang, `/paraisos/mar/${DESTINO_SLUG[t.destino]}/`)} className="btn-outline !px-5 !py-2.5 text-sm">Ver destino</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : <EnPreparacion />}
        <div className="mx-auto mt-10 max-w-3xl">
          <Aviso>Ons y Cíes son Parque Nacional: en temporada alta necesitas autorización previa de la Xunta. Mira las <Link href={href(lang, '/paraisos/mar/')} className="font-semibold underline">normas y los cupos</Link> antes de reservar.</Aviso>
        </div>
      </Seccion>
      <Contenido lang={lang} ruta="/barcos/traslados/" parte="resto" />
      <Galeria prefijo="traslados" etiqueta="Por el camino" titulo="El trayecto ya es parte del plan" />
      <BandaAgencia lang={lang} />
    </>
  );
}
