# 08 · Información rescatada de internet (para revisar con Pablo)

Consultado el **2026-11-10**. Nada de esto está publicado: todo vive en `datos_fuente` de cada ficha (con su URL) y no sale en la web hasta que Pablo lo confirme. Solo la **bandera azul** se ha escrito en su campo, porque viene de la lista oficial, y aun así no se muestra hasta que la playa esté `verificado: true`.

**Nivel de confianza:** 🟢 oficial (Xunta / Parque Nacional) · 🟡 prensa o portal turístico · 🔴 directorio sin contrastar.

---

## 1. Lo que cambia decisiones ya tomadas

### 1.1 Dos de las 8 playas top NO tienen bandera azul 🟢
La lista oficial 2026-2027 (Xunta/Adeac) no incluye ninguna playa de **O Grove**: solo el puerto deportivo de Pedras Negras. Por tanto **A Barrosa y Pedras Negras no tienen bandera**. Las otras 6 del núcleo sí: Areas, Silgar, Montalvo, A Lanzada (en la lista, "Nosa Señora da Lanzada"), Areas Gordas y Pragueira.

> **Pablo decide:** ¿las dos de O Grove siguen en el top por la zona (aunque sin bandera)? El campo `top` sigue en `null`.

### 1.2 Cíes no tiene barco regular desde Sanxenxo 🟢
El Parque Nacional lista las salidas regulares: **Cíes** desde Vigo, Baiona y Cangas; **Ons** desde Portonovo, Sanxenxo, Bueu y Marín. Nuestro traslado "Sanxenxo/ría → Cíes" sería una **oferta propia en lancha rápida**, no un servicio regular.

> **Pablo decide:** ¿ofrecemos traslado a Cíes desde la ría? ¿Desde qué puerto?

### 1.3 "Caribe gallego" es un apodo, no una zona 🟡
Varias fuentes lo aplican a sitios distintos. La ría de Aldán pertenece a **Cangas y Bueu**. De Cangas **no hay ninguna playa con bandera azul** en 2026-2027; de Bueu sí: Area de Bon, Lagos, Lapamán y Portomaior.

> **Pablo decide:** si usa "Caribe gallego" en la web y para qué playas.

---

## 2. Ons y Cíes (Parque Nacional)

| Dato | Qué dice | Confianza |
|---|---|---|
| Cuándo hace falta autorización | **Semana Santa** (27 mar–5 abr en 2026) y del **15 de mayo al 15 de septiembre**. Fuera de esas fechas se gestiona con las navieras autorizadas | 🟢 [portal Xunta](https://autorizacionillasatlanticas.xunta.gal/illasr/inicio?lang=es) |
| Coste y trámite | Gratuita. 4 pasos en la web, da un código de prereserva: **2 horas** para comprar el billete en una naviera autorizada. Personal e intransferible | 🟢 [más información](https://autorizacionillasatlanticas.xunta.gal/illasr/verMasInfo?lang=es) |
| Anulación | Hasta **15 días antes** desde la web; después, con la naviera | 🟢 mismo enlace |
| Temporada baja | Se visita **con grupos con guía** | 🟢 [Parque Nacional](https://patrimonionatural.xunta.gal/es/parque-nacional-illas-atlanticas) |
| Atención | 012@xunta.gal, L-V 8:00-20:00 | 🟢 |
| **Cupo diario** | ⚠️ **Hay conflicto.** Ficha del Parque: **2.200/día en Cíes**. Prensa 2026: **1.800 en Cíes y 1.300 en Ons**, 450 fuera de temporada alta, rutas guiadas hasta 200 | 🟢 vs 🟡 [Telecinco, 14-may-2026](https://www.telecinco.es/noticias/galicia/20260514/avalancha-peticiones-visitas-islas-cies-autorizacion-obligatoria-verano_18_019140586.html) |
| Demanda 2026 | Más de 24.300 autorizaciones pedidas a mediados de mayo | 🟡 prensa |
| Rodas (Cíes) | Tiene bandera azul 2026-2027 | 🟢 |

> **Antes de publicar un cupo:** confirmar la cifra vigente con la Xunta. Mi propuesta es **no publicar números** y enviar al portal oficial.

---

## 3. Playas: bandera azul 2026-2027 🟢
Fuente: [nota de prensa de la Xunta](https://www.xunta.gal/notas-de-prensa/-/nova/024145/galicia-tendra-este-ano-118-playas-con-bandera-azul-10-mas-que-2025-consolida).

- **Sanxenxo (18, la que más de España):** A Lapa, Agra, Areas, Areas Gordas, Baltar, Bascuas, Canelas, Caneliñas, Foxos, Major, Montalvo, Nosa Señora da Lanzada, O Espiñeiro, Pampaído (nueva), Panadeira, Paxariñas, Pragueira, Silgar.
- **Bueu:** Area de Bon, Lagos, Lapamán, Portomaior.
- **Marín:** Aguete, Loira, Mogor, Portocelo, Santo do Mar–A Coviña.
- **Poio:** Cabeceira, O Laño (nueva), Xiorto.
- **O Grove / Cangas:** ninguna playa.

**Ya aplicado en `data/playas.json`** (22 playas del repo con bandera 2026). **No tienen bandera:** A Granxa (Sanxenxo), las de Poio que tienes (Padrón/A Pinela, Chancelas, Ouriceira, A Canteira, Raxó y Lourido) y todas las de O Grove.

> **Pablo decide:** estas **8 playas están en la lista oficial y NO en tus 39**: O Espiñeiro y Pampaído (Sanxenxo), Cabeceira, O Laño y Xiorto (Poio), Loira, Portocelo y A Coviña (Marín). ¿Las añadimos?

### Datos de las 8 top (🟡 portales turísticos; las cifras varían)
| Playa | Dato encontrado |
|---|---|
| Silgar | ~750 m x 80 m, arena blanca y fina, paseo marítimo (otras fuentes: 800 m, 1,2 km) |
| A Lanzada | ~2,4 km (2.440 x 95 m). Entre Sanxenxo y O Grove. Citada como apta para surf |
| A Barrosa | ~130 m x 40 m, San Vicente do Mar |
| Pedras Negras | Sin longitud. La pasarela mide ~3,2 km (Turismo de Galicia) |
| Montalvo | ~900-1.000 m |
| Pragueira | ~300 m (otra fuente: 200 m) |
| Areas Gordas | ~200 m |
| Areas | Entre 350 y 715 m según fuente: **sin dato fiable** |

> Las medidas no las veo publicables sin contrastar: mi propuesta es **no poner metros** salvo que Pablo los confirme.

---

## 4. Locales que se mantienen de la web vieja 🔴
Todo viene de directorios (Páxinas Galegas, Foursquare, Airbnb). **Ninguno es fiable para publicar teléfono.**

| Local | Lo encontrado | Problema |
|---|---|---|
| A Ferreira | Lg. Bouzón 2, **Nantes** (Sanxenxo). Horario invierno j-d 11:30-16:00 y 20:00-00:00 | Está en Nantes, no en Portonovo. Teléfono sin confirmar |
| A Curva | Rúa Rafael Pico 56, Portonovo; tel. 886 20 76 29 | Una sola fuente (Airbnb). En el repo figura como vinoteca |
| Gassho | — | **No encontré el local** |
| Varadero | Praia dos Barcos, Rúa de Madrid 16 | Las fuentes no coinciden en qué tipo de local es |
| Buddha | Puerto Deportivo Juan Carlos I, s/n | Sin teléfono ni horario |
| Dux | Puerto Deportivo Juan Carlos I, s/n, con terraza. Alta temporada 23:30-6:00 | Horario sin confirmar si sigue vigente |

Los datos de contacto **no se han escrito en los campos** (`direccion`, `telefono`): solo en `datos_fuente`.

---

## 5. Lo que NO he podido sacar
- **Fotos con derechos** (ver conversación: las de la web actual parecen de archivo).
- **Barcos y precios:** son de Sea Galicia; el repo no se toca. Los pasa Pablo.
- **A Vichona:** no hay información pública fiable; sigue pendiente su dirección.
- **Chiringuitos, furanchos y restantes restaurantes:** no los he contrastado (son 50+ fichas). Si quieres, el siguiente paso es un lote por zona.
- **Descripciones redactadas:** no escribo texto de ficha hasta que confirmes los datos. Con la skill `redactar-ficha` sale rápido.

---

## 6. Preguntas para Pablo (en orden de impacto)
1. ¿Las 8 top: dejamos A Barrosa y Pedras Negras aunque no tengan bandera?
2. ¿Ofrecemos traslado a Cíes desde la ría? ¿Desde qué puerto?
3. ¿Usamos "Caribe gallego"? ¿Para qué playas?
4. ¿Añadimos las 8 playas con bandera que no están en la lista?
5. ¿Publicamos cupos de Ons y Cíes o solo enlazamos al portal oficial?
6. Locales: confirma dirección y teléfono de A Ferreira, A Curva, Varadero, Buddha y Dux, y dime dónde está Gassho.
