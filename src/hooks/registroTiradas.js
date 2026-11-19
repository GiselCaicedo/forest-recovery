import { rangosPorDefecto, validarRangos } from '../domain/generador.js';
import { validarEntrada } from '../domain/validacion.js';

const clave = 'regeneracion-bosque:v2';
const configuracionInicial = { cantidad: 12, rangos: rangosPorDefecto };

export function crearLote(entradas, origen) {
  return entradas.map((entrada) => ({ id: crypto.randomUUID(), entrada, origen }));
}

function numerar(nuevas, anteriores) {
  const ultimo = anteriores.reduce((maximo, tirada) => Math.max(maximo, tirada.numero), 0);
  return nuevas.map((tirada, indice) => ({ ...tirada, numero: ultimo + indice + 1 }));
}

// Se conservan en el navegador las tiradas que el usuario creó: las manuales y las cargadas
// desde un archivo (origen 'cargar'). Las de prueba son efímeras.
function guardableValida(tirada) {
  return (tirada?.origen === 'manual' || tirada?.origen === 'cargar') && typeof tirada.id === 'string'
    && Number.isSafeInteger(tirada.numero) && tirada.numero > 0
    && tirada.entrada && validarEntrada(tirada.entrada).valido;
}

function configuracionValida(config) {
  return Number.isInteger(config?.cantidad) && config.cantidad >= 1 && config.cantidad <= 50
    && config.rangos && !Object.keys(validarRangos(config.rangos)).length;
}

export function iniciarRegistro() {
  let guardado;
  try { guardado = JSON.parse(localStorage.getItem(clave)); }
  catch { guardado = null; }
  const guardadas = Array.isArray(guardado?.guardadas) ? guardado.guardadas.filter(guardableValida) : [];
  const configuracion = configuracionValida(guardado?.configuracion) ? guardado.configuracion : configuracionInicial;
  return { tiradas: numerar(guardadas, []), configuracion };
}

export function persistirRegistro({ tiradas, configuracion }) {
  const guardadas = tiradas.filter(({ origen }) => origen === 'manual' || origen === 'cargar');
  try { localStorage.setItem(clave, JSON.stringify({ guardadas, configuracion })); }
  catch { return false; }
  return true;
}

export function actualizarRegistro(estado, accion) {
  const { tiradas } = estado;
  switch (accion.tipo) {
    case 'lote': {
      const otras = tiradas.filter(({ origen }) => origen !== accion.origen);
      return { ...estado, tiradas: [...otras, ...numerar(accion.lote, otras)],
        configuracion: accion.configuracion ?? estado.configuracion };
    }
    case 'agregar':
      return { ...estado, tiradas: [...tiradas, ...numerar(accion.lote, tiradas)] };
    case 'editar':
      return { ...estado, tiradas: tiradas.map((tirada) =>
        tirada.id === accion.id ? { ...tirada, entrada: accion.entrada } : tirada) };
    case 'eliminar':
      return { ...estado, tiradas: tiradas.filter(({ id }) => id !== accion.id) };
    case 'limpiar':
      return { tiradas: [], configuracion: configuracionInicial };
    default:
      return estado;
  }
}
