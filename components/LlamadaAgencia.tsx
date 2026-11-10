import Link from 'next/link';
import { href, textos, type Idioma } from '../lib/i18n';

// Llamada a la agencia: un bloque con un botón a /agencia/. Sin formularios fuera de ahí.
export default function LlamadaAgencia({ lang, className = '' }: { lang: Idioma; className?: string }) {
  const t = textos(lang);
  return (
    <div className={`flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-br from-ria-800 to-ria-600 px-6 py-8 text-center text-white shadow-lg sm:flex-row sm:justify-between sm:text-left ${className}`}>
      <p className="max-w-md text-lg font-semibold leading-snug">¿Quieres que te lo organicen? Escribe o llama, sin formularios.</p>
      <Link href={href(lang, '/agencia/')} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-ria-800 transition-all hover:bg-ria-50 hover:shadow-lg">
        {t.hablarAgencia} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
