import Image from 'next/image';
import type { Barco } from '../lib/esquemas';
import { foto } from '../lib/fotos';

export const ENLACE_BARCOS = 'https://seagalicia.com';

const ETIQUETA: Record<Barco['categoria'], string> = {
  yate: 'Yate', velero: 'Velero', 'yate-motora': 'Yate más motora', pesquero: 'Pesquero', 'lancha-rapida': 'Lancha rápida',
};

const miles = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function precio(p: Barco['precios'][number]) {
  const cifra = p.importe_max ? `${miles(p.importe)}-${miles(p.importe_max)} €` : `${miles(p.importe)} €`;
  return `${p.desde ? 'Desde ' : ''}${cifra}`;
}

/** Título: el nombre si lo hay; si no, "Yate 1", "Velero 2"… (el número solo si hay varios de la misma categoría). */
export function tituloBarco(b: Barco, n: number, de: number) {
  return b.nombre ?? `${ETIQUETA[b.categoria]}${de > 1 ? ` ${n}` : ''}`;
}

export default function TarjetaBarco({ b, titulo, compacta = false }: { b: Barco; titulo: string; compacta?: boolean }) {
  const personas = b.plazas_opciones.length > 1
    ? `Hasta ${b.plazas_opciones.slice(0, -1).join(', ')} o ${b.plazas_opciones[b.plazas_opciones.length - 1]} personas, según el barco`
    : b.plazas ? `Hasta ${b.plazas} personas` : null;
  const src = foto(`barco-${b.slug}`) ?? (b.fotos[0] ? `/img/${b.fotos[0]}` : null);
  return (
    <article id={b.slug} className="card-elegant stagger-child flex flex-col overflow-hidden !p-0">
      <div className={`relative ${compacta ? 'aspect-[16/9]' : 'aspect-[16/10]'} bg-gradient-to-br from-ria-100 via-ria-200 to-ria-300`}>
        {src ? (
          <Image src={src} alt={titulo} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        ) : (
          <svg className="absolute inset-0 m-auto h-14 w-14 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l2 3h14l2-3H3zM12 3v10M12 5l6 8H12" />
          </svg>
        )}
        <span className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-ria-800">{ETIQUETA[b.categoria]}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
        {b.descripcion && !compacta && <p className="mt-2 text-sm leading-relaxed text-gray-600">{b.descripcion}</p>}
        <dl className="mt-3 space-y-1 text-sm text-gray-600">
          {personas && <div><dt className="inline font-semibold text-gray-900">Capacidad: </dt><dd className="inline">{personas}</dd></div>}
          {b.modelo && !compacta && <div><dt className="inline font-semibold text-gray-900">Modelo: </dt><dd className="inline">{b.modelo}</dd></div>}
          {b.eslora && !compacta && <div><dt className="inline font-semibold text-gray-900">Eslora: </dt><dd className="inline">{b.eslora}</dd></div>}
          {b.duracion && !compacta && <div><dt className="inline font-semibold text-gray-900">Duración: </dt><dd className="inline">{b.duracion}</dd></div>}
          {b.zona && !compacta && <div><dt className="inline font-semibold text-gray-900">Zona: </dt><dd className="inline">{b.zona}</dd></div>}
          {b.puerto_salida && !compacta && <div><dt className="inline font-semibold text-gray-900">Puerto de salida: </dt><dd className="inline">{b.puerto_salida}</dd></div>}
        </dl>
        {!compacta && (b.incluye.length > 0 || b.consultar) && (
          <p className="mt-3 text-sm text-gray-600">
            {b.incluye.length > 0 && <><strong className="text-gray-900">El precio incluye: </strong>{b.incluye.map((x, i) => (i === 0 ? x : x.toLowerCase())).join(', ').replace(/, ([^,]*)$/, ' y $1')}.</>}
            {b.consultar && <span className="block pt-1 text-gray-500">{b.consultar}.</span>}
          </p>
        )}
        {b.precios.length > 0 && (
          <ul className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm">
            {b.precios.slice(0, compacta ? 2 : 9).map((p) => (
              <li key={p.concepto} className="flex justify-between gap-3 text-gray-600">
                <span>{p.concepto}</span>
                <strong className="text-gray-900">{precio(p)}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
