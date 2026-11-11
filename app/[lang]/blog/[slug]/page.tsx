import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import HeroPage from '../../../../components/HeroPage';
import JsonLd from '../../../../components/JsonLd';
import Migas from '../../../../components/Migas';
import Seccion from '../../../../components/Seccion';
import { fechaLarga, getEntrada, getEntradas, relacionadas } from '../../../../lib/blog';
import { foto } from '../../../../lib/fotos';
import { esIdioma } from '../../../../lib/i18n';
import { SEO, metaRuta } from '../../../../lib/seo';
import { SITIO } from '../../../../lib/sitio';

type P = { lang: string; slug: string };
export const dynamicParams = false;
export const generateStaticParams = () => getEntradas().map((e) => ({ lang: 'es', slug: e.slug }));
export const generateMetadata = ({ params }: { params: P }): Metadata => metaRuta(`/blog/${params.slug}/`);

export default function Entrada({ params }: { params: P }) {
  const e = getEntrada(params.slug);
  if (!esIdioma(params.lang) || !e) notFound();
  const img = foto(e.imagen ?? undefined, 'blog');
  const mas = relacionadas(e);
  return (
    <>
      <JsonLd datos={{ '@type': 'BlogPosting', headline: e.titulo, datePublished: e.fecha, dateModified: e.actualizado ?? e.fecha, description: e.descripcion, inLanguage: 'es', author: { '@type': 'Organization', name: 'Playa Sanxenxo' }, publisher: { '@type': 'Organization', name: 'Playa Sanxenxo' }, mainEntityOfPage: `${SITIO}/blog/${e.slug}/`, ...(img ? { image: `${SITIO}${img}` } : {}) }} />
      <HeroPage imagen={img} etiqueta="Blog" titulo={e.titulo} />
      <Migas lang={params.lang} ruta={`/blog/${e.slug}/`} titulo={e.seo} />
      <Seccion ancho="estrecho">
        <p className="-mt-4 mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
          <time dateTime={e.fecha}>{fechaLarga(e.fecha)}</time>
          <span aria-hidden="true">·</span>
          <span>{e.minutos} min de lectura</span>
          {e.actualizado && <><span aria-hidden="true">·</span><span>Actualizado el {fechaLarga(e.actualizado)}</span></>}
        </p>
        {e.resumen.length > 0 && (
          <aside className="mb-8 rounded-2xl border border-ria-100 bg-ria-50 p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-ria-700">En resumen</h2>
            <ul className="mt-3 space-y-2 text-gray-700">
              {e.resumen.map((r) => (
                <li key={r} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ria-600" aria-hidden="true" />{r}</li>
              ))}
            </ul>
          </aside>
        )}
        {e.indice.length >= 4 && (
          <nav aria-label="Índice de la entrada" className="mb-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">En esta entrada</h2>
            <ol className="mt-3 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
              {e.indice.map((i, n) => (
                <li key={i.id}><a href={`#${i.id}`} className="text-ria-700 hover:underline"><span className="mr-2 text-gray-400">{n + 1}.</span>{i.titulo}</a></li>
              ))}
            </ol>
          </nav>
        )}
        <article
          className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-a:font-medium prose-a:text-ria-700 prose-strong:text-gray-900 prose-li:marker:text-ria-600 prose-table:text-sm prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-table:block prose-table:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: e.html }}
        />
        {e.paginas.length > 0 && (
          <aside className="mt-12 rounded-2xl bg-gradient-to-br from-ria-800 to-ria-600 p-6 text-white">
            <h2 className="text-lg font-bold">Sigue con la guía</h2>
            <ul className="mt-3 space-y-2">
              {e.paginas.map((r) => (
                <li key={r}><Link href={r} className="font-medium text-arena-100 underline-offset-4 hover:underline">{SEO[r]?.titulo ?? r} →</Link></li>
              ))}
            </ul>
          </aside>
        )}
      </Seccion>
      {mas.length > 0 && (
        <Seccion fondo="gris" etiqueta="Del blog" titulo="Sigue leyendo" centrado>
          <ul className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {mas.map((m) => {
              const f = foto(m.imagen ?? undefined, 'blog');
              return (
                <li key={m.slug}>
                  <Link href={`/blog/${m.slug}/`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-ria-100 to-ria-300">
                      {f && <Image src={f} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />}
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold uppercase tracking-wide text-ria-600">{m.minutos} min de lectura</span>
                      <span className="mt-1 block font-semibold text-gray-900 group-hover:text-ria-700">{m.titulo}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-center"><Link href="/blog/" className="link-inline">Ver todas las entradas del blog →</Link></p>
        </Seccion>
      )}
      <BandaAgencia lang={params.lang} />
    </>
  );
}
