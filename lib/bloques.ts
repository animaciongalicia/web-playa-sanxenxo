// Convierte un texto Markdown en bloques ordenados para maquetar (se hace EN BUILD):
// - lo que va antes del primer "##" es la entradilla;
// - cada "##" es un bloque con título;
// - dentro: párrafos (texto), listas con "**Titulo.** texto" (tarjetas), listas numeradas (pasos).
import { existsSync, readFileSync } from 'node:fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { rutaAArchivo } from './contenido';

type Nodo = { type: string; depth?: number; ordered?: boolean; value?: string; children?: Nodo[] };

const proc = remark().use(html, { sanitize: false });
const aHtml = (hijos: Nodo[]) => proc.stringify({ type: 'root', children: hijos } as never).toString().trim();
const aTexto = (n: Nodo): string => (n.value ?? '') + (n.children ?? []).map(aTexto).join('');

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export type Item = { titulo: string | null; html: string };
export type Pieza =
  | { tipo: 'texto'; html: string }
  | { tipo: 'tarjetas'; items: Item[] }
  | { tipo: 'pasos'; items: Item[] }
  | { tipo: 'lista'; html: string };
export type Bloque = { titulo: string; id: string; piezas: Pieza[] };
export type Bloques = { intro: string; bloques: Bloque[]; legal: boolean };

function item(li: Nodo): Item {
  const hijos = li.children ?? [];
  const p = hijos[0];
  if (p?.type === 'paragraph' && p.children?.[0]?.type === 'strong') {
    const titulo = aTexto(p.children[0]).replace(/[.:]\s*$/, '');
    const resto = p.children.slice(1).map((c) => ({ ...c }));
    if (resto[0]?.type === 'text') resto[0].value = (resto[0].value ?? '').replace(/^[.:]\s*/, '');
    const cuerpo = [{ type: 'paragraph', children: resto }, ...hijos.slice(1)];
    return { titulo, html: aHtml(cuerpo) };
  }
  return { titulo: null, html: aHtml(hijos) };
}

function piezaDeLista(l: Nodo): Pieza {
  const items = (l.children ?? []).map(item);
  const conTitulo = items.every((i) => i.titulo);
  if (l.ordered && items.length >= 2) return { tipo: 'pasos', items };
  if (!l.ordered && conTitulo && items.length >= 2) return { tipo: 'tarjetas', items };
  return { tipo: 'lista', html: aHtml([l]) };
}

export function getBloques(lang: string, ruta: string): Bloques | null {
  const archivo = rutaAArchivo(lang, ruta);
  if (!existsSync(archivo)) return null;
  const { data, content } = matter(readFileSync(archivo, 'utf8'));
  if (data.publicar === false) return null;
  const tree = proc.parse(content) as unknown as Nodo;
  const intro: Nodo[] = [];
  const bloques: Bloque[] = [];
  let actual: { titulo: string; nodos: Nodo[] } | null = null;
  const cerrar = () => {
    if (!actual) return;
    const piezas: Pieza[] = [];
    let parrafos: Nodo[] = [];
    const vaciar = () => { if (parrafos.length) piezas.push({ tipo: 'texto', html: aHtml(parrafos) }); parrafos = []; };
    for (const n of actual.nodos) {
      if (n.type === 'list') { vaciar(); piezas.push(piezaDeLista(n)); } else parrafos.push(n);
    }
    vaciar();
    bloques.push({ titulo: actual.titulo, id: slugify(actual.titulo), piezas });
    actual = null;
  };
  for (const n of tree.children ?? []) {
    if (n.type === 'heading' && n.depth === 2) { cerrar(); actual = { titulo: aTexto(n), nodos: [] }; }
    else if (actual) actual.nodos.push(n);
    else intro.push(n);
  }
  cerrar();
  return { intro: intro.length ? aHtml(intro) : '', bloques, legal: data.legal === true };
}
