import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "./ProductoCard.css";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const ProductoCard = ({ producto }) => {
  const navigate = useNavigate();
  const [esFavorito, setEsFavorito] = useState(false);
  const usuario = localStorage.getItem("TFC_usuarioNombre"); // Obtener el usuario

  useEffect(() => {
    let favoritos = localStorage.getItem("TFC_productosFavoritos") || "";
    favoritos = favoritos.split(',').map(Number);
    setEsFavorito(favoritos.includes(producto.id));
  }, [producto.id]);

  const handleClick = () => {
    navigate(`/producto/${producto.id}`);
  };

  const handleFavoritoClick = (e) => {
    e.stopPropagation(); // Para que no se active handleClick del div principal

    let favoritos = localStorage.getItem("TFC_productosFavoritos") || "";
    favoritos = favoritos.split(',').map(Number);

    if (esFavorito) {
      // Si ya es favorito, quitarlo
      favoritos = favoritos.filter(id => id !== producto.id);
      setEsFavorito(false);
    } else {
      // Añadir a favoritos
      favoritos.push(producto.id);
      setEsFavorito(true);
    }

    localStorage.setItem("TFC_productosFavoritos", favoritos);
  };

  return (
    <div className="producto-card" onClick={handleClick}>
      {usuario && 
        <div className="icono-favorito" onClick={handleFavoritoClick}>
          {esFavorito ? (
            <IoIosHeart size={24} color="red" />
          ) : (
            <IoIosHeartEmpty size={24} />
          )}
        </div>
      }
      <div className="imagen-container">
        {producto.imagen ? (
            <img src={`data:image/png;base64,${producto.imagen}`} alt={producto.titulo} className="imagen-producto" /> 
          ) : (
            <img src="/img/no-image.png" alt={producto.titulo} className="imagen-producto" /> 
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