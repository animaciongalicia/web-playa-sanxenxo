'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// Aparece una sola vez al entrar en pantalla. Con `prefers-reduced-motion` el CSS la desactiva.
export default function AnimateOnScroll({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return; // sin observer: se queda visible
    // Ya visible al cargar: no se oculta. Si no, se prepara para aparecer al llegar.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('anim-ready', 'visible');
      return;
    }
    el.classList.add('anim-ready');
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`anim ${className}`}>
      {children}
    </div>
  );
}
