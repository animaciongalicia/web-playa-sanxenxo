import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeroPage from '../../components/HeroPage';
import Seccion from '../../components/Seccion';
import Tarjeta from '../../components/Tarjeta';
import TarjetaBarco, { tituloBarco } from '../../components/TarjetaBarco';
import BandaAgencia from '../../components/BandaAgencia';
import Contenido from '../../components/Contenido';
import Icono, { type NombreIcono } from '../../components/Icono';
import { esIdioma, href, textos } from '../../lib/i18n';
import { getBarcos } from '../../lib/datos';
import { foto } from '../../lib/fotos';
import JsonLd from '../../components/JsonLd';
import { organizacion, sitioWeb } from '../../lib/jsonld';
import { metaRuta } from '../../lib/seo';
import Rejilla from '../../components/Rejilla';

export const metadata: Metadata = metaRuta('/');

export default function Home({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const t = textos(lang);
  const h = (r: string) => href(lang, r);

  const entradas: { clave: string; titulo: string; texto: string; ruta: string; icono: NombreIcono }[] = [
    { clave: 'paraisos', titulo: t.paraisos, texto: 'Playas y mar: Ons, Cíes y la ría de Aldán.', ruta: '/paraisos/', icono: 'paraisos' },
    { clave: 'barcos', titulo: t.barcos, texto: 'Yates, veleros y traslados en lancha rápida.', ruta: '/barcos/', icono: 'barcos' },
    { clave: 'actividades', titulo: t.actividades, texto: 'Qué hacer en el mar y en la playa con tu grupo.', ruta: '/actividades/', icono: 'actividades' },
    { clave: 'comer', titulo: t.comer, texto: 'Restaurantes, chiringuitos y furanchos por zona.', ruta: '/comer/', icono: 'comer' },
    { clave: 'diversion', titulo: t.diversion, texto: 'Terraceo, tardeo, puestas de sol y copas.', ruta: '/diversion/', icono: 'diversion' },
    { clave: 'despedidas', titulo: t.despedidas, texto: 'El plan completo para despedidas de soltero y de soltera.', ruta: '/despedidas/', icono: 'despedidas' },
    { clave: 'cuando-ir', titulo: t.cuandoIr, texto: 'Mes a mes: qué te encuentras y qué te conviene.', ruta: '/cuando-ir/', icono: 'calendario' },
  ];

  const tramos = [
    { id: 'sanxenxo', nombre: 'Sanxenxo', texto: 'El centro: Silgar, Areas y el puerto deportivo.' },
    { id: 'portonovo', nombre: 'Portonovo', texto: 'Calas, paseo marítimo y ambiente de puerto.' },
    { id: 'noalla-a-lanzada', nombre: 'Noalla – A Lanzada', texto: 'Arena larga, mar abierto y atardeceres.' },
    { id: 'o-grove-san-vicente', nombre: 'O Grove – San Vicente', texto: 'Hasta A Toja: playas tranquilas y mesa de mar.' },
  ];

  const porQue: { icono: NombreIcono; titulo: string; texto: string }[] = [
    { icono: 'ojo', titulo: 'Información real', texto: 'Datos de la zona, sin rodeos y sin postureo.' },
    { icono: 'mapa', titulo: 'Todo en un sitio', texto: 'Playas, mar, comida y diversión de Aldán a O Grove.' },
    { icono: 'corazon', titulo: 'Hecha para despedidas', texto: 'Pensada para grupos que quieren pasarlo bien.' },
  ];

  // Barcos destacados: uno de cada categoría, hasta tres.
  const barcos = getBarcos();
  const vistas = new Set<string>();
  const destacados = barcos.filter((b) => (vistas.has(b.categoria) ? false : (vistas.add(b.categoria), true))).slice(0, 3);
  const contar = (cat: string) => barcos.filter((b) => b.categoria === cat).length;
  const indice = (b: (typeof barcos)[number]) => barcos.filter((x) => x.categoria === b.categoria).indexOf(b) + 1;

  const fotoIntro = foto('paraisos', 'home-hero');

  return (
    <>
      <JsonLd datos={{ '@graph': [organizacion(), sitioWeb()] }} />
      <HeroPage ruta="/" etiqueta="Sanxenxo · Despedidas" titulo="Tu despedida en Sanxenxo: playas, mar y fiesta" subtitulo={t.tagline}>
        <Link href={h('/paraisos/')} className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-ria-800 transition-all hover:bg-ria-50 hover:shadow-lg">
          {t.paraisos}
        </Link>
        <Link href={h('/despedidas/')} className="btn-claro !px-8 !py-4">{t.despedidas}</Link>
      </HeroPage>

      {/* Qué es esta guía */}
      <Seccion>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-ria-600">La guía</p>
            <h2 className="heading-section">Sanxenxo es pequeño. Lo bueno se extiende 10 km a la redonda.</h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">De Aldán a O Grove está todo lo que quiere un grupo: playas, mar, barcos, buena mesa y terrazas al atardecer.</p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">Aquí lo tienes ordenado para que decidas rápido y llegues con el plan hecho.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {porQue.map((p) => (
                <div key={p.titulo}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ria-50 text-ria-700"><Icono nombre={p.icono} className="h-6 w-6" /></span>
                  <h3 className="mt-3 font-semibold text-gray-900">{p.titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-ria-100 via-ria-200 to-ria-400 shadow-xl">
            {fotoIntro && <Image src={fotoIntro} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />}
          </div>
        </div>
      </Seccion>

      {/* Las siete entradas */}
      <Seccion fondo="gris" etiqueta="Empieza aquí" titulo="Elige por dónde empezar" intro="Siete entradas. Cada una responde una duda real de tu despedida." centrado>
        <Rejilla>
          {entradas.map((e) => (
            <Tarjeta key={e.clave} titulo={e.titulo} texto={e.texto} href={h(e.ruta)} claves={[`card-${e.clave}`, e.clave]} nombreIcono={e.icono} />
          ))}
        </Rejilla>
      </Seccion>

      {/* Tramos de costa */}
      <Seccion fondo="arena" etiqueta="Playas" titulo="Cuatro tramos de costa" intro="El núcleo de la guía. Empieza por el que te pille más cerca." centrado>
        <div className="grid gap-6 sm:grid-cols-2">
          {tramos.map((z) => (
            <Tarjeta key={z.id} titulo={z.nombre} texto={z.texto} href={h(`/paraisos/playas/${z.id}/`)} claves={[`playas-${z.id}`, z.id, 'paraisos']} nombreIcono="playa" />
          ))}
        </div>
      </Seccion>

      {/* Barcos destacados */}
      {destacados.length > 0 && (
        <Seccion etiqueta="Mar" titulo="Un día en barco cambia la despedida" intro="Yates, veleros y lancha rápida desde Sanxenxo y Portonovo. Con patrón, seguros y precio claro.">
          <Rejilla>
            {destacados.map((b) => (
              <TarjetaBarco key={b.id} compacta b={b} titulo={tituloBarco(b, indice(b), contar(b.categoria))} />
            ))}
          </Rejilla>
          <div className="mt-10 text-center">
            <Link href={h('/barcos/')} className="btn-primary">Ver todos los barcos</Link>
          </div>
        </Seccion>
      )}

      {/* Cuándo ir */}
      <Seccion fondo="ria" etiqueta="Cuándo ir" titulo="La temporada, en tres líneas" intro="El verano es la temporada fuerte. Mayo y septiembre, más flojos." centrado>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { k: 'Calentando', v: '1 al 15 de junio', d: 'Ambiente suave y menos gente. Todo depende del clima.' },
            { k: 'Temporada fuerte', v: '20 de junio a final de agosto', d: 'Mucho turista y muchas despedidas. Reserva con tiempo.' },
            { k: 'Resto del año', v: 'De septiembre a mayo', d: 'Flojo, sobre todo con el Imserso. Mayo y septiembre, tranquilos.' },
          ].map((c) => (
            <div key={c.k} className="stagger-child rounded-2xl border border-white/15 bg-white/5 p-7 backdrop-blur-sm">
              <Icono nombre="sol" className="h-8 w-8 text-arena-300" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-arena-300">{c.k}</p>
              <p className="mt-1 text-xl font-bold">{c.v}</p>
              <p className="mt-2 text-sm leading-relaxed text-ria-100">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={h('/cuando-ir/')} className="btn-claro">Mes a mes</Link>
        </div>
      </Seccion>

      <Contenido lang={lang} ruta="/" />

      <BandaAgencia lang={lang} titulo="¿Ya sabes lo que quieres?" texto="La guía te ayuda a decidir. Cuando lo tengas claro, la agencia te lo organiza." />
    </>
  );
}
