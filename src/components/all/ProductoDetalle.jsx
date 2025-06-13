import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerProducto } from "../../services/ProductoService";
import Cabecera from "../shared/Cabecera";
import "./ProductoDetalle.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

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
            <img src={`data:image/png;base64,${producto.imagen}`} alt={producto.titulo} className="detalle-imagen" />
            <div className="detalle-info">
            <h2 className="detalle-titulo">{producto.titulo}</h2>
            <p className="detalle-descripcion">{producto.descripcion}</p>
            <p><strong>Precio:</strong> {producto.precio} €</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <p className="detalle-subcategoria">
                {producto.subcategoria.descripcion}
            </p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ProductoDetalle;
