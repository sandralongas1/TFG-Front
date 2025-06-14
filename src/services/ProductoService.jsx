const API_URL = import.meta.env.VITE_API_URL + "/producto";

export async function producto_listar() {
  try {
    const response = await fetch(`${API_URL}/listar`);
    if (!response.ok) throw new Error("Error al listar los productos");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function producto_listarActivos() {
    try {
      const response = await fetch(`${API_URL}/listarActivos`);
      if (!response.ok) throw new Error("Error al listar los productos");
      return await response.json();
    } catch (error) {
      throw error;
    }
}

export async function producto_listarActivosFiltro(filtro) {
    try {
        const response = await fetch(`${API_URL}/listarActivosFiltro`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(filtro), // por ejemplo: { idCategoria: null, idSubcategoria: null }
          });
      if (!response.ok) throw new Error("Error al listar los productos");
      return await response.json();
    } catch (error) {
      throw error;
    }
}

export async function obtenerProducto(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al consultar producto");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function crearProducto(datos) {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error("Error al crear el producto");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function editarProducto(datos) {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error("Error al editar el producto");
    return true;
  } catch (error) {
    throw error;
  }
}
  
export async function eliminarProducto(id) {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el producto");
    return true;
  } catch (error) {
    throw error;
  }
}