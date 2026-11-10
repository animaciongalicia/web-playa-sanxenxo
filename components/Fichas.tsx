import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { notasVisibles } from '../lib/datos';
import type { Actividad, Playa } from '../lib/esquemas';
import { href, type Idioma } from '../lib/i18n';
import { foto } from '../lib/fotos';
import { NOMBRE_TRAMO, esTop, slugTramoDe } from '../lib/paraisos';

export function EnPreparacion({ texto = 'Estamos preparando esta sección.' }: { texto?: string }) {
  return <p className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center text-gray-500">{texto}</p>;
}

export function Aviso({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border-l-4 border-arena-400 bg-arena-50 px-4 py-3 text-sm text-arena-900" role="note">{children}</p>;
}

export function TarjetaPlaya({ playa, lang, etiquetaTramo = false }: { playa: Playa; lang: Idioma; etiquetaTramo?: boolean }) {
  const top = esTop(playa);
  const src = foto(`playa-${playa.slug}`);
  const enlace = top ? `${href(lang, `/paraisos/playas/${slugTramoDe(playa.tramo)}/`)}#${playa.slug}` : null;
  const cuerpo = (
    <>
      <h3 className="text-lg font-semibold text-gray-900">
        {playa.nombre}
        
      </h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {etiquetaTramo ? NOMBRE_TRAMO[playa.tramo] : playa.municipio}
        {top && <span className="ml-2 text-ria-700">· Imprescindible</span>}
      </p>
      {playa.descripcion && <p className="mt-3 text-sm leading-relaxed text-gray-600">{playa.descripcion}</p>}
      {playa.bandera_azul && playa.verificado && <p className="mt-3 text-sm text-ria-700">Bandera azul {playa.bandera_azul.anio}</p>}
      
    </>
  );
  return (
    <div id={playa.slug} className="card-elegant stagger-child overflow-hidden !p-0">
      {src && (
        <div className="relative aspect-[16/9]">
          <Image src={src} alt={`Playa de ${playa.nombre}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
      )}
      <div className="p-6">{cuerpo}</div>
    </div>
  );
}

export function TarjetaActividad({ a }: { a: Actividad }) {
  const notas = notasVisibles(a);
  return (
    <article id={a.slug} className="card-elegant stagger-child !p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        {a.nombre}
        
      </h3>
      {a.descripcion && <p className="mt-2 text-sm leading-relaxed text-gray-600">{a.descripcion}</p>}
      {/* "Dónde se hace" es obligatorio en toda actividad (docs/02). */}
      <p className="mt-3 text-sm text-gray-600">
        <strong className="text-gray-900">Dónde: </strong>
        {a.donde.map((d) => d.nombre).join(' · ')}
      </p>
      <dl className="mt-2 space-y-1 text-sm text-gray-600">
        {a.duracion && <div><dt className="inline font-semibold text-gray-900">Duración: </dt><dd className="inline">{a.duracion}</dd></div>}
        {a.grupo_minimo && <div><dt className="inline font-semibold text-gray-900">Grupo mínimo: </dt><dd className="inline">{a.grupo_minimo} personas</dd></div>}
        {a.temporada && <div><dt className="inline font-semibold text-gray-900">Temporada: </dt><dd className="inline">{a.temporada}</dd></div>}
      </dl>
      {a.a_medida && <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ria-700">Día a medida</p>}
      {notas.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-500">
          {notas.map((n) => <li key={n}>{n}</li>)}
        </ul>
      )}
    </article>
  );
}
