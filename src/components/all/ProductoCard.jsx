import React from 'react'
import { useNavigate } from "react-router-dom";
import "./ProductoCard.css";
import { IoIosHeartEmpty } from "react-icons/io";

const ProductoCard = ({ producto }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/producto/${producto.id}`);
  };

  return (
    <div className="producto-card" onClick={handleClick}>
      <div className="icono-favorito">
        <IoIosHeartEmpty className="icono-heart" />
      </div>
      <div className="imagen-container">
        {producto.imagen ? (
            <img
              src={`data:image/png;base64,${producto.imagen}`}
              alt={producto.titulo}
              className="imagen-producto" /> 
          ) : (
            <img
              src="../../../public/img/no-image.png"
              alt={producto.titulo}
              className="imagen-producto" /> 
          )
      }
      </div>
      <h3 className="titulo-producto">{producto.titulo}</h3>
      <p className="descripcion-producto">{producto.descripcion}</p>
      <p className="precio-producto">{producto.precio.toFixed(2)} €</p>
    </div>
  );
};

export default ProductoCard;