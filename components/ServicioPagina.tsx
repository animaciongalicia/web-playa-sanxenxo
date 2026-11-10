import AvisoPendiente2027 from './AvisoPendiente2027';
import { EnPreparacion, Insignia } from './Fichas';
import HeroPage from './HeroPage';
import LlamadaAgencia from './LlamadaAgencia';
import Migas from './Migas';
import Seccion from './Seccion';
import { getServicio } from '../lib/datos';
import type { Idioma } from '../lib/i18n';
import type { Servicio } from '../lib/esquemas';

/** Servicio de pie (limusinas, Humor Amarillo): se describe como algo que se hace; nota 2027 según `estado_2027`. */
export default function ServicioPagina({ lang, id, ruta, titulo, subtitulo }: { lang: Idioma; id: Servicio['id']; ruta: string; titulo: string; subtitulo?: string }) {
  const s = getServicio(id);
  return (
    <>
      <HeroPage titulo={titulo} subtitulo={subtitulo} />
      <Migas lang={lang} ruta={ruta} />
      <Seccion ancho="estrecho">
        {s?.estado_2027 === 'pendiente' && <div className="mb-6"><AvisoPendiente2027 lang={lang} /></div>}
        {s?.descripcion ? <p className="text-lg leading-relaxed text-gray-600">{s.descripcion}<Insignia f={s} /></p> : <EnPreparacion />}
        {s && s.salidas.length > 0 && (
          <p className="mt-8 text-gray-600"><strong className="text-gray-900">Salidas: </strong>{s.salidas.join(', ')}</p>
        )}
      </Seccion>
      <Seccion ancho="estrecho" fondo="gris"><LlamadaAgencia lang={lang} /></Seccion>
    </>
  );
}
