import { campos } from './validacion.js';

export const rangosPorDefecto = {
  frutosIniciales: [8, 15],
  frutosComidos: [0, 4],
  semillasPorFruto: [5, 9],
  pctRaton: [10, 50],
  pctGermina: [20, 90],
  pctSobrevive: [40, 90],
};

function sortear(min, max, aleatorio, paso = 1) {
  const primero = Math.ceil(min / paso);
  const ultimo = Math.floor(max / paso);
  return (primero + Math.floor(aleatorio() * (ultimo - primero + 1))) * paso;
}

export function validarRangos(rangos) {
  const errores = {};
  for (const { clave, min, max, porcentaje } of campos) {
    const limite = rangos[clave];
    const [inicio, fin] = Array.isArray(limite) ? limite : [];
    if (!Number.isSafeInteger(inicio) || !Number.isSafeInteger(fin) || inicio < min || fin > (max ?? Infinity)) {
      errores[clave] = max === undefined ? 'Ingresa dos enteros no negativos.' : `Ingresa dos enteros entre ${min} y ${max}.`;
    } else if (inicio > fin) errores[clave] = 'El mínimo no puede superar el máximo.';
    else if (porcentaje && Math.ceil(inicio / 10) > Math.floor(fin / 10)) {
      errores[clave] = 'Incluye al menos un múltiplo de 10.';
    }
  }
  if (!errores.frutosIniciales && !errores.frutosComidos && rangos.frutosComidos[0] > rangos.frutosIniciales[1]) {
    errores.frutosComidos = 'El mínimo de comidos supera el máximo de frutos iniciales.';
  }
  return errores;
}

export function generarTiradasPrueba(cantidad, rangos = rangosPorDefecto, aleatorio = Math.random) {
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 50) throw new RangeError('Usa entre 1 y 50 tiradas.');
  if (Object.keys(validarRangos(rangos)).length) throw new RangeError('Revisa los rangos de prueba.');

  return Array.from({ length: cantidad }, () => {
    const entrada = {};
    for (const { clave, porcentaje } of campos) {
      let [min, max] = rangos[clave];
      if (clave === 'frutosIniciales') min = Math.max(min, rangos.frutosComidos[0]);
      if (clave === 'frutosComidos') max = Math.min(max, entrada.frutosIniciales);
      entrada[clave] = sortear(min, max, aleatorio, porcentaje ? 10 : 1);
    }
    return entrada;
  });
}
