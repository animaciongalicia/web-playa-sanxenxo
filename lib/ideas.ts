// Ideas para despedidas que NO tienen ficha propia (ni local ni proveedor concreto en la guía).
// Son descripciones generales: sin precios, sin sitios y sin promesas. Quien quiera concretar, pregunta a la agencia.
import type { NombreIcono } from '../components/Icono';

export type Idea = { titulo: string; texto: string; icono: NombreIcono; foto?: string; href?: string; enlace?: string };

export const IDEAS_SOLTERO: Idea[] = [
  { titulo: 'Paintball', texto: 'Dos equipos, una bandera y mucha risa. Se desahogan, compiten y el novio suele ser el objetivo favorito. Lleva ropa que se pueda manchar.', icono: 'actividades' },
  { titulo: 'Karts', texto: 'Carrera por equipos con parrilla de salida y podio final. Saca el piloto que lleva dentro cada uno y vale para grupos grandes.', icono: 'flecha' },
  { titulo: 'Gincana de despedida', texto: 'Pruebas por equipos por el pueblo o por la playa, con retos, fotos y disfraces. El ganador manda en la cena.', icono: 'despedidas', foto: 'idea-gincana-soltero', href: '/actividades/dias-a-medida/', enlace: 'Ver días a medida' },
  { titulo: 'Humor Amarillo', texto: 'Un día de pruebas y juegos al estilo del programa de los 90, para competir entre vosotros o contra otros grupos.', icono: 'personas', href: '/humor-amarillo-en-sanxenxo/', enlace: 'Ver Humor Amarillo' },
  { titulo: 'Motos de agua y banana', texto: 'Adrenalina en el mar con monitor y curso previo. Es de lo que más se recuerda.', icono: 'barcos', foto: 'idea-motos', href: '/actividades/mar-con-motor/', enlace: 'Ver mar con motor' },
  { titulo: 'Barco privado con baño', texto: 'Una mañana o una tarde en barco solo para el grupo, con parada para bañarse y música a bordo.', icono: 'barcos', foto: 'idea-barco-privado', href: '/barcos/', enlace: 'Ver barcos' },
  { titulo: 'Pesca recreativa', texto: 'Para el grupo que prefiere algo más tranquilo: un rato de pesca en el mar, con picoteo y cervezas.', icono: 'ojo', foto: 'idea-pesca', href: '/actividades/pesca/', enlace: 'ver pesca' },
  { titulo: 'Torneo de vóley playa o palas', texto: 'Un torneo por parejas en la arena, con premio simbólico y un buen baño después.', icono: 'sol', foto: 'idea-voley', href: '/actividades/dias-a-medida/', enlace: 'Ver días a medida' },
  { titulo: 'Churrascada y cena de grupo', texto: 'Mesa larga, buena carne y sitio para varios grupos a la vez, sin mezclaros con los demás.', icono: 'comer', foto: 'idea-churrascada', href: '/comer/restaurantes/a-vichona/', enlace: 'Ver A Vichona' },
  { titulo: 'Limusina y noche en el puerto', texto: 'Para moverse entre la cena y los locales de copas sin que nadie conduzca.', icono: 'diversion', foto: 'idea-limusina', href: '/limusinas/', enlace: 'Ver limusinas' },
];

export const IDEAS_SOLTERA: Idea[] = [
  { titulo: 'Reunión tipo Tupper', texto: 'Un clásico de las despedidas: reunión entre amigas en casa o en el alojamiento, con juegos, risas y sorpresas. Se organiza con tiempo y con discreción.', icono: 'corazon' },
  { titulo: 'Gincana de despedida', texto: 'Retos, fotos y disfraces para la novia y su grupo, por la playa o por el pueblo. Se recuerda más que cualquier cena.', icono: 'despedidas', foto: 'idea-gincana-soltera', href: '/actividades/dias-a-medida/', enlace: 'Ver días a medida' },
  { titulo: 'Beauty party', texto: 'Mascarillas, maquillaje y peluquería en grupo antes de la cena. Todas guapas para las fotos y con el plan ya empezado.', icono: 'sol', foto: 'idea-beauty' },
  { titulo: 'Spa y relax', texto: 'Una mañana de circuito de spa para empezar el día con calma, con la novia mimada y el grupo desconectado.', icono: 'corazon', foto: 'idea-spa' },
  { titulo: 'Yoga o movilidad en la playa', texto: 'Una sesión suave frente al mar para despertar el cuerpo. Cuadra bien antes de un día de barco.', icono: 'sol', href: '/actividades/dias-a-medida/', enlace: 'Ver días a medida' },
  { titulo: 'Sesión de fotos y disfraces', texto: 'Looks a juego, complementos y un fotógrafo o un móvil bien usado: el recuerdo ya queda hecho.', icono: 'ojo', foto: 'idea-fotos' },
  { titulo: 'Cata de vinos', texto: 'Una cata con albariño y otros vinos de las Rías Baixas para brindar con calma, sin prisa y sin ruido.', icono: 'comer', foto: 'idea-cata', href: '/comer/restaurantes/a-curva/', enlace: 'Ver A Curva' },
  { titulo: 'Paddle surf y Big SUP', texto: 'Un rato sobre la tabla, solas o todas juntas en una grande. Divertido aunque nadie haya subido nunca.', icono: 'playa', foto: 'idea-paddle', href: '/actividades/playa-y-tabla/', enlace: 'Ver playa y tabla' },
  { titulo: 'Atardecer en barco', texto: 'Una salida al caer el sol, con cava o catering a bordo y las mejores fotos del fin de semana.', icono: 'barcos', foto: 'idea-atardecer-barco', href: '/actividades/dias-a-medida/', enlace: 'Ver días a medida' },
  { titulo: 'Cena y copas con vistas', texto: 'Para cerrar el día: cena animada y una terraza con el mar delante.', icono: 'diversion', foto: 'idea-copas', href: '/diversion/', enlace: 'Ver diversión' },
];
