export const datosClase = [
  [15, 13, 6, 40, 40, 40],
  [8, 6, 6, 60, 10, 80],
  [8, 6, 5, 50, 50, 50],
  [15, 12, 6, 30, 30, 60],
  [12, 10, 6, 40, 50, 50],
  [15, 14, 8, 20, 80, 70],
].map(([frutosIniciales, frutosFinales, semillasPorFruto, pctRaton, pctGermina, pctSobrevive]) => ({
  frutosIniciales,
  frutosComidos: frutosIniciales - frutosFinales,
  semillasPorFruto,
  pctRaton,
  pctGermina,
  pctSobrevive,
}));
