const API_URL = import.meta.env.VITE_API_URL + "/venta";

export async function venta_listar(filtros) {
  try {
    const response = await fetch(`${API_URL}/listar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtros),
    });
    if (!response.ok) throw new Error("Error al listar las ventas");
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function venta_registrar(datos) {
  try {
    const response = await fetch(`${API_URL}/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error("Error al intentar crear el pedido");
    return true;
  } catch (error) {
    throw error;
  }
}