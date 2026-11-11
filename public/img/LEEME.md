# Fotos de la web: cómo subirlas

Sube cada foto a esta carpeta (`public/img/`) con el **nombre exacto** de la lista. No hay que tocar código: si el archivo existe, la web lo usa. Formatos: `.jpg`, `.jpeg`, `.webp`, `.png` o `.avif`.

Medidas recomendadas (la web las redimensiona sola):
- **Portada de página (hero):** apaisada, 1920 × 900 px o más. Se oscurece un poco para que el texto se lea, así que valen fotos luminosas.
- **Tarjetas:** apaisadas, 1200 × 800 px.
- Peso: hasta 1,5 MB cada una está bien.

## Portadas de página
| Nombre | Dónde sale |
|---|---|
| `home-hero` | Portada de la home |
| `paraisos` | Paraísos (y por defecto, Playas y sus tramos) |
| `playas` | Playas |
| `mar` | Mar |
| `playas-sanxenxo`, `playas-portonovo`, `playas-noalla-a-lanzada`, `playas-o-grove-san-vicente`, `playas-mas-alla` | Cada tramo de playas |
| `islas-ons`, `islas-cies`, `ria-de-aldan` | Cada destino de mar |
| `barcos` | Barcos |
| `actividades` | Actividades |
| `mar-con-motor`, `playa-y-tabla`, `buceo-y-pesca`, `mar-y-mesa`, `dias-a-medida`, `kayak-areoso` | Cada familia de actividades |
| `comer` | Comer (y restaurantes, chiringuitos y furanchos por defecto) |
| `diversion` | Diversión |
| `despedidas` | Despedidas |
| `soltero`, `soltera` | Despedida de soltero / de soltera |
| `cuando-ir` | Cuándo ir y condiciones |
| `limusinas`, `humor-amarillo-en-sanxenxo` | Servicios |
| `agencia` | Agencia |

## Tarjetas de la home
`card-paraisos`, `card-barcos`, `card-actividades`, `card-comer`, `card-diversion`, `card-despedidas`, `card-cuando-ir`.
Si no existen, usa la foto de portada de esa sección.

## Fotos por ficha
- **Barcos:** `barco-yate-1`, `barco-yate-2`, `barco-yate-3`, `barco-velero-bavaria-1`, `barco-velero-bavaria-2`, `barco-velero-bavaria-3`, `barco-yate-motora`, `barco-pesquero-aldan`, `barco-lancha-rapida`.
- **Locales con página propia:** `a-vichona`, `a-ferreira`, `a-curva`, `gassho`, `varadero`, `buddha`, `dux`.

## Fotos por playa
`playa-<id>` (por ejemplo `playa-silgar`, `playa-lapaman`). Salen en la tarjeta de esa playa. Las ids son las de `data/playas.json`.
Subidas ya: aguete, area-das-pipas, area-de-agra, area-de-bon, areas, areas-gordas, baltar, canelas, foxos, lapaman, montalvo, ouriceira, paxarinas, pedras-negras, silgar.

## Fotos por local (chiringuitos, restaurantes, diversión)
Se nombran con el id del local (`data/locales.json`): `bico-beach-bar`, `pe-na-praia`, `nautico-de-san-vicente`, `arroceria-sunset-a-lanzada`, `kiosko-aturuxu`, `corsario`… Salen en su tarjeta y en su ficha.
Portadas por listado: `chiringuitos`, `restaurantes`.

## Sin hueco asignado
`fotos-sin-usar/` (en la raíz del repo, fuera de `public/`: no se publican): fotos que no sé a qué playa o tramo pertenecen (Castiñeira, Menduíña, Portocelo, Rodas, Areabrava, Pintens, Raeiros, Arneles, Area dos Cas, Melide y Ons, veleros y yates sobrantes, el puerto de Sanxenxo, atardeceres…). Aquí también está `motos-de-agua.heic`, que el servidor no puede leer: pásala a JPG. Dime cuál es cuál y las coloco.

## Fotos provisionales
Las que hay ahora vienen de la web anterior y son **provisionales**: sustitúyelas subiendo la tuya con el mismo nombre (borra la vieja si tiene otra extensión). Las de personas posando en barco o en la playa parecen fotos de archivo: conviene cambiarlas por fotos reales de Sanxenxo.


## Portadas: cómo encajarlas bien
- La portada se recorta a una franja ancha (unos 1280 × 400 px en el ordenador). Lo importante de la foto debe estar **en el centro y algo hacia arriba**: la cabecera tapa los primeros 64 px y la ola blanca, los últimos 80.
- Medida ideal: **1920 × 800 px**, apaisada. Pesa menos de 250 KB (se comprime sola con `webp`).
- Si la foto queda mal encajada, no hace falta recortarla: se ajusta el punto de enfoque en `lib/fotos.ts`, objeto `FOCO` (por ejemplo `soltera: '50% 38%'` = centrada, un poco por encima del centro). El segundo número es la altura (0 % = arriba, 100 % = abajo).
- Al subir una foto nueva con el mismo nombre, el enfoque anterior se conserva: revisa que siga encajando.
