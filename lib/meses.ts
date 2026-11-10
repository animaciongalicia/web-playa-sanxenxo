import type { Mes } from './esquemas';

export const MESES: { id: Mes['id']; titulo: string }[] = [
  { id: 'mayo', titulo: 'Mayo' }, { id: 'junio', titulo: 'Junio' }, { id: 'julio', titulo: 'Julio' },
  { id: 'agosto', titulo: 'Agosto' }, { id: 'septiembre', titulo: 'Septiembre' }, { id: 'resto-del-ano', titulo: 'Resto del año' },
];

/** Etiquetas de los campos del esquema Mes (docs/02). Solo se pintan los que no son null. */
export const CAMPOS_MES: { campo: Exclude<keyof Mes, 'id' | 'publicar' | 'verificado' | 'ultima_verificacion' | 'origen' | 'datos_fuente' | 'notas_internas'>; titulo: string }[] = [
  { campo: 'ambiente', titulo: 'Ambiente' },
  { campo: 'abre_y_cierra', titulo: 'Qué abre y qué cierra' },
  { campo: 'despedidas', titulo: 'Despedidas' },
  { campo: 'cupos_ons_cies', titulo: 'Cupos de Ons y Cíes' },
  { campo: 'mar_y_playa', titulo: 'Mar y playa' },
  { campo: 'recomendacion', titulo: 'Qué recomiendo este mes' },
];
