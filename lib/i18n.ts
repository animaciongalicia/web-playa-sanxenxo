import { buscarRuta } from './rutas';

export const IDIOMAS = ['es', 'pt'] as const;
export type Idioma = (typeof IDIOMAS)[number];

export function esIdioma(valor: string): valor is Idioma {
  return (IDIOMAS as readonly string[]).includes(valor);
}

/** Español sin prefijo; portugués bajo /pt/. Si la ruta no existe en portugués, cae a español. */
export function href(lang: Idioma, ruta: string): string {
  if (lang === 'es') return ruta;
  if (ruta === '/') return '/pt/';
  const sinAncla = ruta.split('#')[0];
  return buscarRuta(sinAncla)?.pt ? `/pt${ruta}` : ruta;
}

/** Misma página en el otro idioma. Si no existe en portugués, lleva a la portada /pt/. */
export function rutaEnIdioma(pathname: string, destino: Idioma): string {
  const base = pathname.replace(/^\/pt(?=\/|$)/, '') || '/';
  if (destino === 'es') return base;
  if (base === '/') return '/pt/';
  return buscarRuta(base)?.pt ? `/pt${base}` : '/pt/';
}

/** Textos de interfaz. El resto del portugués llega en la Fase 7 con revisión humana. */
const TEXTOS = {
  es: {
    paraisos: 'Paraísos', barcos: 'Barcos', actividades: 'Actividades', comer: 'Comer',
    diversion: 'Diversión', despedidas: 'Despedidas', cuandoIr: 'Cuándo ir',
    playas: 'Playas', mar: 'Mar', yates: 'Yates', veleros: 'Veleros', traslados: 'Traslados',
    restaurantes: 'Restaurantes', chiringuitos: 'Chiringuitos', furanchos: 'Furanchos',
    soltero: 'Soltero', soltera: 'Soltera',
    limusinas: 'Limusinas', humorAmarillo: 'Humor Amarillo',
    condiciones: 'Condiciones de las despedidas', agencia: 'Agencia',
    hablarAgencia: 'Hablar con la agencia',
    guia: 'La guía', servicios: 'Servicios', legal: 'Legal', idioma: 'Idioma',
    gPlayaMar: 'Playa y mar', gPlan: 'Tu plan', gDespedida: 'Tu despedida', blogTitulo: 'Novedades del blog', blogPronto: 'El blog llega pronto.',
    abrirMenu: 'Abrir menú', cerrarMenu: 'Cerrar menú', irContenido: 'Ir al contenido',
    whatsapp: 'Escríbenos por WhatsApp',
    enConstruccion: 'Esta página se está construyendo.',
    tagline: 'Guía de disfrute de Sanxenxo para despedidas: playas, mar, barcos, actividades, comida, diversión y fiesta en Sanxenxo y alrededores.',
    aviso2027: 'Servicio de temporada. Pendiente de actualización 2027.',
    inicio: 'Inicio',
  },
  pt: {
    paraisos: 'Paraísos', barcos: 'Barcos', actividades: 'Atividades', comer: 'Comer',
    diversion: 'Diversão', despedidas: 'Despedidas', cuandoIr: 'Quando ir',
    playas: 'Praias', mar: 'Mar', yates: 'Iates', veleros: 'Veleiros', traslados: 'Transferes',
    restaurantes: 'Restaurantes', chiringuitos: 'Quiosques de praia', furanchos: 'Furanchos',
    soltero: 'Solteiro', soltera: 'Solteira',
    limusinas: 'Limusinas', humorAmarillo: 'Humor Amarillo',
    condiciones: 'Condições das despedidas', agencia: 'Agência',
    hablarAgencia: 'Falar com a agência',
    guia: 'O guia', servicios: 'Serviços', legal: 'Legal', idioma: 'Idioma',
    gPlayaMar: 'Praia e mar', gPlan: 'O teu plano', gDespedida: 'A tua despedida', blogTitulo: 'Novidades do blog', blogPronto: 'O blog chega em breve.',
    abrirMenu: 'Abrir menu', cerrarMenu: 'Fechar menu', irContenido: 'Ir para o conteúdo',
    whatsapp: 'Escreve-nos por WhatsApp',
    enConstruccion: 'Esta página está em construção.',
    tagline: 'Guia de diversão em Sanxenxo para despedidas: praias, mar, barcos, atividades, comida, diversão e festa em Sanxenxo e arredores.',
    aviso2027: 'Serviço de temporada. Atualização 2027 pendente.',
    inicio: 'Início',
  },
} as const;

export type Textos = Record<keyof (typeof TEXTOS)['es'], string>;

export function textos(lang: Idioma): Textos {
  return TEXTOS[lang];
}
