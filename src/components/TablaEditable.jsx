import { useState } from 'react';
import { validarEntrada } from '../domain/validacion.js';
import { calcularTirada } from '../domain/calculos.js';

const NUM_FILAS = 6;

const cols = [
  { clave: 'frutosIniciales', label: 'Frutos del árbol', min: 0, ayuda: 'ej. 15' },
  { clave: 'frutosComidos', label: 'Frutos comidos', min: 0, ayuda: 'ej. 2' },
  { clave: 'semillasPorFruto', label: 'Semillas / fruto', min: 1, max: 20, ayuda: 'ej. 6' },
  { clave: 'pctRaton', label: '% come ratón', min: 0, max: 100, ayuda: 'ej. 40' },
  { clave: 'pctGermina', label: '% germina', min: 0, max: 100, ayuda: 'ej. 50' },
  { clave: 'pctSobrevive', label: '% sobrevive', min: 0, max: 100, ayuda: 'ej. 60' },
];

function filaVacia() {
  return Object.fromEntries(cols.map((c) => [c.clave, '']));
}

function parsear(fila) {
  return Object.fromEntries(Object.entries(fila).map(([k, v]) => [k, v === '' ? '' : Number(v)]));
}

function esCompleta(fila) {
  return cols.every((c) => fila[c.clave] !== '');
}

function calcularFila(fila) {
  if (!esCompleta(fila)) return null;
  const nums = parsear(fila);
  const { valido } = validarEntrada(nums);
  return valido ? calcularTirada(nums) : null;
}

export default function TablaEditable({ tiradasIniciales, onGuardar }) {
  const [filas, setFilas] = useState(() => {
    const base = Array.from({ length: NUM_FILAS }, filaVacia);
    tiradasIniciales.slice(0, NUM_FILAS).forEach((t, i) => {
      base[i] = Object.fromEntries(cols.map((c) => [c.clave, String(t.entrada[c.clave])]));
    });
    return base;
  });

  function cambiar(filaIdx, clave, valor) {
    setFilas((prev) => prev.map((f, i) => i === filaIdx ? { ...f, [clave]: valor } : f));
  }

  function limpiar() {
    setFilas(Array.from({ length: NUM_FILAS }, filaVacia));
  }

  function calcular() {
    const validas = filas
      .filter(esCompleta)
      .map(parsear)
      .filter((e) => validarEntrada(e).valido);
    if (validas.length > 0) onGuardar(validas);
  }

  const listas = filas.filter((f) => {
    if (!esCompleta(f)) return false;
    return validarEntrada(parsear(f)).valido;
  }).length;

  return (
    <div className="tabla-editable-wrap">
      <p className="instruccion-tabla">
        Escribe los datos de cada estación de muestra. Los resultados se calculan automáticamente.
      </p>
      <div className="tabla-envolvente">
        <table className="tabla-datos tabla-entrada">
          <thead>
            <tr>
              <th className="col-estacion">Estación</th>
              {cols.map((c) => <th key={c.clave}>{c.label}</th>)}
              <th className="col-plantas-th">🌲 Plantas</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, i) => {
              const resultado = calcularFila(fila);
              return (
                <tr key={i} className={resultado ? 'fila-lista' : ''}>
                  <td className="col-estacion-td">{i + 1}</td>
                  {cols.map((c) => (
                    <td key={c.clave} className="celda-entrada">
                      <input
                        type="number"
                        min={c.min}
                        max={c.max}
                        value={fila[c.clave]}
                        placeholder={c.ayuda}
                        aria-label={`${c.label}, estación ${i + 1}`}
                        onChange={(e) => cambiar(i, c.clave, e.target.value)}
                      />
                    </td>
                  ))}
                  <td className={`col-plantas-td ${resultado ? 'tiene-resultado' : ''}`}>
                    {resultado
                      ? <strong>{resultado.plantasFinales}</strong>
                      : <span className="pendiente">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="acciones-tabla">
        <button
          className="primario btn-calcular"
          onClick={calcular}
          disabled={listas === 0}
        >
          Calcular resultados ({listas} de {NUM_FILAS} listas)
        </button>
        <button className="btn-limpiar" onClick={limpiar}>
          Limpiar todo
        </button>
      </div>
    </div>
  );
}
