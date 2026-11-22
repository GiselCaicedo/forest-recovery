import { useState } from 'react';
import { datosClase } from '../data/datosClase.js';

const cabeceras = ['#', 'Fr. ini.', 'Fr. com.', 'Sem/fr', '% Ratón', '% Germ.', '% Sobr.'];
const claves = ['frutosIniciales', 'frutosComidos', 'semillasPorFruto', 'pctRaton', 'pctGermina', 'pctSobrevive'];

export default function GenerarMas({ onGenerar, onRecargar }) {
  const [cantidad, setCantidad] = useState(12);
  const [enviado, setEnviado] = useState(false);
  const errorCantidad = Number.isInteger(Number(cantidad)) && Number(cantidad) >= 1 && Number(cantidad) <= 50
    ? undefined : 'Ingresa entre 1 y 50.';

  function enviar(event) {
    event.preventDefault();
    if (errorCantidad) { setEnviado(true); return; }
    setEnviado(false);
    onGenerar(Number(cantidad));
  }

  return (
    <section className="generar-mas" aria-labelledby="titulo-clase">
      <h2 id="titulo-clase">Tabla de clase</h2>
      <div className="tabla-clase-envolvente">
        <table className="tabla-clase">
          <thead>
            <tr>{cabeceras.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {datosClase.map((fila, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                {claves.map((clave) => <td key={clave}>{fila[clave]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" className="secundario boton-recargar" onClick={onRecargar}>
        Recargar tabla inicial
      </button>
      <form className="formulario" noValidate onSubmit={enviar}>
        <div className="campo">
          <label htmlFor="cantidad-mas">Tiradas a agregar</label>
          <input
            id="cantidad-mas"
            type="number"
            min={1}
            max={50}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            aria-describedby={enviado && errorCantidad ? 'error-cantidad-mas' : undefined}
          />
          {enviado && errorCantidad && (
            <p id="error-cantidad-mas" role="alert" className="error-campo">{errorCantidad}</p>
          )}
        </div>
        <button className="primario" type="submit">Generar más tiradas</button>
      </form>
    </section>
  );
}
