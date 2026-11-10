import { href, type Idioma, textos } from './i18n';

export type NavItem = { label: string; href: string; hijos?: { label: string; href: string }[] };

/** Menú principal (7 elementos, docs/02). */
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
        { label: 'Buceo y pesca', href: h('/actividades/buceo-y-pesca/') },
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
  ];
}

/** Columnas del pie. */
export function columnasPie(lang: Idioma): { titulo: string; enlaces: { label: string; href: string }[] }[] {
  const t = textos(lang);
  const h = (r: string) => href(lang, r);
  return [
    {
      titulo: t.guia,
      enlaces: [
        { label: t.paraisos, href: h('/paraisos/') }, { label: t.barcos, href: h('/barcos/') },
        { label: t.actividades, href: h('/actividades/') }, { label: t.comer, href: h('/comer/') },
        { label: t.diversion, href: h('/diversion/') }, { label: t.despedidas, href: h('/despedidas/') },
        { label: t.cuandoIr, href: h('/cuando-ir/') },
      ],
    },
    {
      titulo: t.servicios,
      enlaces: [
        { label: t.limusinas, href: h('/limusinas/') }, { label: t.humorAmarillo, href: h('/humor-amarillo-en-sanxenxo/') },
        { label: t.condiciones, href: h('/cuando-ir/#condiciones') }, { label: t.agencia, href: h('/agencia/') },
      ],
    },
    {
      titulo: t.legal,
      enlaces: [
        { label: 'Aviso legal', href: h('/aviso-legal/') }, { label: 'Privacidad', href: h('/privacidad/') },
        { label: 'Cookies', href: h('/politica-de-cookies/') }, { label: 'Términos y condiciones', href: h('/terminos-y-condiciones/') },
      ],
    },
  ];
}
