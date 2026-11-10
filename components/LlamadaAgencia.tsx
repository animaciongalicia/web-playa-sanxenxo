import Link from 'next/link';
import { href, textos, type Idioma } from '../lib/i18n';

// Llamada discreta a la agencia: un enlace, nada más. Sin formularios fuera de /agencia/.
export default function LlamadaAgencia({ lang, className = '' }: { lang: Idioma; className?: string }) {
  const t = textos(lang);
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      <Link href={href(lang, '/agencia/')} className="link-inline">
        {t.hablarAgencia} →
      </Link>
    </p>
  );
}
