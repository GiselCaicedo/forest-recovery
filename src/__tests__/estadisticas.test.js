import { expect, it } from 'vitest';
import { calcularEstadisticas } from '../domain/estadisticas.js';

it('reproduce las estadísticas de la clase a dos decimales', () => {
  const { n, promedio, varianza, desviacion, error, rango } = calcularEstadisticas([8, 1, 4, 9, 9, 50]);
  expect(n).toBe(6);
  expect([promedio, varianza, desviacion, error, ...rango].map((valor) => valor.toFixed(2)))
    .toEqual(['13.50', '329.90', '18.16', '7.42', '6.08', '20.92']);
});

it('deja sin definir la dispersión de una sola tirada', () => {
  expect(calcularEstadisticas([8])).toEqual({
    n: 1, promedio: 8, varianza: null, desviacion: null, error: null, rango: null,
  });
});

it('deja todas las estadísticas sin definir si no hay tiradas', () => {
  expect(Object.values(calcularEstadisticas([]))).toEqual(Array(6).fill(null));
});
