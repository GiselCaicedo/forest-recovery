import { describe, expect, it } from 'vitest';
import { calcularTirada } from '../domain/calculos.js';
import { datosClase } from '../data/datosClase.js';

describe('calcularTirada', () => {
  it.each([
    [[15, 2, 9, 20, 40, 80], [13, 117, 23, 94, 38, 30]],
    [[13, 3, 9, 20, 40, 80], [10, 90, 18, 72, 29, 23]],
    [[12, 4, 9, 20, 90, 50], [8, 72, 14, 58, 52, 26]],
  ])('reproduce la tirada del prototipo %j', (entrada, esperado) => {
    const [frutosIniciales, frutosComidos, semillasPorFruto, pctRaton, pctGermina, pctSobrevive] = entrada;
    const [frutosFinales, semillasTotales, comidasRaton, semillasQuedan, germinan, plantasFinales] = esperado;
    expect(calcularTirada({ frutosIniciales, frutosComidos, semillasPorFruto, pctRaton, pctGermina, pctSobrevive }))
      .toEqual({ frutosFinales, semillasTotales, comidasRaton, semillasQuedan, germinan, plantasFinales });
  });

  it('reproduce los seis resultados de clase', () => {
    expect(datosClase.map((entrada) => calcularTirada(entrada).plantasFinales)).toEqual([8, 1, 4, 9, 9, 50]);
  });
});
