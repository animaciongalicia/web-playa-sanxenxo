import Link from 'next/link';
import { href, textos, type Idioma } from '../lib/i18n';
import { migasDe } from '../lib/rutas';
import { SITIO } from '../lib/sitio';
import JsonLd from './JsonLd';

export default function Migas({ lang, ruta, titulo }: { lang: Idioma; ruta: string; titulo?: string }) {
  const t = textos(lang);
  const migas = migasDe(ruta);
  if (titulo && migas[migas.length - 1]?.ruta !== ruta) migas.push({ titulo, ruta });
  const lista = [{ titulo: t.inicio, ruta: '/' }, ...migas];
  return (
    <>
    <JsonLd datos={{ '@type': 'BreadcrumbList', itemListElement: lista.map((m, i) => ({ '@type': 'ListItem', position: i + 1, name: m.titulo, item: `${SITIO}${m.ruta}` })) }} />
    <nav aria-label="Migas de pan" className="border-b border-gray-100 bg-gray-50 px-6 py-3">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-sm text-gray-500">
        <li><Link href={href(lang, '/')} className="hover:text-ria-700">{t.inicio}</Link></li>
        {migas.map((m, i) => (
          <li key={m.ruta} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {i === migas.length - 1 ? <span aria-current="page" className="text-gray-900">{m.titulo}</span> : <Link href={href(lang, m.ruta)} className="hover:text-ria-700">{m.titulo}</Link>}
          </li>
        ))}
      </ol>
    </nav>
    </>
  );
}
