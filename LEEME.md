# Playa Sanxenxo · Paquete de documentos para Claude Code, GitHub y Vercel

Preparado el 2026-11-10 a partir de todo lo decidido en la conversación de planificación. **No contiene código de la web**: contiene la especificación, el plan por fases y los datos semilla para que Claude Code la construya por fases.

## Qué hay

```
LEEME.md                          Este archivo
CLAUDE.md                         Contexto y reglas para Claude Code (va en la raíz del repo)
docs/
  01-vision-y-decisiones.md       Qué es, decisiones cerradas y abiertas, fuera de alcance
  02-arquitectura-web.md          Menú, pie, rutas, plantillas, formulario único
  03-modelo-de-datos.md           Esquemas, campos de control, reglas de publicación
  04-plan-por-fases.md            Fases 0-10 con criterios de salida y qué pide a Pablo
  05-github-vercel-seguridad.md   Repo, ramas, CI, Vercel, variables, seguridad, corte de dominio
  06-seo-redirecciones-i18n.md    Redirecciones 301/410, palabras objetivo, hreflang, analítica
  07-contenido-pendiente.md       Checklist de lo que solo Pablo puede aportar + guion de "Cuándo ir"
data-semilla/
  playas.json                     39 playas
  locales.json                    Restaurantes, chiringuitos, furanchos, diversión (y listas de reserva)
  actividades.json                24 fichas en 6 familias
  mar-y-barcos.json               Ons, Cíes, Aldán, flota prevista y traslados
  servicios-y-meses.json          Limusinas, Humor Amarillo y los 6 meses
.claude/skills/redactar-ficha/    Skill para redactar fichas sin inventar
```

## Cómo se usa

1. Crear el repo privado `playa-sanxenxo` en GitHub.
2. Copiar este paquete a la raíz del repo y hacer el primer commit.
3. Abrir una terminal en la carpeta y lanzar `claude`.
4. Pedir, fase a fase:

   ```
   Lee CLAUDE.md y docs/04-plan-por-fases.md. Ejecuta solo la Fase 0.
   ```

5. Revisar el PR y la vista previa de Vercel. Fusionar. Pasar a la siguiente fase.

## Stack

El mismo blueprint que Entiende Tu Sueño: **Next.js 14 (App Router) + Tailwind + GitHub + Vercel**, con datos estructurados en JSON y una skill para redactar contenido.

## Qué conviene saber antes de empezar

- **Todos los datos de locales, actividades y barcos están en `verificado: false`.** Vienen de documentos de búsqueda web (algunos de 2021). Solo Pablo los verifica.
- **Hay 9 decisiones abiertas** en `docs/01`, con propuesta por defecto. Claude Code no las resuelve.
- **El contenido propio** (Cuándo ir, Condiciones, limusinas, Humor Amarillo, A Vichona, precios de barcos) lo aporta Pablo. Lista completa en `docs/07`.
- **Un solo formulario**, en `/agencia/`. Sin captación de email.
- Las "otras dos reglas" de seguridad de la auditoría de Pablo no están en estos documentos: hay un hueco en `docs/05` para añadirlas.
