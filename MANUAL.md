# Manual de usuario — Simulador de regeneración del bosque

El simulador calcula cuántas plantas sobreviven a partir de los frutos de un árbol. Trabaja con
**tiradas**: cada tirada es un conjunto de valores de entrada (frutos, semillas y porcentajes) del
que el simulador obtiene las plantas finales. La pantalla muestra, para las tiradas visibles, las
tarjetas con el detalle, un gráfico y las estadísticas.

## Cómo abrirlo

En el navegador, tras `npm run dev` (desarrollo) o `npm run preview` (versión compilada). No hay
instalación ni cuenta; todo ocurre en tu navegador y los datos no salen de tu equipo.

## Orígenes de datos

Arriba, en «Origen de los datos», eliges de dónde vienen las tiradas:

- **Cargar datos** — subes un archivo CSV con tus tiradas (ver abajo). Es la opción por defecto.
- **Prueba** — el simulador genera entre 1 y 50 tiradas al azar, con porcentajes en múltiplos de 10.
  Puedes ajustar la cantidad y los rangos. Volver a generar reemplaza el lote de prueba.
- **Manual** — un formulario para agregar una tirada a mano. Cada tarjeta permite editarla o
  eliminarla.

Las tiradas **cargadas** y **manuales** se conservan en el navegador entre visitas. Las de **prueba**
son temporales. **Limpiar todo** (en Filtros) vacía el registro y restablece la configuración.

## Cargar datos desde un archivo (CSV)

1. Elige el origen **Cargar datos**.
2. Pulsa el selector de archivo y elige tu `.csv`.
3. Si todo está bien, verás «Se cargaron N tiradas» y aparecerán en la lista. Si alguna fila tiene
   un problema, el simulador carga las válidas y te dice qué filas corregir.

### Formato del archivo

La primera línea es la **cabecera** con los nombres de las columnas. El simulador lee **solo estas
seis columnas de entrada** (en cualquier orden); cualquier otra columna se ignora:

| Columna | Qué es | Rango válido |
|---|---|---|
| `frutosIniciales` | Frutos que produce el árbol | entero ≥ 0 |
| `frutosComidos` | Frutos que se comen antes de sembrar | entero ≥ 0, no mayor que `frutosIniciales` |
| `semillasPorFruto` | Semillas que trae cada fruto | entero de 1 a 20 |
| `pctRaton` | % de semillas que come el ratón | entero de 0 a 100 |
| `pctGermina` | % de las semillas restantes que germinan | entero de 0 a 100 |
| `pctSobrevive` | % de las germinadas que sobreviven | entero de 0 a 100 |

Ejemplo (hay un archivo listo en [`docs/ejemplo-datos.csv`](docs/ejemplo-datos.csv)):

```csv
frutosIniciales,frutosComidos,semillasPorFruto,pctRaton,pctGermina,pctSobrevive
10,2,5,40,30,60
11,2,6,10,80,40
15,1,7,30,50,60
```

Como el simulador **ignora las columnas extra**, también puedes cargar directamente el archivo que
genera **Exportar CSV**: exportas, lo editas en Excel o en una hoja de cálculo, y lo vuelves a subir.
Los resultados (plantas finales, etc.) se recalculan siempre en el simulador, así que no hace falta
incluirlos.

> Sugerencia para hacer tu propio archivo: abre una hoja de cálculo, pon la cabecera de arriba en la
> primera fila, una tirada por fila, y guarda como CSV (separado por comas).

## Cómo se calcula cada tirada

1. **Frutos finales** = `frutosIniciales − frutosComidos`.
2. **Semillas totales** = frutos finales × `semillasPorFruto`.
3. El ratón se come `pctRaton` % de las semillas totales. Quedan las demás.
4. De las que quedan, germinan `pctGermina` %.
5. De las germinadas, sobreviven `pctSobrevive` % → **plantas finales**.

Cada paso con porcentaje se redondea (`Math.round`) antes de pasar al siguiente.

## Filtros, gráfico y estadísticas

- **Filtros** acota por origen y por número de plantas (mínimo/máximo) o por número de tirada.
  Afecta a la vez a las tarjetas, al gráfico y a las estadísticas.
- Las **estadísticas** usan las plantas finales de las tiradas **visibles**: número de tiradas,
  promedio y, con más de una, varianza muestral (denominador `n − 1`), desviación, error estándar y
  rango (promedio ± error estándar).
- **Exportar CSV** descarga todas las tiradas de la sesión con sus entradas y resultados.

## Accesibilidad

Se puede usar con teclado (hay un enlace «Saltar a los resultados») y con lector de pantalla: los
avisos de carga y los errores se anuncian, y los campos del formulario tienen etiqueta.
