import { useState, useEffect } from 'react'
import Cabecera from '../shared/Cabecera';
import "./ProductosFavoritos.css";
import ProductoFila from "./ProductoFila";
import { producto_listarActivosFiltroIds, agregarProductoCarrito } from "../../services/ProductoService";
import { TiDelete } from "react-icons/ti";   //delete icon 
import Loader from "./Loader";
import ErrorPage from "../error/ErrorPage";

function ProductosFavoritos() {
const [productos, setProductos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const productos = localStorage.getItem("TFC_productosFavoritos");   
    cargarProductos(productos.split(',').map(Number));
}, []);

function cargarProductos(listProductosId) {
    var filtro = {
        productosId: listProductosId
    };
    producto_listarActivosFiltroIds(filtro)
    .then((data) => {
        setProductos(data); // Guardamos los productos en el estado
        setLoading(false);
    })
    .catch((error) => {
        setError(error.message);
        setLoading(false);
    });
}

const handleDelete = (producto) => {
    console.log("Eliminar de favoritos: ", producto);
    let favoritos = localStorage.getItem("TFC_productosFavoritos") || "";
    favoritos = favoritos.split(',').map(Number).filter(id => id !== producto.id);
    localStorage.setItem("TFC_productosFavoritos", favoritos);
    cargarProductos(favoritos);
};

const handleAddToCart = (producto) => {
    console.log("Añadir al carrito: ", producto);
    agregarProductoCarrito(producto);
};

const handleDeleteAll = () => {
    console.log("Eliminar de favoritos todos los productos");
    localStorage.setItem("TFC_productosFavoritos", []);
    cargarProductos([]);
};

if (loading) return <Loader />;
if (error) return <ErrorPage message="No se pudieron cargar los productos favoritos" />;

  return (
    <div id="main-container">
        <Cabecera />
        <h1 className="titulo">Favoritos</h1>
        <div>
        {productos.map((producto) => (
            <ProductoFila key={producto.id} producto={producto} paginaOrigen="favoritos" onDelete={handleDelete} onAddToCart={handleAddToCart} />
        ))}
        </div>
        <button title="Eliminar todos los productos favoritos" className="btnIconAndText btnDelete" onClick={() => handleDeleteAll()}>
          <TiDelete style={{ marginRight: "8px" }} />
          Eliminar todos los productos favoritos
        </button>
    </div>
  );
}

export default ProductosFavoritos;
