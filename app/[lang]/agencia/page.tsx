import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ContactoAgencia from '../../../components/ContactoAgencia';
import Contenido from '../../../components/Contenido';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import { foto } from '../../../lib/fotos';
import { IDIOMAS, esIdioma } from '../../../lib/i18n';
import JsonLd from '../../../components/JsonLd';
import { organizacion } from '../../../lib/jsonld';
import { SITIO } from '../../../lib/sitio';
import { metaRuta } from '../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = metaRuta('/agencia/');

const DATOS = [
  'Si es despedida de soltero o de soltera.',
  'Fecha aproximada.',
  'Cuántos sois.',
  'De dónde venís.',
  'Qué os interesa: barco, actividades, cena o diversión.',
];

export default function Agencia({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const img = foto('despedidas', 'agencia');
  return (
    <>
      <JsonLd datos={{ '@type': 'ContactPage', name: 'Contacto con la agencia', url: `${SITIO}/agencia/`, about: organizacion() }} />
      <HeroPage ruta="/agencia/" etiqueta="Contacto directo" titulo="Agencia" subtitulo="Aquí no hay formulario: escribes o llamas, y te contestan." />
      <Migas lang={params.lang} ruta="/agencia/" />
      <Contenido lang={params.lang} ruta="/agencia/" />
      <Seccion etiqueta="Tres vías" titulo="Elige cómo prefieres hablar" intro="Todas llegan al mismo sitio. Usa la que te sea más cómoda." centrado>
        <ContactoAgencia />
      </Seccion>
      <Seccion fondo="arena">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-ria-600">Para ir rápido</p>
            <h2 className="heading-section">Cuenta esto y te responden antes</h2>
            <p className="mt-4 text-lg text-gray-600">Aunque sea a grandes rasgos.</p>
            <ul className="mt-6 space-y-3">
              {DATOS.map((d) => (
                <li key={d} className="flex items-start gap-3 text-lg text-gray-700">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ria-700 text-white">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-500">El correo y el WhatsApp ya llevan estas preguntas escritas: solo tienes que completarlas.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-ria-200 to-ria-500 shadow-xl">
            {img && <Image src={img} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" style={{ objectPosition: '50% 20%' }} />}
          </div>
        </div>
      </Seccion>
    </>
  );
}
