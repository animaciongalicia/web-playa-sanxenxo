import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ContactoAgencia from '../../../components/ContactoAgencia';
import HeroPage from '../../../components/HeroPage';
import Migas from '../../../components/Migas';
import Seccion from '../../../components/Seccion';
import { IDIOMAS, esIdioma } from '../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));
export const metadata: Metadata = { title: 'Agencia', description: 'Escribe o llama. Aquí no hay formulario.' };

export default function Agencia({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  return (
    <>
      <HeroPage titulo="Agencia" subtitulo="Aquí no hay formulario: escribes o llamas, y te contestan." />
      <Migas lang={params.lang} ruta="/agencia/" />
      <Seccion titulo="Elige cómo prefieres hablar">
        <ContactoAgencia />
      </Seccion>
      <Seccion fondo="gris" ancho="estrecho" titulo="Para que te respondan rápido">
        <p className="text-lg leading-relaxed text-gray-600">Cuenta, aunque sea a grandes rasgos:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-lg text-gray-600">
          <li>Si es despedida de soltero o de soltera.</li>
          <li>Fecha aproximada.</li>
          <li>Cuántos sois.</li>
          <li>De dónde venís.</li>
          <li>Qué os interesa: barco, actividades, cena o diversión.</li>
        </ul>
        <p className="mt-6 text-sm text-gray-500">El correo y el WhatsApp ya llevan estas preguntas escritas: solo tienes que completarlas.</p>
      </Seccion>
    </>
  );
}
