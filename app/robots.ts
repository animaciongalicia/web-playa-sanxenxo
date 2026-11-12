import type { MetadataRoute } from 'next';
import { SITIO } from '../lib/sitio';

// Se permite todo, también los rastreadores de asistentes de IA: la guía quiere que la citen.
const IA = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...IA.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: `${SITIO}/sitemap.xml`,
    host: SITIO,
  };
}
