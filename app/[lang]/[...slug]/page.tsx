// Página genérica de la Fase 1: todas las rutas de docs/02 existen con su título y sin 404 internos.
// Cada fase sustituye la ruta que le toca por una página propia (las rutas específicas ganan a esta).
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AvisoPendiente2027 from '../../../components/AvisoPendiente2027';
import HeroPage from '../../../components/HeroPage';
import LlamadaAgencia from '../../../components/LlamadaAgencia';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import { getServicio } from '../../../lib/datos';
import { IDIOMAS, esIdioma, textos } from '../../../lib/i18n';
import { RUTAS, buscarRuta } from '../../../lib/rutas';

export const dynamicParams = false;

export function generateStaticParams() {
  return IDIOMAS.flatMap((lang) =>
    RUTAS.filter((r) => lang === 'es' || r.pt).map((r) => ({ lang, slug: r.ruta.split('/').filter(Boolean) })),
  );
}

function resolver(params: { lang: string; slug: string[] }) {
  if (!esIdioma(params.lang)) return null;
  const ruta = buscarRuta(`/${params.slug.join('/')}/`);
  if (!ruta || (params.lang === 'pt' && !ruta.pt)) return null;
  return { lang: params.lang, ruta };
}

export function generateMetadata({ params }: { params: { lang: string; slug: string[] } }): Metadata {
  const r = resolver(params);
  return r ? { title: r.ruta.titulo, description: r.ruta.descripcion } : {};
}

export default function Pagina({ params }: { params: { lang: string; slug: string[] } }) {
  const r = resolver(params);
  if (!r) notFound();
  const { lang, ruta } = r;
  const t = textos(lang);
  const servicio = ruta.servicio ? getServicio(ruta.servicio) : undefined;
  const esDespedida = ruta.ruta.startsWith('/despedidas/');

  return (
    <>
      <HeroPage titulo={ruta.titulo} subtitulo={ruta.descripcion} />
      <Migas lang={lang} ruta={ruta.ruta} />
      <Seccion ancho="estrecho">
        {servicio?.estado_2027 === 'pendiente' && <div className="mb-6"><AvisoPendiente2027 lang={lang} /></div>}
        <p className="text-lg text-gray-600">{t.enConstruccion}</p>
        {esDespedida && <LlamadaAgencia lang={lang} className="mt-6" />}
      </Seccion>
    </>
  );
}
