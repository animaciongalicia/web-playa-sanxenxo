import type { ReactNode } from 'react';
import { TarjetaLocal } from './Locales';
import Seccion from './Seccion';
import type { Local } from '../lib/esquemas';
import Rejilla from '../components/Rejilla';

type Grupo = { id: string; nombre: string; locales: Local[] };

/** Listado compacto: una sola sección, cada zona con su subtítulo, y las tarjetas en 4 columnas. */
export default function ListaPorZonas({ grupos, href, pie }: { grupos: Grupo[]; href?: (l: Local) => string | undefined; pie?: (g: Grupo) => ReactNode }) {
  return (
    <Seccion fondo="gris">
      <div className="mx-auto max-w-7xl space-y-10">
        {grupos.map((g) => (
          <div key={g.id} id={g.id} className="scroll-mt-32">
            <div className="mb-4 flex items-baseline gap-3 border-b border-gray-200 pb-2">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">{g.nombre}</h2>
              <span className="text-sm text-gray-600">{g.locales.length} {g.locales.length === 1 ? 'sitio' : 'sitios'}</span>
            </div>
            <Rejilla>
              {g.locales.map((l) => <TarjetaLocal key={l.id} local={l} href={href?.(l)} />)}
            </Rejilla>
            {pie?.(g)}
          </div>
        ))}
      </div>
    </Seccion>
  );
}
