import { href, type Idioma, textos } from './i18n';

export type NavItem = { label: string; href: string; hijos?: { label: string; href: string }[] };

/** Menú principal (7 secciones de la guía + Blog). */
export function menuPrincipal(lang: Idioma): NavItem[] {
  const t = textos(lang);
  const h = (r: string) => href(lang, r);
  return [
    {
      label: t.paraisos, href: h('/paraisos/'),
      hijos: [{ label: t.playas, href: h('/paraisos/playas/') }, { label: t.mar, href: h('/paraisos/mar/') }],
    },
    {
      label: t.barcos, href: h('/barcos/'),
    },
    {
      label: t.actividades, href: h('/actividades/'),
      hijos: [
        { label: 'Mar con motor', href: h('/actividades/mar-con-motor/') },
        { label: 'Playa y tabla', href: h('/actividades/playa-y-tabla/') },
        { label: 'Pesca', href: h('/actividades/pesca/') },
        { label: 'Mar y mesa', href: h('/actividades/mar-y-mesa/') },
        { label: 'Días a medida', href: h('/actividades/dias-a-medida/') },
        { label: 'Kayak en Areoso', href: h('/actividades/kayak-areoso/') },
      ],
    },
    {
      label: t.comer, href: h('/comer/'),
      hijos: [
        { label: t.restaurantes, href: h('/comer/restaurantes/') },
        { label: t.chiringuitos, href: h('/comer/chiringuitos/') },
        { label: t.furanchos, href: h('/comer/furanchos/') },
      ],
    },
    { label: t.diversion, href: h('/diversion/') },
    {
      label: t.despedidas, href: h('/despedidas/'),
      hijos: [{ label: t.soltero, href: h('/despedidas/soltero/') }, { label: t.soltera, href: h('/despedidas/soltera/') }],
    },
    { label: t.cuandoIr, href: h('/cuando-ir/') },
    { label: 'Blog', href: h('/blog/') },
  ];
}

/** Pie: 3 columnas de enlaces. En español llevan texto descriptivo (cola larga), porque salen en todas las páginas. */
export function columnasPie(lang: Idioma): { titulo: string; enlaces: { label: string; href: string }[] }[] {
  const t = textos(lang);
  const h = (r: string) => href(lang, r);
  const es = lang === 'es';
  return [
    {
      titulo: t.gPlayaMar,
      enlaces: [
        { label: es ? 'Playas y mar de Sanxenxo' : t.paraisos, href: h('/paraisos/') },
        { label: es ? 'Playas de Sanxenxo y alrededores' : t.playas, href: h('/paraisos/playas/') },
        { label: es ? 'Mar: Ons, Cíes y ría de Aldán' : t.mar, href: h('/paraisos/mar/') },
        { label: es ? 'Isla de Ons: permiso y cómo llegar' : 'Isla de Ons', href: h('/paraisos/mar/islas-ons/') },
        { label: es ? 'Islas Cíes con tu grupo' : 'Islas Cíes', href: h('/paraisos/mar/islas-cies/') },
        { label: es ? 'Ría de Aldán, el Caribe gallego' : 'Ría de Aldán', href: h('/paraisos/mar/ria-de-aldan/') },
      ],
    },
    {
      titulo: t.gPlan,
      enlaces: [
        { label: es ? 'Barcos para despedidas' : t.barcos, href: h('/barcos/') },
        { label: es ? 'Traslados a Ons, Cíes y Aldán' : t.traslados, href: h('/barcos/traslados/') },
        { label: es ? 'Actividades para despedidas' : t.actividades, href: h('/actividades/') },
        { label: es ? 'Dónde comer en Sanxenxo' : t.comer, href: h('/comer/') },
        { label: es ? 'Diversión y copas en Sanxenxo' : t.diversion, href: h('/diversion/') },
      ],
    },
    {
      titulo: t.gDespedida,
      enlaces: [
        { label: es ? 'Despedidas en Sanxenxo' : t.despedidas, href: h('/despedidas/') },
        { label: es ? 'Despedida de soltero en Sanxenxo' : t.soltero, href: h('/despedidas/soltero/') },
        { label: es ? 'Despedida de soltera en Sanxenxo' : t.soltera, href: h('/despedidas/soltera/') },
        { label: es ? 'Cuándo ir a Sanxenxo' : t.cuandoIr, href: h('/cuando-ir/') },
        { label: es ? 'Limusina para despedidas' : t.limusinas, href: h('/limusinas/') },
        { label: es ? 'Humor Amarillo en Sanxenxo' : t.humorAmarillo, href: h('/humor-amarillo-en-sanxenxo/') },
      ],
    },
  ];
}

/** Textos legales: van abajo del todo, en vertical. */
export function enlacesLegales(lang: Idioma): { label: string; href: string }[] {
  const h = (r: string) => href(lang, r);
  return [
    { label: 'Aviso legal', href: h('/aviso-legal/') }, { label: 'Privacidad', href: h('/privacidad/') },
    { label: 'Cookies', href: h('/politica-de-cookies/') }, { label: 'Términos y condiciones', href: h('/terminos-y-condiciones/') },
  ];
}
