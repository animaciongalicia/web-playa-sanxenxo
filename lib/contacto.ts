// Contacto de la agencia SIN formulario: correo (mailto), WhatsApp y llamada.
// Todo viene de variables NEXT_PUBLIC_*: cada vía solo existe si hay dato (no se inventa nada).
const digitos = (s: string) => s.replace(/\D/g, '');

export type Contacto = { email: string | null; whatsapp: string | null; telefono: string | null };

export function getContacto(): Contacto {
  // Datos públicos del negocio. Las variables de entorno los sobrescriben.
  const email = (process.env.NEXT_PUBLIC_AGENCIA_EMAIL ?? 'info@despedidasplayasanxenxo.com').trim();
  const wa = digitos(process.env.NEXT_PUBLIC_WHATSAPP ?? '34678288284');
  const tel = digitos(process.env.NEXT_PUBLIC_AGENCIA_TELEFONO ?? '') || wa; // sin teléfono propio, se usa el de WhatsApp
  return { email: email || null, whatsapp: wa || null, telefono: tel || null };
}

/** 678288284 → "678 288 284" (quita el 34 si el número es español). */
export function formatearTelefono(n: string): string {
  const d = n.startsWith('34') && n.length === 11 ? n.slice(2) : n;
  return d.length === 9 ? `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}` : n;
}

export const ASUNTO = 'Despedida en Sanxenxo';

/** Mensaje preparado: sustituye al formulario. El cliente lo completa en su correo o WhatsApp. */
export const MENSAJE = [
  'Hola, os escribo desde la guía Playa Sanxenxo. Estoy organizando una despedida.',
  '',
  'Tipo (soltero / soltera):',
  'Fecha aproximada:',
  'Número de personas:',
  'Ciudad de origen:',
  'Nos interesa (barco, actividades, cena, diversión):',
].join('\n');

export const hrefMail = (email: string) => `mailto:${email}?subject=${encodeURIComponent(ASUNTO)}&body=${encodeURIComponent(MENSAJE)}`;
export const hrefWhatsApp = (n: string) => `https://wa.me/${n}?text=${encodeURIComponent(MENSAJE)}`;
export const hrefTel = (n: string) => `tel:+${n.startsWith('34') ? n : '34' + n}`;
