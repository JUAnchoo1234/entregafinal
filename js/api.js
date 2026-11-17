let productos = [];

async function cargarProductos() {
  try {
    const respuesta = await fetch("data/productos.json");
    if (!respuesta.ok) {
      throw new Error("Error HTTP " + respuesta.status);
    }
    productos = await respuesta.json();
  } catch (error) {
    console.error("No se pudieron cargar los productos:", error);
    productos = [];
  }
  return productos;
}
