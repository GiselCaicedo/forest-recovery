const formato = new Intl.NumberFormat('es-CO', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function PanelEstadisticas({ estadisticas }) {
  const { n, promedio, varianza, desviacion, error, rango } = estadisticas;
  const medidas = [
    ['Tiradas', n === null ? '—' : String(n)],
    ['Promedio', promedio],
    ['Varianza muestral', varianza],
    ['Desviación', desviacion],
    ['Error estándar', error],
    ['Rango', rango ? rango.map((valor) => formato.format(valor)).join(' – ') : null],
  ];

  return (
    <section className="panel-estadisticas" aria-labelledby="titulo-estadisticas">

      <h2 id="titulo-estadisticas">Estadísticas</h2>
      <dl className="estadisticas">
        {medidas.map(([etiqueta, valor]) => (
          <div key={etiqueta}>
            <dt>{etiqueta}</dt>
            <dd>{typeof valor === 'number' ? formato.format(valor) : valor ?? '—'}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
