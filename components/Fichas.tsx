import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { notasVisibles } from '../lib/datos';
import type { Actividad, Playa } from '../lib/esquemas';
import { href, type Idioma } from '../lib/i18n';
import { slugify } from '../lib/bloques';
import { foto } from '../lib/fotos';
import Icono, { type NombreIcono } from './Icono';
import { NOMBRE_TRAMO, esTop, slugTramoDe } from '../lib/paraisos';

export function EnPreparacion({ texto = 'Sección en preparación.' }: { texto?: string }) {
  return <p className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center text-gray-600">{texto}</p>;
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
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
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

export function TarjetaActividad({ a, compacta = false }: { a: Actividad; compacta?: boolean }) {
  const notas = notasVisibles(a);
  const imagen = foto(`actividad-${a.slug}`);
  const donde = a.donde.map((d) => d.nombre).filter((n) => !/por definir/i.test(n));
  const chips: { icono: NombreIcono; texto: string }[] = [];
  if (a.duracion) chips.push({ icono: 'reloj', texto: a.duracion });
  if (a.grupo_minimo) chips.push({ icono: 'personas', texto: `Desde ${a.grupo_minimo} personas` });
  if (a.temporada) chips.push({ icono: 'calendario', texto: a.temporada });
  return (
    <article id={compacta ? undefined : a.slug} className="stagger-child flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      {imagen ? (
        <div className="relative aspect-[16/9] bg-ria-100">
          <Image src={imagen} alt={a.nombre} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        </div>
      ) : <div className="h-1.5 bg-gradient-to-r from-ria-500 to-arena-400" />}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-gray-900">{a.nombre}</h3>
        {a.a_medida && <span className="mt-2 inline-block w-fit rounded-full bg-arena-100 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-arena-800">Día a medida</span>}
        {a.descripcion && !compacta && <p className="mt-3 text-sm leading-relaxed text-gray-600">{a.descripcion}</p>}
        {chips.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {chips.map((c) => (
              <li key={c.texto} className="inline-flex items-center gap-1.5 rounded-full bg-ria-50 px-3 py-1 text-xs font-medium text-ria-800">
                <Icono nombre={c.icono} className="h-3.5 w-3.5" />{c.texto}
              </li>
            ))}
          </ul>
        )}
        {notas.length > 0 && (
          <ul className="mt-4 space-y-1 text-xs leading-relaxed text-gray-600">
            {notas.map((n) => <li key={n}>· {n}</li>)}
          </ul>
        )}
        {compacta && <a href={`#${slugify(a.nombre)}`} className="mt-4 text-sm font-semibold text-ria-700 hover:underline">Ver detalle ↓</a>}
        {/* "Dónde se hace" es obligatorio en toda actividad (docs/02). */}
        {donde.length > 0 && (
          <p className="mt-auto flex items-start gap-2 border-t border-gray-100 pt-4 text-sm text-gray-700">
            <Icono nombre="pin" className="mt-0.5 h-4 w-4 shrink-0 text-ria-600" />
            <span>{donde.join(' · ')}</span>
          </p>
        )}
      </div>
    </article>
  );
}
