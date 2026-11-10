import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../../../components/HeroPage';
import { EnPreparacion, Insignia, NotaRevision } from '../../../../components/Fichas';
import LlamadaAgencia from '../../../../components/LlamadaAgencia';
import Migas from '../../../../components/Migas';
import Contenido from '../../../../components/Contenido';
import Seccion from '../../../../components/Seccion';
import { getMeses } from '../../../../lib/datos';
import { IDIOMAS, esIdioma, href } from '../../../../lib/i18n';
import { CAMPOS_MES, MESES } from '../../../../lib/meses';

type P = { lang: string; mes: string };
export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.flatMap((lang) => MESES.map((m) => ({ lang, mes: m.id })));
export const generateMetadata = ({ params }: { params: P }): Metadata => ({ title: MESES.find((m) => m.id === params.mes)?.titulo });

export default function Mes({ params }: { params: P }) {
  const meta = MESES.find((m) => m.id === params.mes);
  if (!esIdioma(params.lang) || !meta) notFound();
  const lang = params.lang;
  const mes = getMeses().find((m) => m.id === meta.id);
  const campos = mes ? CAMPOS_MES.filter((c) => mes[c.campo]) : [];
  return (
    <>
      <HeroPage titulo={meta.titulo} subtitulo="Cuándo ir" />
      <Migas lang={lang} ruta={`/cuando-ir/${meta.id}/`} titulo={meta.titulo} />
      <Contenido lang={lang} ruta={`/cuando-ir/${meta.id}/`} />
      <Seccion ancho="estrecho">
        {mes && <p className="mb-4"><Insignia f={mes} /></p>}
        <NotaRevision>Este mes lo escribe Pablo con la entrevista de <code>docs/07</code>. Solo se pinta lo que cuente.</NotaRevision>
        {campos.length ? (
          <div className="space-y-8">
            {mes && campos.map((c) => (
              <div key={c.campo}>
                <h2 className="text-xl font-bold text-gray-900">{c.titulo}</h2>
                <p className="mt-2 text-lg leading-relaxed text-gray-600">{mes[c.campo]}</p>
              </div>
            ))}
          </div>
        ) : <EnPreparacion />}
        <nav aria-label="Otros meses" className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-gray-100 pt-6 text-sm">
          {MESES.filter((m) => m.id !== meta.id).map((m) => <Link key={m.id} href={href(lang, `/cuando-ir/${m.id}/`)} className="link-inline">{m.titulo}</Link>)}
        </nav>
      </Seccion>
      <Seccion ancho="estrecho" fondo="gris"><LlamadaAgencia lang={lang} /></Seccion>
    </>
  );
}
