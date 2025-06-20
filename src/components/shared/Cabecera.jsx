import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiLogIn } from "react-icons/fi"; // Iconos
import { FaHeart, FaUser } from "react-icons/fa"; // Iconos
import { FaCartShopping } from "react-icons/fa6"; // Iconos
import "./Cabecera.css";

function Cabecera() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("TFC_usuarioNombre"); // Obtener el usuario
  const role = localStorage.getItem("TFC_usuarioRol"); // Obtener el rol del usuario

  const handleLogout = () => {
    localStorage.removeItem("TFC_usuarioId"); 
    localStorage.removeItem("TFC_usuario"); 
    localStorage.removeItem("TFC_usuarioNombre"); 
    localStorage.removeItem("TFC_usuarioRol");
    navigate("/login"); // Redirigir al login
  };

  const handleLikes = () => {
    navigate("/productosFavoritos");
  };

  const handleShoppingCart = () => {
    navigate("/carrito");
  };

  const handleUserProfile = () => {
    navigate("/perfil");
  };
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const header = document.querySelector(".cabecera");
  
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scroll hacia abajo → ocultar cabecera
        header.classList.add("oculta");
      } else {
        // Scroll hacia arriba → mostrar cabecera
        header.classList.remove("oculta");
      }
      lastScrollY = window.scrollY;
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="cabecera">
      {/* Menú de navegación alineado a la izquierda */}
      <nav>
        <div className="logo-container">
          <img src="/img/loveplantlogo.png" className="logo" onClick={() => navigate("/")} />
          <ul className="menu">
            <li onClick={() => navigate("/productos?idCategoria=1")}>Plantas de Interior</li>
            <li onClick={() => navigate("/productos?idCategoria=2")}>Plantas de Exterior</li>
            <li onClick={() => navigate("/productos?idCategoria=3")}>Cactus y Suculentas</li>
            <li onClick={() => navigate("/productos?idCategoria=4")}>Orquídeas</li>
            <li onClick={() => navigate("/productos?grupo=productos")}>Productos / Accesorios</li>
            {role == "ADMIN" && 
              <li>
                Administrador
                <ul className="submenu">
                  <li onClick={() => navigate("/admin/categorias")}>
                    Categorias
                  </li>
                  <li onClick={() => navigate("/admin/subcategorias")}>
                    Subcategorias
                  </li>
                  <li onClick={() => navigate("/admin/productos")}>
                    Productos
                  </li>
                  <li onClick={() => navigate("/admin/usuarios")}>
                    Usuarios
                  </li>
                  <li onClick={() => navigate("/admin/ventas/0")}>
                    Ventas
                  </li>
                </ul>
              </li>
            }
          </ul>         
        </div>      
      </nav>

      {/* Botones: Corazón, Carrito, Perfil usuario, cerrar sesión */}
      <div className="usuario-info">
        {/* <div className="usuario-nombre">{usuario}</div> */}
        {usuario && (
          <div id="btnsCabecera">
            <button id="btnLikes" onClick={handleLikes} title="Tus favoritos">
              <FaHeart size={20} color="red" />
            </button>
            <button id="btnShoppingCart" onClick={handleShoppingCart} title="Carrito de compra">
              <FaCartShopping size={20} />
            </button>
            <button id="btnUserProfile" onClick={handleUserProfile} title={`Usuario: ${usuario}`}>
              <FaUser size={20} />
            </button>
          </div>          
        ) }
        <button className="logout-btn" onClick={handleLogout}>
          {usuario ? (<FiLogOut size={20} />) : (<FiLogIn size={20} />)}
        </button>
      </div>
    </header>
  );
}

export default Cabecera;
