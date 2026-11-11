import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../components/BandaAgencia';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Rejilla from '../../../components/Rejilla';
import Seccion from '../../../components/Seccion';
import { fechaLarga, getEntradas } from '../../../lib/blog';
import { foto } from '../../../lib/fotos';
import { esIdioma } from '../../../lib/i18n';
import { metaRuta } from '../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = metaRuta('/blog/');

export default function Blog({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const entradas = getEntradas();
  return (
    <>
      <HeroPage ruta="/blog/" etiqueta="Novedades" titulo="Blog" subtitulo="Consejos y novedades para organizar tu despedida en Sanxenxo." />
      <Migas lang={lang} ruta="/blog/" />
      <Seccion centrado etiqueta={entradas.length ? 'Últimas entradas' : undefined} titulo={entradas.length ? 'Lo último del blog' : 'El blog llega pronto'} intro={entradas.length ? undefined : 'Las primeras entradas están en preparación. Mientras, tienes la guía completa para organizar tu despedida.'}>
        {entradas.length > 0 ? (
          <Rejilla>
            {entradas.map((e) => {
              const img = foto(e.imagen ?? undefined, 'blog');
              return (
                <Link key={e.slug} href={`/blog/${e.slug}/`} className="stagger-child group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-ria-100 to-ria-300">
                    {img && <Image src={img} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ria-600">{fechaLarga(e.fecha)}</p>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900">{e.titulo}</h3>
                    {e.descripcion && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">{e.descripcion}</p>}
                  </div>
                </Link>
              );
            })}
          </Rejilla>
        ) : (
          <div className="mx-auto flex max-w-md justify-center">
            <Link href="/despedidas/" className="btn-primary">Ver la guía de despedidas</Link>
          </div>
        )}
      </Seccion>
      <BandaAgencia lang={lang} />
    </>
  );
}
