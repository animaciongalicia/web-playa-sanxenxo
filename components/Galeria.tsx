import Image from 'next/image';
import { foto } from '../lib/fotos';
import Seccion from './Seccion';

/** Mosaico de fotos: public/img/<prefijo>-galeria-1.webp, -2, -3… (hasta 6). Sin fotos, no se pinta. */
export default function Galeria({ prefijo, etiqueta, titulo, intro }: { prefijo: string; etiqueta?: string; titulo: string; intro?: string }) {
  const fotos = [1, 2, 3, 4, 5, 6].map((n) => foto(`${prefijo}-galeria-${n}`)).filter((f): f is string => !!f);
  if (fotos.length < 2) return null;
  return (
    <Seccion fondo="arena" etiqueta={etiqueta} titulo={titulo} intro={intro} centrado>
      <div className="grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] md:grid-cols-4">
        {fotos.map((f, i) => (
          <div key={f} className={`stagger-child relative overflow-hidden rounded-2xl bg-ria-100 shadow-sm ${i === 0 ? 'col-span-2 row-span-2' : ''} ${fotos.length > 4 && i === 3 ? 'md:col-span-2' : ''}`}>
            <Image src={f} alt="" fill sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'} className="object-cover" />
          </div>
        ))}
      </div>
    </Seccion>
  );
}
