import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogSidebar from '../../../../components/BlogSidebar';
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
      <section className="bg-white px-6 py-10 md:px-12 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0">
            <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
              <time dateTime={e.fecha}>{fechaLarga(e.fecha)}</time>
              <span aria-hidden="true">·</span>
              <span>{e.minutos} min de lectura</span>
              {e.actualizado && <><span aria-hidden="true">·</span><span>Actualizado el {fechaLarga(e.actualizado)}</span></>}
            </p>
            {e.resumen.length > 0 && (
              <div className="mb-8 rounded-2xl border border-ria-100 bg-ria-50 p-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-ria-700">En resumen</h2>
                <ul className="mt-3 space-y-2 text-gray-700">
                  {e.resumen.map((r) => (
                    <li key={r} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ria-600" aria-hidden="true" />{r}</li>
                  ))}
                </ul>
              </div>
            )}
            {e.indice.length >= 4 && (
              <nav aria-label="Índice de la entrada" className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-5 lg:hidden">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-600">En esta entrada</h2>
                <ol className="mt-3 grid list-none gap-x-8 gap-y-1.5 pl-0 text-sm sm:grid-cols-2">
                  {e.indice.map((i, n) => (
                    <li key={i.id}><a href={`#${i.id}`} className="text-ria-700 hover:underline">{!/^\d+\.\s/.test(i.titulo) && <span className="mr-2 text-gray-600">{n + 1}.</span>}{i.titulo}</a></li>
                  ))}
                </ol>
              </nav>
            )}
            <article
              className="prose prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:mb-3 prose-h2:mt-12 prose-h2:border-l-4 prose-h2:border-ria-600 prose-h2:pl-4 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:text-gray-700 prose-a:font-medium prose-a:text-ria-700 prose-strong:text-gray-900 prose-li:text-gray-700 prose-li:marker:text-ria-600 prose-table:block prose-table:overflow-x-auto prose-table:text-sm prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 [&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:text-gray-800 [&_input[type=checkbox]]:mr-2 [&_li.task-list-item]:list-none [&_ul.contains-task-list]:pl-0"
              dangerouslySetInnerHTML={{ __html: e.html }}
            />
            <p className="mt-12"><Link href="/blog/" className="link-inline">← Todas las entradas del blog</Link></p>
          </div>
          <BlogSidebar indice={e.indice} paginas={e.paginas} otras={mas} />
        </div>
      </section>
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
                      <span className="text-xs font-semibold uppercase tracking-wide text-ria-700">{m.minutos} min de lectura</span>
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
