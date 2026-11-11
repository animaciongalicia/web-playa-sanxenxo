import Image from 'next/image';
import { getBloques, slugify, type Bloque, type Pieza } from '../lib/bloques';
import { foto } from '../lib/fotos';
import type { Idioma } from '../lib/i18n';
import AnimateOnScroll from './AnimateOnScroll';

const PROSE = 'prose prose-lg max-w-none prose-p:leading-relaxed prose-p:text-gray-600 prose-a:font-medium prose-a:text-ria-700 prose-a:decoration-ria-300 prose-strong:text-gray-900';
const ALIAS: Record<string, string> = { 'isla-de-ons': 'islas-ons', 'islas-cies': 'islas-cies', 'ria-de-aldan': 'ria-de-aldan' };

/** Foto de un bloque si el título nombra algo con foto: "Silgar, imprescindible" → playa-silgar. */
function fotoDeBloque(titulo: string): string | null {
  const nombre = slugify(titulo.split(/[,:–—]/)[0]);
  return foto(`playa-${nombre}`, ALIAS[nombre] ?? null);
}

function Piezas({ piezas, oscuro }: { piezas: Pieza[]; oscuro?: boolean }) {
  return (
    <div className="space-y-8">
      {piezas.map((p, i) => {
        if (p.tipo === 'texto') return <div key={i} className={PROSE} dangerouslySetInnerHTML={{ __html: p.html }} />;
        if (p.tipo === 'lista') return <div key={i} className={`${PROSE} prose-li:text-gray-600`} dangerouslySetInnerHTML={{ __html: p.html }} />;
        const pasos = p.tipo === 'pasos';
        return (
          <div key={i} className={`grid gap-4 ${p.items.length === 2 ? 'sm:grid-cols-2' : p.items.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
            {p.items.map((it, j) => (
              <div key={j} className={`stagger-child relative rounded-2xl border p-6 shadow-sm ${oscuro ? 'border-white/15 bg-white/5' : 'border-gray-100 bg-white'}`}>
                {pasos && <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-ria-700 text-sm font-bold text-white">{j + 1}</span>}
                {!pasos && <span className="mb-3 block h-1 w-10 rounded-full bg-arena-400" aria-hidden="true" />}
                {it.titulo && <h3 className="text-base font-semibold text-gray-900">{it.titulo}</h3>}
                <div className="mt-2 text-sm leading-relaxed text-gray-600 [&_a]:font-medium [&_a]:text-ria-700 [&_p]:m-0 [&_strong]:text-gray-900" dangerouslySetInnerHTML={{ __html: it.html }} />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function BloqueVista({ b, i }: { b: Bloque; i: number }) {
  const img = fotoDeBloque(b.titulo);
  const fondo = i % 2 ? 'bg-gray-50' : 'bg-white';
  const soloTexto = b.piezas.every((p) => p.tipo === 'texto');
  const cabecera = (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-8 w-1.5 rounded-full bg-ria-600" aria-hidden="true" />
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">{b.titulo}</h2>
    </div>
  );
  return (
    <section id={b.id} className={`${fondo} section-padding scroll-mt-32`}>
      <AnimateOnScroll>
        {img && soloTexto ? (
          <div className={`mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div>{cabecera}<Piezas piezas={b.piezas} /></div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ria-100 shadow-xl">
              <Image src={img} alt={b.titulo} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">{cabecera}<Piezas piezas={b.piezas} /></div>
        )}
      </AnimateOnScroll>
    </section>
  );
}

/** Texto largo maquetado: entradilla, índice de saltos y un bloque por apartado, con fondos alternos. */
export default function ContenidoBloques({ lang, ruta, id, indice = true, parte = 'todo' }: { lang: Idioma; ruta: string; id?: string; indice?: boolean; parte?: 'todo' | 'intro' | 'resto' }) {
  const c = getBloques(lang, ruta) ?? (lang !== 'es' ? getBloques('es', ruta) : null);
  if (!c) return null;
  if (c.legal || !c.bloques.length) return null;
  const verIntro = parte !== 'resto';
  const verBloques = parte !== 'intro';
  return (
    <div id={id}>
      {verIntro && c.intro && (
        <section className="section-padding bg-white pb-6 md:pb-8">
          <div className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700 [&_a]:font-medium [&_a]:text-ria-700 [&_p+p]:mt-4" dangerouslySetInnerHTML={{ __html: c.intro }} />
        </section>
      )}
      {verBloques && indice && c.bloques.length > 2 && (
        <nav aria-label="En esta página" className="sticky top-16 z-30 border-y border-gray-100 bg-white/90 backdrop-blur">
          <ul className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-6 py-3 text-sm">
            {c.bloques.map((b) => (
              <li key={b.id} className="shrink-0">
                <a href={`#${b.id}`} className="inline-block rounded-full bg-gray-100 px-4 py-1.5 font-medium text-gray-700 transition-colors hover:bg-ria-700 hover:text-white">{b.titulo.replace(/,.*$/, '')}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {verBloques && c.bloques.map((b, i) => <BloqueVista key={b.id} b={b} i={i} />)}
    </div>
  );
}
