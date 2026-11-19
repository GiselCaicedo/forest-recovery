import { expect, it } from 'vitest';
import { datosClase } from '../data/datosClase.js';
import { validarEntrada } from '../domain/validacion.js';

it('acepta cero frutos y porcentajes en sus extremos', () => {
  const entrada = { frutosIniciales: 0, frutosComidos: 0, semillasPorFruto: 1, pctRaton: 0, pctGermina: 100, pctSobrevive: 0 };
  expect(validarEntrada(entrada)).toEqual({ valido: true, errores: {} });
});

it.each([
  ['frutosIniciales', ''], ['frutosComidos', 16], ['frutosComidos', -1],
  ['semillasPorFruto', 0], ['semillasPorFruto', 21], ['pctRaton', 101],
  ['pctGermina', -1], ['pctSobrevive', 50.5],
])('rechaza %s = %s', (clave, valor) => {
  const { valido, errores } = validarEntrada({ ...datosClase[0], [clave]: valor });
  expect(valido).toBe(false);
  expect(errores[clave]).toBeTruthy();
});
