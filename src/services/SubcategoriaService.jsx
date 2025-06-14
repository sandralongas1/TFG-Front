const API_URL = import.meta.env.VITE_API_URL + "/subcategoria";

export async function subcategoria_listar() {
  try {
    const response = await fetch(`${API_URL}/listar`);
    if (!response.ok) throw new Error("Error al listar las subcategoria");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function subcategoria_listarActivos() {
    try {
      const response = await fetch(`${API_URL}/listarActivos`);
      if (!response.ok) throw new Error("Error al listar las subcategoria");
      return await response.json();
    } catch (error) {
      throw error;
    }
}

export async function subcategoria_listarActivosFiltro(filtro) {
    try {
      const response = await fetch(`${API_URL}/listarActivosFiltro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filtro), // por ejemplo: { idCategoria: null, grupo: null }
      });
      if (!response.ok) throw new Error("Error al listar las subcategoria");
      return await response.json();
    } catch (error) {
      throw error;
    }
}