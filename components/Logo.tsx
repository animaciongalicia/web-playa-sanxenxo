// Marca provisional en vector: sol y olas (hereda la idea del logo antiguo) con la paleta ria/arena.
// Mismo dibujo que public/img/logo-playa-sanxenxo.svg. Se sustituye cuando Pablo aporte el definitivo.
export default function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="44" cy="17" r="9" fill="#cfa56f" />
      <path d="M6 34c8-1 12-9 22-9 6 0 10 3 14 7-9-4-14-2-20 2-6 4-11 5-16 0z" fill="#187a9b" />
      <path d="M6 48c8-1 12-9 22-9 6 0 10 3 14 7-9-4-14-2-20 2-6 4-11 5-16 0z" fill="#38b4d3" />
      <path d="M30 56c8-1 12-7 20-7 5 0 8 2 11 5-7-3-11-1-16 2-5 3-10 4-15 0z" fill="#78d0e6" />
    </svg>
  );
}
