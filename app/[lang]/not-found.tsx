import Link from 'next/link';
import HeroPage from '../../components/HeroPage';

export default function NotFound() {
  return (
    <>
      <HeroPage titulo="Esta página no existe" subtitulo="Puede que la hayamos movido. Vuelve al inicio y encuentra lo que buscas.">
        <Link href="/" className="btn-claro">Ir al inicio</Link>
      </HeroPage>
    </>
  );
}
