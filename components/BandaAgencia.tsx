import Link from 'next/link';
import { href, textos, type Idioma } from '../lib/i18n';
import { getContacto, hrefTel, hrefWhatsApp } from '../lib/contacto';

/** Banda de cierre: un solo botón a /agencia/ y, debajo, WhatsApp y teléfono. Sin formularios. */
export default function BandaAgencia({ lang, titulo = '¿Hablamos de tu despedida?', texto = 'Cuéntalo por correo, WhatsApp o teléfono. Sin formularios: te responden y lo vais afinando.' }: { lang: Idioma; titulo?: string; texto?: string }) {
  const t = textos(lang);
  const c = getContacto();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ria-900 via-ria-800 to-ria-700 px-6 py-16 text-center text-white md:py-20">
      <svg className="pointer-events-none absolute -bottom-6 left-0 h-24 w-full text-white/5" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 60c120 36 240 36 360 0s240-36 360 0 240 36 360 0 240-36 360 0v60H0z" />
      </svg>
      <div className="relative mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{titulo}</h2>
        <p className="mt-4 text-lg leading-relaxed text-ria-100">{texto}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={href(lang, '/agencia/')} className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-ria-800 transition-all hover:bg-ria-50 hover:shadow-lg">{t.hablarAgencia}</Link>
          {c.whatsapp && <a href={hrefWhatsApp(c.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-claro !px-8 !py-4">WhatsApp</a>}
          {c.telefono && <a href={hrefTel(c.telefono)} className="btn-claro !px-8 !py-4">Llamar</a>}
        </div>
      </div>
    </section>
  );
}
