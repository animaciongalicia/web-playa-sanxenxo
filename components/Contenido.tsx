import { getContenido } from '../lib/contenido';
import { modoRevision } from '../lib/datos';
import type { Idioma } from '../lib/i18n';
import Seccion from './Seccion';

/** Texto largo de la página (contenido/<lang>/<ruta>.md). Sin archivo o sin publicar, no pinta nada. */
export default function Contenido({ lang, ruta, id }: { lang: Idioma; ruta: string; id?: string }) {
  const c = getContenido(lang, ruta) ?? (lang !== 'es' ? getContenido('es', ruta) : null);
  if (!c) return null;
  return (
    <Seccion ancho="estrecho" id={id}>
      {modoRevision() && c.meta.publicar !== true && (
        <div className="mb-8 rounded-lg bg-ria-50 px-4 py-3 text-sm text-ria-900">
          <p><strong>Borrador para revisar</strong> · {c.palabras} palabras</p>
          {c.meta.pendiente.length > 0 && (
            <ul className="mt-2 list-disc pl-5">{c.meta.pendiente.map((p) => <li key={p}>{p}</li>)}</ul>
          )}
        </div>
      )}
      <div
        className="prose prose-lg max-w-none prose-headings:tracking-tight prose-headings:text-gray-900 prose-a:text-ria-700 prose-a:decoration-ria-300 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: c.html }}
      />
    </Seccion>
  );
}
