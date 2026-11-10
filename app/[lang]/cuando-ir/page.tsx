import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Contenido from '../../../components/Contenido';
import HeroPage from '../../../components/HeroPage';
import LlamadaAgencia from '../../../components/LlamadaAgencia';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import { getMeses } from '../../../lib/datos';
import { IDIOMAS, esIdioma } from '../../../lib/i18n';
import { CAMPOS_MES, MESES } from '../../../lib/meses';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = { title: 'Cuándo ir y condiciones', description: 'Mes a mes: qué te encuentras, qué te conviene y qué condiciones tienen las despedidas.' };

// Una sola página (decisión de Pablo): los meses por un lado y las condiciones por otro (#condiciones).
// El texto vive en contenido/es/cuando-ir.md y contenido/es/cuando-ir/condiciones.md.
// Si Pablo rellena campos de un mes en data/servicios-y-meses.json, salen debajo con su ancla (#mayo, #julio…).
export default function CuandoIr({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const conDatos = getMeses()
    .map((m) => ({ mes: m, titulo: MESES.find((x) => x.id === m.id)?.titulo ?? m.id, campos: CAMPOS_MES.filter((c) => m[c.campo]) }))
    .filter((x) => x.campos.length);
  return (
    <>
      <HeroPage ruta="/cuando-ir/" titulo="Cuándo ir y condiciones" subtitulo="Mes a mes: qué te encuentras, qué te conviene y qué condiciones tienen las despedidas." />
      <Migas lang={lang} ruta="/cuando-ir/" />
      <Contenido lang={lang} ruta="/cuando-ir/" id="meses" />
      {conDatos.length > 0 && (
        <Seccion fondo="gris" titulo="Mes a mes">
          <div className="space-y-10">
            {conDatos.map(({ mes, titulo, campos }) => (
              <div key={mes.id} id={mes.id}>
                <h3 className="text-2xl font-bold text-gray-900">{titulo}</h3>
                <div className="mt-4 space-y-4">
                  {campos.map((c) => (
                    <div key={c.campo}>
                      <h4 className="font-semibold text-gray-900">{c.titulo}</h4>
                      <p className="mt-1 text-gray-600">{mes[c.campo]}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Seccion>
      )}
      <Contenido lang={lang} ruta="/cuando-ir/condiciones/" id="condiciones" />
      <Seccion ancho="estrecho" fondo="gris"><LlamadaAgencia lang={lang} /></Seccion>
    </>
  );
}
