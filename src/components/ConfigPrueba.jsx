import { useState } from 'react';
import { useAnuncioErrores } from '../hooks/useAnuncioErrores.js';
import { validarRangos } from '../domain/generador.js';
import { campos } from '../domain/validacion.js';
import CampoNumero, { enfocarCampo } from './CampoNumero.jsx';

function CampoRango({ campo, rango, error, enviado, onChange }) {
  const { clave, etiqueta, min, max } = campo;
  return (
    <fieldset className="rango">
      <legend>{etiqueta}</legend>
      <div className="par-campos">
        <CampoNumero nombre={`${clave}-0`} etiqueta="Mínimo" min={min} max={max}
          valor={rango[0]} error={error} enviado={enviado} onChange={(valor) => onChange(0, valor)} />
        <CampoNumero nombre={`${clave}-1`} etiqueta="Máximo" min={min} max={max}
          valor={rango[1]} error={error} enviado={enviado} onChange={(valor) => onChange(1, valor)} />
      </div>
    </fieldset>
  );
}

function useConfigPrueba(configuracion, onGenerar) {
  const [cantidad, setCantidad] = useState(configuracion.cantidad);
  const [rangos, setRangos] = useState(configuracion.rangos);
  const [enviado, setEnviado] = useState(false);
  const errorCantidad = Number.isInteger(Number(cantidad)) && cantidad >= 1 && cantidad <= 50
    ? undefined : 'Ingresa entre 1 y 50 tiradas.';
  const rangosNumericos = Object.fromEntries(Object.entries(rangos).map(([clave, limites]) => [
    clave, limites.map((valor) => valor === '' ? NaN : Number(valor)),
  ]));
  const errores = validarRangos(rangosNumericos);

  function enviar(event) {
    event.preventDefault();
    const [primerRango] = Object.keys(errores);
    if (errorCantidad || primerRango) {
      setEnviado(true);
      enfocarCampo(event.currentTarget, errorCantidad ? 'cantidad' : `${primerRango}-0`);
      return;
    }
    setEnviado(false);
    onGenerar({ cantidad: Number(cantidad), rangos: rangosNumericos });
  }

  return { cantidad, setCantidad, rangos, setRangos, enviado, errorCantidad, errores, enviar };
}

export default function ConfigPrueba({ configuracion, generadas, onGenerar }) {
  const { cantidad, setCantidad, rangos, setRangos, enviado, errorCantidad, errores, enviar } =
    useConfigPrueba(configuracion, onGenerar);
  const { mensaje, anunciar } = useAnuncioErrores();

  return (
    <section aria-labelledby="titulo-prueba">
      <h2 id="titulo-prueba">Datos de prueba</h2>
      <form className="formulario" noValidate onSubmit={enviar} onBlur={anunciar}>
        <p className="visualmente-oculto" role="status">{mensaje}</p>
        <CampoNumero nombre="cantidad" etiqueta="Número de tiradas" min={1} max={50} valor={cantidad}
          error={errorCantidad} enviado={enviado} onChange={setCantidad} />
        <details className="config-rangos">
          <summary>Rangos de generación</summary>
          <p>Los porcentajes se sortean en múltiplos de 10.</p>
          {campos.map((campo) => (
            <CampoRango key={campo.clave} campo={campo} rango={rangos[campo.clave]}
              error={errores[campo.clave]} enviado={enviado} onChange={(indice, valor) => {
                setRangos((actual) => ({
                  ...actual, [campo.clave]: actual[campo.clave].map((limite, i) => i === indice ? valor : limite),
                }));
              }} />
          ))}
        </details>
        <button className="primario" type="submit">{generadas ? 'Generar de nuevo' : 'Generar tiradas'}</button>
      </form>
    </section>
  );
}
