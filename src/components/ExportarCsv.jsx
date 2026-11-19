import { convertirACsv } from '../domain/exportarCsv.js';

export default function ExportarCsv({ tiradas }) {
  function descargar() {
    const archivo = new Blob([convertirACsv(tiradas)], { type: 'text/csv;charset=utf-8;' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = 'tiradas-bosque.csv';
    enlace.click();
    setTimeout(() => URL.revokeObjectURL(enlace.href), 1000);
  }

  return <button type="button" disabled={!tiradas.length} onClick={descargar}>Exportar CSV</button>;
}
