import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import '../globals.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppSuave from '../../components/WhatsAppSuave';
import { IDIOMAS, esIdioma, href, textos } from '../../lib/i18n';
import { menuPrincipal } from '../../lib/nav';

export const dynamicParams = false;
export const generateStaticParams = () => IDIOMAS.map((lang) => ({ lang }));

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#176380' };

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.despedidasplayasanxenxo.com'),
  title: { default: 'Playa Sanxenxo · Guía de disfrute de Sanxenxo para despedidas', template: '%s · Playa Sanxenxo' },
  description: 'Guía de disfrute de Sanxenxo para despedidas de soltero y de soltera: playas, mar, barcos, actividades, dónde comer, diversión y fiesta en Sanxenxo y alrededores.',
  // Bloqueo total hasta la Fase 9.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children, params }: { children: ReactNode; params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  const lang = params.lang;
  const t = textos(lang);
  return (
    <html lang={lang}>
      <body className="font-sans">
        <Header
          lang={lang}
          items={menuPrincipal(lang)}
          inicioHref={href(lang, '/')}
          etiquetas={{ abrir: t.abrirMenu, cerrar: t.cerrarMenu, irContenido: t.irContenido }}
        />
        <main id="contenido">{children}</main>
        <Footer lang={lang} />
        <WhatsAppSuave etiqueta={t.whatsapp} />
      </body>
    </html>
  );
}
