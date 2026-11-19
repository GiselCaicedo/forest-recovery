import TarjetaTirada from './TarjetaTirada.jsx';

export default function ListaTiradas({ tiradas, onEditar, onEliminar }) {
  return (
    <section aria-labelledby="titulo-tiradas">
      <h2 id="titulo-tiradas" tabIndex={-1}>Tiradas</h2>
      {tiradas.length === 0 && <p className="vacio">No hay tiradas para mostrar.</p>}
      <div className="tiradas">
        {tiradas.map((tirada) => (
          <TarjetaTirada key={tirada.id} tirada={tirada} acciones={
            <div className="acciones-tarjeta">
              <button type="button" id={`editar-${tirada.id}`} aria-label={`Editar tirada #${tirada.numero}`}
                onClick={() => onEditar(tirada)}>Editar</button>
              <button type="button" aria-label={`Eliminar tirada #${tirada.numero}`}
                onClick={() => onEliminar(tirada.id)}>Eliminar</button>
            </div>
          } />
        ))}
      </div>
    </section>
  );
}
