import { useEffect, useRef, useState } from 'react';

export function useAnuncioErrores() {
  const [mensaje, setMensaje] = useState('');
  const temporizador = useRef();

  useEffect(() => () => clearTimeout(temporizador.current), []);

  function anunciar(event) {
    const campo = event.target;
    if (campo.tagName !== 'INPUT') return;
    clearTimeout(temporizador.current);
    setMensaje('');
    temporizador.current = setTimeout(() => {
      const id = campo.getAttribute('aria-describedby');
      const error = campo.isConnected && id && document.getElementById(id)?.textContent;
      if (error) setMensaje(`${campo.labels[0].textContent}. ${error}`);
    }, 500);
  }

  return { mensaje, anunciar };
}
