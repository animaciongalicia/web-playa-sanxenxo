// Fotos por nombre: si existe public/img/<clave>.(jpg|jpeg|webp|png|avif) se usa; si no, hay un degradado de marca.
// Así Pablo sube fotos con el nombre correcto (ver public/img/LEEME.md) y salen solas, sin tocar código.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'public', 'img');
const EXT = ['jpg', 'jpeg', 'webp', 'png', 'avif'];

/** Devuelve la ruta pública de la primera foto que exista entre las claves dadas, o null. */
export function foto(...claves: (string | null | undefined)[]): string | null {
  for (const c of claves) {
    if (!c) continue;
    for (const e of EXT) if (existsSync(join(DIR, `${c}.${e}`))) return `/img/${c}.${e}`;
  }
  return null;
}

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
