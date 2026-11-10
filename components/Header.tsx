'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';
import type { NavItem } from '../lib/nav';
import { rutaEnIdioma } from '../lib/i18n';

type Props = {
  lang: 'es' | 'pt';
  items: NavItem[];
  inicioHref: string;
  etiquetas: { abrir: string; cerrar: string; irContenido: string };
};

function Chevron({ abierto = false }: { abierto?: boolean }) {
  return (
    <svg className={`h-3.5 w-3.5 transition-transform ${abierto ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

export default function Header({ lang, items, inicioHref, etiquetas }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const pathname = usePathname() ?? '/';
  const idioma = { es: rutaEnIdioma(pathname, 'es'), pt: rutaEnIdioma(pathname, 'pt') };
  const activo = (h: string) => pathname === h || (h !== '/' && h !== '/pt/' && pathname.startsWith(h));

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        {etiquetas.irContenido}
      </a>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8" aria-label="Principal">
        <Link href={inicioHref} className="flex items-center gap-3" onClick={() => setAbierto(false)}>
          <Logo />
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-gray-900 sm:text-xl">PLAYA SANXENXO</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-gray-500 sm:block">Disfruta Sanxenxo y alrededores</span>
          </span>
        </Link>

        {/* Escritorio */}
        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((it) => (
            <li key={it.href} className="group relative">
              <Link
                href={it.href}
                className={`relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-ria-700 ${activo(it.href) ? 'text-ria-700' : 'text-gray-600'}`}
              >
                {it.label}
                {it.hijos && <Chevron />}
                {activo(it.href) && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-ria-600" />}
              </Link>
              {it.hijos && (
                <ul className="invisible absolute left-0 top-full min-w-[14rem] rounded-xl border border-gray-100 bg-white p-2 opacity-0 shadow-lg transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {it.hijos.map((h) => (
                    <li key={h.href}>
                      <Link href={h.href} className="block rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-ria-50 hover:text-ria-700">
                        {h.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="ml-3 flex items-center gap-1 border-l border-gray-200 pl-3 text-xs font-semibold" aria-label="Idioma">
            <Link href={idioma.es} className={lang === 'es' ? 'text-ria-700' : 'text-gray-500 hover:text-ria-700'} hrefLang="es">ES</Link>
            <span className="text-gray-300">|</span>
            <Link href={idioma.pt} className={lang === 'pt' ? 'text-ria-700' : 'text-gray-500 hover:text-ria-700'} hrefLang="pt">PT</Link>
          </li>
        </ul>

        {/* Móvil */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-50 lg:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? etiquetas.cerrar : etiquetas.abrir}
          onClick={() => setAbierto((v) => !v)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            {abierto ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      <div id="menu-movil" className={`overflow-y-auto border-t border-gray-100 bg-white transition-all duration-300 lg:hidden ${abierto ? 'max-h-[80vh]' : 'max-h-0 border-t-0'}`} hidden={!abierto}>
        <ul className="px-6 py-3">
          {items.map((it) => (
            <li key={it.href} className="border-b border-gray-50 last:border-0">
              <div className="flex items-center justify-between">
                <Link href={it.href} className={`block flex-1 py-3 text-base font-medium ${activo(it.href) ? 'text-ria-700' : 'text-gray-700'}`} onClick={() => setAbierto(false)}>
                  {it.label}
                </Link>
                {it.hijos && (
                  <button type="button" className="p-3 text-gray-500" aria-expanded={sub === it.href} aria-label={it.label} onClick={() => setSub(sub === it.href ? null : it.href)}>
                    <Chevron abierto={sub === it.href} />
                  </button>
                )}
              </div>
              {it.hijos && sub === it.href && (
                <ul className="pb-2 pl-4">
                  {it.hijos.map((h) => (
                    <li key={h.href}>
                      <Link href={h.href} className="block py-2 text-sm text-gray-600" onClick={() => setAbierto(false)}>{h.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="flex gap-3 py-3 text-sm font-semibold">
            <Link href={idioma.es} className={lang === 'es' ? 'text-ria-700' : 'text-gray-500'} hrefLang="es" onClick={() => setAbierto(false)}>ES</Link>
            <Link href={idioma.pt} className={lang === 'pt' ? 'text-ria-700' : 'text-gray-500'} hrefLang="pt" onClick={() => setAbierto(false)}>PT</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
