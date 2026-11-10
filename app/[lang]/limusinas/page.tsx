import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicioPagina from '../../../components/ServicioPagina';
import { esIdioma } from '../../../lib/i18n';

export const dynamicParams = false;
export const generateStaticParams = () => [{ lang: 'es' }];
export const metadata: Metadata = { title: 'Limusinas', description: 'Paseos en limusina desde Sanxenxo, Combarro y O Grove.' };

export default function Pagina({ params }: { params: { lang: string } }) {
  if (!esIdioma(params.lang)) notFound();
  return <ServicioPagina lang={params.lang} id="limusinas" ruta="/limusinas/" titulo="Limusinas" subtitulo="Paseos en limusina desde Sanxenxo, Combarro y O Grove." />;
}
