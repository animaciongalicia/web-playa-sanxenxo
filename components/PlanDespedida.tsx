import Image from 'next/image';
import Link from 'next/link';
import BandaAgencia from './BandaAgencia';
import Seccion from './Seccion';
import TarjetaFoto from './TarjetaFoto';
import { getLocales } from '../lib/datos';
import { foto } from '../lib/fotos';
import { href, type Idioma } from '../lib/i18n';

/** El plan en conjunto (docs/02): enlaza todas las secciones con foto. Cierra con A Vichona (dato real) y la banda de contacto. */
export default function PlanDespedida({ lang }: { lang: Idioma }) {
  const h = (r: string) => href(lang, r);
  const vichona = getLocales('restaurantes').find((l) => l.id === 'a-vichona');
  const imgVichona = foto('a-vichona');
  return (
    <>
      <Seccion etiqueta="Todo junto" titulo="El plan, por piezas" intro="Combina lo que te encaje. Cada pieza explica dónde, cuándo y cómo." centrado>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TarjetaFoto titulo="Playas y mar" texto="Dónde bañarte, y Ons, Cíes y la ría de Aldán." href={h('/paraisos/')} claves={['paraisos']} />
          <TarjetaFoto titulo="Barcos" texto="Yates, veleros y traslados en lancha rápida." href={h('/barcos/')} claves={['barcos']} />
          <TarjetaFoto titulo="Actividades" texto="Qué hacer en el mar y en la playa con tu grupo." href={h('/actividades/')} claves={['actividades']} />
          <TarjetaFoto titulo="Comer" texto="Restaurantes, chiringuitos y furanchos." href={h('/comer/')} claves={['comer']} />
          <TarjetaFoto titulo="Diversión" texto="Terraceo, tardeo, puestas de sol y copas." href={h('/diversion/')} claves={['diversion']} />
          <TarjetaFoto titulo="Cuándo ir" texto="Mes a mes: qué te encuentras y qué te conviene." href={h('/cuando-ir/')} claves={['cuando-ir']} />
        </div>
        <p className="mt-8 text-center text-sm text-gray-600">Antes de decidir fecha, lee las <Link href={h('/cuando-ir/#condiciones')} className="link-inline">condiciones de las despedidas</Link>.</p>
      </Seccion>
      {vichona && (
        <Seccion fondo="gris">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-ria-100 to-ria-300 shadow-xl">
              {imgVichona && <Image src={imgVichona} alt={vichona.nombre} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />}
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-ria-600">Un sitio para grupos</p>
              <h2 className="heading-section">{vichona.nombre}</h2>
              <p className="mt-2 text-lg font-medium text-ria-700">Asador de churrasco</p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{vichona.despedidas.como}</p>
              <Link href={h(`/comer/restaurantes/${vichona.slug}/`)} className="btn-primary mt-6 inline-flex">Ver la ficha</Link>
            </div>
          </div>
        </Seccion>
      )}
      <BandaAgencia lang={lang} />
    </>
  );
}
