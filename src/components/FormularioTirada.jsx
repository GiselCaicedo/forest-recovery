import { useEffect, useRef, useState } from 'react';
import { useAnuncioErrores } from '../hooks/useAnuncioErrores.js';
import { campos, validarEntrada } from '../domain/validacion.js';
import CampoNumero, { enfocarCampo } from './CampoNumero.jsx';

const entradaVacia = Object.fromEntries(campos.map(({ clave }) => [clave, '']));

function CamposTirada({ entrada, errores, enviado, onChange }) {
  return campos.map(({ clave, etiqueta, min, max }) => (
    <CampoNumero key={clave} nombre={clave} etiqueta={etiqueta} min={min}
      max={clave === 'frutosComidos' ? (entrada.frutosIniciales === '' ? undefined : entrada.frutosIniciales) : max}
      valor={entrada[clave]} error={errores[clave]} enviado={enviado}
      onChange={(valor) => onChange(clave, valor)} />
  ));
}

export default function FormularioTirada({ edicion, onGuardar, onCancelar }) {
  const [entrada, setEntrada] = useState(edicion?.entrada ?? entradaVacia);
  const [enviado, setEnviado] = useState(false);
  const titulo = useRef(null);
  const { valido, errores } = validarEntrada(entrada);

  useEffect(() => { if (edicion) titulo.current.focus(); }, [edicion]);

  function enviar(event) {
    event.preventDefault();
    if (!valido) {
      setEnviado(true);
      enfocarCampo(event.currentTarget, Object.keys(errores)[0]);
      return;
    }
    onGuardar(Object.fromEntries(campos.map(({ clave }) => [clave, Number(entrada[clave])])), edicion?.id);
  }

  const { mensaje, anunciar } = useAnuncioErrores();

  return (
    <section aria-labelledby="titulo-manual">
      <h2 ref={titulo} tabIndex={-1} id="titulo-manual">{edicion ? `Editar tirada #${edicion.numero}` : 'Nueva tirada'}</h2>
      <form className="formulario" noValidate onSubmit={enviar} onBlur={anunciar}>
        <p className="visualmente-oculto" role="status">{mensaje}</p>
        <CamposTirada entrada={entrada} errores={errores} enviado={enviado}
          onChange={(clave, valor) => setEntrada((actual) => ({ ...actual, [clave]: valor }))} />
        <button className="primario" type="submit">{edicion ? 'Guardar cambios' : 'Agregar tirada'}</button>
        {edicion && <button type="button" onClick={onCancelar}>Cancelar edición</button>}
      </form>
    </section>
  );
}
