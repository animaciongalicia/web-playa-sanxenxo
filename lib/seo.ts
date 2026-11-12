// Títulos y descripciones de cada página (docs/06). El título lleva " · Playa Sanxenxo" detrás (plantilla del layout): máx. 43 caracteres.
// La descripción informa, sin promesas: máx. 155 caracteres.
import type { Metadata } from 'next';
import { getEntrada } from './blog';
import { getLocales } from './datos';
import { buscarRuta } from './rutas';
import { SITIO } from './sitio';

type Par = { titulo: string; descripcion: string };

export const SEO: Record<string, Par> = {
  '/paraisos/': { titulo: 'Playas y mar de Sanxenxo', descripcion: 'Playas y mar de Sanxenxo y alrededores: tramos de costa, las 9 imprescindibles y las islas Ons, Cíes y la ría de Aldán.' },
  '/paraisos/playas/': { titulo: 'Playas de Sanxenxo y alrededores', descripcion: 'Las playas de Sanxenxo, Portonovo, A Lanzada, O Grove y más, ordenadas por tramo de costa, con las nueve imprescindibles.' },
  '/paraisos/playas/sanxenxo/': { titulo: 'Playas de Sanxenxo', descripcion: 'Silgar, Areas, Panadeira y el resto de playas urbanas de Sanxenxo: cómo son, cómo llegar y cuándo conviene ir.' },
  '/paraisos/playas/portonovo/': { titulo: 'Playas de Portonovo y despedidas', descripcion: 'Baltar, Montalvo, Caneliñas y las calas de Portonovo: playas, ambiente y planes para una despedida en la zona.' },
  '/paraisos/playas/noalla-a-lanzada/': { titulo: 'Playas de Noalla y A Lanzada', descripcion: 'A Lanzada, Areas Gordas, Pragueira y los arenales abiertos al Atlántico de Noalla: cómo son y qué esperar.' },
  '/paraisos/playas/o-grove-san-vicente/': { titulo: 'Playas de O Grove y San Vicente', descripcion: 'A Barrosa, Pedras Negras y las calas con pasarelas de madera de O Grove y San Vicente do Mar.' },
  '/paraisos/playas/mas-alla/': { titulo: 'Playas de Aldán, Bueu, Marín y Poio', descripcion: 'Las playas de Aldán, Bueu, Marín, Poio y Combarro: más tranquilas y con pueblos marineros cerca.' },
  '/paraisos/mar/': { titulo: 'Mar: Ons, Cíes y ría de Aldán', descripcion: 'Tres destinos de mar cerca de Sanxenxo: Ons, las Cíes y la ría de Aldán. Cómo llegar y qué normas tienen.' },
  '/paraisos/mar/islas-ons/': { titulo: 'Isla de Ons: cómo ir desde Sanxenxo', descripcion: 'La isla de Ons, en el Parque Nacional de las Islas Atlánticas: playas, senderos, autorización de la Xunta y cómo llegar.' },
  '/paraisos/mar/islas-cies/': { titulo: 'Islas Cíes: cómo visitarlas', descripcion: 'Las islas Cíes, en el Parque Nacional de las Islas Atlánticas: playas, autorización previa y salidas de barco.' },
  '/paraisos/mar/ria-de-aldan/': { titulo: 'Ría de Aldán, el Caribe gallego', descripcion: 'La ría de Aldán: una bahía recogida con agua tranquila y playas pequeñas, un plan fácil de mar desde Sanxenxo.' },
  '/barcos/': { titulo: 'Alquiler de barcos para despedidas', descripcion: 'Yates, veleros, pesquero y lancha rápida para tu grupo, con capacidad y precio «desde», saliendo de Sanxenxo y Portonovo.' },
  '/barcos/traslados/': { titulo: 'Traslados a Ons, Cíes y Aldán', descripcion: 'Traslados en lancha rápida a Ons, Cíes y la ría de Aldán. Cómo reservar y qué normas tienen las islas.' },
  '/actividades/': { titulo: 'Actividades para despedidas', descripcion: 'Qué hacer en el mar y en la playa con tu grupo: motos de agua, paddle surf, pesca, bateas y días a medida.' },
  '/actividades/mar-con-motor/': { titulo: 'Motos de agua y mar con motor', descripcion: 'Motos de agua, parascending y sesión acuática desde barco en Sanxenxo y Portonovo. Dónde se hacen y qué incluyen.' },
  '/actividades/playa-y-tabla/': { titulo: 'Surf, paddle surf y kayak', descripcion: 'Surf, paddle surf, Big SUP y kayak para grupos en Sanxenxo: dónde se hacen y cuántos tenéis que ser.' },
  '/actividades/pesca/': { titulo: 'Pesca para grupos en Sanxenxo', descripcion: 'Pesca recreativa y pesca-turismo para grupos en Sanxenxo y Portonovo: cómo funcionan, para quién son y cómo encajan en una despedida.' },
  '/actividades/mar-y-mesa/': { titulo: 'Bateas, mariscada y churrascada', descripcion: 'Ruta de bateas con mejillones y vino, mariscada o cena en barco y churrascada: planes de mar y mesa para grupos.' },
  '/actividades/dias-a-medida/': { titulo: 'Gymkanas y días a medida', descripcion: 'Olimpiadas de playa, gymkana de despedida, torneos, atardeceres en barco y fiestas producidas a medida para tu grupo.' },
  '/actividades/kayak-areoso/': { titulo: 'Kayak en Areoso desde A Illa de Arousa', descripcion: 'Rutas en kayak a Areoso: formatos, precios orientativos y el permiso gratuito de la Xunta para desembarcar en el islote.' },
  '/comer/': { titulo: 'Dónde comer en Sanxenxo', descripcion: 'Restaurantes, chiringuitos y furanchos de Sanxenxo y alrededores, por zona, con consejos para cenas de grupo.' },
  '/comer/restaurantes/': { titulo: 'Restaurantes de Sanxenxo y alrededores', descripcion: 'Restaurantes agrupados por zona: Sanxenxo, Portonovo, O Grove, Combarro, Aldán, Bueu y Marín. Con precios medios y consejos.' },
  '/comer/chiringuitos/': { titulo: 'Chiringuitos de Sanxenxo y alrededores', descripcion: 'Chiringuitos con los pies cerca de la arena en Sanxenxo, A Lanzada, O Grove, Aldán y Bueu. Qué esperar y cómo elegir.' },
  '/comer/furanchos/': { titulo: 'Furanchos de Sanxenxo, Meaño y Cambados', descripcion: 'Casas que venden su vino con algo para picar, por zona. Abren, más o menos, de diciembre a junio: confirma las fechas.' },
  '/diversion/': { titulo: 'Diversión y copas en Sanxenxo', descripcion: 'Terraceo, tardeo, puestas de sol y copas en el puerto de Sanxenxo, Portonovo, A Lanzada y O Grove.' },
  '/diversion/sanxenxo-puerto/': { titulo: 'Pubs y copas en el puerto de Sanxenxo', descripcion: 'Los pubs y locales del puerto deportivo de Sanxenxo: Dux, Buddha, Varadero, Gassho y más. Cómo funciona la noche.' },
  '/diversion/portonovo/': { titulo: 'Copas y ambiente en Portonovo', descripcion: 'Locales de copas y ambiente en Portonovo: una alternativa más recogida al puerto de Sanxenxo.' },
  '/diversion/a-lanzada-san-vicente/': { titulo: 'Atardeceres en A Lanzada y San Vicente', descripcion: 'Terrazas y chiringuitos con vistas en A Lanzada y San Vicente do Mar, ideales para tardear y ver la puesta de sol.' },
  '/diversion/o-grove/': { titulo: 'Copas y terrazas en O Grove', descripcion: 'Locales de copas y terrazas en O Grove, para quien se aloja en esa zona y no quiere desplazarse a Sanxenxo.' },
  '/despedidas/': { titulo: 'Despedidas en Sanxenxo', descripcion: 'Guía para organizar una despedida en Sanxenxo: barco, actividades, dónde cenar, copas y cuándo ir, con precios orientativos.' },
  '/despedidas/soltero/': { titulo: 'Despedida de soltero en Sanxenxo', descripcion: 'Planes de día y de noche para una despedida de soltero en Sanxenxo, formatos que funcionan, precios orientativos y errores habituales.' },
  '/despedidas/soltera/': { titulo: 'Despedida de soltera en Sanxenxo', descripcion: 'Planes con encanto para una despedida de soltera en Sanxenxo: spa, barco, cenas y copas, con precios orientativos y consejos.' },
  '/cuando-ir/': { titulo: 'Cuándo ir a Sanxenxo y condiciones', descripcion: 'Mes a mes: ambiente, despedidas y qué te conviene. Temporada fuerte del 20 de junio a agosto y condiciones para reservar.' },
  '/limusinas/': { titulo: 'Limusina en Sanxenxo para despedidas', descripcion: 'Limusina blanca de 8 plazas con salidas desde Sanxenxo, Combarro y O Grove. Cuándo compensa y a qué hora reservarla.' },
  '/humor-amarillo-en-sanxenxo/': { titulo: 'Humor Amarillo en Sanxenxo', descripcion: 'Un día de pruebas y juegos al estilo del programa de los 90, a unos 20 minutos de Sanxenxo. Qué se hace y cómo encaja.' },
  '/agencia/': { titulo: 'Contacto con la agencia', descripcion: 'Escribe por correo, WhatsApp o llama para organizar tu despedida en Sanxenxo. Sin formularios: te contestan.' },
  '/blog/': { titulo: 'Blog de Playa Sanxenxo', descripcion: 'Guías y consejos para organizar tu despedida en Sanxenxo: barcos, precios, mejor mes, planes de soltero y de soltera, Portonovo, Aldán y Ons.' },
  '/aviso-legal/': { titulo: 'Aviso legal', descripcion: 'Aviso legal de Playa Sanxenxo: titularidad del sitio web, condiciones de uso, propiedad intelectual y enlaces a otras webs.' },
  '/privacidad/': { titulo: 'Política de privacidad', descripcion: 'Política de privacidad de Playa Sanxenxo: qué datos se tratan, con qué finalidad, quién es el responsable y cómo ejercer tus derechos.' },
  '/politica-de-cookies/': { titulo: 'Política de cookies', descripcion: 'Política de cookies de Playa Sanxenxo: qué cookies usa la web, para qué sirven y cómo puedes aceptarlas, rechazarlas o borrarlas.' },
  '/terminos-y-condiciones/': { titulo: 'Términos y condiciones', descripcion: 'Términos y condiciones de uso de Playa Sanxenxo: qué ofrece la guía, cómo contactar con la agencia y límites de responsabilidad.' },
};

const recorta = (s: string, max: number) => (s.length <= max ? s : `${s.slice(0, max - 1).replace(/\s+\S*$/, '')}…`);

export function paraRuta(ruta: string): Par | null {
  if (SEO[ruta]) return SEO[ruta];
  const r = buscarRuta(ruta);
  if (r) return { titulo: r.titulo, descripcion: r.descripcion ?? `${r.titulo}. Guía de disfrute de Sanxenxo para despedidas.` };
  const b = ruta.match(/^\/blog\/([^/]+)\/$/);
  if (b) {
    const e = getEntrada(b[1]);
    if (e) return { titulo: e.seo, descripcion: e.descripcion || `${e.titulo}. Blog de Playa Sanxenxo.` };
  }
  let m = ruta.match(/^\/comer\/restaurantes\/([^/]+)\/$/);
  if (m) {
    const l = getLocales('restaurantes').find((x) => x.slug === m![1]);
    if (l) return { titulo: `${l.nombre}: restaurante en ${l.municipio ?? 'Sanxenxo'}`, descripcion: l.como_es ? (l.como_es.length < 90 ? `${l.como_es} Qué se come, dónde está y cómo reservar.` : l.como_es) : `${l.nombre}, restaurante en ${l.municipio ?? 'Sanxenxo'}: qué se come, dónde está y si admite grupos y despedidas.` };
  }
  m = ruta.match(/^\/diversion\/[^/]+\/([^/]+)\/$/);
  if (m) {
    const l = getLocales('diversion').find((x) => x.slug === m![1]);
    if (l) return { titulo: `${l.nombre} en Sanxenxo`, descripcion: l.como_es ? (l.como_es.length < 90 ? `${l.como_es} Cómo es y dónde está.` : l.como_es) : `${l.nombre} en Sanxenxo: cómo es, qué se bebe y si admite grupos y despedidas.` };
  }
  return null;
}

/** Metadatos de una página: título, descripción, canónica y Open Graph. `ruta` con barra inicial y final. */
export function metaRuta(ruta: string): Metadata {
  const p = paraRuta(ruta);
  const titulo = p ? recorta(p.titulo, 43) : undefined;
  const descripcion = p ? recorta(p.descripcion.replace(/\s+/g, ' ').trim(), 155) : undefined;
  const url = `${SITIO}${ruta}`;
  const imagen = { url: `${SITIO}/og-playa-sanxenxo.jpg`, width: 1200, height: 630, alt: 'Playa Sanxenxo, guía de disfrute de Sanxenxo para despedidas' };
  return {
    ...(ruta === '/' ? { title: { absolute: 'Playa Sanxenxo · Guía de disfrute de Sanxenxo para despedidas' } } : titulo ? { title: titulo } : {}),
    ...(descripcion ? { description: descripcion } : {}),
    alternates: { canonical: ruta },
    openGraph: { type: 'website', locale: 'es_ES', siteName: 'Playa Sanxenxo', url, title: titulo ? `${titulo} · Playa Sanxenxo` : 'Playa Sanxenxo', ...(descripcion ? { description: descripcion } : {}), images: [imagen] },
    twitter: { card: 'summary_large_image', ...(titulo ? { title: `${titulo} · Playa Sanxenxo` } : {}), ...(descripcion ? { description: descripcion } : {}), images: [imagen.url] },
  };
}
