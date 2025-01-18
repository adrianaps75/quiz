import React from "react";

const Opciones = ({ opciones, onSeleccionar, respuestaSeleccionada }) => {
  return (
    <div className="d-flex flex-column mb-3">
      {opciones.map((opcion, index) => (
        <button
          key={index}
          onClick={() => onSeleccionar(opcion)}
          className="btn btn-light"
          style={{
            padding: "10px 20px",
            margin: "5px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor:
              respuestaSeleccionada === opcion ? "#AB81CD" : "white",
          }}
        >
          {opcion}
        </button>
      ))}
    </div>
  );
};

export default Opciones;
