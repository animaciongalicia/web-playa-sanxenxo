import AvisoPendiente2027 from './AvisoPendiente2027';
import BandaAgencia from './BandaAgencia';
import Contenido from './Contenido';
import HeroPage from './HeroPage';
import Migas from './Migas';
import Seccion from './Seccion';
import { getServicio } from '../lib/datos';
import { getContenido } from '../lib/contenido';
import type { Idioma } from '../lib/i18n';
import type { Servicio } from '../lib/esquemas';
import GuiasRelacionadas from './GuiasRelacionadas';
import Galeria from './Galeria';

/** Servicio de pie (limusinas, Humor Amarillo): se describe como algo que se hace; nota 2027 según `estado_2027`. */
export default function ServicioPagina({ lang, id, ruta, titulo, subtitulo }: { lang: Idioma; id: Servicio['id']; ruta: string; titulo: string; subtitulo?: string }) {
  const s = getServicio(id);
  const hayTexto = !!getContenido(lang, ruta);
  return (
    <>
      <HeroPage ruta={ruta} etiqueta="Servicio" titulo={titulo} subtitulo={subtitulo} />
      <Migas lang={lang} ruta={ruta} />
      {s?.estado_2027 === 'pendiente' && (
        <div className="mx-auto max-w-3xl px-6 pt-8"><AvisoPendiente2027 lang={lang} /></div>
      )}
      <Contenido lang={lang} ruta={ruta} />
      {(s?.descripcion || (s && s.salidas.length > 0)) && !hayTexto && (
        <Seccion ancho="estrecho">
          {s?.descripcion && <p className="text-lg leading-relaxed text-gray-600">{s.descripcion}</p>}
          {s && s.salidas.length > 0 && <p className="mt-6 text-gray-600"><strong className="text-gray-900">Salidas: </strong>{s.salidas.join(', ')}</p>}
        </Seccion>
      )}
      <GuiasRelacionadas ruta={ruta} />
      <Galeria prefijo={id} etiqueta="En la calle" titulo="Así se ve" />
      <BandaAgencia lang={lang} />
    </>
  );
}
