import {
  Bar, BarChart, CartesianGrid, LabelList, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

const estiloEjes = { fill: 'var(--tenue)', fontSize: 12 };

function BarrasPlantas({ puntos, promedio, rango }) {
  return (
    <div className="lienzo-grafico">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart data={puntos} accessibilityLayer title="Plantas que sobreviven en cada tirada"
          margin={{ top: 16, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--borde)" />
          <XAxis dataKey="tirada" tick={estiloEjes} axisLine={false} tickLine={false} minTickGap={12} />
          <YAxis width="auto" tick={estiloEjes} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip labelFormatter={(etiqueta) => `Tirada ${etiqueta}`} isAnimationActive={false} />
          {rango && <ReferenceArea y1={rango[0]} y2={rango[1]} ifOverflow="extendDomain"
            fill="var(--tinta-verde)" fillOpacity={1} stroke="none" />}
          <Bar dataKey="plantas" name="Plantas" fill="var(--bosque)" maxBarSize={64} isAnimationActive={false}>
            {puntos.length <= 8 && <LabelList dataKey="plantas" position="top" fill="var(--texto)" fontSize={12} />}
          </Bar>
          <ReferenceLine y={promedio} strokeWidth={2} strokeDasharray="6 4" stroke="var(--texto)" zIndex={400} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function GraficoPlantas({ tiradas, estadisticas }) {
  const { promedio, rango } = estadisticas;
  const puntos = tiradas.map(({ numero, resultado }) => ({ tirada: `#${numero}`, plantas: resultado.plantasFinales }));
  return (
    <section className="panel-grafico" aria-labelledby="titulo-grafico">
      <h2 id="titulo-grafico">Plantas por tirada</h2>
      {!puntos.length ? <p className="vacio">Carga datos o ajusta los filtros para ver el gráfico.</p> : (
        <>
          <div className="leyenda">
            <span><i className="marca-plantas" aria-hidden="true" /> Plantas</span>
            <span><i className="marca-promedio" aria-hidden="true" /> Promedio</span>
            {rango && <span><i className="marca-rango" aria-hidden="true" /> Promedio ± error estándar</span>}
          </div>
          <BarrasPlantas puntos={puntos} promedio={promedio} rango={rango} />
        </>
      )}
    </section>
  );
}
