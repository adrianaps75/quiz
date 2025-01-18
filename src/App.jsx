import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cargarPreguntas } from "./services/preguntaService.js";
import {
  mostrarPreguntaAleatoria,
  mostrarRespuestasAleatorias,
  verificarRespuesta,
  calcularPorcentaje,
} from "./helpers/funciones.js";
import Pregunta from "./components/Pregunta.jsx";
import Opciones from "./components/Opciones.jsx";
import "./App.css";

function App() {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaAleatoria, setPreguntaAleatoria] = useState({});
  const [respuestasAleatorias, setRespuestasAleatorias] = useState([]);
  const [respuestaUsuario, setRespuestaUsuario] = useState(null);
  const [esCorrecta, setEsCorrecta] = useState(null);
  const [finalizado, setFinalizado] = useState(false);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [totalRespuestas, setTotalRespuestas] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const preguntas = await cargarPreguntas();
        setPreguntas(preguntas);
        setTotalRespuestas(preguntas.length);
        cambiarPregunta(preguntas);
      } catch (error) {
        console.error("Error en el componente al cargar las preguntas", error);
      }
    };
    obtenerPreguntas();
  }, []);

  const cambiarPregunta = (preguntasRestantes) => {
    if (preguntasRestantes.length === 0) {
      setFinalizado(true);
      return;
    }

    const nuevaPregunta = mostrarPreguntaAleatoria(preguntasRestantes);
    const preguntasActualizadas = preguntasRestantes.filter(
      (pregunta) => pregunta !== nuevaPregunta
    );

    setPreguntaAleatoria(nuevaPregunta);
    setPreguntas(preguntasActualizadas);
    setRespuestasAleatorias(
      mostrarRespuestasAleatorias(nuevaPregunta.opciones)
    );
    setRespuestaUsuario(null);
    setEsCorrecta(null);
  };

  const handleSeleccionarRespuesta = (respuesta) => {
    setRespuestaUsuario(respuesta);
    if (preguntaAleatoria) {
      const resultado = verificarRespuesta(respuesta, preguntaAleatoria);
      setEsCorrecta(resultado);
      if (resultado) {
        setRespuestasCorrectas(respuestasCorrectas + 1);
      }
    }
  };

  const handleSiguientePregunta = () => {
    cambiarPregunta(preguntas);
  };

  const porcentajeFinal = () => {
    return calcularPorcentaje(totalRespuestas, respuestasCorrectas);
  };

  const empezarDeNuevo = () => {
    setFinalizado(false);
    setRespuestasCorrectas(0);
    setTotalRespuestas(0);
    setPorcentaje(0);
    cambiarPregunta(preguntas);
    navigate("/");
  };

  return (
    <div className="App">
      <h1>Quiz</h1>
      {finalizado ? (
        <><p>
          ¡Has completado todas las preguntas! <br />
          Porcentaje de respuestas correctas: {porcentajeFinal()}%
        </p><button onClick={empezarDeNuevo}>Empezar de nuevo</button></>
      ) : preguntaAleatoria ? (
        <>
          <Pregunta pregunta={preguntaAleatoria.pregunta} />
          <Opciones
            opciones={respuestasAleatorias}
            onSeleccionar={handleSeleccionarRespuesta}
            respuestaSeleccionada={respuestaUsuario}
          />
          <div className="resultado text-center d-flex flex-column mb-3">
            {respuestaUsuario !== null && (
              <div>
                {esCorrecta ? (
                  <p style={{ color: "green" }}>¡Correcto!</p>
                ) : (
                  <p style={{ color: "red" }}>
                    Incorrecto. La respuesta correcta es:{" "}
                    {preguntaAleatoria.respuestaCorrecta}
                  </p>
                )}
              </div>
            )}
          </div>
          <button
            onClick={handleSiguientePregunta}
            style={{ marginTop: "10px" }}
          >
            Siguiente
          </button>
        </>
      ) : (
        <p>Cargando pregunta...</p>
      )}
    </div>
  );
}

export default App;
