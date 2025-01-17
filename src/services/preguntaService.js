export const cargarPreguntas = async () => {
  try {
    const response = await fetch("./preguntas.json");
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const preguntas = await response.json();
    if (!Array.isArray(preguntas) || preguntas.length === 0) {
      throw new Error("El archivo JSON no contiene preguntas válidas");
    }
    return preguntas;
  } catch (error) {
    console.error("Error al cargar las preguntas", error);
    throw error;
  }
};
