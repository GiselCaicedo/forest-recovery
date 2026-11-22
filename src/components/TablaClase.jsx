import { useState } from 'react';

const colsEntrada = [
  { clave: 'frutosIniciales', label: 'Frutos árbol' },
  { clave: 'frutosComidos', label: 'Frutos comidos' },
  { clave: 'semillasPorFruto', label: 'Sem./fruto' },
  { clave: 'pctRaton', label: '% ratón' },
  { clave: 'pctGermina', label: '% germina' },
  { clave: 'pctSobrevive', label: '% sobrevive' },
];

const colsResultado = [
  { clave: 'frutosFinales', label: 'Fr. finales' },
  { clave: 'semillasTotales', label: 'Sem. totales' },
  { clave: 'comidasRaton', label: 'Come ratón' },
  { clave: 'semillasQuedan', label: 'Sem. quedan' },
  { clave: 'germinan', label: 'Germinan' },
];

export default function TablaClase({ tiradas, onGenerar, onRecargar }) {
  const [cantidad, setCantidad] = useState(12);
  const [error, setError] = useState('');
  const [verDetalle, setVerDetalle] = useState(false);

  function enviar(e) {
    e.preventDefault();
    const n = Number(cantidad);
    if (!Number.isInteger(n) || n < 1 || n > 50) {
      setError('Ingresa un número entre 1 y 50.');
      return;
    }
    setError('');
    onGenerar(n);
  }

  if (tiradas.length === 0) {
    return (
      <div className="tab-vacio">
        <p>No hay datos cargados.</p>
        <button className="primario" onClick={onRecargar}>Cargar tabla de clase</button>
      </div>
    );
  }

  return (
    <div className="tabla-clase-wrap">
      <div className="tabla-clase-cabecera">
        <span className="conteo-tiradas">{tiradas.length} tiradas</span>
        <label className="toggle-detalle">
          <input
            type="checkbox"
            checked={verDetalle}
            onChange={(e) => setVerDetalle(e.target.checked)}
          />
          Ver cálculo completo
        </label>
      </div>

      <div className="tabla-envolvente">
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>#</th>
              {colsEntrada.map((c) => <th key={c.clave}>{c.label}</th>)}
              {verDetalle && (
                <>
                  <th className="col-sep">→</th>
                  {colsResultado.map((c) => <th key={c.clave} className="col-resultado">{c.label}</th>)}
                </>
              )}
              <th className="col-plantas-th">🌲 Plantas</th>
            </tr>
          </thead>
          <tbody>
            {tiradas.map((t) => (
              <tr key={t.id}>
                <td>{t.numero}</td>
                {colsEntrada.map((c) => <td key={c.clave}>{t.entrada[c.clave]}</td>)}
                {verDetalle && (
                  <>
                    <td className="col-sep">→</td>
                    {colsResultado.map((c) => (
                      <td key={c.clave} className="col-resultado celda-resultado-num">
                        {t.resultado[c.clave]}
                      </td>
                    ))}
                  </>
                )}
                <td className="col-plantas-td tiene-resultado">
                  <strong>{t.resultado.plantasFinales}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="generar-mas-wrap">
        <div className="generar-form">
          <button type="button" className="secundario" onClick={onRecargar}>
            ↺ Recargar tabla inicial
          </button>
          <div className="generar-extra">
            <label htmlFor="cantidad-generar">Generar</label>
            <input
              id="cantidad-generar"
              type="number"
              min={1}
              max={50}
              value={cantidad}
              onChange={(e) => { setCantidad(e.target.value); setError(''); }}
            />
            <span className="tiradas-label">tiradas aleatorias</span>
            <button className="primario" onClick={enviar}>Generar</button>
          </div>
        </div>
        {error && <p className="error-inline">{error}</p>}
      </div>
    </div>
  );
}
