import { useState } from 'react';

const pasos = [
  { icono: '🌳', texto: 'Árbol' },
  { icono: '🍎', texto: 'Frutos' },
  { icono: '🌾', texto: 'Semillas' },
  { icono: '🐭', texto: 'Sin ratón' },
  { icono: '🌱', texto: 'Plántulas' },
  { icono: '🌲', texto: 'Plantas' },
];

export default function ModalBienvenida() {
  const [visible, setVisible] = useState(() => {
    try { return !sessionStorage.getItem('modal-bienvenida'); }
    catch { return true; }
  });

  function cerrar() {
    try { sessionStorage.setItem('modal-bienvenida', '1'); } catch {}
    setVisible(false);
  }

  function alClickFondo(e) {
    if (e.target === e.currentTarget) cerrar();
  }

  if (!visible) return null;

  return (
    <div className="fondo-modal" role="dialog" aria-modal aria-labelledby="modal-titulo" onClick={alClickFondo}>
      <article className="modal-bienvenida">
        <div className="modal-cabecera">
          <span style={{ fontSize: '2.5rem' }}>🌲</span>
          <h2 id="modal-titulo">Simulador de regeneración del bosque</h2>
        </div>
        <p>
          Este programa calcula la <strong>tasa de regeneración</strong> de un bosque después de un incendio,
          siguiendo la cadena biológica desde los frutos del árbol hasta las plantas que sobreviven.
        </p>
        <div className="modal-cadena" aria-label="Cadena de regeneración">
          {pasos.map((paso, i) => (
            <div key={paso.texto} style={{ display: 'contents' }}>
              {i > 0 && <span className="modal-flecha" aria-hidden>→</span>}
              <div className="modal-paso">
                <span className="modal-paso-icono">{paso.icono}</span>
                <span className="modal-paso-texto">{paso.texto}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="modal-nota">
          Se trabajaron <strong>6 estaciones de muestra</strong>. Cada una registra 6 variables de entrada
          (frutos iniciales, comidos, semillas por fruto y tres porcentajes) y el simulador calcula cuántas
          plantas logran establecerse.
        </p>
        <button className="primario modal-btn" onClick={cerrar} autoFocus>
          Comenzar simulación →
        </button>
      </article>
    </div>
  );
}
