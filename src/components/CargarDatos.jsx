import { useState } from 'react';
import { importarCsv } from '../domain/importarCsv.js';

// Carga tiradas desde un archivo CSV elegido por la persona usuaria.
// Lee solo las seis columnas de entrada (ver el manual); recalcula los resultados.
export default function CargarDatos({ onCargar }) {
  const [errores, setErrores] = useState([]);
  const [aviso, setAviso] = useState('');

  async function alElegir(evento) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;
    setErrores([]);
    setAviso('');
    let texto;
    try {
      texto = await archivo.text();
    } catch {
      setErrores(['No se pudo leer el archivo.']);
      return;
    }
    const { entradas, errores: erroresCsv } = importarCsv(texto);
    if (entradas.length) {
      onCargar(entradas);
      setAviso(`Se cargaron ${entradas.length} ${entradas.length === 1 ? 'tirada' : 'tiradas'}.`);
    }
    setErrores(erroresCsv);
    // Permite volver a elegir el mismo archivo tras corregirlo.
    evento.target.value = '';
  }

  return (
    <section className="cargar-datos" aria-labelledby="titulo-cargar">
      <h2 id="titulo-cargar">Cargar datos</h2>
      <p id="ayuda-cargar">
        Sube un archivo CSV con tus tiradas. Debe incluir las columnas
        {' '}<code>frutosIniciales</code>, <code>frutosComidos</code>, <code>semillasPorFruto</code>,
        {' '}<code>pctRaton</code>, <code>pctGermina</code> y <code>pctSobrevive</code>. Los resultados se
        calculan en el simulador. Puedes partir del archivo que genera «Exportar CSV» o del
        {' '}<a href="./ejemplo-datos.csv" download>archivo de ejemplo</a>.
      </p>
      <input
        type="file"
        accept=".csv,text/csv"
        aria-describedby="ayuda-cargar"
        onChange={alElegir}
      />
      {aviso && <p role="status" className="aviso-carga">{aviso}</p>}
      {errores.length > 0 && (
        <div role="alert" className="errores-carga">
          <p>{errores.length === 1 ? 'Se encontró un problema:' : 'Se encontraron problemas:'}</p>
          <ul>{errores.map((error, indice) => <li key={indice}>{error}</li>)}</ul>
        </div>
      )}
    </section>
  );
}
