import Link from 'next/link';
import Logo from './Logo';
import { getEntradas } from '../lib/blog';
import { columnasPie, enlacesLegales } from '../lib/nav';
import { href, textos, type Idioma } from '../lib/i18n';

// Pie en 6 partes: 1 columna de texto (2/6) + 4 columnas (1/6 cada una): 3 de enlaces y la de "Novedades del blog".
// Los textos legales van abajo del todo, en vertical.
export default function Footer({ lang }: { lang: Idioma }) {
  const t = textos(lang);
  const columnas = columnasPie(lang);
  const legales = enlacesLegales(lang);
  const entradas = getEntradas().slice(0, 3);
  const tituloCol = 'text-sm font-semibold uppercase tracking-wider text-gray-900';
  return (
    <footer id="contacto" className="border-t border-gray-100 bg-gray-50">
      <div className="contenedor grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="text-lg font-bold tracking-tight text-gray-900">PLAYA SANXENXO</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-500">{t.tagline}</p>
          <Link href={href(lang, '/agencia/')} className="link-inline mt-4 inline-block text-sm">{t.hablarAgencia} →</Link>
        </div>
        {columnas.map((col) => (
          <div key={col.titulo}>
            <h2 className={tituloCol}>{col.titulo}</h2>
            <ul className="mt-4 space-y-2">
              {col.enlaces.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="text-sm text-gray-500 hover:text-ria-700">{e.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className={tituloCol}>{t.blogTitulo}</h2>
          {entradas.length ? (
            <ul className="mt-4 space-y-2">
              {entradas.map((e) => <li key={e.slug}><Link href={`/blog/${e.slug}/`} className="text-sm text-gray-500 hover:text-ria-700">{e.titulo}</Link></li>)}
              <li><Link href="/blog/" className="text-sm font-medium text-ria-700">Ver el blog →</Link></li>
            </ul>
          ) : (
            <p className="mt-4 text-sm text-gray-500"><Link href="/blog/" className="hover:text-ria-700">{t.blogPronto}</Link></p>
          )}
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="contenedor flex flex-col gap-3 py-4 text-[11px] text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Playa Sanxenxo</span>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1" aria-label={t.legal}>
              {legales.map((e) => (
                <li key={e.href}><Link href={e.href} className="hover:text-ria-700">{e.label}</Link></li>
              ))}
            </ul>
          </div>
          <p className="flex items-center gap-3 sm:mr-14" aria-label={t.idioma}>
            <Link href="/" hrefLang="es" className={lang === 'es' ? 'font-semibold text-ria-700' : 'hover:text-ria-700'}>Español</Link>
            <Link href="/pt/" hrefLang="pt" className={lang === 'pt' ? 'font-semibold text-ria-700' : 'hover:text-ria-700'}>Português</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
