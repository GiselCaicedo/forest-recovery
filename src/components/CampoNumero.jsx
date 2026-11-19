import { useId, useState } from 'react';

export default function CampoNumero({ nombre, etiqueta, valor, onChange, error, enviado, min = 0, max, requerido = true }) {
  const id = useId();
  const [visitado, setVisitado] = useState(false);
  const mostrar = Boolean(error && (visitado || enviado));
  return (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      <input
        id={id} name={nombre} type="number" inputMode="numeric" step={1}
        required={requerido} min={min} max={max} value={valor}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => setVisitado(true)}
        aria-invalid={mostrar} aria-describedby={mostrar ? `${id}-error` : undefined}
      />
      {mostrar && <span className="error-campo" id={`${id}-error`}>{error}</span>}
    </div>
  );
}

export function enfocarCampo(formulario, nombre) {
  requestAnimationFrame(() => {
    const campo = formulario.elements.namedItem(nombre);
    const detalles = campo?.closest('details');
    if (detalles) detalles.open = true;
    campo?.focus();
  });
}
