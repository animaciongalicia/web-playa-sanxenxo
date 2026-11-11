/** Barra de saltos por zona, fija bajo la cabecera. */
export default function NavZonas({ zonas }: { zonas: { id: string; nombre: string; n: number }[] }) {
  if (zonas.length < 2) return null;
  return (
    <nav aria-label="Zonas" className="sticky top-16 z-30 border-b border-gray-100 bg-white/90 backdrop-blur">
      <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3 text-sm">
        {zonas.map((z) => (
          <li key={z.id} className="shrink-0">
            <a href={`#${z.id}`} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 font-medium text-gray-700 transition-colors hover:bg-ria-700 hover:text-white">
              {z.nombre}<span className="rounded-full bg-white/70 px-1.5 text-xs text-gray-600">{z.n}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
