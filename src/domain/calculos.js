export function calcularTirada(entrada) {
  const { frutosIniciales, frutosComidos, semillasPorFruto, pctRaton, pctGermina, pctSobrevive } = entrada;
  const frutosFinales = frutosIniciales - frutosComidos;
  const semillasTotales = frutosFinales * semillasPorFruto;
  // Cada etapa usa el resultado entero de la anterior.
  const comidasRaton = Math.round(semillasTotales * pctRaton / 100);
  const semillasQuedan = semillasTotales - comidasRaton;
  const germinan = Math.round(semillasQuedan * pctGermina / 100);
  const plantasFinales = Math.round(germinan * pctSobrevive / 100);
  return { frutosFinales, semillasTotales, comidasRaton, semillasQuedan, germinan, plantasFinales };
}
