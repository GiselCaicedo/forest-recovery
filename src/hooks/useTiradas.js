import { useEffect, useMemo, useReducer, useState } from 'react';
import { calcularTirada } from '../domain/calculos.js';
import { calcularEstadisticas } from '../domain/estadisticas.js';
import { generarTiradasPrueba, rangosPorDefecto } from '../domain/generador.js';
import { actualizarRegistro, crearLote, iniciarRegistro, persistirRegistro } from './registroTiradas.js';
import { datosClase } from '../data/datosClase.js';

const filtrosIniciales = { origen: 'cargar', min: '', max: '', numero: '' };

function aplicarFiltros(tiradas, filtros) {
  const { origen, min, max, numero } = filtros;
  return tiradas.filter((tirada) =>
    (!origen || tirada.origen === origen)
    && (min === '' || tirada.resultado.plantasFinales >= Number(min))
    && (max === '' || tirada.resultado.plantasFinales <= Number(max))
    && (numero === '' || tirada.numero === Number(numero)));
}

export function useTiradas() {
  const [registro, dispatch] = useReducer(actualizarRegistro, null, iniciarRegistro);
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [almacenado, setAlmacenado] = useState(true);
  const { tiradas, configuracion } = registro;

  useEffect(() => { setAlmacenado(persistirRegistro(registro)); }, [registro]);
  const resultados = useMemo(() => tiradas.map((tirada) => ({
    ...tirada, resultado: calcularTirada(tirada.entrada),
  })), [tiradas]);
  const visibles = useMemo(() => aplicarFiltros(resultados, filtros), [resultados, filtros]);
  const estadisticas = useMemo(() => calcularEstadisticas(
    visibles.map(({ resultado }) => resultado.plantasFinales),
  ), [visibles]);

  function cargarLote(origen, entradas, configuracion) {
    dispatch({ tipo: 'lote', origen, lote: crearLote(entradas, origen), configuracion });
    setFiltros({ ...filtrosIniciales, origen });
  }

  return {
    resultados, visibles, estadisticas, configuracion, filtros, setFiltros, almacenado,
    cargarArchivo: (entradas) => cargarLote('cargar', entradas),
    generarPrueba: (config) => cargarLote('prueba', generarTiradasPrueba(config.cantidad, config.rangos), config),
    cargarClase: () => cargarLote('clase', datosClase),
    generarMas: (cantidad) => dispatch({
      tipo: 'agregar',
      lote: crearLote(generarTiradasPrueba(cantidad, rangosPorDefecto), 'clase'),
    }),
    guardar: (entrada, id) => dispatch(id ? { tipo: 'editar', entrada, id }
      : { tipo: 'agregar', lote: crearLote([entrada], 'manual') }),
    reemplazarManual: (entradas) => dispatch({ tipo: 'lote', origen: 'manual', lote: crearLote(entradas, 'manual') }),
    eliminar: (id) => dispatch({ tipo: 'eliminar', id }),
    limpiar: () => { dispatch({ tipo: 'limpiar' }); setFiltros(filtrosIniciales); },
  };
}
