import { nombresOrigen } from './SelectorOrigen.jsx';

export default function TarjetaTirada({ tirada, acciones }) {
  const { entrada, resultado, numero, origen } = tirada;
  return (
    <article className="tarjeta" aria-labelledby={`tirada-${numero}`}>
      <header className="tarjeta-titulo">
        <h3 id={`tirada-${numero}`}>Tirada #{numero}</h3>
        <span>{nombresOrigen[origen]}</span>
      </header>
      <dl className="cadena">
        <div><dt>Frutos iniciales</dt><dd>{entrada.frutosIniciales}</dd></div>
        <div><dt>Frutos comidos</dt><dd>{entrada.frutosComidos}</dd></div>
        <div><dt>Frutos finales</dt><dd>{resultado.frutosFinales}</dd></div>
        <div><dt>Semillas por fruto</dt><dd>{entrada.semillasPorFruto}</dd></div>
        <div><dt>Parto de semillas</dt><dd>{resultado.semillasTotales}</dd></div>
        <div><dt>El ratón se come el {entrada.pctRaton} %</dt><dd>{resultado.comidasRaton}</dd></div>
        <div><dt>Semillas que quedan</dt><dd>{resultado.semillasQuedan}</dd></div>
        <div><dt>Germina el {entrada.pctGermina} %</dt><dd>{resultado.germinan}</dd></div>
      </dl>
      <p className="supervivencia">
        <span>Sobrevive el {entrada.pctSobrevive} %</span>
        <strong>{resultado.plantasFinales} {resultado.plantasFinales === 1 ? 'planta' : 'plantas'}</strong>
      </p>
      {acciones}
    </article>
  );
}
