import { useState } from 'react';
import CampoNumero from './CampoNumero.jsx';
import { nombresOrigen } from './SelectorOrigen.jsx';

function FiltroPlantas({ filtros, cambiar }) {
  const rangoInvalido = filtros.min !== '' && filtros.max !== '' && Number(filtros.min) > Number(filtros.max);
  return (
    <fieldset className="rango">
      <legend>Plantas finales</legend>
      <div className="par-campos">
        <CampoNumero nombre="min-plantas" etiqueta="Mínimo" valor={filtros.min} requerido={false}
          onChange={(valor) => cambiar('min', valor)} />
        <CampoNumero nombre="max-plantas" etiqueta="Máximo" valor={filtros.max} requerido={false}
          enviado error={rangoInvalido ? 'Debe ser mayor o igual al mínimo.' : undefined}
          onChange={(valor) => cambiar('max', valor)} />
      </div>
    </fieldset>
  );
}

export default function Filtros({ filtros, onChange, onLimpiar }) {
  const [abierto, setAbierto] = useState(() => matchMedia('(min-width: 52rem)').matches);

  function cambiar(clave, valor) {
    onChange((actual) => ({ ...actual, [clave]: valor }));
  }

  return (
    <details className="filtros" open={abierto} onToggle={(event) => setAbierto(event.currentTarget.open)}>
      <summary>Filtros</summary>
      <div className="formulario">
        <div className="campo">
          <label htmlFor="filtro-origen">Origen de las tiradas</label>
          <select id="filtro-origen" value={filtros.origen} onChange={(event) => cambiar('origen', event.target.value)}>
            <option value="">Todos</option>
            {Object.entries(nombresOrigen).map(([clave, nombre]) => <option key={clave} value={clave}>{nombre}</option>)}
          </select>
        </div>
        <FiltroPlantas filtros={filtros} cambiar={cambiar} />
        <CampoNumero nombre="filtro-numero" etiqueta="Número de tirada" valor={filtros.numero} min={1}
          requerido={false} onChange={(valor) => cambiar('numero', valor)} />
        <div className="acciones-filtros">
          <button type="button" onClick={() => onChange({ origen: '', min: '', max: '', numero: '' })}>Quitar filtros</button>
          <button type="button" onClick={onLimpiar}>Limpiar todo</button>
        </div>
      </div>
    </details>
  );
}
