import Link from 'next/link';
import LlamadaAgencia from './LlamadaAgencia';
import Seccion from './Seccion';
import Tarjeta from './Tarjeta';
import { getLocales } from '../lib/datos';
import { href, type Idioma } from '../lib/i18n';

/** El plan en conjunto (docs/02): enlaza todas las secciones. Lo escribe Pablo; aquí solo está la estructura y A Vichona (dato real). */
export default function PlanDespedida({ lang }: { lang: Idioma }) {
  const h = (r: string) => href(lang, r);
  const vichona = getLocales('restaurantes').find((l) => l.id === 'a-vichona');
  return (
    <>
      <Seccion titulo="El plan, por piezas" intro="Combina lo que te encaje. Cada pieza explica dónde, cuándo y cómo.">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Tarjeta titulo="Playas y mar" texto="Dónde bañarte, y Ons, Cíes y la ría de Aldán." href={h('/paraisos/')} />
          <Tarjeta titulo="Barcos" texto="Yates, veleros y traslados en lancha rápida." href="/barcos/" />
          <Tarjeta titulo="Actividades" texto="Qué hacer en el mar y en la playa con tu grupo." href="/actividades/" />
          <Tarjeta titulo="Comer" texto="Restaurantes, chiringuitos y furanchos." href="/comer/" />
          <Tarjeta titulo="Diversión" texto="Terraceo, tardeo, puestas de sol y copas." href="/diversion/" />
          <Tarjeta titulo="Cuándo ir" texto="Mes a mes: qué te encuentras y qué te conviene." href={h('/cuando-ir/')} />
        </div>
        <p className="mt-8 text-sm text-gray-600">Antes de decidir fecha, lee las <Link href={h('/cuando-ir/#condiciones')} className="link-inline">condiciones de las despedidas</Link>.</p>
      </Seccion>
      {vichona && (
        <Seccion fondo="gris" titulo={vichona.nombre} intro="Asador de churrasco.">
          <p className="max-w-3xl text-lg leading-relaxed text-gray-600">
            {vichona.despedidas.como}
            
          </p>
          <p className="mt-4"><Link href={`/comer/restaurantes/${vichona.slug}/`} className="link-inline">Ver la ficha →</Link></p>
        </Seccion>
      )}
      <Seccion ancho="estrecho"><LlamadaAgencia lang={lang} /></Seccion>
    </>
  );
}
