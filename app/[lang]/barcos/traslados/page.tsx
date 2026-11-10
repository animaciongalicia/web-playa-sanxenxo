import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import LlamadaAgencia from '../../../../components/LlamadaAgencia';
import { EnPreparacion, Insignia } from '../../../../components/Fichas';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
import Seccion from '../../../../components/Seccion';
import { getTraslados } from '../../../../lib/datos';
import { esIdioma } from '../../../../lib/i18n';
import { DESTINO_SLUG } from '../../../../lib/paraisos';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Traslados a Ons, Cíes y Aldán' };
const NOMBRE = { ons: 'Isla de Ons', cies: 'Islas Cíes', aldan: 'Ría de Aldán' } as const;
const eur = (n: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export default function Traslados({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const traslados = getTraslados();
  return (
    <>
      <HeroPage titulo="Traslados a Ons, Cíes y Aldán" subtitulo="En lancha rápida." />
      <Migas lang={params.lang} ruta="/barcos/traslados/" />
      <Contenido lang={params.lang} ruta="/barcos/traslados/" />
      <Seccion>
        {traslados.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {traslados.map((t) => (
              <article key={t.id} className="card-elegant stagger-child !p-6">
                <h3 className="text-lg font-semibold text-gray-900">{NOMBRE[t.destino]}<Insignia f={t} /></h3>
                <dl className="mt-3 space-y-1 text-sm text-gray-600">
                  {t.puerto_salida && <div><dt className="inline font-semibold text-gray-900">Puerto de salida: </dt><dd className="inline">{t.puerto_salida}</dd></div>}
                  {t.duracion && <div><dt className="inline font-semibold text-gray-900">Duración: </dt><dd className="inline">{t.duracion}</dd></div>}
                  {t.precio_desde && <div><dt className="inline font-semibold text-gray-900">Desde: </dt><dd className="inline">{eur(t.precio_desde.importe)} {t.precio_desde.unidad}</dd></div>}
                </dl>
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
                  <Link href={`/paraisos/mar/${DESTINO_SLUG[t.destino]}/`} className="text-ria-700">Ver destino →</Link>
                  <a href={t.enlace_reserva} target="_blank" rel="noopener noreferrer" className="text-ria-700">Sea Galicia →</a>
                </p>
              </article>
            ))}
          </div>
        ) : <EnPreparacion />}
      </Seccion>
      <Seccion ancho="estrecho" fondo="gris"><LlamadaAgencia lang={params.lang} /></Seccion>
    </>
  );
}
