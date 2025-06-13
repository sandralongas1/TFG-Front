const API_URL = "http://localhost:8080/api/perfil";

export async function perfil_listar() {
  try {
    const response = await fetch(`${API_URL}/listar`);
    if (!response.ok) throw new Error("Error al listar los perfiles");
    return await response.json();
  } catch (error) {
    throw error;
  }
}