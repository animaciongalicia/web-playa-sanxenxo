// Datos estructurados (docs/06): solo en fichas verificadas y con datos reales.
import type { Destino, Local } from './esquemas';
import { getContacto } from './contacto';
import { SITIO } from './sitio';

export const organizacion = () => {
  const c = getContacto();
  return {
    '@type': 'Organization',
    name: 'Playa Sanxenxo',
    url: `${SITIO}/`,
    logo: `${SITIO}/img/logo-playa-sanxenxo.svg`,
    ...(c.email || c.telefono
      ? { contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['es', 'pt'], ...(c.email ? { email: c.email } : {}), ...(c.telefono ? { telephone: `+${c.telefono.replace(/\D/g, '')}` } : {}) } }
      : {}),
  };
};

export const sitioWeb = () => ({ '@type': 'WebSite', name: 'Playa Sanxenxo', url: `${SITIO}/`, inLanguage: 'es' });

/** Restaurant / BarOrPub solo si la ficha está verificada. */
export function jsonLdLocal(l: Local, ruta: string): Record<string, unknown> | null {
  if (!l.verificado) return null;
  const tipo = l.tipo === 'copas' || l.tipo === 'discoteca' || l.tipo === 'terraza' ? 'BarOrPub' : l.tipo === 'furancho' || l.tipo === 'chiringuito' ? 'FoodEstablishment' : 'Restaurant';
  return {
    '@type': tipo,
    name: l.nombre,
    url: `${SITIO}${ruta}`,
    ...(l.como_es ? { description: l.como_es } : {}),
    ...(l.direccion ? { address: { '@type': 'PostalAddress', streetAddress: l.direccion, addressLocality: l.municipio ?? 'Sanxenxo', addressCountry: 'ES' } } : {}),
    ...(l.contacto.telefono ? { telephone: l.contacto.telefono } : {}),
  };
}

/** TouristAttraction para destinos de mar verificados. */
export function jsonLdDestino(d: Destino, nombre: string, ruta: string): Record<string, unknown> | null {
  if (!d.verificado) return null;
  return { '@type': 'TouristAttraction', name: nombre, url: `${SITIO}${ruta}`, ...(d.descripcion ? { description: d.descripcion } : {}) };
}
