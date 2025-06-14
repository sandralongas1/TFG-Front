const API_URL = import.meta.env.VITE_API_URL + "/usuario";

export async function usuario_listar() {
  try {
    const response = await fetch(`${API_URL}/listar`);
    if (!response.ok) throw new Error("Error al listar los usuarios");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function usuario_listarActivos() {
    try {
      const response = await fetch(`${API_URL}/listarActivos`);
      if (!response.ok) throw new Error("Error al listar los usuarios");
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

export async function obtenerUsuario(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al consultar usuario");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function crearUsuario(datos) {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error("Error al crear el usuario");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function editarUsuario(datos) {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error("Error al editar el usuario");
    return true;
  } catch (error) {
    throw error;
  }
}
  
export async function eliminarUsuario(id) {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el usuario");
    return true;
  } catch (error) {
    throw error;
  }
}

export async function login(datos) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error("Error al consultar usuario");
    return await response.json();
  } catch (error) {
    throw error;
  }
}