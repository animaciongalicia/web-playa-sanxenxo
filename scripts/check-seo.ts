// Comprobaciones de SEO (Fase 8): redirecciones, páginas retiradas, enlaces internos y metadatos.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SEO } from '../lib/seo';
import { todasLasRutas } from '../lib/sitio';

const rutas = new Set(todasLasRutas());
const errores: string[] = [];
const avisos: string[] = [];
const cfg = JSON.parse(readFileSync(join(process.cwd(), 'data', 'redirecciones.json'), 'utf8')) as { redirecciones: { de: string; a: string }[]; retiradas: string[] };

// 1) Redirecciones: origen único, destino existente, sin cadenas ni bucles.
const origenes = new Set<string>();
for (const r of cfg.redirecciones) {
  if (origenes.has(r.de)) errores.push(`Redirección duplicada: ${r.de}`);
  origenes.add(r.de);
  if (!rutas.has(r.a)) errores.push(`El destino no existe: ${r.de} → ${r.a}`);
  if (rutas.has(r.de)) errores.push(`El origen es una página viva (sería un bucle): ${r.de}`);
  if (!r.de.endsWith('/') || !r.a.endsWith('/')) errores.push(`Falta la barra final: ${r.de} → ${r.a}`);
}
// 2) Retiradas (410): no pueden tapar una página viva ni estar también redirigidas.
for (const g of cfg.retiradas) {
  if ([...rutas].some((r) => r.startsWith(g))) errores.push(`Una página retirada (410) tapa una viva: ${g}`);
  if (origenes.has(g)) errores.push(`Retirada y redirigida a la vez: ${g}`);
}
// 3) Enlaces internos en los textos Markdown: deben existir (o ser redirecciones).
const anclaOk = (r: string) => rutas.has(r) || origenes.has(r);
function md(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? md(p) : p.endsWith('.md') ? [p] : [];
  });
}
for (const f of md(join(process.cwd(), 'contenido', 'es'))) {
  const t = readFileSync(f, 'utf8');
  for (const m of t.matchAll(/\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g)) {
    const destino = m[1].endsWith('/') ? m[1] : `${m[1]}/`;
    if (!anclaOk(destino)) errores.push(`Enlace roto en ${f.replace(process.cwd() + '/', '')}: ${m[1]}`);
  }
}
// 3b) Enlaces internos a las páginas que queremos posicionar: el texto del enlace es de cola larga (3 palabras o más), nunca una palabra suelta.
const DESTINO_CLAVE = new Set(['/despedidas/', '/despedidas/soltero/', '/despedidas/soltera/', '/paraisos/playas/portonovo/', '/barcos/', '/limusinas/', '/actividades/mar-con-motor/', '/humor-amarillo-en-sanxenxo/', '/cuando-ir/']);
const repeticiones = new Map<string, number>();
for (const f of md(join(process.cwd(), 'contenido', 'es'))) {
  const t = readFileSync(f, 'utf8');
  if (/^legal:\s*true/m.test(t)) continue;
  for (const m of t.matchAll(/\[([^\]]+)\]\((\/[^)\s#]*)(#[^)\s]*)?\)/g)) {
    const destino = m[2].endsWith('/') ? m[2] : `${m[2]}/`;
    if (!DESTINO_CLAVE.has(destino)) continue;
    if (m[1].trim().split(/\s+/).length < 3) errores.push(`Enlace corto a una página clave en ${f.replace(process.cwd() + '/', '')}: [${m[1]}](${m[2]}). Usa cola larga (3 palabras o más)`);
    const k = `${destino} · ${m[1].trim().toLowerCase()}`;
    repeticiones.set(k, (repeticiones.get(k) ?? 0) + 1);
  }
}
for (const [k, n] of repeticiones) if (n > 4) avisos.push(`Mismo texto de enlace repetido ${n} veces (varía la redacción): ${k}`);
// 4) Títulos y descripciones: longitud y presencia.
for (const [ruta, p] of Object.entries(SEO)) {
  if (!rutas.has(ruta)) errores.push(`SEO de una ruta que no existe: ${ruta}`);
  if (p.titulo.length > 43) errores.push(`Título largo (${p.titulo.length}>43) en ${ruta}: ${p.titulo}`);
  if (p.descripcion.length > 155) errores.push(`Descripción larga (${p.descripcion.length}>155) en ${ruta}`);
}
for (const r of rutas) if (r !== '/' && !SEO[r] && !/^\/(comer\/restaurantes|diversion\/[^/]+)\/[^/]+\/$/.test(r)) avisos.push(`Sin SEO propio (usa el genérico): ${r}`);
// 4b) Blog: título SEO ≤43, descripción 110-155, cabecera completa.
import { getEntradas } from '../lib/blog';
for (const e of getEntradas()) {
  if (e.seo.length > 43) errores.push(`Blog ${e.slug}: título SEO largo (${e.seo.length}>43): ${e.seo}`);
  if (e.descripcion.length < 110 || e.descripcion.length > 155) errores.push(`Blog ${e.slug}: la descripción mide ${e.descripcion.length} (debe estar entre 110 y 155)`);
  if (e.resumen.length < 2) errores.push(`Blog ${e.slug}: falta el resumen (mínimo 2 puntos)`);
  if (!e.paginas.length) errores.push(`Blog ${e.slug}: no apunta a ninguna página de la guía`);
}
// 5) Imagen Open Graph y favicon.
for (const f of ['public/og-playa-sanxenxo.jpg', 'app/icon.svg']) if (!existsSync(join(process.cwd(), f))) errores.push(`Falta ${f}`);

console.log(`Rutas: ${rutas.size} · redirecciones 301: ${cfg.redirecciones.length} · retiradas 410: ${cfg.retiradas.length}`);
for (const a of avisos) console.log(`  aviso: ${a}`);
if (errores.length) {
  for (const e of errores) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('✓ check:seo correcto');
