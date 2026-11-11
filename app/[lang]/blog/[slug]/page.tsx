import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BandaAgencia from '../../../../components/BandaAgencia';
import HeroPage from '../../../../components/HeroPage';
import JsonLd from '../../../../components/JsonLd';
import Migas from '../../../../components/Migas';
import Seccion from '../../../../components/Seccion';
import { fechaLarga, getEntrada, getEntradas } from '../../../../lib/blog';
import { foto } from '../../../../lib/fotos';
import { esIdioma } from '../../../../lib/i18n';
import { SEO } from '../../../../lib/seo';
import { SITIO } from '../../../../lib/sitio';
import { metaRuta } from '../../../../lib/seo';

type P = { lang: string; slug: string };
export const dynamicParams = false;
export const generateStaticParams = () => getEntradas().map((e) => ({ lang: 'es', slug: e.slug }));
export const generateMetadata = ({ params }: { params: P }): Metadata => metaRuta(`/blog/${params.slug}/`);

export default function Entrada({ params }: { params: P }) {
  const e = getEntrada(params.slug);
  if (!esIdioma(params.lang) || !e) notFound();
  const img = foto(e.imagen ?? undefined, 'blog');
  return (
    <>
      <JsonLd datos={{ '@type': 'BlogPosting', headline: e.titulo, datePublished: e.fecha, description: e.descripcion, mainEntityOfPage: `${SITIO}/blog/${e.slug}/`, ...(img ? { image: `${SITIO}${img}` } : {}) }} />
      <HeroPage imagen={img} etiqueta={fechaLarga(e.fecha)} titulo={e.titulo} />
      <Migas lang={params.lang} ruta={`/blog/${e.slug}/`} titulo={e.titulo} />
      <Seccion ancho="estrecho">
        <article className="prose prose-lg max-w-none prose-a:text-ria-700 prose-strong:text-gray-900" dangerouslySetInnerHTML={{ __html: e.html }} />
        {e.paginas.length > 0 && (
          <aside className="mt-10 rounded-2xl bg-ria-50 p-6">
            <h2 className="text-lg font-bold text-gray-900">Sigue con la guía</h2>
            <ul className="mt-3 space-y-2">
              {e.paginas.map((r) => (
                <li key={r}><Link href={r} className="font-medium text-ria-700 hover:underline">{SEO[r]?.titulo ?? r} →</Link></li>
              ))}
            </ul>
          </aside>
        )}
        <p className="mt-10"><Link href="/blog/" className="link-inline">← Más entradas del blog</Link></p>
      </Seccion>
      <BandaAgencia lang={params.lang} />
    </>
  );
}
