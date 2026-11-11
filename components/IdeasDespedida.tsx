import Image from 'next/image';
import Link from 'next/link';
import { foto } from '../lib/fotos';
import type { Idea } from '../lib/ideas';
import Icono from './Icono';
import Rejilla from './Rejilla';
import Seccion from './Seccion';

/** Ideas sin ficha: tarjeta con foto (o degradado con icono), texto corto y, si existe, enlace a la sección. */
export default function IdeasDespedida({ ideas, titulo, intro }: { ideas: Idea[]; titulo: string; intro?: string }) {
  return (
    <Seccion fondo="gris" etiqueta="Más ideas" titulo={titulo} intro={intro} centrado>
      <Rejilla>
        {ideas.map((i) => {
          const src = i.foto ? foto(i.foto) : null;
          return (
            <article key={i.titulo} className="stagger-child flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="relative aspect-[16/9] bg-gradient-to-br from-ria-600 to-ria-800">
                {src ? (
                  <Image src={src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                ) : (
                  <Icono nombre={i.icono} className="absolute inset-0 m-auto h-12 w-12 text-white/70" />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-gray-900">{i.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{i.texto}</p>
                {i.href && <Link href={i.href} className="mt-auto pt-4 text-sm font-semibold text-ria-700 hover:underline">{i.enlace ?? 'Ver más'} →</Link>}
              </div>
            </article>
          );
        })}
      </Rejilla>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500">¿Echas en falta algo? Pregúntalo a la <Link href="/agencia/" className="link-inline">agencia</Link>: muchas de estas ideas se organizan a medida.</p>
    </Seccion>
  );
}
