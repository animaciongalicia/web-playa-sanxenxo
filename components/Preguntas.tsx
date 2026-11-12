import Seccion from './Seccion';
import JsonLd from './JsonLd';
import { FAQ } from '../lib/faq';

/** Preguntas frecuentes de una página: se ven en pantalla y van también como datos estructurados. */
export default function Preguntas({ ruta }: { ruta: string }) {
  const items = FAQ[ruta];
  if (!items?.length) return null;
  return (
    <Seccion etiqueta="Preguntas frecuentes" titulo="Lo que más se pregunta" ancho="estrecho" centrado>
      <JsonLd datos={{ '@type': 'FAQPage', mainEntity: items.map((p) => ({ '@type': 'Question', name: p.q, acceptedAnswer: { '@type': 'Answer', text: p.a } })) }} />
      <div className="space-y-3 text-left">
        {items.map((p) => (
          <details key={p.q} className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm open:shadow-md">
            <summary className="cursor-pointer list-none text-base font-semibold text-gray-900 marker:hidden">{p.q}</summary>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{p.a}</p>
          </details>
        ))}
      </div>
    </Seccion>
  );
}
