import { EnPreparacion, Insignia } from './Fichas';
import { getBarcos } from '../lib/datos';

export const ENLACE_BARCOS = 'https://seagalicia.com';

const eur = (n: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export default function ListaBarcos({ categoria }: { categoria: 'yate' | 'velero' }) {
  const barcos = getBarcos().filter((b) => b.categoria === categoria);
  if (!barcos.length) return <EnPreparacion texto="Estamos cerrando la flota. Muy pronto, aquí." />;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {barcos.map((b) => (
        <article key={b.id} className="card-elegant stagger-child !p-6">
          <h3 className="text-lg font-semibold text-gray-900">{b.nombre ?? (categoria === 'yate' ? 'Yate' : 'Velero')}<Insignia f={b} /></h3>
          <dl className="mt-3 space-y-1 text-sm text-gray-600">
            {b.plazas && <div><dt className="inline font-semibold text-gray-900">Plazas: </dt><dd className="inline">{b.plazas}{b.patron === 'siempre' ? ' más patrón' : ''}</dd></div>}
            {b.puerto_salida && <div><dt className="inline font-semibold text-gray-900">Puerto de salida: </dt><dd className="inline">{b.puerto_salida}</dd></div>}
            {b.precio_desde && <div><dt className="inline font-semibold text-gray-900">Desde: </dt><dd className="inline">{eur(b.precio_desde.importe)} {b.precio_desde.unidad}</dd></div>}
          </dl>
          <a href={b.enlace_reserva} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-ria-700">Ver en Sea Galicia →</a>
        </article>
      ))}
    </div>
  );
}
