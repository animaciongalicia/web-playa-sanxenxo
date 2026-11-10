import Link from 'next/link';
import type { ReactNode } from 'react';
import { esPendiente, modoRevision, notasVisibles } from '../lib/datos';
import type { Actividad, Playa } from '../lib/esquemas';
import { href, type Idioma } from '../lib/i18n';
import { NOMBRE_TRAMO, esTop, slugTramoDe } from '../lib/paraisos';

/** Insignia de revisión: solo existe en la vista previa (MOSTRAR_PENDIENTES=1). */
export function Insignia({ f }: { f: { publicar: boolean | null } }) {
  if (!modoRevision() || !esPendiente(f)) return null;
  return <span className="ml-2 rounded bg-arena-100 px-2 py-0.5 align-middle text-[11px] font-semibold uppercase tracking-wide text-arena-800">Pendiente de decisión</span>;
}

export function EnPreparacion({ texto = 'Estamos preparando esta sección.' }: { texto?: string }) {
  return <p className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center text-gray-500">{texto}</p>;
}

export function Aviso({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border-l-4 border-arena-400 bg-arena-50 px-4 py-3 text-sm text-arena-900" role="note">{children}</p>;
}

/** Nota que solo ve Pablo en la vista previa. */
export function NotaRevision({ children }: { children: ReactNode }) {
  if (!modoRevision()) return null;
  return <p className="mb-6 rounded-lg bg-ria-50 px-4 py-3 text-sm text-ria-900"><strong>Revisión:</strong> {children}</p>;
}

export function TarjetaPlaya({ playa, lang, etiquetaTramo = false }: { playa: Playa; lang: Idioma; etiquetaTramo?: boolean }) {
  const top = esTop(playa);
  const enlace = top ? `${href(lang, `/paraisos/playas/${slugTramoDe(playa.tramo)}/`)}#${playa.slug}` : null;
  const cuerpo = (
    <>
      <h3 className="text-lg font-semibold text-gray-900">
        {playa.nombre}
        <Insignia f={playa} />
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
    <div id={playa.slug} className="card-elegant stagger-child !p-6">{cuerpo}</div>
  );
}

export function TarjetaActividad({ a }: { a: Actividad }) {
  const notas = notasVisibles(a);
  return (
    <article id={a.slug} className="card-elegant stagger-child !p-6">
      <h3 className="text-lg font-semibold text-gray-900">
        {a.nombre}
        <Insignia f={a} />
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
