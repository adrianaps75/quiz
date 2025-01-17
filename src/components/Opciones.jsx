import React from "react";

const Opciones = ({ opciones, onSeleccionar, respuestaSeleccionada }) => {
  return (
    <div>
      {opciones.map((opcion, index) => (
        <button
          key={index}
          onClick={() => onSeleccionar(opcion)}
          style={{
            padding: "10px 20px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor:
              respuestaSeleccionada === opcion ? "lightblue" : "white",
          }}
        >
          {opcion}
        </button>
      ))}
    </div>
  );
};

export default Opciones;
