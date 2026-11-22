import { lazy, Suspense, useState, useEffect } from 'react';
import { useTiradas } from './hooks/useTiradas.js';
import ModalBienvenida from './components/ModalBienvenida.jsx';
import SimulacionVisual from './components/SimulacionVisual.jsx';
import TablaClase from './components/TablaClase.jsx';
import TablaEditable from './components/TablaEditable.jsx';
import PanelEstadisticas from './components/PanelEstadisticas.jsx';
import ExportarCsv from './components/ExportarCsv.jsx';
import ListaTiradas from './components/ListaTiradas.jsx';
import './styles/base.css';
import './styles/layout.css';
import './styles/componentes.css';
import './styles/formularios.css';
import './styles/grafico.css';

const GraficoPlantas = lazy(() => import('./components/GraficoPlantas.jsx'));

export default function App() {
  const [tab, setTab] = useState('clase');
  const datos = useTiradas();

  useEffect(() => {
    datos.cargarClase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cambiarTab(valor) {
    setTab(valor);
    if (valor === 'clase') {
      datos.setFiltros({ origen: 'clase', min: '', max: '', numero: '' });
    } else {
      datos.setFiltros({ origen: 'manual', min: '', max: '', numero: '' });
    }
  }

  return (
    <div className="pagina">
      <ModalBienvenida />
      <a className="saltar visualmente-oculto" href="#resultados">Saltar a los resultados</a>
      <header className="cabecera">
        <h1>Simulador de regeneración del bosque</h1>
        <div className="barra-herramientas">
          <ExportarCsv tiradas={datos.resultados} />
          <a className="enlace-manual" href="./MANUAL.md">Manual de usuario</a>
        </div>
      </header>

      <SimulacionVisual />

      <div className="tabs-nav" role="tablist" aria-label="Fuente de datos">
        <button
          role="tab"
          aria-selected={tab === 'clase'}
          className="tab-btn"
          onClick={() => cambiarTab('clase')}
        >
          <span className="tab-titulo">📊 Datos de clase</span>
          <span className="tab-sub">Tabla compartida del grupo</span>
        </button>
        <button
          role="tab"
          aria-selected={tab === 'propios'}
          className="tab-btn"
          onClick={() => cambiarTab('propios')}
        >
          <span className="tab-titulo">✏️ Mis datos</span>
          <span className="tab-sub">Ingresa tus mediciones</span>
        </button>
      </div>

      <div role="tabpanel" className="tab-panel">
        {tab === 'clase' ? (
          <TablaClase
            tiradas={datos.visibles}
            onGenerar={datos.generarMas}
            onRecargar={datos.cargarClase}
          />
        ) : (
          <TablaEditable
            tiradasIniciales={datos.resultados.filter((t) => t.origen === 'manual')}
            onGuardar={datos.reemplazarManual}
          />
        )}
      </div>

      <main id="resultados" tabIndex={-1}>
        <PanelEstadisticas estadisticas={datos.estadisticas} />
        <Suspense fallback={<p role="status">Cargando gráfico…</p>}>
          <GraficoPlantas tiradas={datos.visibles} estadisticas={datos.estadisticas} />
        </Suspense>
        <details className="tiradas-detalle">
          <summary>Ver tiradas detalladas ({datos.visibles.length})</summary>
          <ListaTiradas tiradas={datos.visibles} onEditar={() => {}} onEliminar={datos.eliminar} />
        </details>
      </main>
    </div>
  );
}
