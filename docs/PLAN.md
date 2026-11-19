# Plan de desarrollo – Simulador de regeneración del bosque

## 1. Contexto

En clase se simuló cómo se regenera un bosque a partir de los frutos de un árbol. Por grupos se pasó por 5 estaciones:

1. Frutos en el árbol: cuántos había al inicio y cuántos quedaron (algunos se los comen).
2. Semillas por fruto.
3. Semillas que se come el ratón (%).
4. Semillas que germinan (%).
5. Plantas que sobreviven (%).

Cada recorrido completo es una **tirada**. El profesor mostró un prototipo de referencia en `alexanderlgrs.github.io/reforest` (foto `referencias/01_prototipo_profe_reforest.png`): muestra cada tirada como una tarjeta con la cadena de cálculo y, abajo, las estadísticas del conjunto.

Notas del cuaderno (`referencias/04_cuaderno_requisitos.png`), es decir, lo que el profe pidió:

- Datos propios y datos de prueba.
- Variables: frutos iniciales, frutos comidos, semillas por fruto, % de semillas que come el ratón, % que germina, % que sobrevive; y número de tiradas.
- Resultados por tirada.
- Promedio, varianza, desviación, error y rango.

**Entregable:** programa funcional, publicado en GitHub Pages y con un README.

## 2. Reglas de cálculo

### 2.1 Una tirada

| Paso | Fórmula | Redondeo |
|------|---------|----------|
| Frutos finales | `frutosIniciales − frutosComidos` | — |
| Semillas totales ("parto de semillas") | `frutosFinales × semillasPorFruto` | — |
| Semillas que come el ratón | `semillasTotales × pctRaton / 100` | `Math.round` |
| Semillas que quedan | `semillasTotales − comidasRaton` | — |
| Semillas que germinan | `quedan × pctGermina / 100` | `Math.round` |
| **Plantas que sobreviven** | `germinan × pctSobrevive / 100` | `Math.round` |

El redondeo se aplica **en cada paso**, como en el prototipo del profe (117 × 20 % = 23,4 → 23; 94 × 40 % = 37,6 → 38).

`calcularTirada(entrada)` devuelve un objeto con todos los pasos intermedios, para poder mostrarlos en la tarjeta.

### 2.2 Estadísticas del conjunto (sobre las plantas finales de las tiradas visibles)

| Medida | Fórmula |
|--------|---------|
| n | número de tiradas |
| Promedio | `Σx / n` |
| Varianza | **muestral**: `Σ(x − promedio)² / (n − 1)` |
| Desviación | `√varianza` |
| Error (error estándar) | `desviación / √n` |
| Rango | `promedio − error` a `promedio + error` |

Comprobación con la foto del profe: desviación 8,43 → error 2,43 implica n = 12 (8,43 / √12 = 2,43), y rango = 18,00 ± 2,43 = 15,57 a 20,43. **Se confirma que el rango es promedio ± error.**

Decisión pendiente: la foto no permite saber si el profe usa varianza muestral (n − 1) o poblacional (n). Se usa la muestral y la fórmula queda aislada en una sola función (`calcularVarianza`) para cambiarla en una línea si hace falta.

Con n = 1 la varianza, la desviación y el error se muestran como "—" (no se puede dividir entre 0).

Todos los valores se muestran con 2 decimales.

## 3. Datos de la clase (precargados)

Tomados del tablero (`referencias/02_tablero_estaciones_grupos.png`). En el tablero los porcentajes están escritos en decenas (4 = 40 %).

| Grupo | Frutos iniciales | Frutos finales | Semillas/fruto | Ratón % | Germina % | Sobrevive % | Plantas esperadas |
|------:|------:|------:|------:|------:|------:|------:|------:|
| 1 | 15 | 13 | 6 | 40 | 40 | 40 | 8 |
| 2 | 8 | 6 | 6 | 60 | 10 | 80 | 1 |
| 3 | 8 | 6 | 5 | 50 | 50 | 50 | 4 |
| 4 | 15 | 12 | 6 | 30 | 30 | 60 | 9 |
| 5 | 12 | 10 | 6 | 40 | 50 | 50 | 9 |
| 6 | 15 | 14 | 8 | 20 | 80 | 70 | 50 |

`frutosComidos = frutosIniciales − frutosFinales`. Estos datos se guardan en `src/data/datosClase.js` y la interfaz permite editarlos.

> **Por confirmar (Gisel):** el tablero tiene marcas "x" en algunas celdas (grupo 1 frutos iniciales, grupo 2 sobrevive, grupo 4 frutos finales, grupo 6 semillas, ratón y germina). Revisar si eran correcciones y ajustar la tabla antes de entregar.

## 4. Requisitos

### 4.1 Funcionales

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-01 | **Datos de la clase:** cargar las 6 tiradas de la sección 3 con un clic. | Alta |
| RF-02 | **Datos de prueba:** generar N tiradas aleatorias (N entre 1 y 50, por defecto 12) con los rangos configurables de la sección 4.3. Botón "Generar de nuevo". | Alta |
| RF-03 | **Datos propios / manual:** formulario para agregar una tirada; editar y eliminar tiradas existentes. | Alta |
| RF-04 | **Resultado por tirada:** tarjeta "Tirada #N" con la cadena completa, igual que el prototipo del profe (ver ejemplo en 4.4), y las plantas finales destacadas. | Alta |
| RF-05 | **Estadísticas:** panel con n, promedio, varianza, desviación, error y rango, que se recalcula al cambiar las tiradas o los filtros. | Alta |
| RF-06 | **Filtros:** por origen (clase / prueba / manual), por rango de plantas finales (mín.–máx.) y por número de tirada. Las estadísticas usan solo las tiradas filtradas. | Media |
| RF-07 | **Gráfico:** barras de plantas por tirada, con una línea en el promedio y una banda sombreada para el rango. | Media |
| RF-08 | **Exportar CSV** con las entradas y los resultados de cada tirada. | Baja |
| RF-09 | **Guardar en `localStorage`** las tiradas manuales y la configuración, y botón "Limpiar todo". | Baja |

### 4.2 Validación del formulario

- Todos los campos son enteros ≥ 0.
- `frutosComidos ≤ frutosIniciales`.
- Los porcentajes van de 0 a 100.
- `semillasPorFruto` va de 1 a 20.
- Los errores se muestran junto al campo (usar `:user-invalid`) y el botón "Agregar" no envía datos inválidos.

### 4.3 Rangos por defecto para los datos de prueba (editables en la interfaz)

| Variable | Mín. | Máx. |
|----------|-----:|-----:|
| Frutos iniciales | 8 | 15 |
| Frutos comidos | 0 | 4 |
| Semillas por fruto | 5 | 9 |
| Ratón % | 10 | 50 |
| Germina % | 20 | 90 |
| Sobrevive % | 40 | 90 |

`frutosComidos` nunca puede superar `frutosIniciales`. Los porcentajes aleatorios se generan en múltiplos de 10, como en clase. La función generadora recibe una función `aleatorio` opcional (por defecto `Math.random`) para poder probarla.

### 4.4 Texto de la tarjeta (formato del prototipo)

```
Tirada # 10
Frutos iniciales: 15
Frutos comidos: 2
Frutos finales: 13
Semillas por fruto: 9
Parto de 117 semillas
El ratón se come el 20% = 23 semillas
Quedan 94 semillas
Germina el 40% = 38 semillas
Sobrevive el 80% = [30 plantas]
```

### 4.5 No funcionales

- Funciona en Chrome y Edge actuales y se ve bien desde 360 px de ancho.
- Accesible: etiquetas en todos los campos, se puede usar con teclado y el contraste es AA.
- El cálculo de 50 tiradas es instantáneo (sin servidor).
- Código legible de nivel mid-junior.

## 5. Arquitectura

SPA de una sola página, sin backend. Tiene tres capas simples:

```
UI (components/)  →  estado (hooks/useTiradas.js)  →  dominio (domain/*.js, funciones puras)
                                   ↘ localStorage (solo RF-09)
```

- **domain/** no importa nada de React. Así se prueba con Vitest y se explica fácil en la sustentación.
- **useTiradas** guarda la lista de tiradas `{ id, numero, origen, entrada }`, los filtros y la configuración. Los resultados y las estadísticas **se derivan** con `useMemo`; no se guardan en el estado.

### 5.1 Estructura de carpetas esperada

```
01_Regeneracion_Bosque/
├── README.md
├── index.html
├── package.json
├── vite.config.js            # base: '/<nombre-del-repo>/'
├── .github/workflows/deploy.yml
├── docs/
│   ├── PLAN.md
│   └── referencias/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── domain/
    │   ├── calculos.js        # calcularTirada()
    │   ├── estadisticas.js    # calcularEstadisticas(), calcularVarianza()
    │   ├── generador.js       # generarTiradasPrueba(cantidad, rangos, aleatorio)
    │   ├── validacion.js      # validarEntrada() → { valido, errores }
    │   └── exportarCsv.js
    ├── data/
    │   └── datosClase.js
    ├── hooks/
    │   └── useTiradas.js
    ├── components/
    │   ├── SelectorOrigen.jsx     # Clase | Prueba | Manual
    │   ├── FormularioTirada.jsx
    │   ├── ConfigPrueba.jsx       # N y rangos
    │   ├── Filtros.jsx
    │   ├── ListaTiradas.jsx
    │   ├── TarjetaTirada.jsx
    │   ├── PanelEstadisticas.jsx
    │   └── GraficoPlantas.jsx
    ├── styles/
    │   ├── base.css           # variables, tipografía, reset
    │   ├── layout.css
    │   └── componentes.css
    └── __tests__/
        ├── calculos.test.js
        ├── estadisticas.test.js
        ├── generador.test.js
        └── validacion.test.js
```

### 5.2 Modelo de datos

```js
// entrada
{ frutosIniciales, frutosComidos, semillasPorFruto, pctRaton, pctGermina, pctSobrevive }

// resultado de calcularTirada(entrada)
{ frutosFinales, semillasTotales, comidasRaton, semillasQuedan, germinan, plantasFinales }

// tirada en el estado
{ id: crypto.randomUUID(), numero: 1, origen: 'clase' | 'prueba' | 'manual', entrada }
```

## 6. Interfaz

Una sola página dividida en tres zonas:

1. **Barra superior:** título, selector de origen de datos (Clase / Prueba / Manual) y botón de exportar CSV.
2. **Columna lateral:** formulario o configuración según el origen, y los filtros.
3. **Zona principal:** arriba el panel de estadísticas y el gráfico; debajo, la cuadrícula de tarjetas de tirada.

**Dirección visual:** debe sentirse como una libreta de campo. El fondo es neutro cálido tipo papel, la tipografía es legible con números tabulares en las cifras y hay **un solo acento verde bosque**. El elemento protagonista es el gráfico y la cifra de plantas de cada tarjeta. Nada de gradientes, brillos, emojis ni tarjetas con sombras exageradas.

## 7. Fases de desarrollo

### Fase 1 – Dominio y pruebas
- [ ] Proyecto Vite + React creado, con ESLint y Vitest configurados.
- [ ] `calculos.js`, `estadisticas.js`, `validacion.js` y `generador.js` implementados.
- [ ] Pruebas con los casos de la sección 8.
- **Acepta si:** `npm test` pasa con todos los casos.

### Fase 2 – Interfaz básica
- [ ] `useTiradas`, el selector de origen, la carga de datos de la clase y la lista de tarjetas.
- [ ] Panel de estadísticas.
- **Acepta si:** al cargar los datos de la clase se ven 6 tarjetas con los valores de la sección 3 y las estadísticas de la sección 8.

### Fase 3 – Datos de prueba y manuales
- [ ] Configuración de prueba (N y rangos) y botón "Generar de nuevo".
- [ ] Formulario con validación; editar y eliminar.
- **Acepta si:** no se puede agregar una tirada inválida y al generar 12 tiradas se ven 12 tarjetas coherentes.

### Fase 4 – Filtros, gráfico y extras
- [ ] Filtros (RF-06), gráfico (RF-07), CSV (RF-08) y localStorage (RF-09).
- **Acepta si:** al filtrar cambian a la vez las estadísticas, el gráfico y las tarjetas.

### Fase 5 – Pulido y despliegue
- [ ] Pulido visual según la dirección de la sección 6.
- [ ] Revisión de accesibilidad.
- [ ] README (qué es, fórmulas, cómo correrlo, enlace publicado) y despliegue en GitHub Pages.
- **Acepta si:** el enlace público funciona y la página se ve bien en móvil.

## 8. Casos de verificación (para las pruebas)

**Tiradas del prototipo del profe:**

| Entrada (iniciales, comidos, semillas, ratón, germina, sobrevive) | Semillas | Ratón | Quedan | Germinan | Plantas |
|---|---:|---:|---:|---:|---:|
| 15, 2, 9, 20, 40, 80 | 117 | 23 | 94 | 38 | **30** |
| 13, 3, 9, 20, 40, 80 | 90 | 18 | 72 | 29 | **23** |
| 12, 4, 9, 20, 90, 50 | 72 | 14 | 58 | 52 | **26** |

**Datos de la clase (sección 3)**, plantas = [8, 1, 4, 9, 9, 50]:

| n | Promedio | Varianza (muestral) | Desviación | Error | Rango |
|--:|--:|--:|--:|--:|--|
| 6 | 13.50 | 329.90 | 18.16 | 7.42 | 6.08 – 20.92 |

**Estadísticas de borde:** n = 1 → varianza, desviación y error = `null` (la interfaz muestra "—"); lista vacía → todo `null`.

**Generador:** con una función `aleatorio` fija, el resultado se repite igual; los valores siempre están dentro de los rangos y `frutosComidos ≤ frutosIniciales`.

## 9. Fuera de alcance

- Backend, usuarios o base de datos.
- Simulación de varias generaciones del bosque (solo una tirada por fila).
