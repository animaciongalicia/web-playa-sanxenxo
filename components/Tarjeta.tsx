import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Icono, { type NombreIcono } from './Icono';
import { foto } from '../lib/fotos';

type Props = {
  titulo: string;
  texto?: string;
  href: string;
  icono?: ReactNode;
  /** Claves de foto en public/img (se usa la primera que exista). Sin foto, degradado con icono. */
  claves?: string[];
  nombreIcono?: NombreIcono;
  etiqueta?: string;
};

/** Tarjeta de entrada: foto arriba (o degradado con icono), título, texto y flecha. */
export default function Tarjeta({ titulo, texto, href, icono, claves, nombreIcono, etiqueta }: Props) {
  const src = claves ? foto(...claves) : null;
  const conMedio = !!claves;
  return (
    <Link href={href} className="stagger-child group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {conMedio && (
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ria-100 via-ria-200 to-ria-400">
          {src ? (
            <Image src={src} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            nombreIcono && <Icono nombre={nombreIcono} className="absolute inset-0 m-auto h-14 w-14 text-white/80" />
          )}
          {etiqueta && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ria-800">{etiqueta}</span>}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {icono && !conMedio && <div className="mb-4 text-ria-700">{icono}</div>}
        <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
        {texto && <p className="mt-2 text-sm leading-relaxed text-gray-500">{texto}</p>}
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-ria-700">
          Ver más
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
