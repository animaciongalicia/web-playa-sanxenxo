import Image from 'next/image';
import { foto } from '../lib/fotos';
import Seccion from './Seccion';

/** Mosaico de fotos: public/img/<prefijo>-galeria-1.webp, -2, -3… (hasta 6). Sin fotos, no se pinta. */
export default function Galeria({ prefijo, etiqueta, titulo, intro }: { prefijo: string; etiqueta?: string; titulo: string; intro?: string }) {
  const todas = [1, 2, 3, 4, 5, 6].map((n) => foto(`${prefijo}-galeria-${n}`)).filter((f): f is string => !!f);
  const n = [6, 4, 3, 2].find((x) => x <= todas.length) ?? 0;
  const fotos = todas.slice(0, n);
  if (fotos.length < 2) return null;
  return (
    <Seccion fondo="arena" etiqueta={etiqueta} titulo={titulo} intro={intro} centrado>
      <div className={`grid gap-3 ${fotos.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : fotos.length === 4 ? 'grid-cols-2 md:grid-cols-4' : fotos.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
        {fotos.map((f, i) => (
          <div key={f} className="stagger-child relative aspect-[4/3] overflow-hidden rounded-2xl bg-ria-100 shadow-sm">
            <Image src={f} alt={`${titulo}: foto ${i + 1} de ${fotos.length}`} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>
    </Seccion>
  );
}
