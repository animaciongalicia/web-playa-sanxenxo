import Image from 'next/image';
import Link from 'next/link';
import type { Local } from '../lib/esquemas';
import { foto } from '../lib/fotos';
import { NOMBRE_ZONA, TIPO_LOCAL } from '../lib/locales';

/** Regla 5: la línea de grupos y despedidas solo existe si el dato es `si` o `segun-epoca`.
 *  Nunca se publica un "no admite" sobre un local con nombre. */
export function LineaDespedidas({ local }: { local: Local }) {
  const { admite, cuando, como } = local.despedidas;
  if (admite !== 'si' && admite !== 'segun-epoca') return null;
  return (
    <p className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-600">
      <strong className="text-gray-900">Grupos y despedidas: </strong>
      {admite === 'si' ? 'admite.' : 'según la época.'} {cuando} {como}
    </p>
  );
}

export function TarjetaLocal({ local, href, completo = false }: { local: Local; href?: string; completo?: boolean }) {
  const titulo = (
    <>
      {local.nombre}
      
    </>
  );
  const c = local.contacto;
  const src = foto(local.slug, local.id);
  const cuerpo = (
    <>
      <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
        {TIPO_LOCAL[local.tipo]}
        {local.zona !== 'por-definir' && ` · ${local.municipio ?? NOMBRE_ZONA[local.zona]}`}
      </p>
      {local.como_es && <p className={`mt-3 text-sm leading-relaxed text-gray-600 ${completo ? '' : 'line-clamp-4'}`}>{local.como_es}</p>}
      {local.que_se_come && <p className={`mt-2 text-sm leading-relaxed text-gray-600 ${completo ? '' : 'line-clamp-2'}`}><strong className="text-gray-900">Qué se come: </strong>{local.que_se_come}</p>}
      {local.que_se_bebe && <p className={`mt-2 text-sm leading-relaxed text-gray-600 ${completo ? '' : 'line-clamp-2'}`}><strong className="text-gray-900">Qué se bebe: </strong>{local.que_se_bebe}</p>}
      <dl className="mt-3 space-y-1 text-sm text-gray-600">
        {local.direccion && <div><dt className="inline font-semibold text-gray-900">Dónde: </dt><dd className="inline">{local.direccion}</dd></div>}
        {local.playa_cercana && <div><dt className="inline font-semibold text-gray-900">Playa cercana: </dt><dd className="inline">{local.playa_cercana}</dd></div>}
        {local.meses_apertura && <div><dt className="inline font-semibold text-gray-900">Abre: </dt><dd className="inline">{local.meses_apertura}</dd></div>}
        {local.horario_tipico && <div><dt className="inline font-semibold text-gray-900">Horario: </dt><dd className="inline">{local.horario_tipico}</dd></div>}
        {/* El teléfono ya viene a null en producción si la ficha no está verificada (lib/datos). */}
        {c.telefono && <div><dt className="inline font-semibold text-gray-900">Teléfono: </dt><dd className="inline">{c.telefono}</dd></div>}
        {c.web && <div><dt className="inline font-semibold text-gray-900">Web: </dt><dd className="inline">{c.web}</dd></div>}
      </dl>
      <LineaDespedidas local={local} />
      {href && !completo && <span className="mt-4 inline-block text-sm font-semibold text-ria-700">Ver ficha →</span>}
    </>
  );
  const imagen = src && !completo && (
    <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/9] overflow-hidden rounded-t-2xl">
      <Image src={src} alt={local.nombre} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
    </div>
  );
  return href && !completo ? (
    <Link id={local.slug} href={href} className="card-elegant stagger-child block overflow-hidden !p-6">{imagen}{cuerpo}</Link>
  ) : (
    <article id={local.slug} className="card-elegant stagger-child overflow-hidden !p-6">{imagen}{cuerpo}</article>
  );
}
