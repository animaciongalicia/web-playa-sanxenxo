import Link from 'next/link';
import { type Entrada } from '../lib/blog';
import { SEO } from '../lib/seo';
import Icono, { type NombreIcono } from './Icono';

const EXPLORA: { icono: NombreIcono; titulo: string; texto: string; href: string }[] = [
  { icono: 'playa', titulo: 'Playas', texto: 'Cinco tramos y nueve imprescindibles', href: '/paraisos/playas/' },
  { icono: 'comer', titulo: 'Dónde comer', texto: 'Restaurantes por zona', href: '/comer/restaurantes/' },
  { icono: 'comer', titulo: 'Chiringuitos', texto: 'Con los pies en la arena', href: '/comer/chiringuitos/' },
  { icono: 'barcos', titulo: 'Barcos', texto: 'Veleros, yates y pesquero', href: '/barcos/' },
  { icono: 'actividades', titulo: 'Actividades', texto: 'Mar, playa y días a medida', href: '/actividades/' },
  { icono: 'diversion', titulo: 'Diversión', texto: 'Terrazas, copas y atardeceres', href: '/diversion/' },
  { icono: 'calendario', titulo: 'Cuándo ir', texto: 'Mes a mes y condiciones', href: '/cuando-ir/' },
];

/** Barra lateral del blog: índice de la entrada, accesos a la guía, páginas relacionadas y últimas entradas. */
export default function BlogSidebar({ indice, paginas, otras }: { indice: { id: string; titulo: string }[]; paginas: string[]; otras: Entrada[] }) {
  const caja = 'rounded-2xl border border-gray-100 bg-white p-5 shadow-sm';
  const titulo = 'text-xs font-bold uppercase tracking-widest text-gray-600';
  return (
    <aside aria-label="Barra lateral" className="space-y-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
      {indice.length >= 4 && (
        <nav aria-label="Índice de la entrada" className={`${caja} hidden lg:block`}>
          <h2 className={titulo}>En esta entrada</h2>
          <ol className="mt-3 list-none space-y-1.5 text-sm">
            {indice.map((i, n) => (
              <li key={i.id}><a href={`#${i.id}`} className="flex gap-2 text-gray-700 hover:text-ria-700">{!/^\d+\.\s/.test(i.titulo) && <span className="text-gray-600">{n + 1}.</span>}<span>{i.titulo}</span></a></li>
            ))}
          </ol>
        </nav>
      )}

      <nav aria-label="Explora la guía" className={caja}>
        <h2 className={titulo}>Explora la guía</h2>
        <ul className="mt-3 space-y-1">
          {EXPLORA.map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-ria-50">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ria-50 text-ria-700 group-hover:bg-white"><Icono nombre={e.icono} className="h-5 w-5" /></span>
                <span className="min-w-0"><span className="block text-sm font-semibold text-gray-900">{e.titulo}</span><span className="block text-xs text-gray-600">{e.texto}</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {paginas.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-ria-800 to-ria-600 p-5 text-white">
          <h2 className="text-xs font-bold uppercase tracking-widest text-arena-200">De esta entrada a la guía</h2>
          <ul className="mt-3 space-y-2">
            {paginas.map((r) => (
              <li key={r}><Link href={r} className="text-sm font-medium underline-offset-4 hover:underline">{SEO[r]?.titulo ?? r} →</Link></li>
            ))}
          </ul>
        </div>
      )}

      {otras.length > 0 && (
        <nav aria-label="Más entradas" className={caja}>
          <h2 className={titulo}>Más del blog</h2>
          <ul className="mt-3 space-y-3">
            {otras.map((o) => (
              <li key={o.slug}>
                <Link href={`/blog/${o.slug}/`} className="block text-sm font-semibold leading-snug text-gray-900 hover:text-ria-700">{o.titulo}</Link>
                <span className="text-xs text-gray-600">{o.minutos} min de lectura</span>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className={`${caja} text-center`}>
        <p className="text-sm font-semibold text-gray-900">¿Hablamos de tu despedida?</p>
        <p className="mt-1 text-xs text-gray-600">Sin formularios: correo, WhatsApp o llamada.</p>
        <Link href="/agencia/" className="btn-primary mt-3 w-full justify-center !px-4 !py-2.5 text-sm">Hablar con la agencia</Link>
      </div>
    </aside>
  );
}
