import { textos, type Idioma } from '../lib/i18n';

// Se muestra solo si estado_2027 === 'pendiente' (lo decide quien lo usa, con datos de servicios-y-meses.json).
export default function AvisoPendiente2027({ lang }: { lang: Idioma }) {
  return (
    <p className="rounded-lg border-l-4 border-arena-400 bg-arena-50 px-4 py-3 text-sm text-arena-900" role="note">
      {textos(lang).aviso2027}
    </p>
  );
}
