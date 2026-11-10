import { getContenido } from '../lib/contenido';
import type { Idioma } from '../lib/i18n';
import Seccion from './Seccion';

/** Texto largo de la página (contenido/<lang>/<ruta>.md). Sin archivo o sin publicar, no pinta nada. */
export default function Contenido({ lang, ruta, id }: { lang: Idioma; ruta: string; id?: string }) {
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
