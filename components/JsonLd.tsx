/** Datos estructurados (schema.org) en una etiqueta JSON-LD. */
export default function JsonLd({ datos }: { datos: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', ...datos }).replace(/</g, '\\u003c') }} />;
}
