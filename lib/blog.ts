// Blog: un archivo Markdown por entrada en contenido/es/blog/<slug>.md (se lee EN BUILD, como el resto de textos).
// Cabecera (front matter): titulo, fecha (AAAA-MM-DD), descripcion, imagen (nombre en public/img, opcional), publicar (false = borrador).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const DIR = join(process.cwd(), 'contenido', 'es', 'blog');

export type Entrada = { slug: string; titulo: string; fecha: string; descripcion: string; imagen: string | null };

function leer(slug: string) {
  const archivo = join(DIR, `${slug}.md`);
  if (!existsSync(archivo)) return null;
  const { data, content } = matter(readFileSync(archivo, 'utf8'));
  if (data.publicar === false || !data.titulo) return null;
  const fecha = data.fecha instanceof Date ? data.fecha.toISOString().slice(0, 10) : String(data.fecha ?? '');
  const entrada: Entrada = { slug, titulo: String(data.titulo), fecha, descripcion: String(data.descripcion ?? ''), imagen: data.imagen ? String(data.imagen) : null };
  return { entrada, contenido: content };
}

/** Entradas publicadas, la más reciente primero. */
export function getEntradas(): Entrada[] {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => leer(f.replace(/\.md$/, ''))?.entrada)
    .filter((e): e is Entrada => !!e)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function getEntrada(slug: string): (Entrada & { html: string }) | null {
  const l = leer(slug);
  if (!l) return null;
  return { ...l.entrada, html: remark().use(html, { sanitize: false }).processSync(l.contenido).toString() };
}

export const fechaLarga = (iso: string) => {
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime()) ? iso : new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
};
