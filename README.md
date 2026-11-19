# Simulador de regeneración del bosque

Simula cuántas plantas sobreviven a partir de los frutos de un árbol. Incluye las seis tiradas de clase, tiradas aleatorias configurables y un formulario para agregar, editar y eliminar tiradas.

## Desarrollo local

Requiere Node.js 20.19 o una versión a partir de 22.12. El simulador se ejecuta en el navegador.

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

## Uso

Para el detalle paso a paso, el formato del archivo y el cálculo, ver el **[manual de usuario](MANUAL.md)**.

- **Cargar datos** sube un archivo CSV con tus tiradas (las seis columnas de entrada; ver el manual). Hay un archivo de ejemplo en [`docs/ejemplo-datos.csv`](docs/ejemplo-datos.csv).
- **Prueba** genera entre 1 y 50 tiradas. Los porcentajes se sortean en múltiplos de 10. Generar de nuevo reemplaza el lote de prueba.
- **Manual** abre un formulario para agregar una tirada. Cada tarjeta permite editar o eliminar su registro.
- **Filtros** modifica a la vez las tarjetas, las barras y las estadísticas. **Exportar CSV** descarga todas las tiradas de la sesión con sus entradas y resultados.
- El navegador conserva las tiradas cargadas y manuales y la última configuración usada para generar datos de prueba. **Limpiar todo** vacía el registro y restablece esa configuración.

## Cálculo

Los frutos finales son los frutos iniciales menos los comidos. Se multiplican por las semillas por fruto. Sobre ese total se calcula cuántas semillas consume el ratón, sobre las restantes cuántas germinan y sobre las germinadas cuántas sobreviven. Cada una de esas tres operaciones porcentuales se redondea con `Math.round` antes de pasar a la siguiente.

Las estadísticas usan las plantas finales de las tiradas visibles. La varianza es muestral, con denominador `n − 1`. La desviación es la raíz de la varianza, el error estándar es la desviación dividida entre `√n` y el rango es el promedio ± error estándar. Con una sola tirada se muestran el número de tiradas y el promedio.

Las seis tiradas de clase dan 8, 1, 4, 9, 9 y 50 plantas. El promedio es 13,50 y el rango va de 6,08 a 20,92. Los datos y los casos de verificación están en [el plan](docs/PLAN.md).

## GitHub Pages

El sitio está publicado en https://giselcaicedo.github.io/forest-recovery/. El [workflow](.github/workflows/deploy.yml) valida el proyecto (lint y pruebas) y lo publica en cada push a `main`.
