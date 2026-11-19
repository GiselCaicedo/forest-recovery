import { campos } from './validacion.js';

const entradas = campos.map(({ clave }) => clave);
const resultados = ['frutosFinales', 'semillasTotales', 'comidasRaton', 'semillasQuedan', 'germinan', 'plantasFinales'];
const cabecera = ['numero', 'origen', ...entradas, ...resultados];

export function convertirACsv(tiradas) {
  const filas = tiradas.map(({ numero, origen, entrada, resultado }) => [
    numero, origen, ...entradas.map((campo) => entrada[campo]), ...resultados.map((campo) => resultado[campo]),
  ]);
  return [cabecera, ...filas].map((fila) => fila.join(',')).join('\r\n') + '\r\n';
}
