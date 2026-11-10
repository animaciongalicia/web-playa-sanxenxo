import { getContenido } from '../lib/contenido';
import { getBloques } from '../lib/bloques';
import type { Idioma } from '../lib/i18n';
import ContenidoBloques from './ContenidoBloques';
import Seccion from './Seccion';

/** Texto largo de la página (contenido/<lang>/<ruta>.md).
 *  Los textos con apartados (##) se maquetan en bloques; los legales y los cortos, como prosa. Sin archivo o sin publicar, nada. */
export default function Contenido({ lang, ruta, id }: { lang: Idioma; ruta: string; id?: string }) {
  const l = getBloques(lang, ruta) ? lang : lang !== 'es' ? 'es' : lang;
  const b = getBloques(l, ruta);
  if (b && !b.legal && b.bloques.length) return <ContenidoBloques lang={l as Idioma} ruta={ruta} id={id} />;
  const c = getContenido(lang, ruta) ?? (lang !== 'es' ? getContenido('es', ruta) : null);
  if (!c) return null;
  return (
    <Seccion ancho="estrecho" id={id}>
      <div
        className="prose prose-lg max-w-none prose-headings:tracking-tight prose-headings:text-gray-900 prose-a:text-ria-700 prose-a:decoration-ria-300 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: c.html }}
      />
    </Seccion>
  );
}
