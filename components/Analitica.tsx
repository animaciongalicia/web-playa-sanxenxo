'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CLAVE = 'cookies-analitica';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Eventos de contacto que se miden (docs/06): agencia, correo, WhatsApp, teléfono y seagalicia.com. */
function eventoDe(a: HTMLAnchorElement): string | null {
  const h = a.getAttribute('href') ?? '';
  if (h.startsWith('mailto:')) return 'clic_correo';
  if (h.startsWith('tel:')) return 'clic_llamada';
  if (h.includes('wa.me')) return 'clic_whatsapp';
  if (h.includes('seagalicia.com')) return 'clic_seagalicia';
  if (/^\/?(pt\/)?agencia\/?$/.test(h.replace(/^https?:\/\/[^/]+/, ''))) return 'clic_agencia';
  return null;
}

/** Aviso de cookies y Google Analytics (GA4). Sin NEXT_PUBLIC_GA_ID no hace nada. GA solo se carga si la persona acepta. */
export default function Analitica() {
  const [estado, setEstado] = useState<'si' | 'no' | null | 'cargando'>('cargando');

  useEffect(() => {
    try {
      const v = localStorage.getItem(CLAVE);
      setEstado(v === 'si' || v === 'no' ? v : null);
    } catch {
      setEstado(null);
    }
  }, []);

  useEffect(() => {
    if (estado !== 'si') return;
    const alClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a) return;
      const nombre = eventoDe(a as HTMLAnchorElement);
      if (nombre && window.gtag) window.gtag('event', nombre, { enlace: a.getAttribute('href') });
    };
    document.addEventListener('click', alClic);
    return () => document.removeEventListener('click', alClic);
  }, [estado]);

  if (!GA_ID) return null;

  const decidir = (v: 'si' | 'no') => {
    try { localStorage.setItem(CLAVE, v); } catch { /* sin almacenamiento: se decide solo para esta visita */ }
    setEstado(v);
  };

  return (
    <>
      {estado === 'si' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}</Script>
        </>
      )}
      {estado === null && (
        <div role="dialog" aria-label="Cookies" className="fixed bottom-4 left-4 right-20 z-50 max-w-md rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600 shadow-lg sm:right-auto">
          <p>Esta web usa cookies de analítica (Google Analytics) solo si las aceptas, para mejorar la guía. <Link href="/politica-de-cookies/" className="link-inline">Más información</Link>.</p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => decidir('si')} className="btn-primary !px-4 !py-2 text-sm">Aceptar</button>
            <button type="button" onClick={() => decidir('no')} className="btn-outline !px-4 !py-2 text-sm">Rechazar</button>
          </div>
        </div>
      )}
    </>
  );
}
