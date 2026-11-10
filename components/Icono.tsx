// Iconos de trazo (24x24) reutilizables.
const D = {
  paraisos: 'M3 17c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 3 2M12 3v6m0 0l-3-3m3 3l3-3',
  playa: 'M3 19h18M12 4v10M12 7c-3 0-5 1.5-6 4 2-1 4-1 6-1s4 0 6 1c-1-2.500-3-4-6-4z',
  barcos: 'M3 17l2 3h14l2-3H3zM12 3v10M12 5l6 8H12',
  actividades: 'M13 10V3L4 14h7v7l9-11h-7z',
  comer: 'M6 3v8a3 3 0 003 3v7M10 3v6M14 3c2 0 4 2 4 6s-2 5-4 5v7',
  diversion: 'M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z',
  despedidas: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.5 5.5L21 10l-5.5 2.5L13 18l-2.5-5.5L5 10l5.5-2.5L13 2z',
  calendario: 'M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  check: 'M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  mapa: 'M9 20l-5 2V6l5-2m0 16l6 2m-6-2V4m6 18l5-2V4l-5 2m0 16V6M9 4l6 2',
  sol: 'M12 3v2m0 14v2M5.600 5.600l1.400 1.400m10 10l1.400 1.400M3 12h2m14 0h2M5.600 18.400L7 17M17 7l1.400-1.400M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  ojo: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z',
  mensaje: 'M8 10h8M8 14h5M21 12a9 9 0 01-13.200 7.900L3 21l1.200-4.600A9 9 0 1121 12z',
  corazon: 'M12 21s-7-4.600-9.500-9A5.500 5.500 0 0112 6a5.500 5.500 0 019.500 6c-2.500 4.400-9.500 9-9.500 9z',
  reloj: 'M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  personas: 'M16 11a3 3 0 100-6M8 11a3 3 0 100-6 3 3 0 000 6zm-6 9v-1a5 5 0 015-5h2a5 5 0 015 5v1M17 14a5 5 0 015 5v1',
  pin: 'M12 21s7-6.200 7-11a7 7 0 10-14 0c0 4.800 7 11 7 11zm0-8.500a2.500 2.500 0 100-5 2.500 2.500 0 000 5z',
  flecha: 'M5 12h14m-6-6l6 6-6 6',
} as const;

export type NombreIcono = keyof typeof D;

export default function Icono({ nombre, className = 'h-7 w-7' }: { nombre: NombreIcono; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={D[nombre]} />
    </svg>
  );
}
