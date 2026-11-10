// npm run check:contenido
// Revisa contenido/**/*.md: palabras, fuentes, pendientes y reglas de estilo (CLAUDE.md).
// Falla si hay una frase prohibida o un borrador sin fuentes. Las palabras por debajo del objetivo son aviso.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import matter from 'gray-matter';
import { contarPalabras } from '../lib/contenido';

const RAIZ = join(process.cwd(), 'contenido');
const OBJETIVO = Number(process.env.OBJETIVO_PALABRAS ?? 500);

// Reglas de voz y de negocio. Se buscan en el cuerpo del texto.
const PROHIBIDO: [RegExp, string][] = [
  [/\bnosotros\b|\bnuestro equipo\b|\bnuestros?\b/i, '"nosotros / nuestro": la voz es tú, nunca nosotros'],
  [/\bno admite despedidas\b|\bno aceptan despedidas\b|\bno se admiten despedidas en (?!julio|agosto)/i, 'nunca "no admite despedidas" sobre un local con nombre'],
  [/\b(estamos|tenemos|contamos|explicamos|organizamos|hacemos|recomendamos|disponemos|trabajamos|podemos|ayudamos|queremos|creemos|sabemos|damos|ponemos|encontramos|proponemos|analizamos|dise[ñn]amos|ofrecemos|preparamos|cuidamos|garantizamos|te lo contamos)\b/i, 'verbo en "nosotros": usa tú o impersonal'],
  [/\b(incre[ií]ble|[uú]nic[oa]s?|espectacular(es)?|inolvidables?|paradis[ií]aco)\b/i, 'adjetivo vacío'],
  [/\breserva ya\b|\búltimas plazas\b|\bno te lo pierdas\b|\boferta\b/i, 'tono de venta: informar, no empujar'],
  [/\bsuscr[ií]bete\b|\bnewsletter\b|\bdescarga(ble)? (la )?gu[ií]a\b|\bformulario\b/i, 'captación o formulario: no hay'],
  [/parladoiro/i, 'nombre original de A Vichona: no se escribe'],
];

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? archivos(p) : p.endsWith('.md') ? [p] : [];
  });
}

const errores: string[] = [];
const avisos: string[] = [];
const filas: { ruta: string; pal: number; estado: string }[] = [];
let total = 0;
for (const f of archivos(RAIZ).sort()) {
  const { data, content } = matter(readFileSync(f, 'utf8'));
  const ruta = relative(RAIZ, f);
  const pal = contarPalabras(content);
  total += pal;
  const estado = data.publicar === true ? 'publicar' : data.publicar === false ? 'oculto' : 'borrador';
  filas.push({ ruta, pal, estado });
  const fuentes = Array.isArray(data.fuentes) ? data.fuentes : [];
  if (!fuentes.length && !data.propio) errores.push(`${ruta}: sin "fuentes" (o "propio: true" si lo escribe Pablo)`);
  const objetivo = Number(data.objetivo ?? OBJETIVO);
  if (pal < objetivo) avisos.push(`${ruta}: ${pal} palabras (objetivo ${objetivo})`);
  for (const [re, msg] of PROHIBIDO) {
    if (data.legal === true && !/parladoiro/i.test(re.source)) continue; // texto jurídico: no aplican las reglas de voz
    const m = content.match(re);
    if (m) errores.push(`${ruta}: ${msg} → "${m[0]}"`);
  }
}
console.log(`Archivos: ${filas.length} · palabras totales: ${total}\n`);
for (const f of filas) console.log(`${String(f.pal).padStart(5)}  ${f.estado.padEnd(8)} ${f.ruta}`);
if (avisos.length) console.log(`\n⚠ ${avisos.length} por debajo del objetivo (${OBJETIVO}):\n` + avisos.map((a) => '  - ' + a).join('\n'));
if (errores.length) { console.error(`\n✗ ${errores.length} error(es):\n` + errores.map((e) => '  - ' + e).join('\n')); process.exit(1); }
console.log('\n✓ check:contenido correcto');
