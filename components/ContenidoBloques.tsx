import Image from 'next/image';
import { getBloques, slugify, type Bloque, type Pieza } from '../lib/bloques';
import { foto } from '../lib/fotos';
import type { Idioma } from '../lib/i18n';
import AnimateOnScroll from './AnimateOnScroll';

const PROSE = 'prose max-w-none prose-p:my-2 prose-p:leading-relaxed prose-p:text-gray-600 prose-ul:my-2 prose-li:my-0.5 prose-li:text-gray-600 prose-a:font-medium prose-a:text-ria-700 prose-a:decoration-ria-300 prose-strong:text-gray-900';
const ALIAS: Record<string, string> = { 'isla-de-ons': 'islas-ons', 'islas-cies': 'islas-cies', 'ria-de-aldan': 'ria-de-aldan' };

/** Foto de un bloque si el título nombra algo con foto: "Silgar, imprescindible" → playa-silgar. */
function fotoDeBloque(titulo: string): string | null {
  const nombre = slugify(titulo.split(/[,:–—]/)[0]);
  return foto(`playa-${nombre}`, ALIAS[nombre] ?? null);
}

const palabras = (html: string) => (html.replace(/<[^>]+>/g, ' ').match(/\S+/g) ?? []).length;
const pesoDe = (b: Bloque) => b.piezas.reduce((n, p) => n + (p.tipo === 'texto' || p.tipo === 'lista' ? palabras(p.html) : p.items.reduce((m, i) => m + palabras(i.html) + 3, 0)), 0);

function Cabecera({ titulo }: { titulo: string }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span className="h-6 w-1 rounded-full bg-ria-600" aria-hidden="true" />
      <h2 className="text-xl font-bold leading-snug tracking-tight text-gray-900">{titulo}</h2>
    </div>
  );
}

function Tarjetas({ items, pasos }: { items: { titulo: string | null; html: string }[]; pasos: boolean }) {
  const cols = items.length === 2 ? 'sm:grid-cols-2' : items.length === 4 ? 'sm:grid-cols-2' : items.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <div className={`grid gap-3 ${cols}`}>
      {items.map((it, j) => (
        <div key={j} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            {pasos ? <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ria-700 text-xs font-bold text-white">{j + 1}</span> : <span className="h-1 w-5 shrink-0 rounded-full bg-arena-400" aria-hidden="true" />}
            {it.titulo && <h3 className="text-sm font-semibold leading-snug text-gray-900">{it.titulo}</h3>}
          </div>
          <div className="mt-1.5 text-sm leading-relaxed text-gray-600 [&_a]:font-medium [&_a]:text-ria-700 [&_p]:m-0 [&_strong]:text-gray-900" dangerouslySetInnerHTML={{ __html: it.html }} />
        </div>
      ))}
    </div>
  );
}

function Piezas({ piezas }: { piezas: Pieza[] }) {
  return (
    <div className="space-y-3">
      {piezas.map((p, i) => {
        if (p.tipo === 'texto' || p.tipo === 'lista') return <div key={i} className={PROSE} dangerouslySetInnerHTML={{ __html: p.html }} />;
        return <Tarjetas key={i} items={p.items} pasos={p.tipo === 'pasos'} />;
      })}
    </div>
  );
}

/** Un apartado: texto corto = tarjeta de 1 columna; texto largo = 2 columnas; con tarjetas o foto = ancho completo. */
function BloqueVista({ b, solo }: { b: Bloque; solo: boolean }) {
  const img = fotoDeBloque(b.titulo);
  const soloTexto = b.piezas.every((p) => p.tipo === 'texto' || p.tipo === 'lista');
  const peso = pesoDe(b);
  const base = 'stagger-child scroll-mt-32 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm';
  if (img && soloTexto) {
    return (
      <section id={b.id} className={`${base} grid items-center gap-6 sm:col-span-full md:grid-cols-[1fr_16rem] lg:grid-cols-[1fr_20rem]`}>
        <div><Cabecera titulo={b.titulo} /><Piezas piezas={b.piezas} /></div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ria-100 md:aspect-square">
          <Image src={img} alt={b.titulo} fill sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 100vw" className="object-cover" />
        </div>
      </section>
    );
  }
  const ancho = !soloTexto || solo ? 'sm:col-span-full' : peso > 120 ? 'lg:col-span-2' : '';
  return (
    <section id={b.id} className={`${base} ${ancho}`}>
      <Cabecera titulo={b.titulo} />
      <Piezas piezas={b.piezas} />
    </section>
  );
}

/** Texto largo maquetado compacto: entradilla, índice de saltos y los apartados en columnas. */
export default function ContenidoBloques({ lang, ruta, id, indice = true, parte = 'todo' }: { lang: Idioma; ruta: string; id?: string; indice?: boolean; parte?: 'todo' | 'intro' | 'resto' }) {
  const c = getBloques(lang, ruta) ?? (lang !== 'es' ? getBloques('es', ruta) : null);
  if (!c) return null;
  if (c.legal || !c.bloques.length) return null;
  const verIntro = parte !== 'resto';
  const verBloques = parte !== 'intro';
  return (
    <div id={id}>
      {verIntro && c.intro && (
        <section className="section-padding bg-white !pb-4 !pt-8">
          <div className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700 [&_a]:font-medium [&_a]:text-ria-700 [&_p+p]:mt-3" dangerouslySetInnerHTML={{ __html: c.intro }} />
        </section>
      )}
      {verBloques && indice && c.bloques.length > 3 && (
        <nav aria-label="En esta página" className="sticky top-16 z-30 border-y border-gray-100 bg-white/90 backdrop-blur">
          <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-2.5 text-sm">
            {c.bloques.map((b) => (
              <li key={b.id} className="shrink-0">
                <a href={`#${b.id}`} className="inline-block rounded-full bg-gray-100 px-3.5 py-1 font-medium text-gray-700 transition-colors hover:bg-ria-700 hover:text-white">{b.titulo.replace(/,.*$/, '')}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {verBloques && (
        <section className="section-padding bg-gray-50 !py-8">
          <AnimateOnScroll>
            <div className="mx-auto grid max-w-7xl grid-flow-dense gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.bloques.map((b) => <BloqueVista key={b.id} b={b} solo={c.bloques.length <= 2} />)}
            </div>
          </AnimateOnScroll>
        </section>
      )}
    </div>
  );
}
