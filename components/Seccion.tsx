import type { ReactNode } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

type Props = { titulo?: string; intro?: string; fondo?: 'blanco' | 'gris' | 'ria'; ancho?: 'normal' | 'estrecho'; id?: string; children: ReactNode };

// Sección con el espaciado del blueprint. Alterna fondos: blanco → gris → blanco.
export default function Seccion({ titulo, intro, fondo = 'blanco', ancho = 'normal', id, children }: Props) {
  const bg = fondo === 'gris' ? 'bg-gray-50' : fondo === 'ria' ? 'bg-ria-800 text-white' : 'bg-white';
  return (
    <section id={id} className={`section-padding ${bg}`}>
      <div className={`mx-auto ${ancho === 'estrecho' ? 'max-w-3xl' : 'max-w-7xl'}`}>
        <AnimateOnScroll>
          {titulo && <h2 className={`heading-section ${fondo === 'ria' ? '!text-white' : ''}`}>{titulo}</h2>}
          {intro && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">{intro}</p>}
          <div className={titulo || intro ? 'mt-10' : ''}>{children}</div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
