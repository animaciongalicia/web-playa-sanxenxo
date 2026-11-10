import type { ReactNode } from 'react';

type Props = { titulo: string; subtitulo?: string; etiqueta?: string; grande?: boolean; children?: ReactNode };

// Hero sin foto (placeholder): degradado ría + ondas. Cuando Pablo aporte fotos se añade `imagen` con next/image.
export default function HeroPage({ titulo, subtitulo, etiqueta, grande = false, children }: Props) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-ria-900 via-ria-800 to-ria-600 pt-16 text-white ${grande ? 'min-h-[70vh] lg:min-h-[75vh]' : 'min-h-[40vh] lg:min-h-[45vh]'}`}
    >
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-white/10" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 60c120 40 240 40 360 0s240-40 360 0 240 40 360 0 240-40 360 0v60H0z" />
      </svg>
      <div className="relative mx-auto max-w-4xl px-6 py-16 text-center">
        {etiqueta && <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-arena-200">{etiqueta}</p>}
        <h1 className={`font-bold leading-tight tracking-tight text-balance ${grande ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl md:text-5xl'}`}>{titulo}</h1>
        {subtitulo && <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ria-100">{subtitulo}</p>}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
