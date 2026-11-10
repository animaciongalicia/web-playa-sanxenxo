import Image from 'next/image';
import type { ReactNode } from 'react';
import { fotoDeRuta } from '../lib/fotos';

type Props = {
  titulo: string;
  subtitulo?: string;
  etiqueta?: string;
  /** Ruta de la página: busca su foto en public/img (ver public/img/LEEME.md). */
  ruta?: string;
  /** Foto concreta (si no, se busca por ruta). Sin foto, degradado de marca. */
  imagen?: string | null;
  children?: ReactNode;
};

export default function HeroPage({ titulo, subtitulo, etiqueta, ruta, imagen, children }: Props) {
  const src = imagen ?? (ruta ? fotoDeRuta(ruta) : null);
  return (
    <section className="relative isolate flex min-h-[44vh] items-center justify-center overflow-hidden bg-gradient-to-br from-ria-900 via-ria-800 to-ria-600 pt-16 text-white lg:min-h-[48vh]">
      {src && (
        <>
          <Image src={src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ria-950/70 via-ria-900/45 to-ria-950/75" />
        </>
      )}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-20 w-full text-white" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 70c120 36 240 36 360 0s240-36 360 0 240 36 360 0 240-36 360 0v50H0z" />
      </svg>
      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-24 text-center">
        {etiqueta && <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-arena-200">{etiqueta}</p>}
        <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">{titulo}</h1>
        {subtitulo && <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ria-50">{subtitulo}</p>}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
