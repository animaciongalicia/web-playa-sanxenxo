import type { ReactNode } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

type Props = {
  titulo?: string;
  intro?: string;
  /** Texto pequeño en mayúsculas sobre el título. */
  etiqueta?: string;
  fondo?: 'blanco' | 'gris' | 'arena' | 'ria' | 'oscuro';
  ancho?: 'normal' | 'estrecho';
  centrado?: boolean;
  id?: string;
  children: ReactNode;
};

const FONDO = {
  blanco: 'bg-white',
  gris: 'bg-gray-50',
  arena: 'bg-arena-50',
  ria: 'bg-ria-800 text-white',
  oscuro: 'bg-ria-950 text-white',
} as const;

// Sección con el espaciado del blueprint. Alterna fondos para dar ritmo a la página.
export default function Seccion({ titulo, intro, etiqueta, fondo = 'blanco', ancho = 'normal', centrado = false, id, children }: Props) {
  const oscuro = fondo === 'ria' || fondo === 'oscuro';
  return (
    <section id={id} className={`section-padding ${FONDO[fondo]}`}>
      <div className={`mx-auto ${ancho === 'estrecho' ? 'max-w-3xl' : 'max-w-7xl'}`}>
        <AnimateOnScroll>
          {(titulo || intro || etiqueta) && (
            <header className={centrado ? 'mx-auto max-w-3xl text-center' : ''}>
              {etiqueta && <p className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${oscuro ? 'text-arena-300' : 'text-ria-700'}`}>{etiqueta}</p>}
              {titulo && <h2 className={`heading-section ${oscuro ? '!text-white' : ''}`}>{titulo}</h2>}
              {intro && <p className={`mt-4 max-w-3xl text-lg leading-relaxed ${centrado ? 'mx-auto' : ''} ${oscuro ? 'text-ria-100' : 'text-gray-600'}`}>{intro}</p>}
            </header>
          )}
          <div className={titulo || intro ? 'mt-8' : ''}>{children}</div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
