import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecera from "../shared/Cabecera";
import "./UsuarioPerfil.css";
import { obtenerUsuario } from "../../services/UsuarioService";

function UsuarioPerfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const usuarioId = localStorage.getItem("TFC_usuarioId");

  useEffect(() => { 
    obtenerUsuario(usuarioId)
        .then((data) => {
            setUsuario(data);
        })
        .catch((error) => {
            console.error(error);
        });
  }, []);

  const handleVerPedidos = () => {
    navigate(`/admin/ventas/${usuarioId}`);
  };

  if (!usuario) return <p>Cargando información del usuario...</p>;

  return (
    <div id="main-container">
      <Cabecera />
      <div className="usuario-detalle-container">
        <h2>Detalle del usuario</h2>
        <div className="usuario-datos">
          <div><strong>Nombre:</strong> {usuario.nombre}</div>
          <div><strong>Apellidos:</strong> {usuario.apellidos}</div>
          <div><strong>DNI:</strong> {usuario.dni}</div>
          <div><strong>Teléfono:</strong> {usuario.telf}</div>
          <div><strong>Dirección:</strong> {usuario.direccion}</div>
          <div><strong>Email:</strong> {usuario.email}</div>
          <div><strong>Usuario:</strong> {usuario.usuario}</div>
          <div><strong>Perfil:</strong> {usuario.perfil.descripcion}</div>
        </div>
        <div style={{textAlign:"center"}}>
          <button title="Ir a confirmación de compra" className="btnIconAndText btnAdd" onClick={() => handleVerPedidos()}>
            Ver pedidos
          </button>
        </div>       
      </div>     
    </div>
  );
}

export default UsuarioPerfil;
