export const campos = [
  { clave: 'frutosIniciales', etiqueta: 'Frutos iniciales', min: 0 },
  { clave: 'frutosComidos', etiqueta: 'Frutos comidos', min: 0 },
  { clave: 'semillasPorFruto', etiqueta: 'Semillas por fruto', min: 1, max: 20 },
  { clave: 'pctRaton', etiqueta: 'Semillas que come el ratón (%)', min: 0, max: 100, porcentaje: true },
  { clave: 'pctGermina', etiqueta: 'Semillas que germinan (%)', min: 0, max: 100, porcentaje: true },
  { clave: 'pctSobrevive', etiqueta: 'Plantas que sobreviven (%)', min: 0, max: 100, porcentaje: true },
];

export function validarEntrada(entrada) {
  const errores = {};
  for (const { clave, min, max } of campos) {
    const valor = entrada[clave];
    if (valor === '' || valor == null) errores[clave] = 'Completa este campo.';
    else if (!Number.isSafeInteger(Number(valor))) errores[clave] = 'Ingresa un número entero.';
    else if (max !== undefined && (valor < min || valor > max)) errores[clave] = `Ingresa un valor entre ${min} y ${max}.`;
    else if (valor < min) errores[clave] = `Ingresa un valor mayor o igual a ${min}.`;
  }
  if (!errores.frutosComidos && !errores.frutosIniciales && Number(entrada.frutosComidos) > Number(entrada.frutosIniciales)) {
    errores.frutosComidos = 'No puede superar los frutos iniciales.';
  }
  return { valido: Object.keys(errores).length === 0, errores };
}
