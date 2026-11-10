import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicioPagina from '../../../components/ServicioPagina';
import { esIdioma } from '../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Humor Amarillo' };

export default function Pagina({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  return <ServicioPagina lang={params.lang} id="humor-amarillo" ruta="/humor-amarillo-en-sanxenxo/" titulo="Humor Amarillo" subtitulo="" />;
}
