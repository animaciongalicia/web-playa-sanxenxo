import { ASUNTO, formatearTelefono, getContacto, hrefMail, hrefTel, hrefWhatsApp } from '../lib/contacto';
import { EnPreparacion, NotaRevision } from './Fichas';

const iconos = {
  mail: 'M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
  chat: 'M8 10h8M8 14h5M21 12a9 9 0 01-13.2 7.9L3 21l1.2-4.6A9 9 0 1121 12z',
  tel: 'M3 5a2 2 0 012-2h3l2 5-2.5 1.5a11 11 0 005 5L14 12l5 2v3a2 2 0 01-2 2A14 14 0 013 5z',
};

function Via({ icono, titulo, texto, href, externo = false }: { icono: keyof typeof iconos; titulo: string; texto: string; href: string; externo?: boolean }) {
  return (
    <a
      href={href}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="card-elegant stagger-child group flex items-start gap-4 !p-6"
    >
      <svg className="mt-1 h-8 w-8 shrink-0 text-ria-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d={iconos[icono]} />
      </svg>
      <span>
        <span className="block text-lg font-semibold text-gray-900">{titulo}</span>
        <span className="mt-1 block break-all text-sm text-gray-600">{texto}</span>
      </span>
    </a>
  );
}

/** Sin formulario: tres vías directas. Cada una solo aparece si su dato está configurado. */
export default function ContactoAgencia() {
  const c = getContacto();
  if (!c.email && !c.whatsapp && !c.telefono) {
    return (
      <>
        <NotaRevision>Faltan las variables <code>NEXT_PUBLIC_AGENCIA_EMAIL</code>, <code>NEXT_PUBLIC_WHATSAPP</code> y <code>NEXT_PUBLIC_AGENCIA_TELEFONO</code>.</NotaRevision>
        <EnPreparacion texto="Muy pronto, aquí, cómo contactar con la agencia." />
      </>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {c.email && <Via icono="mail" titulo="Correo" texto={c.email} href={hrefMail(c.email)} />}
      {c.whatsapp && <Via icono="chat" titulo="WhatsApp" texto="Te abre el chat con el mensaje preparado" href={hrefWhatsApp(c.whatsapp)} externo />}
      {c.telefono && <Via icono="tel" titulo="Llamar" texto={formatearTelefono(c.telefono)} href={hrefTel(c.telefono)} />}
      <span className="sr-only">{ASUNTO}</span>
    </div>
  );
}
