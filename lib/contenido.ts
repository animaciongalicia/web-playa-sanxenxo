// Textos largos en Markdown, leídos EN BUILD con gray-matter + remark (nunca next-mdx-remote en runtime).
// contenido/<idioma>/<ruta sin barras finales>.md  →  /paraisos/playas/sanxenxo/ = contenido/es/paraisos/playas/sanxenxo.md
//                                                       /  = contenido/es/index.md
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { modoRevision } from './datos';

export type MetaContenido = {
  /** true = se publica. null/ausente = borrador: solo sale en la vista previa (modo revisión). false = nunca. */
  publicar: boolean | null;
  /** Fuentes (URL o descripción) de los datos del texto. Obligatorio en todo borrador. */
  fuentes: string[];
  /** Lo que Pablo debe confirmar o aportar antes de publicar. */
  pendiente: string[];
};

export type Contenido = { html: string; meta: MetaContenido; palabras: number };

export const rutaAArchivo = (lang: string, ruta: string) => {
  const limpia = ruta.replace(/^\/|\/$/g, '');
  return join(process.cwd(), 'contenido', lang, (limpia || 'index') + '.md');
};

export const contarPalabras = (texto: string) => (texto.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? []).length;

export function getContenido(lang: string, ruta: string): Contenido | null {
  const archivo = rutaAArchivo(lang, ruta);
  if (!existsSync(archivo)) return null;
  const { data, content } = matter(readFileSync(archivo, 'utf8'));
  const meta: MetaContenido = {
    publicar: typeof data.publicar === 'boolean' ? data.publicar : null,
    fuentes: Array.isArray(data.fuentes) ? data.fuentes.map(String) : [],
    pendiente: Array.isArray(data.pendiente) ? data.pendiente.map(String) : [],
  };
  if (meta.publicar === false) return null;
  if (meta.publicar === null && !modoRevision()) return null;
  const salida = remark().use(html, { sanitize: false }).processSync(content).toString();
  return { html: salida, meta, palabras: contarPalabras(content) };
}
