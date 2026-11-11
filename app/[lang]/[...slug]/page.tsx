// Plantilla genérica: SOLO para rutas marcadas `generica` en lib/rutas.ts (hoy, las páginas legales).
// Una ruta con página propia no debe estar aquí: si dos rutas generan la misma URL, el build es no determinista.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AvisoPendiente2027 from '../../../components/AvisoPendiente2027';
import HeroPage from '../../../components/HeroPage';
import LlamadaAgencia from '../../../components/LlamadaAgencia';
import Contenido from '../../../components/Contenido';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import { getContenido } from '../../../lib/contenido';
import { getServicio } from '../../../lib/datos';
import { IDIOMAS, esIdioma, textos } from '../../../lib/i18n';
import { RUTAS, buscarRuta } from '../../../lib/rutas';
import { metaRuta } from '../../../lib/seo';

// true: las URLs desconocidas llegan hasta notFound() y se ve la 404 con cabecera y pie (con false saldría la 404 por defecto de Next).
export const dynamicParams = true;

export function generateStaticParams() {
  return IDIOMAS.flatMap((lang) =>
    RUTAS.filter((r) => r.generica && (lang === 'es' || r.pt)).map((r) => ({ lang, slug: r.ruta.split('/').filter(Boolean) })),
  );
}

function resolver(params: { lang: string; slug: string[] }) {
  if (!esIdioma(params.lang)) return null;
  const ruta = buscarRuta(`/${params.slug.join('/')}/`);
  if (!ruta?.generica || (params.lang === 'pt' && !ruta.pt)) return null;
  return { lang: params.lang, ruta };
}

export function generateMetadata({ params }: { params: { lang: string; slug: string[] } }): Metadata {
  const r = resolver(params);
  return r ? metaRuta(r.ruta.ruta) : {};
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
      <HeroPage ruta={ruta.ruta} titulo={ruta.titulo} subtitulo={ruta.descripcion} />
      <Migas lang={lang} ruta={ruta.ruta} />
      <Contenido lang={lang} ruta={ruta.ruta} />
      {!getContenido(lang, ruta.ruta) && (
        <Seccion ancho="estrecho">
          {servicio?.estado_2027 === 'pendiente' && <div className="mb-6"><AvisoPendiente2027 lang={lang} /></div>}
          <p className="text-lg text-gray-600">{t.enConstruccion}</p>
          {esDespedida && <LlamadaAgencia lang={lang} className="mt-6" />}
        </Seccion>
      )}
    </>
  );
}
