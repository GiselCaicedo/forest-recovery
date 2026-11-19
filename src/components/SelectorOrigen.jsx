export const nombresOrigen = { cargar: 'Cargar datos', prueba: 'Prueba', manual: 'Manual' };

export default function SelectorOrigen({ origen, onChange, opciones = ['cargar'] }) {
  return (
    <fieldset className="selector-origen">
      <legend>Origen de los datos</legend>
      <div className="opciones-origen">
        {opciones.map((clave) => (
          <label key={clave}>
            <input type="radio" name="origen" value={clave} checked={clave === origen} onChange={() => onChange(clave)} />
            <span>{nombresOrigen[clave]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
