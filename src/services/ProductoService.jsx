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

export async function producto_listarActivosFiltroIds(filtro) {
  try {
      const response = await fetch(`${API_URL}/listarActivosFiltroIds`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filtro),
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

export function agregarProductoCarrito(producto){
  console.log("Añadir al carrito: ", producto);
  const variable_carrito = localStorage.getItem("TFC_productosCarrito");
  const carrito = variable_carrito ? JSON.parse(variable_carrito) : []; 
  const existe = carrito.some(item => item.id === producto.id);
  if (existe){
      alert("El producto ya existe en el carrito");
  }else{
    const p = { id: producto.id, cantidad: 1 };
    carrito.push(p);
    localStorage.setItem("TFC_productosCarrito", JSON.stringify(carrito));
    alert("Producto añadido al carrito");
  }  
}