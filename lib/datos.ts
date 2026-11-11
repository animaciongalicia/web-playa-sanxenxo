// Lectura de datos para las páginas. Reglas de docs/03 ("Qué se muestra en producción"):
// - Solo se publica lo que tiene publicar === true.
// - En producción no salen teléfonos sin verificar, ni notas_internas, decision_pendiente o datos_fuente.
// - Los campos null no se pintan (lo decide cada componente; aquí nunca se rellenan).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ArchivoActividades, ArchivoLocales, ArchivoMar, ArchivoPlayas, ArchivoServicios,
  type Actividad, type Barco, type Destino, type Local, type Mes, type Playa, type Servicio, type Traslado,
} from './esquemas';

const enProduccion = () => process.env.NODE_ENV === 'production';

function cargar<T>(archivo: string, esquema: { parse: (x: unknown) => T }): T {
  return esquema.parse(JSON.parse(readFileSync(join(process.cwd(), 'data', archivo), 'utf8')));
}

type Control = { publicar: boolean | null };

/** Se publica todo salvo lo marcado publicar === false (ocultar una ficha a propósito). */
const publicados = <T extends Control>(fichas: T[]): T[] => fichas.filter((f) => f.publicar !== false);

/** Notas operativas que sí se enseñan en la ficha (el resto son avisos internos de trabajo). */
export const notasVisibles = (a: { notas_operativas: string[] }): string[] =>
  a.notas_operativas.filter((n) => /tiempo se reparte|Mínimo de diez|desembarco en Areoso/i.test(n));

/** Quita lo interno de una ficha cuando se sirve en producción. */
function limpiar<T extends { notas_internas: string | null; datos_fuente: string[] }>(ficha: T): T {
  if (!enProduccion()) return ficha;
  const copia = { ...ficha, notas_internas: null, datos_fuente: [] } as T & { decision_pendiente?: string | null };
  if ('decision_pendiente' in copia) copia.decision_pendiente = null;
  return copia;
}

function limpiarLocal(l: Local): Local {
  const x = limpiar(l);
  // Decisión de Pablo: no se publica NINGÚN teléfono de locales, ni verificado. Se reserva a través de la agencia.
  return { ...x, contacto: { ...x.contacto, telefono: null } };
}

export function getPlayas(): Playa[] {
  return publicados(cargar('playas.json', ArchivoPlayas).playas).map(limpiar);
}

export type ListaLocales = 'restaurantes' | 'chiringuitos' | 'furanchos' | 'diversion';
export function getLocales(lista: ListaLocales): Local[] {
  return publicados(cargar('locales.json', ArchivoLocales)[lista]).map(limpiarLocal);
}

export function getActividades(): Actividad[] {
  return publicados(cargar('actividades.json', ArchivoActividades).actividades).map(limpiar);
}

export function getDestinos(): Destino[] {
  return publicados(cargar('mar-y-barcos.json', ArchivoMar).destinos).map(limpiar);
}
export function getBarcos(): Barco[] {
  return publicados(cargar('mar-y-barcos.json', ArchivoMar).barcos).map(limpiar);
}
export function getTraslados(): Traslado[] {
  return publicados(cargar('mar-y-barcos.json', ArchivoMar).traslados).map(limpiar);
}

export function getMeses(): Mes[] {
  return publicados(cargar('servicios-y-meses.json', ArchivoServicios).meses).map(limpiar);
}
export function getServicio(id: Servicio['id']): Servicio | undefined {
  return publicados(cargar('servicios-y-meses.json', ArchivoServicios).servicios)
    .map(limpiar)
    .find((s) => s.id === id);
}

/** Exportación para /api/fichas-export: todas las fichas con su estado de verificación (sin contenido interno). */
export function getResumenFichas() {
  const l = cargar('locales.json', ArchivoLocales);
  const mar = cargar('mar-y-barcos.json', ArchivoMar);
  const mapear = (coleccion: string, fichas: { id: string; publicar: boolean | null; verificado: boolean; ultima_verificacion: string | null }[]) =>
    fichas.map((f) => ({ coleccion, id: f.id, publicar: f.publicar, verificado: f.verificado, ultima_verificacion: f.ultima_verificacion }));
  return [
    ...mapear('playas', cargar('playas.json', ArchivoPlayas).playas),
    ...mapear('restaurantes', l.restaurantes),
    ...mapear('chiringuitos', l.chiringuitos),
    ...mapear('furanchos', l.furanchos),
    ...mapear('diversion', l.diversion),
    ...mapear('actividades', cargar('actividades.json', ArchivoActividades).actividades),
    ...mapear('destinos', mar.destinos),
    ...mapear('barcos', mar.barcos),
    ...mapear('traslados', mar.traslados),
  ];
}
