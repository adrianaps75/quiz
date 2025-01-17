export const mostrarPreguntaAleatoria = (preguntas) => {
  if(preguntas.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
    return preguntas[indiceAleatorio];
  }
}

export const mostrarRespuestasAleatorias = (respuestas) => {
  return [...respuestas].sort(() => Math.random() - 0.5);
}

export const verificarRespuesta = (respuestaSeleccionada, preguntaActual) => {
    if (!preguntaActual || !preguntaActual.respuestaCorrecta) return false;
    return respuestaSeleccionada === preguntaActual.respuestaCorrecta;
};

export const calcularPorcentaje = (total, correctas) => {
  if (total === 0) return 0;
  return ((correctas / total) * 100).toFixed(2);
};