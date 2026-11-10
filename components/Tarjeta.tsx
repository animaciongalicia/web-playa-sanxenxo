import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = { titulo: string; texto?: string; href: string; icono?: ReactNode };

export default function Tarjeta({ titulo, texto, href, icono }: Props) {
  return (
    <Link href={href} className="card-elegant stagger-child group block">
      {icono && <div className="mb-4 text-ria-700">{icono}</div>}
      <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
      {texto && <p className="mt-2 text-sm leading-relaxed text-gray-500">{texto}</p>}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ria-700">
        Ver más
        <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
