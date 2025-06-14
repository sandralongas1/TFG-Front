const API_URL = import.meta.env.VITE_API_URL + "/perfil";

export async function perfil_listar() {
  try {
    const response = await fetch(`${API_URL}/listar`);
    if (!response.ok) throw new Error("Error al listar los perfiles");
    return await response.json();
  } catch (error) {
    throw error;
  }
}