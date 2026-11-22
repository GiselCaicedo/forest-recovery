export function calcularVarianza(valores, promedio) {
  if (valores.length < 2) return null;
  const suma = valores.reduce((total, valor) => total + (valor - promedio) ** 2, 0);
  return suma / (valores.length - 1);
}

export function calcularEstadisticas(valores) {
  const n = valores.length;
  const promedio = n ? valores.reduce((total, valor) => total + valor, 0) / n : null;
  const varianza = calcularVarianza(valores, promedio);
  const desviacion = varianza === null ? null : Math.sqrt(varianza);
  const error = desviacion === null ? null : desviacion / Math.sqrt(n);
  const rango = error === null ? null : [promedio - error, promedio + error];
  return { n: n || null, promedio, varianza, desviacion, error, rango };
}
