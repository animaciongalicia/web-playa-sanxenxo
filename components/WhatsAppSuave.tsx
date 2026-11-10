// WhatsApp "muy suave": un círculo pequeño, discreto, sin color chillón ni animación.
// El número viene de NEXT_PUBLIC_WHATSAPP (formato internacional sin "+"). Sin número, no se pinta.
export default function WhatsAppSuave({ etiqueta }: { etiqueta: string }) {
  const numero = (process.env.NEXT_PUBLIC_WHATSAPP ?? '34678288284').replace(/\D/g, '');
  if (!numero) return null;
  return (
    <a
      href={`https://wa.me/${numero}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={etiqueta}
      title={etiqueta}
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-ria-700 shadow-sm backdrop-blur transition-colors hover:bg-ria-700 hover:text-white"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.93 9.93 0 00-8.5 15.1L2 22l5.05-1.5A9.96 9.96 0 1012.04 2zm0 1.8a8.16 8.16 0 11-4.2 15.16l-.3-.18-3 .88.9-2.9-.2-.3A8.15 8.15 0 0112.04 3.8zm-3 3.7c-.2 0-.5.07-.75.35-.25.28-1 1-1 2.4s1.03 2.8 1.18 3c.14.2 2 3.2 4.95 4.36 2.45.97 2.95.78 3.48.73.53-.05 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.34-.3-.15-1.7-.84-1.97-.94-.26-.1-.46-.15-.65.15-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.6-.9-2.17-.23-.55-.47-.48-.65-.49h-.55z" />
      </svg>
    </a>
  );
}
