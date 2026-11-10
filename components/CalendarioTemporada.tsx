// Calendario visual de la temporada. Todo sale de la entrevista de Pablo (2026-11-10), ver data/servicios-y-meses.json.
type Nivel = 0 | 1 | 2 | 3 | 4;
const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
// Ambiente: 1 = casi cerrado (Imserso) · 2 = flojo · 3 = ambiente · 4 = temporada altísima
const AMBIENTE: Nivel[] = [1, 1, 1, 1, 2, 3, 4, 4, 2, 1, 1, 1];
// Despedidas: 0 = no es época · 1 = pocas · 2 = se aceptan · 3 = casi nadie las quiere
const DESPEDIDAS: Nivel[] = [0, 0, 0, 0, 2, 2, 3, 3, 1, 0, 0, 0];

const COLOR_AMBIENTE = ['', 'bg-ria-100 text-ria-800', 'bg-ria-300 text-ria-900', 'bg-ria-600 text-white', 'bg-ria-900 text-white'];
const ETIQ_AMBIENTE = ['', 'Casi cerrado', 'Flojo', 'Ambiente', 'Altísima'];
const COLOR_DESP = ['bg-gray-100 text-gray-400', 'bg-arena-200 text-arena-900', 'bg-emerald-500 text-white', 'bg-rose-400 text-white'];
const ETIQ_DESP = ['—', 'Pocas', 'Sí', 'Casi no'];

export default function CalendarioTemporada() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[110px_repeat(12,minmax(0,1fr))] gap-1.5 text-center text-xs">
            <span />
            {MESES.map((m) => <span key={m} className="pb-1 font-semibold uppercase tracking-wider text-gray-500">{m}</span>)}
            <span className="flex items-center text-left text-sm font-semibold text-gray-900">Ambiente</span>
            {AMBIENTE.map((n, i) => <span key={i} className={`flex h-14 items-center justify-center rounded-lg px-1 font-medium leading-tight ${COLOR_AMBIENTE[n]}`}>{ETIQ_AMBIENTE[n]}</span>)}
            <span className="flex items-center text-left text-sm font-semibold text-gray-900">Despedidas</span>
            {DESPEDIDAS.map((n, i) => <span key={i} className={`flex h-14 items-center justify-center rounded-lg px-1 font-medium leading-tight ${COLOR_DESP[n]}`}>{ETIQ_DESP[n]}</span>)}
          </div>
        </div>
      </div>
      <ul className="mt-6 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
        <li className="rounded-xl bg-gray-50 p-4"><strong className="block text-gray-900">1–15 de junio</strong>Calentamiento: turismo de Galicia y algo de movimiento los fines de semana.</li>
        <li className="rounded-xl bg-gray-50 p-4"><strong className="block text-gray-900">20 de junio – 29/30 de agosto</strong>Lo gordo. Aglomeraciones, atascos y poco sitio para grupos.</li>
        <li className="rounded-xl bg-gray-50 p-4"><strong className="block text-gray-900">Septiembre – mayo</strong>Sobre todo Imserso. Pueblo casi cerrado, salvo hoteles y algún evento.</li>
      </ul>
      <p className="mt-4 text-center text-xs text-gray-400">En gris: no es época de despedidas de mar y fiesta.</p>
    </div>
  );
}
