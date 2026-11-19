import { campos, validarEntrada } from './validacion.js';

const clavesEntrada = campos.map(({ clave }) => clave);

// Divide una línea CSV respetando comillas dobles ("a,b" cuenta como un campo).
function dividirLinea(linea) {
  const celdas = [];
  let celda = '';
  let entreComillas = false;
  for (let i = 0; i < linea.length; i += 1) {
    const caracter = linea[i];
    if (entreComillas) {
      if (caracter === '"') {
        if (linea[i + 1] === '"') { celda += '"'; i += 1; }
        else entreComillas = false;
      } else celda += caracter;
    } else if (caracter === '"') entreComillas = true;
    else if (caracter === ',') { celdas.push(celda); celda = ''; }
    else celda += caracter;
  }
  celdas.push(celda);
  return celdas.map((valor) => valor.trim());
}

// Lee un CSV con cabecera y devuelve solo las entradas de las 6 columnas conocidas.
// Acepta columnas en cualquier orden y columnas extra (como las de resultado que exporta
// el simulador): esas se ignoran. Devuelve { entradas, errores } para avisar en la interfaz.
export function importarCsv(texto) {
  const lineas = String(texto).split(/\r\n|\n|\r/).filter((linea) => linea.trim() !== '');
  if (lineas.length < 2) {
    return { entradas: [], errores: ['El archivo no tiene filas de datos. Usa la cabecera y al menos una tirada.'] };
  }
  const cabecera = dividirLinea(lineas[0]);
  const indice = {};
  for (const clave of clavesEntrada) indice[clave] = cabecera.indexOf(clave);
  const faltan = clavesEntrada.filter((clave) => indice[clave] === -1);
  if (faltan.length) {
    return { entradas: [], errores: [`Faltan columnas en la cabecera: ${faltan.join(', ')}.`] };
  }

  const entradas = [];
  const errores = [];
  for (let i = 1; i < lineas.length; i += 1) {
    const celdas = dividirLinea(lineas[i]);
    const entrada = {};
    for (const clave of clavesEntrada) entrada[clave] = Number(celdas[indice[clave]]);
    const { valido, errores: erroresFila } = validarEntrada(entrada);
    if (valido) entradas.push(entrada);
    else errores.push(`Fila ${i + 1}: ${Object.values(erroresFila).join(' ')}`);
  }
  if (!entradas.length && !errores.length) errores.push('No se encontraron tiradas válidas.');
  return { entradas, errores };
}
