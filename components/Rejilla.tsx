import { Children, type ReactNode } from 'react';

/** Rejilla de tarjetas de hasta 3 columnas sin huecos: 1 o 2 tarjetas ocupan más ancho, 4 van en 2×2 y la última fila incompleta queda centrada. */
export default function Rejilla({ children, max = 3, className = '' }: { children: ReactNode; max?: 2 | 3; className?: string }) {
  const items = Children.toArray(children);
  const n = items.length;
  let cols = Math.min(max, n);
  if (n === 4 && max >= 3) cols = 2;
  const ancho =
    cols <= 1 ? 'w-full max-w-xl'
    : cols === 2 ? 'w-full sm:w-[calc((100%-1.25rem)/2)]'
    : 'w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]';
  return (
    <div className={`flex flex-wrap justify-center gap-5 ${className}`}>
      {items.map((c, i) => (
        <div key={i} className={`flex ${ancho} [&>*]:min-w-0 [&>*]:flex-1`}>{c}</div>
      ))}
    </div>
  );
}
