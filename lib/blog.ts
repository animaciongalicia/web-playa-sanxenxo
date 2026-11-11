// Blog: un archivo Markdown por entrada en contenido/es/blog/<slug>.md (se lee EN BUILD, como el resto de textos).
// Cabecera (front matter): titulo, fecha (AAAA-MM-DD), descripcion, imagen (nombre en public/img, opcional), publicar (false = borrador).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

/** Fecha de hoy (ISO). BLOG_HOY permite probar entradas programadas en local. */
const hoyISO = () => process.env.BLOG_HOY ?? new Date().toISOString().slice(0, 10);
const DIR = join(process.cwd(), 'contenido', 'es', 'blog');

export type Entrada = {
  /** Título corto para la pestaña y Google (máx. 43 caracteres). Si falta, se usa `titulo`. */
  seo: string;
  /** Puntos clave que se enseñan arriba (2-4). */
  resumen: string[];
  /** Minutos de lectura (≈ 200 palabras por minuto). */
  minutos: number;
  actualizado: string | null; slug: string; titulo: string; fecha: string; descripcion: string; imagen: string | null; /** Páginas de la guía a las que apunta la entrada (se enlazan desde ellas con el título como texto). */ paginas: string[] };

function leer(slug: string) {
  const archivo = join(DIR, `${slug}.md`);
  if (!existsSync(archivo)) return null;
  const { data, content } = matter(readFileSync(archivo, 'utf8'));
  if (data.publicar === false || !data.titulo) return null;
  const fecha = data.fecha instanceof Date ? data.fecha.toISOString().slice(0, 10) : String(data.fecha ?? '');
  const palabras = (content.match(/[\p{L}\p{N}]+/gu) ?? []).length;
  const iso = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v ? String(v) : null);
  const entrada: Entrada = { slug, seo: String(data.seo ?? data.titulo), resumen: Array.isArray(data.resumen) ? data.resumen.map(String) : [], minutos: Math.max(1, Math.round(palabras / 200)), actualizado: iso(data.actualizado), titulo: String(data.titulo), fecha, descripcion: String(data.descripcion ?? ''), imagen: data.imagen ? String(data.imagen) : null, paginas: Array.isArray(data.paginas) ? data.paginas.map(String) : [] };
  return { entrada, contenido: content };
}

/** Entradas publicadas, la más reciente primero. */
export function getEntradas(): Entrada[] {
  if (!existsSync(DIR)) return [];
  const hoy = hoyISO();
  return readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => leer(f.replace(/\.md$/, ''))?.entrada)
    .filter((e): e is Entrada => !!e)
    // Las entradas con fecha futura quedan programadas: salen cuando se reconstruye la web a partir de esa fecha.
    .filter((e) => e.fecha <= hoy)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

const quitarTildes = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function getEntrada(slug: string): (Entrada & { html: string; indice: { id: string; titulo: string }[] }) | null {
  const l = leer(slug);
  if (!l) return null;
  if (l.entrada.fecha > hoyISO()) return null;
  const indice: { id: string; titulo: string }[] = [];
  const cuerpo = remark().use(gfm).use(html, { sanitize: false }).processSync(l.contenido).toString().replace(/<h2>(.*?)<\/h2>/g, (_m, t: string) => {
    const limpio = t.replace(/<[^>]+>/g, '');
    const id = quitarTildes(limpio);
    indice.push({ id, titulo: limpio });
    return `<h2 id="${id}">${t}</h2>`;
  });
  return { ...l.entrada, html: cuerpo, indice };
}

/** Otras entradas para seguir leyendo: primero las que comparten página de destino, luego las más recientes. */
export function relacionadas(e: Entrada, max = 3): Entrada[] {
  const otras = getEntradas().filter((x) => x.slug !== e.slug);
  const comparte = (x: Entrada) => x.paginas.filter((p) => e.paginas.includes(p)).length;
  return [...otras].sort((a, b) => comparte(b) - comparte(a) || b.fecha.localeCompare(a.fecha)).slice(0, max);
}

export const fechaLarga = (iso: string) => {
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime()) ? iso : new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
};

/** Entradas del blog que apuntan a una página de la guía (para enlazarlas desde ella). */
export const entradasDe = (ruta: string): Entrada[] => getEntradas().filter((e) => e.paginas.includes(ruta));

/** Todas las entradas, también las programadas (para comprobar enlaces entre ellas). */
export const getTodasEntradas = (): Entrada[] => {
  const antes = process.env.BLOG_HOY;
  process.env.BLOG_HOY = '9999-12-31';
  try { return getEntradas(); } finally { if (antes === undefined) delete process.env.BLOG_HOY; else process.env.BLOG_HOY = antes; }
};
