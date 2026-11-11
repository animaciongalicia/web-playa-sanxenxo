import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CalendarioTemporada from '../../../components/CalendarioTemporada';
import Contenido from '../../../components/Contenido';
import HeroPage from '../../../components/HeroPage';
import BandaAgencia from '../../../components/BandaAgencia';
import Icono from '../../../components/Icono';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import { getMeses } from '../../../lib/datos';
import { IDIOMAS, esIdioma } from '../../../lib/i18n';
import { CAMPOS_MES, MESES } from '../../../lib/meses';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = { title: 'Cuándo ir y condiciones', description: 'Mes a mes: qué te encuentras, qué te conviene y qué condiciones tienen las despedidas.' };

// Una sola página: calendario visual, ficha de cada mes (data/servicios-y-meses.json) y condiciones (contenido/es/cuando-ir/condiciones.md).
const TONO: Record<string, string> = {
  mayo: 'from-ria-300 to-ria-500', junio: 'from-ria-500 to-ria-700', julio: 'from-ria-800 to-ria-950', agosto: 'from-ria-800 to-ria-950',
  septiembre: 'from-ria-400 to-ria-600', 'resto-del-ano': 'from-gray-400 to-gray-600',
};

export default function CuandoIr({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const meses = getMeses()
    .map((m) => ({ mes: m, titulo: MESES.find((x) => x.id === m.id)?.titulo ?? m.id, campos: CAMPOS_MES.filter((c) => m[c.campo] && c.campo !== 'recomendacion' && c.campo !== 'cupos_ons_cies') }))
    .filter((x) => x.campos.length || x.mes.recomendacion);
  return (
    <>
      <HeroPage ruta="/cuando-ir/" etiqueta="Antes de fijar la fecha" titulo="Cuándo ir y condiciones" subtitulo="Mes a mes: qué te encuentras, qué te conviene y qué condiciones tienen las despedidas." />
      <Migas lang={lang} ruta="/cuando-ir/" />
      <Contenido lang={lang} ruta="/cuando-ir/" id="meses" />
      <Seccion fondo="arena" etiqueta="El año de un vistazo" titulo="La temporada, mes por mes" intro="Dos filas: cuánto ambiente hay y cuánto te aceptan una despedida." centrado>
        <CalendarioTemporada />
      </Seccion>
      {meses.length > 0 && (
        <Seccion etiqueta="El detalle" titulo="Qué te encuentras cada mes" centrado>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {meses.map(({ mes, titulo, campos }) => (
              <article key={mes.id} id={mes.id} className="stagger-child flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <header className={`flex items-center justify-between bg-gradient-to-br ${TONO[mes.id] ?? 'from-ria-600 to-ria-800'} px-5 py-3 text-white`}>
                  <h3 className="text-xl font-bold">{titulo}</h3>
                  <Icono nombre="calendario" className="h-7 w-7 opacity-80" />
                </header>
                <div className="flex-1 p-5 text-sm leading-relaxed text-gray-600">
                  {mes.recomendacion && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-arena-700">Qué te conviene</p>
                      <p className="mt-1 text-gray-800">{mes.recomendacion}</p>
                    </div>
                  )}
                  <details className="mt-3 border-t border-gray-100 pt-3">
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-ria-700">Ver el detalle del mes</summary>
                    <dl className="mt-3 space-y-3">
                      {campos.map((c) => (
                        <div key={c.campo}>
                          <dt className="text-[11px] font-bold uppercase tracking-widest text-ria-600">{c.titulo}</dt>
                          <dd className="mt-1">{mes[c.campo]}</dd>
                        </div>
                      ))}
                    </dl>
                  </details>
                </div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl rounded-xl bg-arena-50 px-5 py-3 text-center text-sm text-arena-900">Ons y Cíes piden autorización previa de la Xunta en Semana Santa y del 15 de mayo al 15 de septiembre. Fuera de esas fechas, se visitan con grupos con guía.</p>
        </Seccion>
      )}
      <section id="condiciones" className="scroll-mt-24 bg-gradient-to-br from-ria-900 to-ria-700 px-6 py-9 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-arena-300">Información sin señalar locales</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">Condiciones de las despedidas</h2>
      </section>
      <Contenido lang={lang} ruta="/cuando-ir/condiciones/" />
      <BandaAgencia lang={lang} />
    </>
  );
}
