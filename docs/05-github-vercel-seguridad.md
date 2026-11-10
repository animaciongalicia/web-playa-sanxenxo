# 05 · GitHub, Vercel y seguridad

## GitHub

- Repo **privado**: `playa-sanxenxo`.
- Ramas: `main` (producción, protegida) y `fase-N-nombre` (una por fase).
- Flujo: rama → commits → **Pull Request** → vista previa de Vercel → revisión de Pablo → fusión.
- Commits en español, descriptivos (`Añade fichas de restaurantes de Aldán`), no `fix` ni `update`.
- Protección de `main`: PR obligatorio y comprobaciones en verde.
- **Secret Scanning** y **Push Protection** activados.

### Token para Actions

Si se suben workflows (`.github/workflows/*.yml`) desde Claude Code, el token personal necesita **dos permisos: `repo` y `workflow`**. Con solo `repo`, el push de un workflow falla (ya pasó en DineroFuturo).

### Comprobaciones en cada PR (`.github/workflows/ci.yml`)

```yaml
name: ci
on: [pull_request]
jobs:
  comprobar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run check:datos
      - run: npm run build
```

### Revisión anual de fichas (Fase 10, opcional)

```yaml
name: revisar-fichas
on:
  schedule: [{ cron: '0 8 1 4 *' }]   # 1 de abril
  workflow_dispatch:
jobs:
  issue:
    runs-on: ubuntu-latest
    permissions: { issues: write }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run check:datos -- --informe > informe.md
      - run: gh issue create --title "Revisar fichas de locales (temporada)" --body-file informe.md
        env: { GH_TOKEN: ${{ github.token }} }
```

## Vercel

- Importar el repo. **Framework Preset: Next.js** (si aparece "Other", se cambia a mano; no existe "Nest" en este proyecto).
- Valores por defecto: Root `./`, Build `next build`, Output vacío.
- Cada PR genera una **vista previa**: es lo que revisa Pablo.
- Hasta la Fase 9 el sitio **no tiene dominio propio** y `robots.txt` bloquea todo (además de `X-Robots-Tag: noindex` en vistas previas).

### Variables de entorno

| Variable | Uso | Entornos |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Medición de GA4 | Producción |
| `NEXT_PUBLIC_SITE_URL` | URL canónica | Todos |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp (botón suave y `/agencia/`) | Todos |
| `NEXT_PUBLIC_AGENCIA_EMAIL` | Correo de la agencia (`mailto:`): **info@despedidasplayasanxenxo.com** | Todos |
| `NEXT_PUBLIC_AGENCIA_TELEFONO` | Teléfono para llamar (si falta, se usa el de WhatsApp) | Todos |
| `LANZADO` | Vacío = la web no se indexa (noindex y `robots.txt` cerrado), mientras se prepara. **`1` = abre a buscadores.** Se pone en la Fase 9, al apuntar el dominio | Producción |
| `FICHAS_EXPORT_TOKEN` | Token de `/api/fichas-export` | Producción |

Nada de esto va en el repo. Hay un `.env.example` **sin valores**.

## Seguridad

Reglas heredadas de la auditoría de los proyectos de Pablo:

1. **Rotar las claves** si alguna se expone o cada cierto tiempo.
2. **Restricciones de dominio** en las claves que lo permitan.
3. **GitHub Secret Scanning** activado.
4. *(Las otras dos reglas de la auditoría: Pablo las añade aquí. Este documento no las conoce.)*
5. *(Idem.)*

Reglas añadidas para este proyecto:

- `.env*` en `.gitignore`. Nunca se hace commit de claves, tokens ni correos reales.
- No hay formulario: la web no recibe ni guarda datos de clientes. El correo, WhatsApp y teléfono son públicos por diseño (`NEXT_PUBLIC_*`).
- Cabeceras de seguridad en `next.config.js` (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`).
- Dependencias: `npm audit` antes de lanzar y revisar avisos de Dependabot.

## Dominio y corte desde WordPress (Fase 9)

1. Exportar copia del WordPress (el XML ya existe) y **no borrar el hosting** durante al menos 30 días.
2. 48 h antes: bajar el TTL del DNS actual.
3. En Vercel: añadir `despedidasplayasanxenxo.com` y `www.despedidasplayasanxenxo.com`. El dominio principal es la versión **www** (las URLs antiguas ya la usan); la versión sin www redirige a www.
4. Cambiar los registros DNS a los que indique Vercel.
5. Comprobar HTTPS, los 301 de `docs/06` y que `robots.txt` está abierto.
6. Enviar el sitemap a Search Console.
7. Vigilar cobertura e indexación los primeros 15 días.

## Lecciones de los builds anteriores (no repetir)

- **`Event handlers cannot be passed to Client Component props`** → falta `'use client'`.
- **Timeout de generación estática en rutas con MDX** → leer Markdown en build con `gray-matter` + `remark`, no con `next-mdx-remote` en runtime.
- **`npm run build` antes de cada commit.**
