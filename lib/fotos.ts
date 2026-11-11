// Fotos por nombre: si existe public/img/<clave>.(jpg|jpeg|webp|png|avif) se usa; si no, hay un degradado de marca.
// Así Pablo sube fotos con el nombre correcto (ver public/img/LEEME.md) y salen solas, sin tocar código.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'public', 'img');
const EXT = ['jpg', 'jpeg', 'webp', 'png', 'avif'];

/** Claves que reutilizan la foto de otra (para no duplicar archivos). */
const ALIAS: Record<string, string> = {
  'diversion-portonovo': 'playas-portonovo',
  'diversion-a-lanzada-san-vicente': 'cuando-ir',
  'diversion-o-grove': 'playas-o-grove-san-vicente',
  'actividad-kayak': 'kayak-areoso',
  'actividad-big-sup': 'playa-y-tabla',
  'actividad-reto-de-big-sup': 'playa-y-tabla',
  'actividad-ruta-en-kayak-con-picnic': 'actividad-kayak-en-areoso',
  'actividad-ruta-de-bateas-con-mejillones-y-vino': 'mar-y-mesa',
  'actividad-olimpiadas-de-playa': 'dias-a-medida',
  'actividad-barco-privado-con-fondeo-bano-y-paddle': 'despedidas',
};

const buscar = (c: string) => {
  for (const e of EXT) if (existsSync(join(DIR, `${c}.${e}`))) return `/img/${c}.${e}`;
  return null;
};

/** Devuelve la ruta pública de la primera foto que exista entre las claves dadas, o null. */
export function foto(...claves: (string | null | undefined)[]): string | null {
  for (const c of claves) {
    if (!c) continue;
    const f = buscar(c) ?? (ALIAS[c] ? buscar(ALIAS[c]) : null);
    if (f) return f;
  }
  return null;
}

/** Punto de enfoque de cada foto en las portadas (object-position). Lo que no está aquí, centrado un poco hacia arriba. */
export const FOCO: Record<string, string> = {
  'playas-sanxenxo': '50% 62%',
  despedidas: '50% 18%',
  'dias-a-medida': '50% 18%',
  soltera: '50% 38%',
  soltero: '50% 58%',
  mar: '50% 62%',
  agencia: '50% 58%',
  'mar-con-motor': '50% 55%',
  'kayak-areoso': '50% 45%',
  actividades: '50% 45%',
  limusinas: '50% 60%',
  restaurantes: '50% 45%',
};
export const focoDe = (src: string | null): string => {
  const clave = src ? src.replace(/^\/img\//, '').replace(/\.[a-z]+$/, '') : '';
  return FOCO[clave] ?? '50% 40%';
};

/** Claves candidatas para el hero de una ruta, de más específica a más general.
 *  /paraisos/playas/sanxenxo/ → playas-sanxenxo, sanxenxo, playas, paraisos
 *  /diversion/sanxenxo-puerto/buddha/ → sanxenxo-puerto-buddha, buddha, diversion */
export function clavesDeRuta(ruta: string): string[] {
  const s = ruta.split('/').filter(Boolean);
  if (!s.length) return ['home-hero'];
  const out: string[] = [];
  if (s.length >= 2) out.push(s.slice(-2).join('-'));
  out.push(s[s.length - 1]);
  if (s[0] === 'paraisos' && s[1]) out.push(s[1]);
  out.push(s[0]);
  return [...new Set(out)];
}

export const fotoDeRuta = (ruta: string) => foto(...clavesDeRuta(ruta));
