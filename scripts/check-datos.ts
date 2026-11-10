// npm run check:datos [-- --informe]
// Valida data/*.json contra los esquemas, detecta slugs duplicados y referencias rotas,
// y avisa de fichas sin verificar o con más de 12 meses desde la última verificación.
// Los errores (esquema, duplicados, referencias) hacen fallar el comando. Los avisos no.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ZodError } from 'zod';
import {
  ArchivoActividades, ArchivoLocales, ArchivoMar, ArchivoPlayas, ArchivoServicios,
  type Local,
} from '../lib/esquemas';

const informe = process.argv.includes('--informe');
const errores: string[] = [];
const avisos: string[] = [];

function leer<T>(archivo: string, esquema: { parse: (x: unknown) => T }): T | null {
  try {
    return esquema.parse(JSON.parse(readFileSync(join(process.cwd(), 'data', archivo), 'utf8')));
  } catch (e) {
    if (e instanceof ZodError) {
      for (const i of e.issues.slice(0, 25)) errores.push(`${archivo}: ${i.path.join('.')} → ${i.message}`);
      if (e.issues.length > 25) errores.push(`${archivo}: …y ${e.issues.length - 25} errores más`);
    } else {
      errores.push(`${archivo}: ${(e as Error).message}`);
    }
    return null;
  }
}

const playas = leer('playas.json', ArchivoPlayas);
const locales = leer('locales.json', ArchivoLocales);
const actividades = leer('actividades.json', ArchivoActividades);
const mar = leer('mar-y-barcos.json', ArchivoMar);
const servicios = leer('servicios-y-meses.json', ArchivoServicios);

type Ficha = { id: string; slug?: string; publicar: boolean | null; verificado: boolean; ultima_verificacion: string | null };
const todas: { archivo: string; coleccion: string; fichas: Ficha[] }[] = [];

function duplicados(nombre: string, claves: string[]) {
  const vistos = new Set<string>();
  for (const k of claves) {
    if (vistos.has(k)) errores.push(`${nombre}: duplicado "${k}"`);
    vistos.add(k);
  }
}

if (playas) {
  todas.push({ archivo: 'playas.json', coleccion: 'playas', fichas: playas.playas });
  duplicados('playas.id', playas.playas.map((p) => p.id));
  duplicados('playas.slug', playas.playas.map((p) => p.slug));
}

const idsLocales = new Set<string>();
if (locales) {
  // Los locales se identifican por id en TODAS las listas: una sola ficha por local.
  const listas: [string, Local[]][] = [
    ['restaurantes', locales.restaurantes], ['alta_cocina', locales.alta_cocina], ['reserva', locales.reserva],
    ['candidatos', locales.candidatos], ['chiringuitos', locales.chiringuitos],
    ['furanchos', locales.furanchos], ['diversion', locales.diversion],
  ];
  const todosLocales = listas.flatMap(([, l]) => l);
  for (const [nombre, l] of listas) todas.push({ archivo: 'locales.json', coleccion: nombre, fichas: l });
  duplicados('locales.id', todosLocales.map((l) => l.id));
  for (const l of todosLocales) idsLocales.add(l.id);
  // slug único por tipo de lista (la URL depende del tipo)
  for (const [nombre, l] of listas) duplicados(`locales.${nombre}.slug`, l.map((x) => x.slug));

  // tambien_en = nombres de lista. Si dice "diversion", debe haber una entrada en diversion_referencias, y al revés.
  const refsDiversion = new Set(locales.diversion_referencias.map((r) => r.ref));
  for (const r of locales.diversion_referencias)
    if (!idsLocales.has(r.ref)) errores.push(`locales.diversion_referencias: "${r.ref}" no existe`);
  for (const l of todosLocales) {
    if (l.tambien_en.includes('diversion') && !refsDiversion.has(l.id))
      errores.push(`locales: "${l.id}".tambien_en incluye "diversion" pero no está en diversion_referencias`);
    if (refsDiversion.has(l.id) && !l.tambien_en.includes('diversion'))
      errores.push(`locales: "${l.id}" está en diversion_referencias pero su tambien_en no incluye "diversion"`);
  }

  for (const l of todosLocales)
    if (l.publicar === true && l.zona === 'por-definir')
      avisos.push(`"${l.id}" está publicada con zona "por-definir": Pablo debe aportar la dirección`);

  // Regla 5 de CLAUDE.md: la línea de despedidas solo se publica con si / segun-epoca.
  for (const l of todosLocales)
    if (l.despedidas.admite === 'no' && l.publicar === true)
      avisos.push(`"${l.id}" admite=no y publicar=true: no se publicará la línea de despedidas (va a /cuando-ir/#condiciones agregado)`);
}

if (actividades) {
  todas.push({ archivo: 'actividades.json', coleccion: 'actividades', fichas: actividades.actividades });
  duplicados('actividades.id', actividades.actividades.map((a) => a.id));
  duplicados('actividades.slug', actividades.actividades.map((a) => a.slug));
}

if (mar) {
  todas.push({ archivo: 'mar-y-barcos.json', coleccion: 'destinos', fichas: mar.destinos });
  todas.push({ archivo: 'mar-y-barcos.json', coleccion: 'barcos', fichas: mar.barcos });
  todas.push({ archivo: 'mar-y-barcos.json', coleccion: 'traslados', fichas: mar.traslados });
  duplicados('barcos.id', mar.barcos.map((b) => b.id));
  const idsPlayas = new Set(playas?.playas.map((p) => p.id) ?? []);
  const idsDestinos = new Set(mar.destinos.map((d) => d.id));
  for (const d of mar.destinos)
    for (const p of d.playas) if (playas && !idsPlayas.has(p)) errores.push(`destinos: "${d.id}".playas apunta a "${p}", que no existe`);
  for (const t of mar.traslados) if (!idsDestinos.has(t.destino)) errores.push(`traslados: "${t.id}" apunta al destino "${t.destino}", que no existe`);
}

if (servicios) {
  todas.push({ archivo: 'servicios-y-meses.json', coleccion: 'servicios', fichas: servicios.servicios });
  todas.push({ archivo: 'servicios-y-meses.json', coleccion: 'meses', fichas: servicios.meses });
  duplicados('meses.id', servicios.meses.map((m) => m.id));
  if (servicios.meses.length !== 6) errores.push(`meses: se esperaban 6 y hay ${servicios.meses.length}`);
}

// Caducidad: verificado=true con más de 12 meses → aviso. Sin verificar → recuento.
const hoy = new Date();
const limite = new Date(hoy);
limite.setFullYear(limite.getFullYear() - 1);
const caducadas: string[] = [];
let sinVerificar = 0;
let total = 0;
for (const { coleccion, fichas } of todas) {
  for (const f of fichas) {
    total++;
    if (!f.verificado) {
      sinVerificar++;
      // Los servicios de pie salen publicar=true por decisión de Pablo (con nota 2027): no es un aviso.
      if (f.publicar === true && coleccion !== 'servicios') avisos.push(`${coleccion}/${f.id}: publicar=true pero verificado=false`);
      continue;
    }
    if (!f.ultima_verificacion) errores.push(`${coleccion}/${f.id}: verificado=true sin ultima_verificacion`);
    else if (new Date(f.ultima_verificacion) < limite) caducadas.push(`${coleccion}/${f.id} (${f.ultima_verificacion})`);
  }
}
for (const c of caducadas) avisos.push(`Caducada (más de 12 meses): ${c}`);

if (informe) {
  console.log('# Revisar fichas de locales (temporada)\n');
  console.log(`Fichas totales: ${total}. Sin verificar: ${sinVerificar}. Caducadas (>12 meses): ${caducadas.length}.\n`);
  console.log(caducadas.length ? caducadas.map((c) => `- [ ] ${c}`).join('\n') : '_Ninguna ficha caducada._');
  console.log('\nRevisa también los furanchos de temporada (abren de diciembre a junio aprox.) y los cupos de Ons y Cíes.');
  process.exit(0);
}

console.log(`Fichas: ${total} · sin verificar: ${sinVerificar} · caducadas: ${caducadas.length}`);
if (avisos.length) {
  console.log(`\n⚠ ${avisos.length} aviso(s):`);
  for (const a of avisos.slice(0, 40)) console.log('  - ' + a);
  if (avisos.length > 40) console.log(`  …y ${avisos.length - 40} más`);
}
if (errores.length) {
  console.error(`\n✗ ${errores.length} error(es):`);
  for (const e of errores) console.error('  - ' + e);
  process.exit(1);
}
console.log('\n✓ check:datos correcto');
