import Image from 'next/image';
import Link from 'next/link';
import { foto } from '../lib/fotos';

type Props = {
  titulo: string;
  texto?: string;
  href: string;
  claves: string[];
  etiqueta?: string;
  /** Datos cortos debajo del texto (p. ej. "8 playas"). */
  datos?: string[];
  alto?: 'normal' | 'alto';
};

/** Tarjeta a toda foto con el texto encima. Sin foto, degradado de marca. */
export default function TarjetaFoto({ titulo, texto, href, claves, etiqueta, datos, alto = 'normal' }: Props) {
  const src = foto(...claves);
  return (
    <Link href={href} className={`stagger-child group relative flex ${alto === 'alto' ? 'min-h-[22rem]' : 'min-h-[17rem]'} flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-ria-700 to-ria-900 p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
      {src && <Image src={src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
      <div className="absolute inset-0 bg-gradient-to-t from-ria-950/90 via-ria-950/35 to-transparent" />
      {etiqueta && <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ria-800">{etiqueta}</span>}
      <div className="relative">
        <h3 className="text-2xl font-bold leading-tight">{titulo}</h3>
        {texto && <p className="mt-2 text-sm leading-relaxed text-ria-50">{texto}</p>}
        {datos && datos.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
            {datos.map((d) => <span key={d} className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">{d}</span>)}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-arena-200">Ver <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
