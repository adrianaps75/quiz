import React from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
    const navigate = useNavigate();
    const volverPreguntas = () => {
        navigate("/quizz");
      };
    
  return (
    <div className="inicio">
      <h1>Bienvenido al Quiz</h1>
      <p>Haz clic en el botón para comenzar.</p>
      <button onClick={volverPreguntas}>Comenzar</button>
    </div>
  );
};

export default Inicio;
