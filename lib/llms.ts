// llms.txt y llms-full.txt: resumen de la guía para asistentes de IA (formato llmstxt.org). Se genera en build desde los mismos textos de la web.
import { existsSync, readFileSync } from 'node:fs';
import matter from 'gray-matter';
import { rutaAArchivo } from './contenido';
import { paraRuta } from './seo';
import { SITIO, todasLasRutas } from './sitio';

const SECCIONES: [string, (r: string) => boolean][] = [
  ['Playas y mar', (r) => r.startsWith('/paraisos/')],
  ['Barcos y traslados', (r) => r.startsWith('/barcos/')],
  ['Actividades', (r) => r.startsWith('/actividades/')],
  ['Dónde comer', (r) => r.startsWith('/comer/')],
  ['Diversión', (r) => r.startsWith('/diversion/')],
  ['Despedidas, época y condiciones', (r) => r.startsWith('/despedidas/') || r === '/despedidas/' || r.startsWith('/cuando-ir/') || r === '/limusinas/' || r === '/humor-amarillo-en-sanxenxo/'],
  ['Blog', (r) => r.startsWith('/blog/')],
];
const LEGALES = ['/aviso-legal/', '/privacidad/', '/politica-de-cookies/', '/terminos-y-condiciones/'];

const RESUMEN = `Playa Sanxenxo es una guía informativa en español para organizar despedidas de soltero y de soltera en Sanxenxo (Pontevedra, Galicia) y alrededores: Portonovo, Noalla, A Lanzada, O Grove, San Vicente do Mar y la ría de Aldán. Reúne playas, mar (Ons, Cíes, ría de Aldán), barcos, actividades, dónde comer, diversión y consejos de época. La venta se hace en una única página: https://www.despedidasplayasanxenxo.com/agencia/ (contacto por correo, WhatsApp o teléfono; no hay formularios).`;

const HECHOS = [
  'Temporada fuerte: del 20 de junio al 29 o 30 de agosto. Julio y agosto son los meses con más despedidas: conviene reservar con antelación.',
  'Mayo y septiembre son meses flojos; la primera quincena de junio es el calentamiento; de octubre a abril el pueblo está casi cerrado.',
  'Ons y Cíes requieren autorización gratuita de la Xunta en Semana Santa y del 15 de mayo al 15 de septiembre. En barco privado, el permiso de fondeo lo solicita el patrón.',
  'Ons: aproximadamente 1 hora de ida y otra de vuelta desde Combarro, Sanxenxo o Portonovo. Cíes: unos 90 minutos de ida y otros 90 de vuelta desde la ría de Pontevedra.',
  'Los barcos se alquilan por 4 horas (medio día) u 8 horas (día entero); el precio incluye barco, seguros y patrón (en veleros, también combustible).',
  'Las despedidas se aceptan en los locales; lo que no permiten son los disfraces.',
  'Menús de grupo desde unos 25 € por persona y mariscadas de unos 50 € por persona.',
];

function filas() {
  return todasLasRutas().filter((r) => r !== '/' && !LEGALES.includes(r)).map((r) => ({ ruta: r, p: paraRuta(r) })).filter((x) => x.p);
}

export function llmsTxt(): string {
  const out = ['# Playa Sanxenxo', '', `> ${RESUMEN}`, '', '## Datos clave', '', ...HECHOS.map((h) => `- ${h}`), ''];
  const usadas = new Set<string>();
  for (const [titulo, f] of SECCIONES) {
    const items = filas().filter((x) => f(x.ruta) && !usadas.has(x.ruta));
    if (!items.length) continue;
    out.push(`## ${titulo}`, '');
    for (const x of items) { usadas.add(x.ruta); out.push(`- [${x.p!.titulo}](${SITIO}${x.ruta}): ${x.p!.descripcion}`); }
    out.push('');
  }
  out.push('## Contacto', '', `- [Agencia](${SITIO}/agencia/): correo, WhatsApp y llamada.`, '', '## Opcional', '', `- [Texto completo de la guía](${SITIO}/llms-full.txt)`, '');
  return out.join('\n');
}

export function llmsFull(): string {
  const out = ['# Playa Sanxenxo: texto completo', '', `> ${RESUMEN}`, ''];
  for (const x of [{ ruta: '/', p: paraRuta('/') }, ...filas()]) {
    const archivo = rutaAArchivo('es', x.ruta);
    if (!existsSync(archivo)) continue;
    const { content } = matter(readFileSync(archivo, 'utf8'));
    out.push('---', '', `# ${x.p?.titulo ?? x.ruta}`, `URL: ${SITIO}${x.ruta}`, '', content.trim().replace(/\]\((\/[^)]*)\)/g, `](${SITIO}$1)`), '');
  }
  return out.join('\n');
}
