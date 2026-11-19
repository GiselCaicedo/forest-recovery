import { describe, expect, it } from 'vitest';
import { importarCsv } from '../domain/importarCsv.js';

const cabecera = 'frutosIniciales,frutosComidos,semillasPorFruto,pctRaton,pctGermina,pctSobrevive';

describe('importarCsv', () => {
  it('lee las seis columnas de entrada de un CSV con solo la cabecera de entrada', () => {
    const { entradas, errores } = importarCsv(`${cabecera}\n15,2,9,20,40,80\n13,3,9,20,40,80\n`);
    expect(errores).toEqual([]);
    expect(entradas).toEqual([
      { frutosIniciales: 15, frutosComidos: 2, semillasPorFruto: 9, pctRaton: 20, pctGermina: 40, pctSobrevive: 80 },
      { frutosIniciales: 13, frutosComidos: 3, semillasPorFruto: 9, pctRaton: 20, pctGermina: 40, pctSobrevive: 80 },
    ]);
  });

  it('ignora columnas extra y acepta cualquier orden (como el CSV que exporta el simulador)', () => {
    const texto = 'numero,origen,frutosComidos,frutosIniciales,semillasPorFruto,pctRaton,pctGermina,pctSobrevive,plantasFinales\r\n'
      + '1,manual,2,15,9,20,40,80,30\r\n';
    const { entradas, errores } = importarCsv(texto);
    expect(errores).toEqual([]);
    expect(entradas).toEqual([
      { frutosIniciales: 15, frutosComidos: 2, semillasPorFruto: 9, pctRaton: 20, pctGermina: 40, pctSobrevive: 80 },
    ]);
  });

  it('avisa cuando falta una columna de entrada', () => {
    const { entradas, errores } = importarCsv('frutosIniciales,frutosComidos\n15,2\n');
    expect(entradas).toEqual([]);
    expect(errores[0]).toMatch(/Faltan columnas/);
  });

  it('reporta las filas inválidas y conserva las válidas', () => {
    const { entradas, errores } = importarCsv(`${cabecera}\n15,2,9,20,40,80\n15,20,9,20,40,80\n`);
    expect(entradas).toHaveLength(1);
    expect(errores).toHaveLength(1);
    expect(errores[0]).toMatch(/Fila 3/);
  });

  it('avisa cuando el archivo no tiene filas de datos', () => {
    const { entradas, errores } = importarCsv(`${cabecera}\n`);
    expect(entradas).toEqual([]);
    expect(errores[0]).toMatch(/no tiene filas/);
  });
});
