import { expect, it } from 'vitest';
import { generarTiradasPrueba, rangosPorDefecto } from '../domain/generador.js';

it.each([0, 0.5, 0.999])('genera tiradas válidas y repetibles con %s', (valor) => {
  const rangos = { ...rangosPorDefecto, frutosIniciales: [0, 15], frutosComidos: [6, 15], pctRaton: [11, 29] };
  const tiradas = generarTiradasPrueba(50, rangos, () => valor);
  expect(tiradas).toEqual(generarTiradasPrueba(50, rangos, () => valor));
  expect(tiradas).toHaveLength(50);
  for (const tirada of tiradas) {
    for (const [clave, [min, max]] of Object.entries(rangos)) {
      expect(tirada[clave]).toBeGreaterThanOrEqual(min);
      expect(tirada[clave]).toBeLessThanOrEqual(max);
      if (clave.startsWith('pct')) expect(tirada[clave] % 10).toBe(0);
    }
    expect(tirada.frutosComidos).toBeLessThanOrEqual(tirada.frutosIniciales);
  }
});

it('rechaza rangos incompatibles y tamaños fuera de los límites', () => {
  expect(() => generarTiradasPrueba(51)).toThrow(RangeError);
  expect(() => generarTiradasPrueba(1, { ...rangosPorDefecto, pctRaton: [11, 19] })).toThrow(RangeError);
  expect(() => generarTiradasPrueba(1, { ...rangosPorDefecto, frutosComidos: [16, 18] })).toThrow(RangeError);
});
