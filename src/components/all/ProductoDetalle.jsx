import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerProducto, agregarProductoCarrito } from "../../services/ProductoService";
import Cabecera from "../shared/Cabecera";
import "./ProductoDetalle.css";
import { FaCartShopping } from "react-icons/fa6";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const usuario = localStorage.getItem("TFC_usuarioNombre"); // Obtener el usuario

  useEffect(() => {
    obtenerProducto(id)
      .then((data) => setProducto(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div id="main-container">
        <Cabecera />
        <div className="detalle-container">
        <div className="detalle-card">           
          {producto.imagen ? (
            <img src={`data:image/png;base64,${producto.imagen}`} alt={producto.titulo} className="detalle-imagen" />
            ) : (
              <img src="/img/no-image.png" alt={producto.titulo} className="detalle-imagen" /> 
            )
          }
          <div className="detalle-info">
            <h2 className="detalle-titulo">{producto.titulo}</h2>
            <p className="detalle-descripcion">{producto.descripcion}</p>
            <p><strong>Precio:</strong> {producto.precio} €</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <p className="detalle-subcategoria">
              <strong>Detalles:</strong> {producto.subcategoria.categoria.descripcion} - {producto.subcategoria.descripcion}
            </p>
            {usuario && 
              <button className="btnIconAndText btnAdd" onClick={() => agregarProductoCarrito(producto)} title="Añadir al carrito" style={{width:"auto"}}>
                <FaCartShopping style={{ marginRight: "8px" }} />
                Añadir
              </button>
            }
          </div>
        </div>
        </div>
    </div>
  );
};

export default ProductoDetalle;
