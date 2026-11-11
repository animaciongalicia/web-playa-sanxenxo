import Link from 'next/link';
import { entradasDe } from '../lib/blog';
import Seccion from './Seccion';

/** Entradas del blog que apuntan a esta página. El texto del enlace es el título de la entrada (cola larga). Sin entradas, no se pinta. */
export default function GuiasRelacionadas({ ruta }: { ruta: string }) {
  const entradas = entradasDe(ruta);
  if (!entradas.length) return null;
  return (
    <Seccion etiqueta="Del blog" titulo="Guías relacionadas" centrado>
      <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
        {entradas.map((e) => (
          <li key={e.slug}>
            <Link href={`/blog/${e.slug}/`} className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <span className="font-semibold text-gray-900 group-hover:text-ria-700">{e.titulo}</span>
              {e.descripcion && <span className="mt-2 line-clamp-2 text-sm text-gray-600">{e.descripcion}</span>}
              <span className="mt-auto pt-3 text-sm font-semibold text-ria-700">Leer la guía →</span>
            </Link>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
