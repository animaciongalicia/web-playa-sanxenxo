import { ASUNTO, formatearTelefono, getContacto, hrefMail, hrefTel, hrefWhatsApp } from '../lib/contacto';
import { EnPreparacion } from './Fichas';

const iconos = {
  mail: 'M3 8l9 6 9-6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
  chat: 'M8 10h8M8 14h5M21 12a9 9 0 01-13.2 7.9L3 21l1.2-4.6A9 9 0 1121 12z',
  tel: 'M3 5a2 2 0 012-2h3l2 5-2.5 1.5a11 11 0 005 5L14 12l5 2v3a2 2 0 01-2 2A14 14 0 013 5z',
};

function Via({ icono, titulo, texto, boton, href, externo = false }: { icono: keyof typeof iconos; titulo: string; texto: string; boton: string; href: string; externo?: boolean }) {
  return (
    <div className="stagger-child flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-md">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ria-50 text-ria-700">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d={iconos[icono]} />
        </svg>
      </span>
      <h3 className="mt-5 text-xl font-bold text-gray-900">{titulo}</h3>
      <p className="mb-6 mt-2 text-sm leading-relaxed text-gray-600 [overflow-wrap:anywhere]">{texto}</p>
      <a
        href={href}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="btn-primary mt-auto w-full justify-center"
      >
        {boton}
      </a>
    </div>
  );
}

/** Sin formulario: tres vías directas. Cada una solo aparece si su dato está configurado. */
export default function ContactoAgencia() {
  const c = getContacto();
  if (!c.email && !c.whatsapp && !c.telefono) return <EnPreparacion texto="Muy pronto, aquí, cómo contactar con la agencia." />;
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {c.email && <Via icono="mail" titulo="Correo" texto={c.email} boton="Escribir un correo" href={hrefMail(c.email)} />}
      {c.whatsapp && <Via icono="chat" titulo="WhatsApp" texto="Se abre el chat con el mensaje preparado." boton="Abrir WhatsApp" href={hrefWhatsApp(c.whatsapp)} externo />}
      {c.telefono && <Via icono="tel" titulo="Llamar" texto={formatearTelefono(c.telefono)} boton="Llamar ahora" href={hrefTel(c.telefono)} />}
      <span className="sr-only">{ASUNTO}</span>
    </div>
  );
}
