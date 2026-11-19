import { lazy, Suspense, useState } from 'react';
import { useTiradas } from './hooks/useTiradas.js';
import SelectorOrigen from './components/SelectorOrigen.jsx';
import CargarDatos from './components/CargarDatos.jsx';
import ListaTiradas from './components/ListaTiradas.jsx';
import PanelEstadisticas from './components/PanelEstadisticas.jsx';
import ConfigPrueba from './components/ConfigPrueba.jsx';
import FormularioTirada from './components/FormularioTirada.jsx';
import Filtros from './components/Filtros.jsx';
import ExportarCsv from './components/ExportarCsv.jsx';
import './styles/base.css';
import './styles/layout.css';
import './styles/componentes.css';
import './styles/formularios.css';
import './styles/grafico.css';

const GraficoPlantas = lazy(() => import('./components/GraficoPlantas.jsx'));

function enfocarTirada(id) {
  requestAnimationFrame(() => {
    (document.getElementById(`editar-${id}`) ?? document.getElementById('titulo-tiradas')).focus();
  });
}

function ControlesOrigen({ origen, datos, edicion, setEdicion }) {
  const [version, setVersion] = useState(0);
  if (edicion || origen === 'manual') {
    function cerrarEdicion() {
      setEdicion(null);
      if (edicion) enfocarTirada(edicion.id);
    }
    return <FormularioTirada key={edicion?.id ?? version} edicion={edicion} onCancelar={cerrarEdicion}
      onGuardar={(entrada, id) => {
        datos.guardar(entrada, id);
        cerrarEdicion();
        setVersion((actual) => actual + 1);
        if (!id) requestAnimationFrame(() => document.getElementById('titulo-manual')?.focus());
      }} />;
  }
  if (origen === 'prueba') {
    return <ConfigPrueba configuracion={datos.configuracion}
      generadas={datos.resultados.some((tirada) => tirada.origen === 'prueba')} onGenerar={datos.generarPrueba} />;
  }
  return <CargarDatos onCargar={datos.cargarArchivo} />;
}

function Controles({ origen, datos, edicion, setEdicion, cambiarOrigen }) {
  function limpiar() {
    if (window.confirm('¿Borrar todas las tiradas y restablecer los rangos de generación?')) {
      datos.limpiar();
      cambiarOrigen('cargar');
    }
  }
  return (
    <aside className="barra-lateral" aria-label="Controles de la simulación">
      <ControlesOrigen origen={origen} datos={datos} edicion={edicion} setEdicion={setEdicion} />
      <Filtros filtros={datos.filtros} onChange={datos.setFiltros} onLimpiar={limpiar} />
      {!datos.almacenado && <p role="status">No se pudo guardar en este navegador.</p>}
    </aside>
  );
}

function Resultados({ datos, onEditar, onEliminar }) {
  const cantidad = datos.visibles.length;
  return (
    <main className="resultados" id="resultados" tabIndex={-1}>
      <p className="visualmente-oculto" role="status">
        {cantidad === 1 ? 'Una tirada visible' : `${cantidad} tiradas visibles`}
      </p>
      <PanelEstadisticas estadisticas={datos.estadisticas} />
      <Suspense fallback={<p role="status">Cargando gráfico…</p>}>
        <GraficoPlantas tiradas={datos.visibles} estadisticas={datos.estadisticas} />
      </Suspense>
      <ListaTiradas tiradas={datos.visibles} onEditar={onEditar} onEliminar={onEliminar} />
    </main>
  );
}

export default function App() {
  const [origen, setOrigen] = useState('cargar');
  const [edicion, setEdicion] = useState(null);
  const datos = useTiradas();

  function cambiarOrigen(valor) {
    setOrigen(valor);
    setEdicion(null);
    datos.setFiltros({ origen: valor, min: '', max: '', numero: '' });
  }

  function eliminar(id) {
    const indice = datos.visibles.findIndex((tirada) => tirada.id === id);
    const vecina = datos.visibles[indice + 1] ?? datos.visibles[indice - 1];
    if (edicion?.id === id) setEdicion(null);
    datos.eliminar(id);
    enfocarTirada(vecina?.id);
  }

  return (
    <div className="pagina">
      <a className="saltar visualmente-oculto" href="#resultados">Saltar a los resultados</a>
      <header className="cabecera">
        <h1>Simulador de regeneración del bosque</h1>
        <div className="barra-herramientas">
          <SelectorOrigen origen={origen} opciones={['cargar', 'prueba', 'manual']} onChange={cambiarOrigen} />
          <ExportarCsv tiradas={datos.resultados} />
          <a className="enlace-manual" href="./MANUAL.md">Manual de usuario</a>
        </div>
      </header>
      <div className="distribucion">
        <Controles origen={origen} datos={datos} edicion={edicion} setEdicion={setEdicion} cambiarOrigen={cambiarOrigen} />
        <Resultados datos={datos} onEditar={setEdicion} onEliminar={eliminar} />
      </div>
    </div>
  );
}
